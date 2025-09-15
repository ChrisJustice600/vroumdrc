"use client";

import { useCallback, useEffect } from "react";
import { authClient } from "./auth-client";
import { useAuthStore } from "./auth-store";

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setLoading,
    logout: storeLogout,
  } = useAuthStore();

  // Fonction pour récupérer la session actuelle (mémorisée)
  const getSession = useCallback(async () => {
    try {
      setLoading(true);
      const session = await authClient.getSession();

      if (session.data?.user) {
        setUser({
          id: session.data.user.id,
          name: session.data.user.name || "",
          email: session.data.user.email || "",
          isActive: session.data.user.emailVerified || false,
          image: session.data.user.image || undefined,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  // Fonction de déconnexion (mémorisée)
  const logout = useCallback(async () => {
    try {
      await authClient.signOut();
      storeLogout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  }, [storeLogout]);

  // Récupérer la session au montage du composant
  useEffect(() => {
    getSession();
  }, [getSession]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    refreshSession: getSession,
  };
}
