"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Car,
  ChevronDown,
  DollarSign,
  Filter,
  Loader2,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Données mockées pour les filtres
const mockData = {
  brands: [
    "BMW",
    "Audi",
    "Mercedes",
    "Volkswagen",
    "Toyota",
    "Honda",
    "Nissan",
    "Ford",
    "Peugeot",
    "Renault",
    "Kia",
    "Hyundai",
    "Mazda",
    "Opel",
    "Citroën",
    "Jeep",
  ],
  models: [
    "Série 3",
    "A4",
    "Classe C",
    "Golf",
    "Corolla",
    "Civic",
    "Qashqai",
    "Focus",
    "308",
    "Clio",
    "Sportage",
    "Tucson",
    "CX-5",
    "Astra",
    "C3",
    "Compass",
  ],
  priceRanges: [
    { label: "Moins de 5 000 €", value: [0, 5000] },
    { label: "5 000 - 10 000 €", value: [5000, 10000] },
    { label: "10 000 - 20 000 €", value: [10000, 20000] },
    { label: "20 000 - 50 000 €", value: [20000, 50000] },
    { label: "Plus de 50 000 €", value: [50000, 1000000] },
  ],
};

interface SearchFilters {
  searchQuery: string;
  brand: string;
  model: string;
  priceRange: string;
  condition: string;
}

export function CarSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchQuery: "",
    brand: "",
    model: "",
    priceRange: "",
    condition: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);

  const tabs = [
    { id: "all", label: "Toutes les voitures", icon: Car },
    { id: "new", label: "Voitures neuves", icon: Car },
    { id: "used", label: "Voitures d'occasion", icon: Car },
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchProgress(0);

    // Animation de progression
    const progressInterval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    // Construire les paramètres de recherche
    const params = new URLSearchParams();

    if (searchFilters.searchQuery) {
      params.set("search", searchFilters.searchQuery);
    }

    if (searchFilters.brand) {
      params.set("brand", searchFilters.brand);
    }

    if (searchFilters.model) {
      params.set("model", searchFilters.model);
    }

    if (searchFilters.priceRange) {
      const priceRange = mockData.priceRanges.find(
        (p) => p.label === searchFilters.priceRange
      );
      if (priceRange) {
        params.set("minPrice", String(priceRange.value[0]));
        params.set("maxPrice", String(priceRange.value[1]));
      }
    }

    // Appliquer le filtre de condition selon l'onglet actif
    if (activeTab === "new") {
      params.set("condition", "Neuf");
    } else if (activeTab === "used") {
      params.set("condition", "Occasion");
    }

    // Navigation vers la page d'achat avec les filtres
    const searchParams = params.toString();

    // Simulation d'un délai de traitement
    setTimeout(() => {
      clearInterval(progressInterval);
      setSearchProgress(100);

      setTimeout(() => {
        router.push(`/achat${searchParams ? `?${searchParams}` : ""}`);
        setIsSearching(false);
        setSearchProgress(0);
      }, 200);
    }, 800);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Mettre à jour la condition automatiquement
    if (tabId === "new") {
      handleFilterChange("condition", "Neuf");
    } else if (tabId === "used") {
      handleFilterChange("condition", "Occasion");
    } else {
      handleFilterChange("condition", "");
    }
  };

  return (
    <div className="relative -mt-6 mx-4 md:mx-8 lg:mx-16 z-20">
      <div className="bg-white rounded-tl-sm shadow-2xl border border-gray-100">
        {/* Tabs */}
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-4 font-semibold text-sm rounded-tl-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-b-sm px-8 py-6 shadow-2xl">
        {/* Search Bar */}
        <div className="mb-4">
          <Input
            placeholder="Rechercher par marque, modèle, ville..."
            value={searchFilters.searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            className="w-full h-12 text-lg bg-white border-2 border-gray-200 focus:border-red-500 rounded-lg px-4"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Brand Filter */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full bg-white rounded-sm px-4 py-4 text-left text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105">
                <div className="flex items-center gap-3">
                  <Filter className="h-4 w-4 text-red-600" />
                  <span className="text-sm">
                    {searchFilters.brand || "Choisir la marque"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Choisir la marque</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => handleFilterChange("brand", "")}
                  className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                    !searchFilters.brand ? "bg-red-50 text-red-600" : ""
                  }`}
                >
                  Toutes les marques
                </button>
                {mockData.brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleFilterChange("brand", brand)}
                    className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                      searchFilters.brand === brand
                        ? "bg-red-50 text-red-600"
                        : ""
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Model Filter */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full bg-white rounded-sm px-4 py-4 text-left text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105">
                <div className="flex items-center gap-3">
                  <Filter className="h-4 w-4 text-red-600" />
                  <span className="text-sm">
                    {searchFilters.model || "Choisir le modèle"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Choisir le modèle</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => handleFilterChange("model", "")}
                  className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                    !searchFilters.model ? "bg-red-50 text-red-600" : ""
                  }`}
                >
                  Tous les modèles
                </button>
                {mockData.models.map((model) => (
                  <button
                    key={model}
                    onClick={() => handleFilterChange("model", model)}
                    className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                      searchFilters.model === model
                        ? "bg-red-50 text-red-600"
                        : ""
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Price Filter */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full bg-white rounded-sm px-4 py-4 text-left text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-red-600" />
                  <span className="text-sm">
                    {searchFilters.priceRange || "Prix"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Choisir le prix</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <button
                  onClick={() => handleFilterChange("priceRange", "")}
                  className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                    !searchFilters.priceRange ? "bg-red-50 text-red-600" : ""
                  }`}
                >
                  Tous les prix
                </button>
                {mockData.priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      handleFilterChange("priceRange", range.label)
                    }
                    className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                      searchFilters.priceRange === range.label
                        ? "bg-red-50 text-red-600"
                        : ""
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Search Button */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-6 rounded-sm flex items-center justify-center gap-3 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="relative z-10">RECHERCHE...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    RECHERCHER
                  </>
                )}

                {/* Barre de progression */}
                {isSearching && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300 ease-out"
                    style={{ width: `${searchProgress}%` }}
                  />
                )}
              </Button>

              {/* Overlay de chargement */}
              {isSearching && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-sm flex items-center justify-center">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchFilters.brand ||
          searchFilters.model ||
          searchFilters.priceRange ||
          activeTab !== "all") && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-white text-sm">Filtres actifs:</span>
            {activeTab !== "all" && (
              <span className="bg-white text-red-600 px-2 py-1 rounded text-xs">
                {tabs.find((t) => t.id === activeTab)?.label}
              </span>
            )}
            {searchFilters.brand && (
              <span className="bg-white text-red-600 px-2 py-1 rounded text-xs">
                Marque: {searchFilters.brand}
              </span>
            )}
            {searchFilters.model && (
              <span className="bg-white text-red-600 px-2 py-1 rounded text-xs">
                Modèle: {searchFilters.model}
              </span>
            )}
            {searchFilters.priceRange && (
              <span className="bg-white text-red-600 px-2 py-1 rounded text-xs">
                {searchFilters.priceRange}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
