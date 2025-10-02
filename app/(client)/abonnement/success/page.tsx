"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type MeSubscription = {
  hasSubscription: boolean;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  paymentId?: string;
};

export default function AbonnementSuccessPage() {
  const params = useSearchParams();
  const ref = params.get("ref") || "";

  console.log("ref:::", ref);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MeSubscription | null>(null);
  const [tries, setTries] = useState(0);

  const pollingDelay = useMemo(() => (tries < 3 ? 1000 : 3000), [tries]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const poll = async () => {
      try {
        const res = await fetch("/api/subscriptions/me", {
          signal: controller.signal,
          cache: "no-store",
        });
        const json = (await res.json()) as MeSubscription;
        if (!active) return;
        setData(json);
        setLoading(false);
        if (!json.isActive && tries < 6) {
          setTimeout(() => setTries((t) => t + 1), pollingDelay);
        }
      } catch {
        if (!active) return;
        setLoading(false);
      }
    };

    poll();
    return () => {
      active = false;
      controller.abort();
    };
  }, [tries, pollingDelay]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Confirmation d'abonnement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <div className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Vérification en cours...
                </div>
              ) : data?.isActive ? (
                <div className="text-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Abonnement activé. Merci !
                </div>
              ) : (
                <div className="text-gray-700">
                  Paiement reçu. En attente de confirmation du fournisseur...
                </div>
              )}
              <div className="text-sm text-gray-500">
                Référence: <span className="font-mono">{ref}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
