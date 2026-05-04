import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioGallery } from "@/components/home/PortfolioGallery";
import { AboutSection } from "@/components/home/AboutSection";
import { BookingRules } from "@/components/home/BookingRules";

// Best Practice: Page is a pure Server Component. Interactive parts are extracted to Client Components.
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-primary selection:text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioGallery />
      <BookingRules />
      <Footer />
    </div>
  );
}
