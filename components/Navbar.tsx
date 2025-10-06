"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { clearSessionCookie } from "@/lib/sessionClient";
import { useSessionUser } from "@/lib/useSessionUser";
import { signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { Car, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useSessionUser();
  const isAuthenticated = !!user;
  const isLoading = loading;

  const navLinks = [
    { href: "/achat", label: "Acheter une voiture" },
    { href: "/vente", label: "Vendre sa voiture" },
    { href: "/abonnement", label: "Abonnement" },
    { href: "/contact", label: "Aide & informations" },
  ];

  // Fonction pour obtenir les initiales du nom
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {}
    try {
      await clearSessionCookie();
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("session:updated"));
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-gray-200 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="bg-blue-600 p-2 rounded-lg"
            >
              <Car className="h-6 w-6 text-white" />
            </motion.div>
            {/* <span className="text-2xl font-bold: text-gray-900">AutoDirect</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 z-10 relative">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-2 py-1 text-sm font-medium text-gray-700 group hover:text-blue-600 transition-colors z-20 cursor-pointer"
                style={{ pointerEvents: "auto" }}
                onClick={() => console.log(`Navigation vers: ${link.href}`)}
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* User Menu or Login Button */}
            {isLoading ? (
              <div className="flex items-center space-x-2 px-4 py-2 z-10">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Chargement...</span>
              </div>
            ) : isAuthenticated && user ? (
              <div className="relative z-10">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                    {getInitials(user.displayName || user.phoneNumber || "U")}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {user.displayName || user.phoneNumber || "Utilisateur"}
                  </span>
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className="z-10">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Se connecter
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden relative z-20 bg-white border-gray-200 border-t"
            >
              <div className="px-4 py-3 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 relative z-30 cursor-pointer"
                    onClick={() => {
                      console.log(`Navigation mobile vers: ${link.href}`);
                      setIsOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}

                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-sm text-gray-600">
                      Chargement...
                    </span>
                  </div>
                ) : isAuthenticated && user ? (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                        {getInitials(
                          user.displayName || user.phoneNumber || "U"
                        )}
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.displayName || user.phoneNumber || "Utilisateur"}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 text-base font-medium text-[#3a3367] hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Se déconnecter
                    </button>
                  </div>
                ) : (
                  <div className="pt-3">
                    <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                        Connexion / Inscription
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
