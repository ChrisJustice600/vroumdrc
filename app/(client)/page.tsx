"use client";

import { useAuthContext } from "@/components/AuthProvider";
import Image from "next/image";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner.png"
            alt="Voitures de luxe"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight fade-in-up">
              Trouvez votre
              <span className="block text-blue-400">voiture parfaite</span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Achetez et vendez des voitures neuves et d'occasion en toute
              simplicité. Plus de 10 000 véhicules disponibles.
            </p>

            {/* Debug info - masqué en production
            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">
                  État de l'authentification :
                </h3>
                <p className="text-sm">
                  {isLoading
                    ? "Chargement..."
                    : isAuthenticated
                      ? `Connecté en tant que : ${user?.name}`
                      : "Non connecté"}
                </p>
              </div>
            )} */}

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                🚗 Acheter une voiture
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                💰 Vendre ma voiture
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Pourquoi choisir AutoDirect ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Large sélection</h3>
              <p className="text-gray-600">
                Des milliers de voitures neuves et d'occasion
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sécurisé</h3>
              <p className="text-gray-600">
                Transactions sécurisées et transparentes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rapide</h3>
              <p className="text-gray-600">
                Trouvez votre voiture en quelques clics
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
