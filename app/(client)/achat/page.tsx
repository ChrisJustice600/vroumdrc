"use client";

import { CarGridCard } from "@/components/car-grid-card";
import { CarListCard } from "@/components/car-list-card";
import { FiltersSidebar } from "@/components/filters-sidebar";
import { HeroAchat } from "@/components/hero-achat";
import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3X3, List } from "lucide-react";
import { useEffect, useState } from "react";

type DbCar = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string | null;
  transmission: string | null;
  images: string[];
  condition: string | null;
  createdAt: string;
};

export default function Achat() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<DbCar[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [filters, setFilters] = useState<{
    searchQuery: string;
    brand: string;
    model: string;
    year: string;
    fuel: string;
    transmission: string;
    condition: string;
    mileageRange: string;
    priceRange: [number, number];
    bodyTypes: string[];
  }>({
    searchQuery: "",
    brand: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    condition: "",
    mileageRange: "",
    priceRange: [0, 1000000],
    bodyTypes: [],
  });

  // Charger les voitures selon les filtres/tri
  useEffect(() => {
    const controller = new AbortController();
    const fetchCars = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.searchQuery) params.set("search", filters.searchQuery);
        if (filters.brand) params.set("brand", filters.brand);
        if (filters.model) params.set("model", filters.model);
        if (filters.year) params.set("year", filters.year);
        if (filters.fuel) params.set("fuel", filters.fuel);
        if (filters.transmission)
          params.set("transmission", filters.transmission);
        if (filters.condition) params.set("condition", filters.condition);
        if (filters.priceRange?.[0] && filters.priceRange[0] > 0)
          params.set("minPrice", String(filters.priceRange[0]));
        if (filters.priceRange?.[1] && filters.priceRange[1] < 1000000)
          params.set("maxPrice", String(filters.priceRange[1]));
        if (filters.mileageRange) {
          const [min, max] = filters.mileageRange.split("-").map(Number);
          if (min !== undefined) params.set("minMileage", String(min));
          if (max !== undefined) params.set("maxMileage", String(max));
        }
        // bodyTypes pourrait mapper sur bodyType unique côté API
        if (selectedBodyTypes[0]) params.set("bodyType", selectedBodyTypes[0]);
        if (sortBy) params.set("sortBy", sortBy);

        const res = await fetch(`/api/cars?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Échec chargement voitures");
        const data = (await res.json()) as DbCar[];
        setCars(data);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };
    fetchCars();
    return () => controller.abort();
  }, [filters, selectedBodyTypes, sortBy]);

  const handleBodyTypeChange = (bodyType: string, checked: boolean) => {
    if (checked) {
      setSelectedBodyTypes([...selectedBodyTypes, bodyType]);
    } else {
      setSelectedBodyTypes(
        selectedBodyTypes.filter((type) => type !== bodyType)
      );
    }
  };

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
      <HeroAchat />

      <div className="pt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <FiltersSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedBodyTypes={selectedBodyTypes}
              onBodyTypeChange={handleBodyTypeChange}
              onFiltersChange={setFilters}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {loading
                    ? "Chargement..."
                    : `Affichage de 1 - ${cars.length} sur ${cars.length} résultats`}
                  {Object.keys(filters).length > 0 && (
                    <span className="ml-2 text-red-600 font-medium">
                      (Filtrés)
                    </span>
                  )}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Trier par :</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">
                          Date : plus récent
                        </SelectItem>
                        <SelectItem value="oldest">
                          Date : plus ancien
                        </SelectItem>
                        <SelectItem value="price-low">
                          Prix : croissant
                        </SelectItem>
                        <SelectItem value="price-high">
                          Prix : décroissant
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={
                        viewMode === "grid" ? "bg-red-500 hover:bg-red-600" : ""
                      }
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list" ? "bg-red-500 hover:bg-red-600" : ""
                      }
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Car Grid/List */}
              {loading && initialLoad ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-4"
                  }
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-sm shadow-lg border border-gray-100 overflow-hidden"
                    >
                      <Skeleton className="h-64 w-full" />
                      <div className="p-4 space-y-3">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24" />
                        <div className="grid grid-cols-3 gap-4">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : loading ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-4"
                  }
                >
                  {Array.from({ length: Math.max(cars.length, 3) }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-sm shadow-lg border border-gray-100 overflow-hidden"
                      >
                        <Skeleton className="h-64 w-full" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-6 w-28" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : cars.length === 0 ? (
                <div className="text-center py-16 text-gray-600">
                  Aucun résultat pour ces filtres.
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-4"
                  }
                >
                  {cars.map((car) =>
                    viewMode === "grid" ? (
                      <CarGridCard
                        key={car.id}
                        car={{
                          id: car.id,
                          brand: car.brand,
                          model: car.model,
                          year: car.year,
                          price: car.price,
                          mileage: car.mileage,
                          fuel: car.fuel || "-",
                          transmission: car.transmission || "-",
                          image: car.images?.[0] || "/car-service.png",
                          category: "",
                          condition: (car.condition === "OCCASION"
                            ? "occasion"
                            : "sans-plaque") as "occasion" | "sans-plaque",
                          addedDate: car.createdAt,
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
                          mileage: car.mileage,
                          fuel: car.fuel || "-",
                          transmission: car.transmission || "-",
                          image: car.images?.[0] || "/car-service.png",
                          category: "",
                          condition: (car.condition === "OCCASION"
                            ? "occasion"
                            : "sans-plaque") as "occasion" | "sans-plaque",
                          addedDate: car.createdAt,
                        }}
                        formatPrice={formatPrice}
                        formatMileage={formatMileage}
                        getDaysAgo={getDaysAgo}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
