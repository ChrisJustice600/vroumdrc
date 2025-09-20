"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
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
import { useState } from "react";

// Données mockées pour la voiture
const carData = {
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
  condition: "New Cars",
  addedDate: "2024-07-19",
  location: "20 Cooper Square, New York, NY 10003, USA",
  engineSize: "2.0 Turbo",
  doors: 4,
  cylinders: 4,
  color: "Black, White",
  description:
    "Kia Sportage 2024 Hybrid Advanced Edition en excellent état. Véhicule hybride moderne avec toutes les options. Intérieur et extérieur en parfait état.",
  features: [
    "Climatisation",
    "Direction assistée",
    "Vitres électriques",
    "Régulateur de vitesse",
    "Radio CD",
    "Airbags frontaux et latéraux",
    "ABS",
    "ESP",
  ],
  seller: {
    name: "Aaron Jerry",
    rating: 4.8,
    reviews: 127,
    phone: "+88 562 9873",
    location: "5612 Oakland, California",
    memberSince: "2020",
  },
  images: [
    "/car-service.png",
    "/car-service.png",
    "/car-service.png",
    "/car-service.png",
  ],
};

export default function CarSinglePage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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
              {carData.brand} {carData.model}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Title and Location */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {carData.brand} {carData.model} {carData.year} Hybrid Advanced
                  Edition
                </h1>
                <p className="text-gray-600">{carData.location}</p>
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
                        {formatDate(carData.addedDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">
                        Type de carburant
                      </div>
                      <div className="text-sm font-medium">{carData.fuel}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Kilométrage</div>
                      <div className="text-sm font-medium">
                        {formatMileage(carData.mileage)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Transmission</div>
                      <div className="text-sm font-medium">
                        {carData.transmission}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                <div className="relative h-96 bg-gray-100">
                  <Image
                    src={carData.images[selectedImage]}
                    alt={`${carData.brand} ${carData.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                <div className="grid grid-cols-4 gap-2">
                  {carData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-red-500"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${carData.brand} ${carData.model} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
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
                      {carData.seller.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {carData.seller.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{carData.seller.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>{carData.seller.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
                    >
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

          {/* Car Overview & Description */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            {/* Car Overview */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-red-500 mr-3 rounded-full"></div>|
                Aperçu du véhicule :
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Carrosserie</span>
                      <p className="font-medium text-gray-900">
                        {carData.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">État</span>
                      <p className="font-medium text-gray-900">
                        {carData.condition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Gauge className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Kilométrage</span>
                      <p className="font-medium text-gray-900">
                        {formatMileage(carData.mileage)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Taille du moteur
                      </span>
                      <p className="font-medium text-gray-900">
                        {carData.engineSize}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Fuel className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Type de carburant
                      </span>
                      <p className="font-medium text-gray-900">
                        {carData.fuel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Portes</span>
                      <p className="font-medium text-gray-900">
                        {carData.doors} portes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Année</span>
                      <p className="font-medium text-gray-900">
                        {carData.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Cylindres</span>
                      <p className="font-medium text-gray-900">
                        {carData.cylinders}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Transmission
                      </span>
                      <p className="font-medium text-gray-900">
                        {carData.transmission}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Couleur</span>
                      <p className="font-medium text-gray-900">
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
