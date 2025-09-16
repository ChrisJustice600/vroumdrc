import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import { SignInForm } from "./signin-form";

export default function SignIn() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
        {/* Section Gauche - Branding & Avantages */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  AutoConnect
                </h1>
                <p className="text-gray-600">Votre plateforme de confiance</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Vendez ou achetez votre voiture en toute{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                sérénité
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Rejoignez des milliers d'utilisateurs qui font confiance à notre
              plateforme pour leurs transactions automobiles sécurisées.
            </p>
          </div>

          {/* Avantages */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Transactions sécurisées
                </h3>
                <p className="text-gray-600 text-sm">
                  Vos données et paiements sont protégés par un cryptage de
                  niveau bancaire
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Communauté vérifiée
                </h3>
                <p className="text-gray-600 text-sm">
                  Tous nos membres sont vérifiés pour garantir des échanges de
                  confiance
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Process simplifié
                </h3>
                <p className="text-gray-600 text-sm">
                  De l'annonce à la vente, tout est pensé pour être simple et
                  rapide
                </p>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Voitures vendues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">25K+</div>
              <div className="text-sm text-gray-600">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.8/5</div>
              <div className="text-sm text-gray-600">Satisfaction client</div>
            </div>
          </div>
        </div>

        {/* Section Droite - Formulaire de Connexion */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Bon retour parmi nous !
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Connectez-vous pour accéder à votre espace personnel
              </p>
            </CardHeader>

            <CardContent className="space-y-6 px-6">
              <SignInForm />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Première visite ?{" "}
                  <Link
                    href="/auth/signup"
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Créez votre compte gratuitement
                  </Link>
                </p>
              </div>

              <div className="text-center text-xs text-gray-500">
                En vous connectant, vous acceptez nos{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  conditions d'utilisation
                </Link>{" "}
                et notre{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  politique de confidentialité
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Mobile - Avantages simplifiés */}
          <div className="lg:hidden mt-8 space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Pourquoi AutoConnect ?
              </h3>
              <div className="flex justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Sécurisé</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span>Vérifié</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span>Simple</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
