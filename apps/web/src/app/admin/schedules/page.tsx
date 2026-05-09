import { prisma } from "@ivysbeauty/database";
import { format } from "date-fns";
import { SchedulesClient, ScheduleLocation, DailyHour } from "@/components/admin/schedules/SchedulesClient";

export const dynamic = "force-dynamic";

// This is ONLY a fallback/mock if DB has zero data
const MOCK_WEEKLY_HOURS: DailyHour[] = [
  { dayOfWeek: 1, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週一" },
  { dayOfWeek: 2, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週二" },
  { dayOfWeek: 3, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週三" },
  { dayOfWeek: 4, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週四" },
  { dayOfWeek: 5, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週五" },
  { dayOfWeek: 6, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週六" },
  { dayOfWeek: 0, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週日" },
];

export default async function AdminSchedulesPage() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { name: "asc" },
      include: {
        schedules: {
          where: {
            month: format(new Date(), 'yyyy-MM')
          }
        }
      }
    });

    if (locations.length === 0) {
      return (
        <div className="p-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed border-border/60">
          目前沒有任何分店資料，請先建立分店。
        </div>
      );
    }

    const safeLocations: ScheduleLocation[] = locations.map((loc) => {
      const schedule = loc.schedules[0];
      const all: DailyHour[] = (schedule?.all as any) || [];
      const overrides: Record<string, DailyHour> = (schedule?.overrides as any) || {};

      return {
        id: loc.id,
        name: loc.name,
        openingHours: {
          all,
          overrides
        }
      };
    });

    return <SchedulesClient initialLocations={safeLocations} />;
  } catch (error) {
    console.error("[AdminSchedulesPage] Fetch Error:", error);
    // On hard error, we can still show the client with mock data for safety, 
    // but ideally we should show an error state.
    return (
      <div className="p-8 text-center bg-surface min-h-[400px] flex flex-col items-center justify-center rounded-3xl">
        <h4 className="text-destructive font-bold text-xl">資料載入錯誤</h4>
        <p className="text-muted-foreground text-sm mt-2">請確認資料庫狀態與網路連線</p>
      </div>
    );
  }
}
