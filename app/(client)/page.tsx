import { CarSearch } from "@/components/CardResearch";
import { HeroSection } from "@/components/HeroSection";
import { RecentCarsSection } from "@/components/recent-cars-section";
import { ServicesSection } from "@/components/service-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      <CarSearch />
      <ServicesSection />
      <RecentCarsSection />
    </div>
  );
}
