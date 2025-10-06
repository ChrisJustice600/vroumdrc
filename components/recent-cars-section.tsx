"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Fuel,
  Gauge,
  Heart,
  Loader2,
  RotateCcw,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DbCar {
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
}

export function RecentCarsSection() {
  const router = useRouter();
  const [cars, setCars] = useState<DbCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CD", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("fr-CD").format(mileage) + " km";
  };

  // Charger les voitures depuis la base de données
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        // Appel API avec filtres de prix entre 8000 et 15000 USD
        const params = new URLSearchParams({
          minPrice: "8000",
          maxPrice: "15000",
          sortBy: "newest",
        });

        const response = await fetch(`/api/cars?${params.toString()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Échec du chargement des voitures");
        }

        const data = (await response.json()) as DbCar[];
        // Limiter à 3 voitures côté client
        setCars(data.slice(0, 3));
      } catch (err) {
        console.error("Erreur lors du chargement des voitures:", err);
        setError("Impossible de charger les voitures");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleViewMoreCars = () => {
    // Redirection vers la page d'achat avec filtre de prix entre 8000 et 15000 USD
    router.push("/achat?minPrice=8000&maxPrice=15000");
  };

  return (
    <section className="py-16 bg-white">
      {/* Structured Data for Cars */}
      {cars.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Voitures entre 8 000$ et 15 000$",
              description:
                "Sélection de voitures d'occasion à prix abordable au Congo Kinshasa",
              numberOfItems: cars.length,
              itemListElement: cars.map((car, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Car",
                  name: `${car.brand} ${car.model} ${car.year}`,
                  description: `Voiture ${car.brand} ${car.model} ${
                    car.year
                  } - ${car.fuel || "Essence"} - ${
                    car.transmission || "Manuelle"
                  }`,
                  brand: {
                    "@type": "Brand",
                    name: car.brand,
                  },
                  model: car.model,
                  vehicleModelDate: car.year,
                  mileageFromOdometer: {
                    "@type": "QuantitativeValue",
                    value: car.mileage,
                    unitCode: "KMT",
                  },
                  fuelType: car.fuel || "Essence",
                  vehicleTransmission: car.transmission || "Manuelle",
                  vehicleCondition:
                    car.condition === "OCCASION"
                      ? "https://schema.org/UsedCondition"
                      : "https://schema.org/NewCondition",
                  offers: {
                    "@type": "Offer",
                    price: car.price,
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    seller: {
                      "@type": "Organization",
                      name: " VroumDRC",
                    },
                  },
                  image: car.images?.[0] || "/car-service.png",
                  url: `https:// Vroumdrc.com/car/${car.id}`,
                },
              })),
            }),
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Voitures récemment ajoutées
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de voitures d'occasion récemment ajoutées,
            toutes entre 8 000$ et 15 000$ pour un rapport qualité-prix optimal
            au Congo Kinshasa.
          </p>
        </div>

        {/* Cars Grid - Afficher seulement 3 voitures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            // Skeleton loaders pendant le chargement
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-sm shadow-lg border border-gray-100 overflow-hidden animate-pulse"
              >
                <Skeleton className="h-64 w-full" />
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
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          ) : error ? (
            // Message d'erreur
            <div className="col-span-full text-center py-12">
              <div className="text-[#3a3367] mb-4">
                <Loader2 className="h-12 w-12 mx-auto animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Erreur de chargement
              </h3>
              <p className="text-gray-600">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-[#3a3367] hover:bg-[#2a2547]"
              >
                Réessayer
              </Button>
            </div>
          ) : cars.length === 0 ? (
            // Aucune voiture trouvée
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune voiture trouvée
              </h3>
              <p className="text-gray-600">
                Il n'y a actuellement aucune voiture entre 6 000€ et 10 000€
              </p>
            </div>
          ) : (
            cars.map((car, index) => (
              <div
                key={car.id}
                className="bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col animate-in fade-in-0 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Image Section */}
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={car.images?.[0] || "/car-service.png"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#3a3367] text-white text-xs font-medium px-3 py-1 rounded-sm">
                      {car.condition === "OCCASION"
                        ? "Occasion"
                        : "Sans plaque"}
                    </span>
                  </div>
                  {/* Action Icons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 bg-[#a99df1]/20 rounded-full flex items-center justify-center hover:bg-[#a99df1]/30 transition-colors">
                      <Heart className="w-4 h-4 text-[#3a3367]" />
                    </button>
                    <button className="w-8 h-8 bg-[#a99df1]/20 rounded-full flex items-center justify-center hover:bg-[#a99df1]/30 transition-colors">
                      <RotateCcw className="w-4 h-4 text-[#3a3367]" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Price */}
                  <div className="text-2xl font-bold text-[#3a3367] mb-2">
                    {formatPrice(car.price)}
                  </div>

                  {/* Brand & Model */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {car.brand} {car.model} {car.year}
                  </h3>

                  {/* Specifications Grid */}
                  <div className="border-t border-gray-200 pt-4 mt-4 flex-grow">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center">
                        <Fuel className="w-5 h-5 text-gray-400 mb-1" />
                        <div className="text-xs text-gray-500">Carburant</div>
                        <div className="text-sm font-medium text-gray-900">
                          {car.fuel || "-"}
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
                        <div className="text-xs text-gray-500">
                          Transmission
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {car.transmission || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Details Button - Full width, touching bottom */}
                <div className="mt-auto">
                  <Button
                    className="w-full bg-gray-100 hover:bg-[#3a3367] hover:text-white text-gray-900 py-3 rounded-none font-medium flex items-center justify-center"
                    onClick={() => (window.location.href = `/car/${car.id}`)}
                  >
                    VOIR LES DETAILS
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#3a3367] hover:bg-[#2a2547] text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={handleViewMoreCars}
          >
            Voir plus des voitures
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
