import { prisma } from "@ivysbeauty/database";
import { SchedulesClient, ScheduleLocation } from "@/components/admin/schedules/SchedulesClient";

export default async function AdminSchedulesPage() {

  const locations = await prisma.location.findMany({
    orderBy: { name: "asc" },
  });

  const safeLocations: ScheduleLocation[] = locations.map((loc) => {
    return {
      id: loc.id,
      name: loc.name,
      openingHours: loc.openingHours ? (loc.openingHours as any) : null,
      vacationDays: loc.vacationDays.map((d) => d.toISOString()),
    };
  });

  return <SchedulesClient initialLocations={safeLocations} />;
}
