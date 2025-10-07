"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  years: Array.from({ length: 15 }, (_, i) => 2024 - i),
  fuelTypes: ["Essence", "Diesel", "Hybride", "Électrique", "GPL"],
  transmissions: ["Manuelle", "Automatique", "Semi-automatique"],
  bodyTypes: [
    "Berline",
    "SUV",
    "Break",
    "Coupé",
    "Cabriolet",
    "Monospace",
    "Pick-up",
    "Utilitaire",
    "Convertible",
    "Sedan",
  ],
  conditions: ["Occasion", "Sans plaque", "Reconditionné", "Neuf"],
  mileageRanges: [
    { label: "Moins de 10 000 km", value: [0, 10000] },
    { label: "10 000 - 50 000 km", value: [10000, 50000] },
    { label: "50 000 - 100 000 km", value: [50000, 100000] },
    { label: "Plus de 100 000 km", value: [100000, 500000] },
  ],
};

interface FilterState {
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
}

interface FiltersSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  selectedBodyTypes: string[];
  onBodyTypeChange: (bodyType: string, checked: boolean) => void;
  onFiltersChange: (filters: FilterState) => void;
}

export function FiltersSidebar({
  priceRange,
  onPriceRangeChange,
  selectedBodyTypes,
  onBodyTypeChange,
  onFiltersChange,
}: FiltersSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedMileageRange, setSelectedMileageRange] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedFuel("");
    setSelectedTransmission("");
    setSelectedCondition("");
    setSelectedMileageRange("");
    onPriceRangeChange([0, 1000000]);
    onBodyTypeChange("", false);
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedBrand) count++;
    if (selectedModel) count++;
    if (selectedYear) count++;
    if (selectedFuel) count++;
    if (selectedTransmission) count++;
    if (selectedCondition) count++;
    if (selectedMileageRange) count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 1000000) count++;
    if (selectedBodyTypes.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange({
      searchQuery,
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      fuel: selectedFuel,
      transmission: selectedTransmission,
      condition: selectedCondition,
      mileageRange: selectedMileageRange,
      priceRange,
      bodyTypes: selectedBodyTypes,
    });
  }, [
    searchQuery,
    selectedBrand,
    selectedModel,
    selectedYear,
    selectedFuel,
    selectedTransmission,
    selectedCondition,
    selectedMileageRange,
    priceRange,
    selectedBodyTypes,
    onFiltersChange,
  ]);

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg p-4 sm:p-6 h-fit lg:sticky lg:top-24">
      {/* Header with toggle and reset */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Filtres
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-[#a99df1] text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </h2>
        <div className="flex gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
            >
              <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 text-xs sm:text-sm h-8 px-2 sm:px-3"
          >
            {isExpanded ? "Masquer" : "Afficher"}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 sm:space-y-6">
          {/* Search */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Recherche
            </label>
            <div className="relative">
              <Input
                placeholder="Marque, modèle, ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-9 sm:h-10 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Prix ($)
            </label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={onPriceRangeChange}
                max={1000000}
                min={0}
                step={1000}
                className="mb-3 sm:mb-4"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                <span>
                  {priceRange[0] === 0
                    ? "0 $"
                    : priceRange[0].toLocaleString() + " $"}
                </span>
                <span>
                  {priceRange[1] >= 1000000
                    ? "Max $"
                    : priceRange[1].toLocaleString() + " $"}
                </span>
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Marque
            </label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Toutes les marques" />
              </SelectTrigger>
              <SelectContent>
                {mockData.brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Modèle
            </label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Tous les modèles" />
              </SelectTrigger>
              <SelectContent>
                {mockData.models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Année
            </label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Toutes les années" />
              </SelectTrigger>
              <SelectContent>
                {mockData.years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fuel Type Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Carburant
            </label>
            <Select value={selectedFuel} onValueChange={setSelectedFuel}>
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Tous les carburants" />
              </SelectTrigger>
              <SelectContent>
                {mockData.fuelTypes.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transmission Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Transmission
            </label>
            <Select
              value={selectedTransmission}
              onValueChange={setSelectedTransmission}
            >
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Toutes les transmissions" />
              </SelectTrigger>
              <SelectContent>
                {mockData.transmissions.map((transmission) => (
                  <SelectItem key={transmission} value={transmission}>
                    {transmission}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              État
            </label>
            <Select
              value={selectedCondition}
              onValueChange={setSelectedCondition}
            >
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Tous les états" />
              </SelectTrigger>
              <SelectContent>
                {mockData.conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mileage Range Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Kilométrage
            </label>
            <Select
              value={selectedMileageRange}
              onValueChange={setSelectedMileageRange}
            >
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Tous les kilométrages" />
              </SelectTrigger>
              <SelectContent>
                {mockData.mileageRanges.map((range, index) => (
                  <SelectItem key={index} value={range.value.join("-")}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Body Type Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
              Carrosserie
            </label>
            <div className="space-y-2 max-h-48 sm:max-h-32 overflow-y-auto">
              {mockData.bodyTypes.map((bodyType) => (
                <div key={bodyType} className="flex items-center space-x-2">
                  <Checkbox
                    id={bodyType}
                    checked={selectedBodyTypes.includes(bodyType)}
                    onCheckedChange={(checked) =>
                      onBodyTypeChange(bodyType, checked as boolean)
                    }
                    className="data-[state=checked]:bg-[#a99df1] data-[state=checked]:border-[#a99df1]"
                  />
                  <label
                    htmlFor={bodyType}
                    className="text-xs sm:text-sm text-gray-700 cursor-pointer flex-1"
                  >
                    {bodyType}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
