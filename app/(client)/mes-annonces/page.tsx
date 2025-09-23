"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSessionUser } from "@/lib/useSessionUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type MyCar = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
};

export default function MesAnnoncesPage() {
  const { user, loading: loadingUser } = useSessionUser();
  const [cars, setCars] = useState<MyCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/my/cars", { cache: "no-store" });
      if (res.status === 401) {
        toast.error("Veuillez vous connecter pour voir vos annonces.");
        return;
      }
      if (!res.ok) throw new Error("Échec chargement");
      const data = (await res.json()) as MyCar[];
      setCars(data);
    } catch (e) {
      toast.error("Erreur lors du chargement des annonces.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loadingUser && user) {
      load();
    }
  }, [user, loadingUser]);

  const markSold = async (id: string) => {
    try {
      setMarkingId(id);
      const res = await fetch(`/api/cars/${id}/mark-sold`, { method: "POST" });
      if (!res.ok) {
        toast.error("Impossible de marquer comme vendu");
        return;
      }
      toast.success("Annonce marquée comme vendue");
      await load();
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Mes annonces</h1>

          {loading || loadingUser ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-28" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !user ? (
            <div className="text-center text-gray-600">
              Connectez-vous pour voir vos annonces.
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center text-gray-600">
              Aucune annonce publiée pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cars.map((car) => (
                <Card key={car.id} className="overflow-hidden">
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={car.images?.[0] || "/car-service.png"}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover"
                    />
                    {!car.isActive && (
                      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-sm">
                        VENDU
                      </span>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {car.title || `${car.brand} ${car.model} ${car.year}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-red-600 font-bold text-xl">
                      {new Intl.NumberFormat("fr-FR").format(car.price)} €
                    </div>
                    <Button
                      disabled={!car.isActive || markingId === car.id}
                      onClick={() => markSold(car.id)}
                      className={
                        !car.isActive
                          ? "bg-gray-300 text-gray-600"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }
                    >
                      {car.isActive
                        ? markingId === car.id
                          ? "En cours..."
                          : "Marquer vendu"
                        : "Déjà vendu"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
