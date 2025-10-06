"use client";

import { Button } from "@/components/ui/button";
import { Car } from "@/lib/generated/prisma";
import { Calendar, Gauge, Heart, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const handleWhatsAppContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par votre ${car.year} ${car.brand} ${
        car.model
      } au prix de ${car.price.toLocaleString()}$. Est-elle toujours disponible ?`
    );
    window.open(
      `https://wa.me/${car.whatsappNumber}?text=${message}`,
      "_blank"
    );
  };

  const handleCardClick = () => {
    window.location.href = `/car/${car.id}`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative">
        <div className="relative h-48 w-full">
          <Image
            src={car.images[0] || "/car-service.png"}
            alt={car.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-gray-600 hover:text-[#3a3367]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#3a3367] transition-colors">
          {car.title}
        </h3>

        <p className="text-3xl font-bold text-[#3a3367] mb-4">
          {car.price.toLocaleString()}$
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gauge className="h-4 w-4" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <MapPin className="h-4 w-4" />
            <span>{car.location}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {car.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Vendeur : {car.sellerId}</div>

          <Button
            onClick={handleWhatsAppContact}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
