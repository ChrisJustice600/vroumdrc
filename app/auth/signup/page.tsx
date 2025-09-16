import { ArrowRight, Car, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import { SignUpForm } from "./signup-form";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header avec navigation */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                AutoConnect
              </span>
            </div>
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Section gauche - Branding et avantages */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-orange-500 p-12 flex-col justify-center text-white relative overflow-hidden">
          {/* Formes décoratives */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/5 rounded-full"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Rejoignez la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-yellow-200">
                révolution
              </span>{" "}
              automobile
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Plus de 50 000 utilisateurs nous font confiance pour vendre et
              acheter leurs véhicules en toute sécurité.
            </p>

            {/* Avantages avec icônes */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">100% Sécurisé</h3>
                  <p className="text-blue-100">
                    Vos données sont protégées par un cryptage de niveau
                    bancaire
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Communauté Vérifiée
                  </h3>
                  <p className="text-blue-100">
                    Tous nos membres sont vérifiés pour des transactions de
                    confiance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Processus Rapide
                  </h3>
                  <p className="text-blue-100">
                    De l'annonce à la vente en quelques clics seulement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  AutoConnect
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Créez votre compte
              </h1>
              <p className="text-gray-600">
                Rejoignez des milliers d'utilisateurs satisfaits
              </p>
            </div>

            {/* Header desktop */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Créez votre compte
              </h2>
              <p className="text-gray-600">
                Commencez votre aventure AutoConnect dès maintenant
              </p>
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <SignUpForm />
            </div>

            {/* Footer avec liens */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Déjà membre ?{" "}
                <Link
                  href="/auth/signin"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors inline-flex items-center"
                >
                  Se connecter
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </p>
            </div>

            {/* Texte légal */}
            <div className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
              <p>
                En créant un compte, vous acceptez nos{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Conditions d'utilisation
                </span>{" "}
                et notre{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Politique de confidentialité
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
