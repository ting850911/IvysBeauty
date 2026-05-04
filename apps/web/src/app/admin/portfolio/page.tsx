import { prisma } from "@ivysbeauty/database";
import { PortfolioClient } from "@/components/admin/portfolio/PortfolioClient";
import type { AdminPortfolio, OptionItem } from "@/components/admin/portfolio/PortfolioClient";

export default async function AdminPortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      location: { select: { id: true, name: true } },
      service: { select: { id: true, name: true } },
    }
  });

  const locations = await prisma.location.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true }
  });

  const services = await prisma.service.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true }
  });

  const safePortfolios: AdminPortfolio[] = portfolios.map((p) => ({
    id: p.id,
    title: p.title,
    imageUrls: p.imageUrls,
    description: p.description || "",
    gender: p.gender,
    tags: p.tags,
    location: p.location ? { id: p.location.id, name: p.location.name } : null,
    service: p.service ? { id: p.service.id, name: p.service.name } : null,
    createdAt: p.createdAt.toISOString(),
  }));

  const locationOptions: OptionItem[] = locations.map(loc => ({
    id: loc.id,
    name: loc.name,
  }));

  const serviceOptions: OptionItem[] = services.map(srv => ({
    id: srv.id,
    name: srv.name,
  }));

  return (
    <PortfolioClient 
      initialPortfolios={safePortfolios} 
      locationOptions={locationOptions}
      serviceOptions={serviceOptions}
    />
  );
}
