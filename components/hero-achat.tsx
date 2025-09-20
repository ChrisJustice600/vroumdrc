"use client";

import Image from "next/image";

export function HeroAchat() {
  return (
    <section className="relative text-white py-16 overflow-hidden">
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
        {/* Red overlay */}
        <div className="absolute inset-0 bg-red-600/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trouvez votre voiture idéale
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Parcourez notre large sélection de voitures neuves et d'occasion.
            Des milliers de véhicules vérifiés vous attendent.
          </p>
        </div>
      </div>
    </section>
  );
}
