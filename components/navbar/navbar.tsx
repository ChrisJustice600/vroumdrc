"use client";

import { AuthModalManager } from "@/components/auth/auth-modal-manager";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { clearSessionCookie } from "@/lib/sessionClient";
import { useSessionUser } from "@/lib/useSessionUser";
import { signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Acheter", href: "/achat" },
  { name: "Vendre", href: "/vendre" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useSessionUser();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const getInitials = (name?: string | null, phone?: string) => {
    const n = (name || "").trim();
    if (n) {
      const parts = n.split(/\s+/);
      const first = parts[0]?.[0] ?? "";
      const last = parts[1]?.[0] ?? "";
      return (first + last).toUpperCase() || first.toUpperCase();
    }
    if (phone) {
      return phone.replace(/\D/g, "").slice(-2);
    }
    return "U";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {}
    try {
      await clearSessionCookie();
    } catch {}
    // Notifier pour rafraîchir la session/ navbar sans reload
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("session:updated"));
    }
  };

  return (
    <nav className="fixed uppercase font-bold top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo-kvroom.png"
              alt="KVroom Logo"
              width={120}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1 h-24">
              {navItems
                .concat([
                  { name: "Favoris", href: "/favoris" },
                  { name: "Abonnement", href: "/abonnement" },
                  { name: "Mon abonnement", href: "/mon-abonnement" },
                ])
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-6 h-full flex items-center text-sm font-medium transition-all duration-300 ease-in-out relative group ${
                      isActive(item.href)
                        ? "bg-red-600 text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                    {/* Underline animation */}
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                        isActive(item.href) ? "w-full" : "group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-6 inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/40">
                      <Avatar className="h-9 w-9 border border-white/40">
                        <AvatarFallback className="bg-white/90 text-black text-xs font-bold">
                          {getInitials(
                            user.displayName ?? null,
                            user.phoneNumber
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      {user.displayName || user.phoneNumber}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/mes-annonces">Mes annonces</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-700"
                    >
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="ml-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                >
                  Se connecter
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-sm">
              {navItems
                .concat([
                  { name: "Favoris", href: "/favoris" },
                  { name: "Abonnement", href: "/abonnement" },
                  { name: "Mon abonnement", href: "/mon-abonnement" },
                ])
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out relative group ${
                      isActive(item.href)
                        ? "bg-red-600 text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {/* Underline animation */}
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                        isActive(item.href) ? "w-full" : "group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-white">
                      <Avatar className="h-8 w-8 border border-white/40">
                        <AvatarFallback className="bg-white/90 text-black text-xs font-bold">
                          {getInitials(
                            user.displayName ?? null,
                            user.phoneNumber
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {user.displayName || user.phoneNumber}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-sm"
                    >
                      Se déconnecter
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-sm font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                  >
                    Se connecter
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModalManager
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
}
