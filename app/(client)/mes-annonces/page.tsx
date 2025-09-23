"use client";

import { Navbar } from "@/components/navbar/navbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMyCarsStore, type MyCar } from "@/lib/stores/myCarsStore";
import { useSessionUser } from "@/lib/useSessionUser";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MesAnnoncesPage() {
  const { user, loading: loadingUser } = useSessionUser();
  const { cars, loading, refetch, updateCar, removeCar, setCars } =
    useMyCarsStore();
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<MyCar | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loadingUser && user) {
      refetch();
    }
  }, [user, loadingUser, refetch]);

  const markSold = async (id: string) => {
    try {
      setMarkingId(id);
      const res = await fetch(`/api/cars/${id}/mark-sold`, { method: "POST" });
      if (!res.ok) {
        toast.error("Impossible de marquer comme vendu");
        return;
      }
      toast.success("Annonce marquée comme vendue");
      await refetch();
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setMarkingId(null);
    }
  };

  const openEdit = (car: MyCar) => {
    setEditing({ ...car });
    setEditOpen(true);
  };

  const [saving, setSaving] = useState(false);
  const saveEdit = async () => {
    if (!editing) return;
    try {
      setSaving(true);
      const payload = {
        title: editing.title,
        description: (editing as any).description ?? null,
        brand: editing.brand,
        model: editing.model,
        year: Number(editing.year),
        mileage: Number((editing as any).mileage ?? 0),
        price: Number(editing.price),
        location: editing.location ?? null,
        whatsappNumber: editing.whatsappNumber ?? null,
        images: editing.images ?? [],
        status: editing.isActive ? "ACTIVE" : "SOLD",
      };
      console.log("[edit] PUT payload", payload);
      const res = await fetch(`/api/cars/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      console.log("[edit] PUT status", res.status, res.statusText);
      if (!res.ok) {
        const txt = await res.text();
        console.error("[edit] PUT error body", txt);
        try {
          const err = JSON.parse(txt);
          throw new Error(err?.error || txt || "fail");
        } catch {
          throw new Error(txt || "fail");
        }
      }
      const updated = (await res.json()) as MyCar;
      console.log("[edit] PUT updated", updated);
      updateCar(updated);
      toast.success("Annonce mise à jour");
      setEditOpen(false);
    } catch {
      toast.error("Échec de mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (car: MyCar) => {
    setEditing(car);
    setDeleteOpen(true);
  };

  const doDelete = async () => {
    if (!editing) return;
    try {
      const res = await fetch(`/api/cars/${editing.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("fail");
      removeCar(editing.id);
      toast.success("Annonce supprimée");
    } catch {
      toast.error("Suppression échouée");
    } finally {
      setDeleteOpen(false);
      setEditing(null);
    }
  };

  const updateStatus = async (
    car: MyCar,
    status: "ACTIVE" | "SOLD" | "CANCELLED"
  ) => {
    try {
      setStatusUpdatingId(car.id);
      const res = await fetch(`/api/cars/${car.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Erreur mise à jour statut");
      }
      const updated = (await res.json()) as MyCar;
      updateCar(updated);
      toast.success("Statut mis à jour");
    } catch {
      toast.error("Échec mise à jour du statut");
    } finally {
      setStatusUpdatingId(null);
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
                  <Link href={`/car/${car.id}`} className="block">
                    <div className="relative h-48 w-full bg-gray-100 cursor-pointer">
                      <Image
                        src={car.images?.[0] || "/car-service.png"}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover"
                      />
                      <span
                        className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded-sm ${
                          car.status === "ACTIVE"
                            ? "bg-green-600"
                            : car.status === "SOLD"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                        }`}
                      >
                        {car.status === "ACTIVE"
                          ? "Activé"
                          : car.status === "SOLD"
                            ? "Vendu"
                            : "Suspendu"}
                      </span>
                    </div>
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {car.title || `${car.brand} ${car.model} ${car.year}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-3">
                    <div className="text-red-600 font-bold text-xl">
                      {new Intl.NumberFormat("fr-FR").format(car.price)} $
                    </div>
                    <div className="flex gap-2 items-center">
                      <Select
                        value={(car.status as string) || "ACTIVE"}
                        onValueChange={(v) =>
                          updateStatus(
                            car,
                            v as "ACTIVE" | "SOLD" | "CANCELLED"
                          )
                        }
                        disabled={statusUpdatingId === car.id}
                      >
                        <SelectTrigger
                          className="w-40"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Activé</SelectItem>
                          <SelectItem value="SOLD">Vendu</SelectItem>
                          <SelectItem value="CANCELLED">Suspendu</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(car);
                        }}
                        className="border-gray-300"
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(car);
                        }}
                        className="border-red-200 text-red-600"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'annonce</DialogTitle>
          </DialogHeader>
          {editing ? (
            <div className="space-y-3">
              <Input
                value={editing.title || ""}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                placeholder="Titre"
              />
              <Textarea
                value={
                  (editing as unknown as { description?: string })
                    .description || ""
                }
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    description: e.target.value,
                  } as unknown as MyCar)
                }
                rows={4}
                placeholder="Description"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  value={editing.brand}
                  onChange={(e) =>
                    setEditing({ ...editing, brand: e.target.value })
                  }
                  placeholder="Marque"
                />
                <Input
                  value={editing.model}
                  onChange={(e) =>
                    setEditing({ ...editing, model: e.target.value })
                  }
                  placeholder="Modèle"
                />
                <Input
                  type="number"
                  value={editing.year}
                  onChange={(e) =>
                    setEditing({ ...editing, year: Number(e.target.value) })
                  }
                  placeholder="Année"
                />
                <Input
                  type="number"
                  value={(editing.mileage ?? 0) as number}
                  onChange={(e) =>
                    setEditing({ ...editing, mileage: Number(e.target.value) })
                  }
                  placeholder="Kilométrage"
                />
                <Input
                  type="number"
                  value={editing.price}
                  onChange={(e) =>
                    setEditing({ ...editing, price: Number(e.target.value) })
                  }
                  placeholder="Prix"
                />
                <Input
                  value={editing.location || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, location: e.target.value })
                  }
                  placeholder="Localisation"
                />
                <Input
                  value={editing.whatsappNumber || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, whatsappNumber: e.target.value })
                  }
                  placeholder="Téléphone WhatsApp"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setEditOpen(false)}>
                  Annuler
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={saveEdit}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <Skeleton className="h-20" />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'annonce ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'annonce sera définitivement
              supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={doDelete}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Modals appended at end of file to avoid cluttering main JSX
function Modals() {
  return null;
}
