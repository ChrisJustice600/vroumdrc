"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { carBrands } from "@/lib/mockData";
import { DollarSign, MapPin, Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (filters: {
    brand: string;
    model: string;
    location: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10 max-w-6xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Trouvez votre voiture parfaite
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Brand */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Marque</label>
          <Select
            value={filters.brand}
            onValueChange={(value) => handleFilterChange("brand", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes marques" />
            </SelectTrigger>
            <SelectContent>
              {carBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Modèle</label>
          <Input
            placeholder="Tous modèles"
            value={filters.model}
            onChange={(e) => handleFilterChange("model", e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Localisation
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Ville, Région"
              className="pl-10"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Fourchette de prix
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Min"
                className="pl-8"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Max"
                className="pl-8"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 opacity-0">
            Recherche
          </label>
          <Button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Rechercher des voitures</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
