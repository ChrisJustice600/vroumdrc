"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSessionUser } from "@/lib/useSessionUser";
import {
  BarChart3,
  Camera,
  Check,
  Crown,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AbonnementPage() {
  const { user, loading } = useSessionUser();
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (!user && !loading) {
      toast.error("Connectez-vous pour vous abonner");
      return;
    }

    setSubscribing(true);
    try {
      // TODO: Intégrer Stripe ou autre fournisseur de paiement
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulation
      toast.success("Abonnement activé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'abonnement");
    } finally {
      setSubscribing(false);
    }
  };

  const features = [
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Photos illimitées",
      description: "Ajoutez autant de photos que vous voulez à vos annonces",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Mise en avant",
      description: "Vos annonces apparaissent en premier dans les résultats",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Statistiques avancées",
      description: "Suivez les vues, clics et performances de vos annonces",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Badge vendeur vérifié",
      description: "Gagnez la confiance des acheteurs avec notre badge",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Support prioritaire",
      description: "Assistance dédiée et réponse rapide à vos questions",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Profil vendeur premium",
      description: "Page personnalisée avec historique de ventes",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed K.",
      role: "Concessionnaire",
      content:
        "Depuis que je suis abonné, mes ventes ont augmenté de 40%. Le badge vérifié fait vraiment la différence !",
      rating: 5,
    },
    {
      name: "Fatima M.",
      role: "Particulier",
      content:
        "Les statistiques m'aident à optimiser mes annonces. J'ai vendu ma voiture en 3 jours !",
      rating: 5,
    },
    {
      name: "Omar B.",
      role: "Garage",
      content:
        "Le support prioritaire est excellent. L'équipe répond toujours rapidement à mes questions.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Crown className="w-16 h-16 text-yellow-500" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Devenez un{" "}
              <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Vendeur Premium
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Boostez vos ventes avec des outils professionnels, une visibilité
              maximale et un support dédié. Rejoignez les vendeurs qui
              réussissent sur VroomKin.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Activation immédiate
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Sans engagement
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Un seul plan, tous les avantages
            </h2>
            <p className="text-xl text-gray-600">
              Accédez à toutes les fonctionnalités premium pour seulement
              10$/mois
            </p>
          </div>

          {/* Plan Unique */}
          <Card className="relative border-red-200 shadow-2xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 py-3 text-base font-semibold">
                <Crown className="w-5 h-5 mr-2" />
                Plan Vendeur Pro
              </Badge>
            </div>

            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Abonnement Vendeur
              </CardTitle>
              <div className="text-6xl font-bold text-red-600 mb-6">
                10
                <span className="text-2xl font-normal text-gray-600">
                  $/mois
                </span>
              </div>
              <p className="text-lg text-gray-600">
                Tout ce dont vous avez besoin pour vendre efficacement
              </p>
            </CardHeader>

            <CardContent className="space-y-5 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-lg">Annonces illimitées</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-lg">
                  Photos illimitées par annonce
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-lg">
                  Badge vendeur vérifié
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-lg">
                  Mise en avant prioritaire
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-lg">
                  Statistiques détaillées
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-lg">
                  Support prioritaire 24/7
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-lg">
                  Profil vendeur premium
                </span>
              </div>

              <div className="pt-8">
                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xl py-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={async () => {
                    if (!user && !loading) {
                      toast.error("Connectez-vous pour vous abonner");
                      return;
                    }
                    try {
                      setSubscribing(true);
                      console.log("[subscribe] début du checkout");
                      const res = await fetch("/api/subscriptions/checkout", {
                        method: "POST",
                      });
                      console.log(
                        "[subscribe] réponse checkout",
                        res.status,
                        res.statusText
                      );
                      const raw = await res.text();
                      console.log("[subscribe] corps brut", raw);
                      if (!res.ok) {
                        const txt = raw;
                        throw new Error(txt || "Erreur checkout");
                      }
                      const data = (() => {
                        try {
                          return JSON.parse(raw);
                        } catch {
                          return {} as any;
                        }
                      })();
                      // Redirection Web Redirect: construire et soumettre un formulaire
                      const actionUrl = data.actionUrl as string;
                      const fields = data.fields as Record<string, string>;
                      console.log("[subscribe] actionUrl", actionUrl);
                      console.log(
                        "[subscribe] champs du formulaire",
                        fields ? Object.keys(fields) : null
                      );
                      if (!actionUrl || !fields) {
                        toast.error("Données de paiement invalides");
                        return;
                      }
                      const form = document.createElement("form");
                      form.method = "POST";
                      form.action = actionUrl;
                      Object.entries(fields).forEach(([k, v]) => {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = k;
                        input.value = String(v);
                        form.appendChild(input);
                      });
                      document.body.appendChild(form);
                      console.log(
                        "[subscribe] soumission du formulaire vers",
                        actionUrl
                      );
                      form.submit();
                    } catch (e) {
                      console.error("[subscribe] échec du checkout", e);
                      toast.error("Impossible de démarrer le paiement");
                    } finally {
                      console.log("[subscribe] fin du flux checkout (client)");
                      setSubscribing(false);
                    }
                  }}
                  disabled={subscribing}
                >
                  {subscribing ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Activation en cours...
                    </>
                  ) : (
                    <>
                      <Crown className="w-6 h-6 mr-3" />
                      Commencer maintenant
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center pt-4 space-y-2">
                <p className="text-sm text-gray-500">
                  ✓ Résiliable à tout moment • ✓ Paiement 100% sécurisé
                </p>
                <p className="text-sm text-gray-500">
                  ✓ Activation immédiate • ✓ Support client dédié
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Premium ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants pour maximiser vos ventes et vous démarquer
              de la concurrence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-100 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos vendeurs
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez des milliers de vendeurs satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-100">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-red-600 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à booster vos ventes ?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Rejoignez les vendeurs Premium et vendez plus rapidement
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6"
            onClick={handleSubscribe}
            disabled={subscribing}
          >
            {subscribing ? (
              <>
                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
                Activation...
              </>
            ) : (
              <>
                <Crown className="w-5 h-5 mr-2" />
                Commencer maintenant - 10$/mois
              </>
            )}
          </Button>
          <p className="text-red-100 text-sm mt-4">
            Essai gratuit 7 jours • Sans engagement
          </p>
        </div>
      </div>
    </div>
  );
}
