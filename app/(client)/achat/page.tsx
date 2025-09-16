"use client";

import CarCard from "@/components/CarCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Car, api } from "@/lib/mockData";
import { Filter, Grid, List } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BuyPage() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      try {
        // Get filters from URL params
        const filters: any = {};
        if (searchParams.get("brand"))
          filters.brand = searchParams.get("brand");
        if (searchParams.get("model"))
          filters.model = searchParams.get("model");
        if (searchParams.get("location"))
          filters.location = searchParams.get("location");
        if (searchParams.get("minPrice"))
          filters.minPrice = parseInt(searchParams.get("minPrice")!);
        if (searchParams.get("maxPrice"))
          filters.maxPrice = parseInt(searchParams.get("maxPrice")!);

        const carsData = await api.getCars(filters);
        setCars(carsData);
      } catch (error) {
        console.error("Erreur lors du chargement des voitures:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [searchParams]);

  const handleSearch = (filters: any) => {
    setLoading(true);

    // Update URL with new filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.append(key, value as string);
      }
    });

    // Update URL without page reload
    const newUrl = `/buy${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.pushState({}, "", newUrl);

    // Load cars with new filters
    const searchFilters: any = {};
    if (filters.brand) searchFilters.brand = filters.brand;
    if (filters.model) searchFilters.model = filters.model;
    if (filters.location) searchFilters.location = filters.location;
    if (filters.minPrice) searchFilters.minPrice = parseInt(filters.minPrice);
    if (filters.maxPrice) searchFilters.maxPrice = parseInt(filters.maxPrice);

    api.getCars(searchFilters).then((carsData) => {
      setCars(carsData);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Parcourir les voitures
          </h1>
          <p className="text-lg text-gray-600">
            Trouvez votre voiture parfaite parmi nos vendeurs vérifiés
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {loading ? "Chargement..." : `${cars.length} voitures trouvées`}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>

            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg h-80 animate-pulse"
              ></div>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune voiture trouvée
            </h3>
            <p className="text-gray-600">
              Essayez d'ajuster vos filtres de recherche pour voir plus de
              résultats.
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2"
            }`}
          >
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
