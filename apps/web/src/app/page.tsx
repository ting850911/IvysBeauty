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
  const [homeContent, locations, storeInfo, portfolioItems, services] = await Promise.all([
    prisma.homeContent.findUnique({ where: { id: "singleton" } }),
    prisma.location.findMany({ where: { isPublished: true } }),
    prisma.storeInfo.findFirst(),
    prisma.portfolio.findMany({
      include: {
        service: { select: { name: true } },
        location: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    }),
    prisma.service.findMany({ where: { isPublished: true } })
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
      <PortfolioGallery
        initialItems={portfolioItems as any}
        initialLocations={locations as any}
        initialServices={services as any}
      />
      <BookingRules data={homeContent?.notice as any} />
      <Footer />
    </div>
  );
}
