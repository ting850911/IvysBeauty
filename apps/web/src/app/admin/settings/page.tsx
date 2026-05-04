import { prisma } from "@ivysbeauty/database";
import { SettingsClient } from "@/components/admin/settings/SettingsClient";
import type { AdminLocation, AdminService, AdminStoreInfo } from "@/components/admin/settings/types";

export default async function AdminSettingsPage() {
  const [locations, storeInfoData, services] = await Promise.all([
    prisma.location.findMany({ orderBy: { name: 'asc' } }),
    prisma.storeInfo.findUnique({ where: { id: "global" } }),
    prisma.service.findMany({ 
      orderBy: { createdAt: 'asc' },
      include: { locations: true }
    })
  ]);

  const storeInfo = storeInfoData || { 
    phone: "", 
    line: "", 
    instagram: "", 
    facebook: "",
    bankCode: "",
    bankName: "",
    bankAccount: "",
    bankAccountName: ""
  };

  const safeLocations: AdminLocation[] = locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    address: loc.address,
    imageUrls: loc.imageUrls,
    isPublished: loc.isPublished,
    openingHours: loc.openingHours ? JSON.parse(JSON.stringify(loc.openingHours)) : null,
    vacationDays: loc.vacationDays.map(d => d.toISOString()),
  }));

  const safeServices: AdminService[] = services.map(srv => ({
    id: srv.id,
    name: srv.name,
    price: srv.price,
    duration: srv.duration,
    isPublished: srv.isPublished,
    locations: srv.locations.map(loc => ({
      id: loc.id,
      name: loc.name
    }))
  }));

  return <SettingsClient 
    initialLocations={safeLocations} 
    initialStoreInfo={storeInfo} 
    initialServices={safeServices} 
  />;
}
