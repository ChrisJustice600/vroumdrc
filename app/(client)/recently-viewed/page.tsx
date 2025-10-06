"use client";

import { CarGridCard } from "@/components/car-grid-card";
import { CarListCard } from "@/components/car-list-card";
import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { useRecentlyViewedStore } from "@/lib/stores/recentlyViewedStore";
import { Grid3X3, List } from "lucide-react";
import { useState } from "react";

export default function RecentlyViewedPage() {
  const { items, clear } = useRecentlyViewedStore();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage) + " km";
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "Hier" : `Il y a ${diffDays} jours`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Véhicules récemment consultés ({items.length})
            </h1>
            {items.length > 0 && (
              <Button
                onClick={clear}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Vider la liste
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <p className="text-lg mb-4">Aucun véhicule récemment consulté</p>
              <p className="text-sm">
                Les véhicules que vous consultez apparaîtront ici.
              </p>
            </div>
          ) : (
            <>
              {/* View Mode Toggle */}
              <div className="flex justify-end mb-6">
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid" ? "bg-[#a99df1] hover:bg-red-600" : ""
                    }
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list" ? "bg-[#a99df1] hover:bg-red-600" : ""
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Cars Grid/List */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                    : "space-y-4"
                }
              >
                {items.map((car) =>
                  viewMode === "grid" ? (
                    <CarGridCard
                      key={car.id}
                      car={{
                        id: car.id,
                        brand: car.brand,
                        model: car.model,
                        year: car.year,
                        price: car.price,
                        mileage: 0, // Not stored in recently viewed
                        fuel: "-",
                        transmission: "-",
                        image: car.image,
                        category: "",
                        condition: "occasion" as const,
                        addedDate: new Date(car.viewedAt).toISOString(),
                      }}
                      formatPrice={formatPrice}
                      formatMileage={formatMileage}
                      getDaysAgo={getDaysAgo}
                    />
                  ) : (
                    <CarListCard
                      key={car.id}
                      car={{
                        id: car.id,
                        brand: car.brand,
                        model: car.model,
                        year: car.year,
                        price: car.price,
                        mileage: 0,
                        fuel: "-",
                        transmission: "-",
                        image: car.image,
                        category: "",
                        condition: "occasion" as const,
                        addedDate: new Date(car.viewedAt).toISOString(),
                      }}
                      formatPrice={formatPrice}
                      formatMileage={formatMileage}
                      getDaysAgo={getDaysAgo}
                    />
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
