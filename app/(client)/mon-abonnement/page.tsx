"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type MeSubscription = {
  hasSubscription: boolean;
  isActive: boolean;
  planType?: string;
  amount?: number;
  startDate?: string;
  endDate?: string;
  paymentId?: string;
};

export default function MonAbonnementPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MeSubscription | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/subscriptions/me", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("fail");
        const json = (await res.json()) as MeSubscription;
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString() : "-";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Mon abonnement</h1>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Statut d'abonnement</CardTitle>
              {loading ? null : data?.isActive ? (
                <Badge className="bg-green-600">Actif</Badge>
              ) : (
                <Badge className="bg-gray-400">Inactif</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-gray-500">Chargement...</div>
              ) : !data ? (
                <div className="text-gray-600">
                  Aucune information disponible.
                </div>
              ) : !data.hasSubscription ? (
                <div className="flex items-center gap-3 text-gray-700">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span>Vous n'avez pas encore d'abonnement.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500">Plan</div>
                    <div className="text-gray-900 font-medium">
                      {data.planType === "MONTHLY" ? "Mensuel" : data.planType}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Montant</div>
                    <div className="text-gray-900 font-medium">
                      {data.amount ?? 10} $
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      Date d'abonnement
                    </div>
                    <div className="text-gray-900 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      {formatDate(data.startDate)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      Fin d'abonnement
                    </div>
                    <div className="text-gray-900 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      {formatDate(data.endDate)}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-gray-500">
                      Identifiant de paiement
                    </div>
                    <div className="text-gray-900 font-mono text-sm">
                      {data.paymentId}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button
                  asChild
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <a href="/abonnement">Gérer mon abonnement</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

