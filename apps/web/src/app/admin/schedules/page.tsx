import { prisma } from "@ivysbeauty/database";
import { SchedulesClient } from "@/components/admin/schedules/SchedulesClient";

export default async function AdminSchedulesPage() {

  const locations = await prisma.location.findMany({
    orderBy: { name: "asc" },
  });

  const safeLocations = locations.map((loc) => {
    return {
      id: loc.id,
      name: loc.name,
      openingHours: loc.openingHours ? JSON.parse(JSON.stringify(loc.openingHours)) : null,
      vacationDays: loc.vacationDays.map((d) => d.toISOString()),
    };
  });

  return <SchedulesClient initialLocations={safeLocations as any} />;
}
