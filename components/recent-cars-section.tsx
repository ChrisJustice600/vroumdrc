"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Fuel,
  Gauge,
  Heart,
  RotateCcw,
  Settings,
} from "lucide-react";
import Image from "next/image";

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
}

// Données mockées pour les voitures récentes
const recentCars: Car[] = [
  {
    id: "1",
    brand: "Honda",
    model: "Civic",
    year: 2007,
    price: 35900,
    mileage: 45,
    fuel: "Gasoline",
    transmission: "Automatic",
    image: "/car-service.png",
    category: "Sedan",
    condition: "occasion",
  },
  {
    id: "2",
    brand: "BMW",
    model: "Série 3",
    year: 2022,
    price: 35000,
    mileage: 15000,
    fuel: "Essence",
    transmission: "Automatic",
    image: "/car-service.png",
    category: "Sedan",
    condition: "occasion",
  },
  {
    id: "3",
    brand: "Audi",
    model: "A4",
    year: 2021,
    price: 28000,
    mileage: 25000,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/car-service.png",
    category: "SUV",
    condition: "occasion",
  },
  {
    id: "4",
    brand: "Mercedes",
    model: "Classe C",
    year: 2023,
    price: 42000,
    mileage: 8000,
    fuel: "Hybride",
    transmission: "Automatic",
    image: "/car-service.png",
    category: "Luxury",
    condition: "sans-plaque",
  },
];

export function RecentCarsSection() {
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Voitures récemment ajoutées
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les dernières voitures mises en vente par nos vendeurs
            vérifiés
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {recentCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-64 bg-gray-100">
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
                {/* Action Icons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Heart className="w-4 h-4 text-red-500" />
                  </button>
                  <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                    <RotateCcw className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Price */}
                <div className="text-2xl font-bold text-red-500 mb-2">
                  {formatPrice(car.price)}
                </div>

                {/* Brand & Model */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {car.brand} {car.model} {car.year} VTi Prosmatec 1.8 i-VTEC
                </h3>

                {/* Specifications Grid */}
                <div className="border-t border-gray-200 pt-4 mt-4 flex-grow">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <Fuel className="w-5 h-5 text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500">Fuel Type</div>
                      <div className="text-sm font-medium text-gray-900">
                        {car.fuel}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <Gauge className="w-5 h-5 text-gray-400 mb-1" />
                      <div className="text-xs text-gray-500">Mileage</div>
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

              {/* View Details Button - Full width, touching bottom */}
              <div className="mt-auto">
                <Button className="w-full bg-gray-100 hover:bg-red-600 hover:text-white text-gray-900 py-3 rounded-none font-medium flex items-center justify-center">
                  VOIR LES DETAILS
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-red-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold"
          >
            Voir d'autres voitures
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
