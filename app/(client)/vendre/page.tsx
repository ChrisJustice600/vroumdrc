"use client";

import { CarSellForm } from "@/components/car-sell-form";
import { HeroVendre } from "@/components/hero-vendre";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Phone, Shield, Star, Users } from "lucide-react";

export default function VendrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <HeroVendre />

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Statistiques Premium */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-sm p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Rejoignez des milliers de vendeurs satisfaits
                  </h2>
                  <p className="text-xl text-red-100 max-w-3xl mx-auto">
                    Notre plateforme connecte vendeurs et acheteurs avec des
                    résultats exceptionnels
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      15,000+
                    </div>
                    <div className="text-red-100">Voitures vendues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      3 jours
                    </div>
                    <div className="text-red-100">Temps moyen de vente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      98%
                    </div>
                    <div className="text-red-100">Satisfaction client</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      50K+
                    </div>
                    <div className="text-red-100">Acheteurs actifs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Avantages de vendre avec nous */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pourquoi choisir <span className="text-red-500"> VroumKin</span>{" "}
                ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les avantages qui font de notre plateforme le choix
                numéro 1 des vendeurs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Sécurisé à 100%
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transactions entièrement sécurisées avec vérification des
                    vendeurs et protection des paiements
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Vente express
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vendez votre voiture en moyenne en 3 jours grâce à notre
                    réseau d'acheteurs qualifiés
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Large communauté
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Plus de 50 000 acheteurs actifs recherchent leur prochaine
                    voiture sur notre plateforme
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Entièrement gratuit
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Mise en ligne gratuite, aucun frais caché, paiement sécurisé
                    et transparent
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section Processus de vente */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Vendre en <span className="text-red-500">3 étapes simples</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un processus simplifié pour vendre votre voiture rapidement et
                en toute sécurité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent hidden md:block"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Créez votre annonce
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Remplissez notre formulaire simple avec les informations de
                  votre véhicule et ajoutez vos photos
                </p>
              </div>

              <div className="text-center relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent hidden md:block"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Recevez des offres
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Notre réseau d'acheteurs qualifiés vous contacte directement
                  avec des offres sérieuses
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Vendez rapidement
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choisissez la meilleure offre et finalisez la vente en toute
                  sécurité avec notre assistance
                </p>
              </div>
            </div>
          </div>

          {/* Témoignages Premium */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ils nous font <span className="text-red-500">confiance</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les témoignages de nos vendeurs qui ont fait le choix
                de la simplicité et de l'efficacité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      M
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Marie L.
                      </h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          Vendeuse depuis 2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed italic">
                    "J'ai vendu ma voiture en seulement 3 jours ! Le processus
                    est incroyablement simple et les acheteurs sont vraiment
                    sérieux. Je recommande vivement K Vroum."
                  </blockquote>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      P
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Pierre D.
                      </h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          Vendeur depuis 2022
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed italic">
                    "Plateforme exceptionnellement professionnelle. J'ai reçu
                    plusieurs offres de qualité en moins d'une semaine et j'ai
                    pu choisir la meilleure."
                  </blockquote>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      S
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Sophie M.
                      </h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          Vendeuse depuis 2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed italic">
                    "Interface intuitive et support client exceptionnel.
                    L'équipe m'a accompagnée à chaque étape. Je recommande sans
                    hésitation !"
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulaire de vente */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Prêt à vendre votre{" "}
                <span className="text-red-500">voiture</span> ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Créez votre annonce en quelques minutes et connectez-vous avec
                des acheteurs sérieux
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-sm"></div>
              <div className="relative z-10">
                <CarSellForm />
              </div>
            </div>
          </div>

          {/* Section FAQ */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Questions <span className="text-red-500">fréquentes</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trouvez les réponses aux questions les plus courantes sur la
                vente de votre véhicule
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Combien coûte la mise en ligne ?
                  </h3>
                  <p className="text-gray-600">
                    La mise en ligne de votre annonce est entièrement gratuite.
                    Aucun frais caché, vous ne payez que lorsque vous vendez.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    En combien de temps vais-je vendre ?
                  </h3>
                  <p className="text-gray-600">
                    En moyenne, nos vendeurs trouvent un acheteur en 3 jours.
                    Cela dépend de votre véhicule et de votre prix.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Comment sont vérifiés les acheteurs ?
                  </h3>
                  <p className="text-gray-600">
                    Tous nos acheteurs sont vérifiés avec un processus
                    d'authentification strict pour garantir votre sécurité.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Puis-je modifier mon annonce ?
                  </h3>
                  <p className="text-gray-600">
                    Oui, vous pouvez modifier votre annonce à tout moment depuis
                    votre tableau de bord personnel.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support et contact Premium */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-sm p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Besoin d'aide pour vendre votre voiture ?
              </h3>
              <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Notre équipe d'experts automobiles est là pour vous accompagner
                à chaque étape de la vente de votre véhicule. Nous vous aidons à
                optimiser votre annonce et à trouver le meilleur acheteur.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="outline"
                  className="bg-white text-red-500 hover:bg-gray-100 border-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Chat en direct
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-red-500 hover:bg-gray-100 border-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +243 810 98 09 44
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-red-100 text-sm">
                  Disponible du lundi au vendredi de 9h à 18h • Samedi de 10h à
                  16h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
