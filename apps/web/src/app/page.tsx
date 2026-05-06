import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioGallery } from "@/components/home/PortfolioGallery";
import { AboutSection } from "@/components/home/AboutSection";
import { BookingRules } from "@/components/home/BookingRules";
import { prisma } from "@ivysbeauty/database";

// Best Practice: Page is a pure Server Component. 
// We fetch all initial data in parallel on the server.
export default async function HomePage() {
  const [homeContent, locations, storeInfo] = await Promise.all([
    prisma.homeContent.findUnique({ where: { id: "singleton" } }),
    prisma.location.findMany({ where: { isPublished: true } }),
    prisma.storeInfo.findFirst(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-primary selection:text-white">
      <Navbar />
      <HeroSection data={homeContent?.hero as any} />
      <AboutSection 
        data={homeContent?.about as any} 
        locations={locations as any}
        storeInfo={storeInfo as any}
      />
      <PortfolioGallery />
      <BookingRules data={homeContent?.notice as any} />
      <Footer />
    </div>
  );
}
