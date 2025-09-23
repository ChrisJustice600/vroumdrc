"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

// Données des slides
const slides = [
  {
    id: 1,
    image: "/banner.png",
    title: "Acheter une voiture :",
    subtitle: "C'est Parti !",
    description:
      "Trouvez votre voiture idéale ou vendez la vôtre en toute simplicité",
    primaryButton: {
      text: "Acheter une voiture",
      href: "/(client)/achat",
      color: "orange",
    },
    secondaryButton: {
      text: "Vendre ma voiture",
      href: "/vendre",
      color: "blue",
    },
  },
  {
    id: 2,
    image: "/banner.png",
    title: "Voitures de Luxe",
    subtitle: "Excellence Automobile",
    description:
      "Découvrez notre collection exclusive de véhicules haut de gamme",
    primaryButton: {
      text: "Découvrir",
      href: "/(client)/achat",
      color: "blue",
    },
    secondaryButton: { text: "En savoir plus", href: "/about", color: "gray" },
  },
  {
    id: 3,
    image: "/banner.png",
    title: "Service Premium",
    subtitle: "Votre Satisfaction",
    description:
      "Un accompagnement personnalisé pour chaque étape de votre achat",
    primaryButton: { text: "Nous contacter", href: "/contact", color: "green" },
    secondaryButton: {
      text: "Nos services",
      href: "/services",
      color: "purple",
    },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Particules déterministes pour éviter les erreurs d'hydratation
  const particles = useMemo(() => {
    const count = 20;
    let seed = 123456789;
    const rand = () => {
      // LCG: déterministe entre serveur et client
      seed = (1664525 * seed + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    return Array.from({ length: count }).map(() => {
      const left = rand() * 100;
      const top = rand() * 100;
      const animationDelay = rand() * 3;
      const animationDuration = 2 + rand() * 3;
      return { left, top, animationDelay, animationDuration } as const;
    });
  }, []);

  // Auto-slide avec pause au hover
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Fonction pour changer de slide avec animation
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;

      setIsTransitioning(true);
      setCurrentSlide(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    },
    [currentSlide, isTransitioning]
  );

  // Navigation précédent/suivant
  const goToPrevious = useCallback(() => {
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
  }, [currentSlide, goToSlide]);

  const goToNext = useCallback(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }, [currentSlide, goToSlide]);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Récupérer les couleurs des boutons
  const getButtonClasses = (color: string, isPrimary: boolean = true) => {
    const baseClasses =
      "px-8 py-4 rounded-sm font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg";

    const colorClasses = {
      orange: isPrimary
        ? "bg-red-600 hover:bg-red-700"
        : "bg-white hover:bg-gray-100 text-red-600 border border-red-600",
      blue: isPrimary
        ? "bg-red-600 hover:bg-red-700"
        : "bg-white hover:bg-gray-100 text-red-600 border border-red-600",
      green: isPrimary
        ? "bg-red-600 hover:bg-red-700"
        : "bg-white hover:bg-gray-100 text-red-600 border border-red-600",
      purple: isPrimary
        ? "bg-red-600 hover:bg-red-700"
        : "bg-white hover:bg-gray-100 text-red-600 border border-red-600",
      gray: isPrimary
        ? "bg-red-600 hover:bg-red-700"
        : "bg-white hover:bg-gray-100 text-red-600 border border-red-600",
    };

    return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} ${isPrimary ? "text-white" : ""}`;
  };

  return (
    <section className="relative h-screen flex flex-col overflow-hidden group">
      {/* Slides Container */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay dynamique avec gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
          </div>
        ))}
      </div>

      {/* Contenu principal avec animations */}
      <div className="relative z-10 flex-1 flex items-end justify-start">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-left text-white pb-12">
          {/* Titre avec animation d'entrée */}
          <div
            className={`transform transition-all duration-1000 delay-200 ${
              isTransitioning
                ? "translate-y-8 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 animate-pulse">
                {slides[currentSlide].subtitle}
              </span>
            </h1>
          </div>

          {/* Description avec animation */}
          <div
            className={`transform transition-all duration-1000 delay-400 ${
              isTransitioning
                ? "translate-y-8 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed max-w-2xl">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Boutons avec animation */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-start transform transition-all duration-1000 delay-600 ${
              isTransitioning
                ? "translate-y-8 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <Link href={slides[currentSlide].primaryButton.href}>
              <button
                className={getButtonClasses(
                  slides[currentSlide].primaryButton.color,
                  true
                )}
              >
                {slides[currentSlide].primaryButton.text}
              </button>
            </Link>
            <Link href={slides[currentSlide].secondaryButton.href}>
              <button
                className={getButtonClasses(
                  slides[currentSlide].secondaryButton.color,
                  false
                )}
              >
                {slides[currentSlide].secondaryButton.text}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contrôles de navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slides */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Bouton play/pause */}
        <button
          onClick={togglePlayPause}
          className="ml-4 p-2 bg-white/20 hover:bg-white/30 rounded-sm transition-all duration-300 backdrop-blur-sm"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Boutons de navigation latéraux */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-sm transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-sm transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Effet de particules flottantes (déterministe SSR/CSR) */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.animationDelay}s`,
              animationDuration: `${p.animationDuration}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
