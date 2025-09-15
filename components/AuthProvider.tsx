"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  isActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier la session au montage
  const checkSession = async () => {
    try {
      setIsLoading(true);
      const session = await authClient.getSession();

      if (session.data?.user) {
        setUser({
          id: session.data.user.id,
          name: session.data.user.name || "",
          email: session.data.user.email || "",
          image: session.data.user.image || undefined,
          isActive: session.data.user.emailVerified || false,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la session:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.data) {
        await checkSession(); // Rafraîchir la session après connexion
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await authClient.signOut();
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Vérifier la session au montage du composant
  useEffect(() => {
    checkSession();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshSession: checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook pour utiliser le contexte d'authentification
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
