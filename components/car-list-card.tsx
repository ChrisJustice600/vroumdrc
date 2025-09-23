"use client";

import {
  ArrowRight,
  Fuel,
  Gauge,
  Heart,
  RotateCcw,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  category: string;
  condition: "occasion" | "sans-plaque";
  addedDate: string;
}

interface CarListCardProps {
  car: Car;
  formatPrice: (price: number) => string;
  formatMileage: (mileage: number) => string;
  getDaysAgo: (dateString: string) => string;
}

export function CarListCard({
  car,
  formatPrice,
  formatMileage,
  getDaysAgo,
}: CarListCardProps) {
  return (
    <div className="bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-row h-64">
      {/* Image Section - 50% width, touches top, bottom, left */}
      <div className="relative w-1/2 h-full bg-gray-100">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-sm">
            {car.condition === "occasion" ? "Occasion" : "Sans plaque"}
          </span>
        </div>
        {/* Date Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-sm">
            Ajouté {getDaysAgo(car.addedDate)}
          </span>
        </div>
        {/* Action Icons */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
            <Heart className="w-4 h-4 text-red-500" />
          </button>
          <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
            <RotateCcw className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Content Section - 50% width */}
      <div className="flex flex-col w-1/2">
        {/* Price */}

        <div className="p-4">
          <div className="text-2xl font-bold text-red-500 mb-2">
            {formatPrice(car.price)}
          </div>

          {/* Brand & Model */}
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {car.brand} {car.model} {car.year} VTi Prosmatec 1.8 i-VTEC
          </h3>

          {/* Specifications Grid */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Fuel className="w-5 h-5 text-gray-400 mb-1" />
                <div className="text-xs text-gray-500">carburant</div>
                <div className="text-sm font-medium text-gray-900">
                  {car.fuel}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Gauge className="w-5 h-5 text-gray-400 mb-1" />
                <div className="text-xs text-gray-500">Kilométrage</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatMileage(car.mileage)}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Settings className="w-5 h-5 text-gray-400 mb-1" />
                <div className="text-xs text-gray-500">Transmission</div>
                <div className="text-sm font-medium text-gray-900">
                  {car.transmission}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Button
            className="w-full bg-gray-100 hover:bg-red-600 hover:text-white text-gray-900 py-3 rounded-none font-medium flex items-center justify-center"
            onClick={() => (window.location.href = `/car/${car.id}`)}
          >
            VOIR LES DETAILS
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* View Details Button - Full width, touching edges */}
    </div>
  );
}
