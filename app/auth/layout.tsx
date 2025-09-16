import { Car } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section avec pattern de fond */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/car-pattern.svg')] opacity-5"></div>

        {/* Contenu principal */}
        <main className="relative">{children}</main>
      </div>

      {/* Footer Auth */}
      <footer className="relative bg-white/50 border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">AutoConnect</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                La plateforme de confiance pour vendre et acheter des véhicules
                d'occasion entre particuliers.
              </p>
              <div className="flex space-x-4 text-xs text-gray-500">
                <span>🔒 Sécurisé</span>
                <span>✅ Vérifié</span>
                <span>⚡ Rapide</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Liens utiles</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <Link
                  href="/about"
                  className="block hover:text-blue-600 transition-colors"
                >
                  À propos
                </Link>
                <Link
                  href="/help"
                  className="block hover:text-blue-600 transition-colors"
                >
                  Aide
                </Link>
                <Link
                  href="/contact"
                  className="block hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Légal</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <Link
                  href="/terms"
                  className="block hover:text-blue-600 transition-colors"
                >
                  CGU
                </Link>
                <Link
                  href="/privacy"
                  className="block hover:text-blue-600 transition-colors"
                >
                  Confidentialité
                </Link>
                <Link
                  href="/cookies"
                  className="block hover:text-blue-600 transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6 text-center text-sm text-gray-500">
            © 2024 AutoConnect. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
