"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Phone,
  RotateCcw,
  Settings,
  Share2,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type CarData = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string | null;
  transmission: string | null;
  category?: string | null;
  condition: string | null;
  createdAt: string;
  location?: string | null;
  engineSize?: string | null;
  doors?: number | null;
  cylinders?: number | null;
  color?: string | null;
  description?: string | null;
  whatsappNumber?: string | null;
  images: string[];
};

// Valeur par défaut pendant chargement
const fallbackCar: CarData = {
  id: "1",
  brand: "Kia",
  model: "Sportage",
  year: 2024,
  price: 20800,
  mileage: 750,
  fuel: null,
  transmission: null,
  category: null,
  condition: null,
  createdAt: new Date().toISOString(),
  location: null,
  engineSize: null,
  doors: null,
  cylinders: null,
  color: null,
  description: null,
  whatsappNumber: null,
  images: ["/car-service.png"],
};

export default function CarSinglePage() {
  const params = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState<CarData>(fallbackCar);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/cars/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Car non trouvée");
        const data = (await res.json()) as CarData;
        if (!active) return;
        setCarData({
          ...data,
          images:
            data.images && data.images.length > 0
              ? data.images
              : ["/car-service.png"],
        });
      } catch (e) {
        // garder fallback
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [params.id]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalImages = carData.images.length;

  // Scroll functions for thumbnails
  const scrollThumbnails = (direction: "left" | "right") => {
    if (!thumbnailRef.current) return;
    const scrollAmount = 200;
    thumbnailRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link
              href="/achat"
              className="hover:text-red-600 transition-colors"
            >
              Acheter une voiture
            </Link>
            <span>/</span>
            <span className="text-gray-900">
              {loading ? (
                <Skeleton className="h-5 w-40 inline-block align-middle" />
              ) : (
                <>
                  {carData.brand} {carData.model}
                </>
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Title and Location */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {loading ? (
                    <Skeleton className="h-8 w-80" />
                  ) : (
                    <>
                      {carData.brand} {carData.model} {carData.year}
                    </>
                  )}
                </h1>
                <p className="text-gray-600">
                  {loading ? (
                    <Skeleton className="h-4 w-64" />
                  ) : (
                    carData.location || ""
                  )}
                </p>
              </div>

              {/* Quick Details Strip */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">
                        Date de publication
                      </div>
                      <div className="text-sm font-medium">
                        {loading ? (
                          <Skeleton className="h-4 w-24" />
                        ) : (
                          new Date(carData.createdAt).toLocaleDateString()
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">
                        Type de carburant
                      </div>
                      <div className="text-sm font-medium">
                        {loading ? (
                          <Skeleton className="h-4 w-16" />
                        ) : (
                          carData.fuel || "-"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Kilométrage</div>
                      <div className="text-sm font-medium">
                        {loading ? (
                          <Skeleton className="h-4 w-16" />
                        ) : (
                          formatMileage(carData.mileage)
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Transmission</div>
                      <div className="text-sm font-medium">
                        {loading ? (
                          <Skeleton className="h-4 w-16" />
                        ) : (
                          carData.transmission || "-"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
                <div className="relative h-[28rem] w-full">
                  <Image
                    src={carData.images[selectedImage]}
                    alt={`${carData.brand} ${carData.model} - Image ${selectedImage + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <button
                    onClick={() =>
                      window.open(carData.images[selectedImage], "_blank")
                    }
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm hover:bg-white/30 transition"
                  >
                    Agrandir
                  </button>
                </div>
              </div>

              {/* Thumbnail Carousel */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-neutral-700">
                    Galerie photos
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {selectedImage + 1} / {totalImages}
                  </span>
                </div>

                <div className="relative">
                  {/* Scroll Buttons */}
                  <button
                    onClick={() => scrollThumbnails("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>

                  <button
                    onClick={() => scrollThumbnails("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Scrollable Thumbnails */}
                  <div
                    ref={thumbnailRef}
                    className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth px-10"
                  >
                    {carData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`snap-start flex-shrink-0 relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === index
                            ? "border-red-500 ring-2 ring-red-300"
                            : "border-neutral-200 hover:border-red-400"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Miniature ${index + 1} - ${carData.brand} ${carData.model}`}
                          fill
                          className="object-cover"
                        />
                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-red-500/20" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Price and Offer Section */}
                <div className="bg-red-500 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                      {carData.category}
                    </span>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isFavorite
                            ? "bg-white text-red-500"
                            : "bg-white/20 hover:bg-white/30"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-4">
                    {formatPrice(carData.price)}
                  </div>
                </div>

                {/* Seller Details Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Détails du vendeur :
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {carData.brand.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {carData.brand} {carData.model}
                      </h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{carData.location || ""}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>{carData.whatsappNumber || ""}</span>
                      </div>
                    </div>
                  </div>

                  {/* Localisation exacte de la voiture */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="font-medium">
                        Localisation du véhicule :
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 ml-6">
                      {carData.location}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
                      onClick={() => {
                        const raw = carData.whatsappNumber || "";
                        const phone = raw.replace(/[^\d]/g, "");
                        const text = encodeURIComponent(
                          `Bonjour, je suis intéressé(e) par votre ${carData.brand} ${carData.model} ${carData.year}. Est-elle toujours disponible ?`
                        );
                        if (!phone) {
                          alert("Numéro WhatsApp indisponible");
                          return;
                        }
                        // Tente d'ouvrir l'app WhatsApp (mobile et desktop)
                        const appUrl = `whatsapp://send?phone=${phone}&text=${text}`;
                        const fallbackUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
                        const timer = setTimeout(() => {
                          window.location.href = fallbackUrl;
                        }, 1200);
                        // Naviguer vers l'app; si non installée, fallback sera déclenché
                        window.location.href = appUrl;
                        // Annule le fallback si l'app prend la main
                        window.addEventListener(
                          "pagehide",
                          () => clearTimeout(timer),
                          { once: true }
                        );
                      }}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      CONTACTER VIA WHATSAPP
                    </Button>
                    <Link
                      href="#"
                      className="block text-center text-sm text-gray-500 underline hover:text-red-500"
                    >
                      Voir tout le stock de ce vendeur
                    </Link>
                  </div>
                </div>

                {/* Safety Tips Section */}
                <div className="bg-red-500 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">
                    Conseils de sécurité
                  </h3>
                  <p className="text-sm mb-4 text-red-100">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Utilisez un endroit sûr pour rencontrer le vendeur
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>Évitez les transactions en espèces</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>Méfiez-vous des offres irréalistes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Car Overview - Left side only */}
          <div className="lg:col-span-2">
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6 w-full lg:w-[65%]">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-red-500 mr-3 rounded-full"></div>|
                Aperçu du véhicule :
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {/* Left Column */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Carrosserie
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        État
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.condition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Kilométrage
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {formatMileage(carData.mileage)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Taille du moteur
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.engineSize}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Fuel className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Type de carburant
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.fuel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Portes
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.doors} portes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Année
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Cylindres
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.cylinders}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Transmission
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.transmission}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Couleur
                      </span>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {carData.color}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
