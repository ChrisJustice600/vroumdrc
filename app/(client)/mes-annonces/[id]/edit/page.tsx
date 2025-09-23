"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type EditableCar = {
  id: string;
  title: string;
  description: string | null;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  location: string | null;
  whatsappNumber: string | null;
  images: string[];
};

export default function EditCarPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [car, setCar] = useState<EditableCar | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/cars/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Échec");
        const data = (await res.json()) as EditableCar;
        setCar(data);
      } catch {
        toast.error("Annonce introuvable");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  const handleChange = (field: keyof EditableCar, value: string) => {
    if (!car) return;
    setCar({
      ...car,
      [field]:
        field === "year" || field === "mileage" || field === "price"
          ? Number(value)
          : value,
    } as EditableCar);
  };

  const save = async () => {
    if (!car) return;
    try {
      setSaving(true);
      const res = await fetch(`/api/cars/${car.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: car.title,
          description: car.description,
          brand: car.brand,
          model: car.model,
          year: car.year,
          mileage: car.mileage,
          price: car.price,
          location: car.location,
          whatsappNumber: car.whatsappNumber,
          images: car.images,
        }),
      });
      if (!res.ok) throw new Error("Échec mise à jour");
      toast.success("Annonce mise à jour");
      router.push("/mes-annonces");
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Modifier l'annonce</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading || !car ? (
                <>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-full" />
                </>
              ) : (
                <>
                  <div>
                    <Label>Titre</Label>
                    <Input
                      value={car.title || ""}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={car.description || ""}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Marque</Label>
                      <Input
                        value={car.brand}
                        onChange={(e) => handleChange("brand", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Modèle</Label>
                      <Input
                        value={car.model}
                        onChange={(e) => handleChange("model", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Année</Label>
                      <Input
                        type="number"
                        value={car.year}
                        onChange={(e) => handleChange("year", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Kilométrage</Label>
                      <Input
                        type="number"
                        value={car.mileage}
                        onChange={(e) =>
                          handleChange("mileage", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Prix (€)</Label>
                      <Input
                        type="number"
                        value={car.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Localisation</Label>
                      <Input
                        value={car.location || ""}
                        onChange={(e) =>
                          handleChange("location", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Téléphone (WhatsApp)</Label>
                      <Input
                        value={car.whatsappNumber || ""}
                        onChange={(e) =>
                          handleChange("whatsappNumber", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <Button variant="outline" onClick={() => history.back()}>
                      Annuler
                    </Button>
                    <Button
                      onClick={save}
                      disabled={saving}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      {saving ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
