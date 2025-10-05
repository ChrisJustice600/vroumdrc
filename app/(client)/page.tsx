import { CarSearch } from "@/components/CardResearch";
import { HeroSection } from "@/components/HeroSection";
import { RecentCarsSection } from "@/components/recent-cars-section";
import { ServicesSection } from "@/components/service-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " VroumDRC - Vente de voitures neuves et d'occasion au Congo Kinshasa",
  description:
    "Découvrez  VroumDRC, la plateforme de référence pour l'achat et la vente de voitures neuves et d'occasion au Congo Kinshasa. Trouvez votre véhicule idéal parmi des milliers d'annonces vérifiées.",
  keywords: [
    "voitures Congo Kinshasa",
    "voitures RDC",
    "vente voiture Kinshasa",
    "achat voiture Kinshasa",
    "voitures neuves RDC",
    "voitures occasion RDC",
    "automobile Congo Kinshasa",
    "véhicules Kinshasa",
    "auto RDC",
    "car Congo",
    "Kinshasa",
    "Lubumbashi",
    "Mbuji-Mayi",
    "Kananga",
    "Kisangani",
    "Bukavu",
    " VroumDRC",
  ],
  openGraph: {
    title:
      " VroumDRC - Vente de voitures neuves et d'occasion au Congo Kinshasa",
    description:
      "Trouvez votre véhicule idéal parmi des milliers d'annonces vérifiées de voitures neuves et d'occasion au Congo Kinshasa.",
    url: "https://vroumdrc.com",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: " VroumDRC - Plateforme de vente de voitures au Congo Kinshasa",
      },
    ],
  },
  alternates: {
    canonical: "https://vroumdrc.com",
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: " VroumDRC",
            url: "https://vroumdrc.com",
            logo: "https://vroumdrc.com/logo-k Vroum.png",
            description:
              "Plateforme de référence pour l'achat et la vente de voitures neuves et d'occasion au Congo Kinshasa",
            foundingDate: "2024",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["French", "English"],
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "CD",
              addressRegion: "Kinshasa",
              addressLocality: "Kinshasa",
            },
            sameAs: [
              "https://www.facebook.com/ Vroumdrc",
              "https://www.instagram.com/ Vroumdrc",
              "https://www.twitter.com/ Vroumdrc",
            ],
          }),
        }}
      />

      {/* Structured Data for WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: " VroumDRC",
            url: "https://vroumdrc.com",
            description:
              "Plateforme de vente de voitures neuves et d'occasion au Congo Kinshasa",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://vroumdrc.com/achat?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <HeroSection />
        <CarSearch />
        <ServicesSection />
        <RecentCarsSection />
      </div>
    </>
  );
}
