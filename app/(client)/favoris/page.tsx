"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavoritesStore } from "@/lib/stores/favoritesStore";
import Image from "next/image";
import Link from "next/link";

export default function FavorisPage() {
  const { items, remove, clear } = useFavoritesStore();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Mes favoris</h1>
            {items.length > 0 && (
              <button
                onClick={clear}
                className="text-sm text-red-600 hover:underline"
              >
                Vider la liste
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center text-gray-600">
              Aucun favori pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((c) => (
                <Card key={c.id} className="overflow-hidden">
                  <Link href={`/car/${c.id}`} className="block">
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image
                        src={c.image}
                        alt={`${c.brand} ${c.model}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {c.brand} {c.model} {c.year}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-red-600 font-bold">
                      {new Intl.NumberFormat("fr-FR").format(c.price)} €
                    </div>
                    <button
                      onClick={() => remove(c.id)}
                      className="text-sm text-gray-600 hover:text-red-600"
                    >
                      Retirer
                    </button>
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
