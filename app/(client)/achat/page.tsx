"use client";

export const dynamic = "force-dynamic";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Grid3X3, List, Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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
  views: number;
};

function AchatContent() {
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<DbCar[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
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

  // Forcer le mode grille sur mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewMode("grid");
      }
    };

    // Vérifier au chargement
    handleResize();

    // Écouter les changements de taille
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Appliquer les filtres de l'URL au chargement
  useEffect(() => {
    if (searchParams) {
      const urlFilters = {
        searchQuery: searchParams.get("search") || "",
        brand: searchParams.get("brand") || "",
        model: searchParams.get("model") || "",
        year: searchParams.get("year") || "",
        fuel: searchParams.get("fuel") || "",
        transmission: searchParams.get("transmission") || "",
        condition: searchParams.get("condition") || "",
        mileageRange: "",
        priceRange: [0, 1000000] as [number, number],
        bodyTypes: [],
      };

      // Appliquer les filtres de prix de l'URL
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      if (minPrice || maxPrice) {
        urlFilters.priceRange = [
          minPrice ? Number(minPrice) : 0,
          maxPrice ? Number(maxPrice) : 1000000,
        ];
        setPriceRange(urlFilters.priceRange);
      }

      // Appliquer le filtre de type de carrosserie
      const bodyType = searchParams.get("bodyType");
      if (bodyType) {
        setSelectedBodyTypes([bodyType]);
      }

      setFilters(urlFilters);

      // Afficher le message de bienvenue si des filtres sont appliqués
      if (
        urlFilters.searchQuery ||
        urlFilters.brand ||
        urlFilters.model ||
        urlFilters.condition
      ) {
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 3000);
      }
    }
  }, [searchParams]);

  // Charger les voitures selon les filtres/tri
  useEffect(() => {
    const controller = new AbortController();
    const fetchCars = async () => {
      try {
        setLoading(true);
        setLoadingProgress(0);

        // Animation de progression
        const progressInterval = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 80) {
              clearInterval(progressInterval);
              return 80;
            }
            return prev + Math.random() * 20;
          });
        }, 100);

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

        clearInterval(progressInterval);
        setLoadingProgress(100);

        // Délai pour l'effet visuel
        setTimeout(() => {
          setCars(data);
          setLoading(false);
          setInitialLoad(false);
          setLoadingProgress(0);
        }, 300);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") console.error(e);
        setLoading(false);
        setInitialLoad(false);
        setLoadingProgress(0);
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

  // Fonction pour supprimer un filtre
  const removeFilter = (filterType: string) => {
    switch (filterType) {
      case "search":
        setFilters((prev) => ({ ...prev, searchQuery: "" }));
        break;
      case "brand":
        setFilters((prev) => ({ ...prev, brand: "" }));
        break;
      case "model":
        setFilters((prev) => ({ ...prev, model: "" }));
        break;
      case "condition":
        setFilters((prev) => ({ ...prev, condition: "" }));
        break;
      case "price":
        setPriceRange([0, 1000000]);
        setFilters((prev) => ({ ...prev, priceRange: [0, 1000000] }));
        break;
      case "bodyType":
        setSelectedBodyTypes([]);
        break;
    }
  };

  // Fonction pour obtenir les filtres actifs
  const getActiveFilters = () => {
    const activeFilters = [];

    if (filters.searchQuery) {
      activeFilters.push({
        type: "search",
        label: `Recherche: "${filters.searchQuery}"`,
        value: filters.searchQuery,
      });
    }

    if (filters.brand) {
      activeFilters.push({
        type: "brand",
        label: `Marque: ${filters.brand}`,
        value: filters.brand,
      });
    }

    if (filters.model) {
      activeFilters.push({
        type: "model",
        label: `Modèle: ${filters.model}`,
        value: filters.model,
      });
    }

    if (filters.condition) {
      activeFilters.push({
        type: "condition",
        label: `Condition: ${filters.condition}`,
        value: filters.condition,
      });
    }

    if (priceRange[0] > 0 || priceRange[1] < 1000000) {
      activeFilters.push({
        type: "price",
        label: `Prix: ${formatPrice(priceRange[0])} - ${formatPrice(
          priceRange[1]
        )}`,
        value: `${priceRange[0]}-${priceRange[1]}`,
      });
    }

    if (selectedBodyTypes.length > 0) {
      activeFilters.push({
        type: "bodyType",
        label: `Type: ${selectedBodyTypes.join(", ")}`,
        value: selectedBodyTypes.join(","),
      });
    }

    return activeFilters;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Acheter une voiture au Congo Kinshasa",
            description:
              "Collection de voitures neuves et d'occasion disponibles à l'achat au Congo Kinshasa",
            url: "https://vroumdrc.com/achat",
            mainEntity: {
              "@type": "ItemList",
              name: "Voitures disponibles",
              numberOfItems: cars.length,
              itemListElement: cars.map((car, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Car",
                  name: `${car.brand} ${car.model} ${car.year}`,
                  brand: car.brand,
                  model: car.model,
                  vehicleModelDate: car.year,
                  offers: {
                    "@type": "Offer",
                    price: car.price,
                    priceCurrency: "USD",
                  },
                  url: `https://vroumdrc.com/car/${car.id}`,
                },
              })),
            },
          }),
        }}
      />
      <Navbar />
      <HeroAchat />

      {/* Message de bienvenue avec filtres */}
      {showWelcome && (
        <div className="bg-[#a99df1]/10 border border-[#3a3367]/20 rounded-lg mx-2 sm:mx-4 md:mx-8 lg:mx-16 p-3 sm:p-4 mb-4 md:mb-6 animate-in slide-in-from-top-2 duration-500">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#3a3367]/20 rounded-full p-1.5 sm:p-2 flex-shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a3367]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[#3a3367] font-semibold text-sm sm:text-base">
                Recherche appliquée avec succès !
              </h3>
              <p className="text-[#a99df1] text-xs sm:text-sm">
                Vos filtres ont été appliqués et les résultats sont affichés
                ci-dessous.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 md:pt-8">
        <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8">
          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-4">
            <Sheet
              open={isMobileFiltersOpen}
              onOpenChange={setIsMobileFiltersOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-[#3a3367]/20 text-[#3a3367] hover:bg-[#a99df1]/10"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                  {(filters.searchQuery ||
                    filters.brand ||
                    filters.condition ||
                    selectedBodyTypes.length > 0) && (
                    <span className="ml-2 bg-[#a99df1] text-white text-xs px-2 py-0.5 rounded-full">
                      {getActiveFilters().length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:w-96 overflow-y-auto p-0"
              >
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle>Filtres de recherche</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche de voiture
                  </SheetDescription>
                </SheetHeader>
                <div className="px-6 pb-6">
                  <FiltersSidebar
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    selectedBodyTypes={selectedBodyTypes}
                    onBodyTypeChange={handleBodyTypeChange}
                    onFiltersChange={setFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-4 lg:gap-8">
            {/* Desktop Sidebar Filters - Hidden on mobile */}
            <div className="hidden lg:block">
              <FiltersSidebar
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedBodyTypes={selectedBodyTypes}
                onBodyTypeChange={handleBodyTypeChange}
                onFiltersChange={setFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Active Filters */}
              {getActiveFilters().length > 0 && (
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      Filtres appliqués
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFilters({
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
                        setPriceRange([0, 1000000]);
                        setSelectedBodyTypes([]);
                      }}
                      className="text-[#3a3367] border-[#3a3367]/20 hover:bg-[#a99df1]/10 w-full sm:w-auto"
                    >
                      Effacer tout
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getActiveFilters().map((filter, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#3a3367]/10 text-[#3a3367] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium animate-in fade-in-0 slide-in-from-top-2 duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="truncate max-w-[150px] sm:max-w-none">
                          {filter.label}
                        </span>
                        <button
                          onClick={() => removeFilter(filter.type)}
                          className="hover:bg-[#3a3367]/20 rounded-full p-0.5 sm:p-1 transition-all duration-200 hover:scale-110 flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Header avec loader */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-[#3a3367]" />
                      <span className="text-sm sm:text-base text-gray-600">
                        Recherche en cours...
                      </span>
                      {loadingProgress > 0 && (
                        <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#3a3367] h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      Affichage de 1 - {cars.length} sur {cars.length} résultats
                      {getActiveFilters().length > 0 && (
                        <span className="ml-1 sm:ml-2 text-[#3a3367] font-medium">
                          (Filtrés)
                        </span>
                      )}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                    <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                      Trier par :
                    </span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-48 h-9 text-xs sm:text-sm">
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

                  {/* View Mode Toggle - Hidden on mobile (< 640px) */}
                  <div className="hidden sm:flex border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={
                        viewMode === "grid"
                          ? "bg-[#a99df1] hover:bg-[#2a2547]"
                          : ""
                      }
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list"
                          ? "bg-[#3a3367] hover:bg-[#2a2547]"
                          : ""
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
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                      : "space-y-3 sm:space-y-4"
                  }
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-sm shadow-lg border border-gray-100 overflow-hidden animate-pulse"
                    >
                      <div className="relative">
                        <Skeleton className="h-64 w-full" />
                        <div className="absolute top-4 right-4">
                          <Skeleton className="h-6 w-12 rounded-full" />
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="text-center">
                            <Skeleton className="h-8 w-full mb-1" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                          <div className="text-center">
                            <Skeleton className="h-8 w-full mb-1" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                          <div className="text-center">
                            <Skeleton className="h-8 w-full mb-1" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : loading ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                      : "space-y-3 sm:space-y-4"
                  }
                >
                  {Array.from({ length: Math.max(cars.length, 3) }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-sm shadow-lg border border-gray-100 overflow-hidden animate-pulse"
                      >
                        <div className="relative">
                          <Skeleton className="h-64 w-full" />
                          <div className="absolute top-4 right-4">
                            <Skeleton className="h-6 w-12 rounded-full" />
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                          <Skeleton className="h-4 w-20" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-12" />
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center">
                              <Skeleton className="h-8 w-full mb-1" />
                              <Skeleton className="h-3 w-full" />
                            </div>
                            <div className="text-center">
                              <Skeleton className="h-8 w-full mb-1" />
                              <Skeleton className="h-3 w-full" />
                            </div>
                            <div className="text-center">
                              <Skeleton className="h-8 w-full mb-1" />
                              <Skeleton className="h-3 w-full" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : cars.length === 0 ? (
                <div className="text-center py-12 md:py-16 px-4 text-gray-600">
                  <p className="text-sm md:text-base">
                    Aucun résultat pour ces filtres.
                  </p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                      : "space-y-3 sm:space-y-4"
                  }
                >
                  {cars.map((car, index) =>
                    viewMode === "grid" ? (
                      <div
                        key={car.id}
                        className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CarGridCard
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
                            views: car.views,
                          }}
                          formatPrice={formatPrice}
                          formatMileage={formatMileage}
                          getDaysAgo={getDaysAgo}
                        />
                      </div>
                    ) : (
                      <div
                        key={car.id}
                        className="animate-in fade-in-0 slide-in-from-left-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CarListCard
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
                            views: car.views,
                          }}
                          formatPrice={formatPrice}
                          formatMileage={formatMileage}
                          getDaysAgo={getDaysAgo}
                        />
                      </div>
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

export default function Achat() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AchatContent />
    </Suspense>
  );
}
