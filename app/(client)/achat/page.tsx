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
import { Grid3X3, List } from "lucide-react";
import { useState } from "react";

const cars = [
  {
    id: "1",
    brand: "Kia",
    model: "Sportage",
    year: 2024,
    price: 20800,
    mileage: 750,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/car-service.png",
    category: "Convertible",
    condition: "sans-plaque" as const,
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 20800,
    mileage: 750,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/car-service.png",
    category: "Convertible",
    condition: "occasion" as const,
    addedDate: "2024-01-14",
  },
  {
    id: "3",
    brand: "Kia",
    model: "Optima",
    year: 2023,
    price: 20800,
    mileage: 750,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/car-service.png",
    category: "Convertible",
    condition: "occasion" as const,
    addedDate: "2024-01-13",
  },
  {
    id: "4",
    brand: "Nissan",
    model: "GT-R",
    year: 2024,
    price: 21800,
    mileage: 500,
    fuel: "Petrol",
    transmission: "Automatic",
    image: "/car-service.png",
    category: "Coupe",
    condition: "sans-plaque" as const,
    addedDate: "2024-01-12",
  },
  {
    id: "5",
    brand: "BMW",
    model: "Série 3",
    year: 2022,
    price: 35000,
    mileage: 15000,
    fuel: "Essence",
    transmission: "Automatic",
    image: "/car-service.png",
    category: "Sedan",
    condition: "occasion" as const,
    addedDate: "2024-01-11",
  },
  {
    id: "6",
    brand: "Audi",
    model: "A4",
    year: 2021,
    price: 28000,
    mileage: 25000,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/car-service.png",
    category: "SUV",
    condition: "occasion" as const,
    addedDate: "2024-01-10",
  },
];

export default function Achat() {
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
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
    priceRange: [10000, 100000],
    bodyTypes: [],
  });

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
                  Affichage de 1 - {cars.length} sur {cars.length} résultats
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
                      car={car}
                      formatPrice={formatPrice}
                      formatMileage={formatMileage}
                      getDaysAgo={getDaysAgo}
                    />
                  ) : (
                    <CarListCard
                      key={car.id}
                      car={car}
                      formatPrice={formatPrice}
                      formatMileage={formatMileage}
                      getDaysAgo={getDaysAgo}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
