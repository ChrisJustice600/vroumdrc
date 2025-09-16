"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col overflow-hidden">
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
          {/* Overlay léger pour la lisibilité */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content et Boutons en bas - alignés à gauche */}
        <div className="relative z-10 flex-1 flex items-end justify-start">
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-left text-white pb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Acheter une voiture :
              <span className="block text-blue-300">C'est Parti !</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed max-w-2xl">
              Trouvez votre voiture idéale ou vendez la vôtre en toute
              simplicité
            </p>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              {/* Bouton Orange - Acheter */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Acheter une voiture
              </button>

              {/* Bouton Bleu foncé - Vendre */}
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Vendre ma voiture
              </button>
            </div>
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
