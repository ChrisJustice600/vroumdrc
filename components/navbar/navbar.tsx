"use client";

import { AuthModalManager } from "@/components/auth/auth-modal-manager";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Acheter", href: "/achat" },
  { name: "Vendre", href: "/vendre" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
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
              {navItems.map((item) => (
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
              <Button
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
                className="ml-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
              >
                Se connecter
              </Button>
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
              {navItems.map((item) => (
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
