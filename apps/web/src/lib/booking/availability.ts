import { prisma } from "@ivysbeauty/database";
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  parse, 
  isBefore, 
  addMinutes, 
  isAfter, 
  isEqual,
  getDay,
  startOfDay
} from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";

const TIME_ZONE = "Asia/Taipei";
const SLOT_DURATION = 30; // minutes
const MIN_LEAD_TIME_HOURS = 2; // Lead time for booking

interface DailyHour {
  dayOfWeek: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  hasBreak?: boolean;
  breakStart?: string;
  breakEnd?: string;
}

export async function getMonthAvailability(
  locationId: string,
  serviceId: string,
  year: number,
  month: number
) {
  // 1. Fetch Location & Service
  const [location, service] = await Promise.all([
    prisma.location.findUnique({ where: { id: locationId } }),
    prisma.service.findUnique({ where: { id: serviceId } })
  ]);

  if (!location || !service) {
    throw new Error("Location or Service not found");
  }

  const openingHours = (location.openingHours as any) as DailyHour[];
  const vacationDays = location.vacationDays.map(d => formatInTimeZone(d, TIME_ZONE, "yyyy-MM-dd"));

  // 2. Define Time Range
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });

  // 3. Fetch Bookings for the month
  // We include PENDING and CONFIRMED. PENDING must be within expiredAt.
  const now = new Date();
  const bookings = await prisma.booking.findMany({
    where: {
      locationId,
      OR: [
        { status: "CONFIRMED" },
        { 
          status: "PENDING",
          expiredAt: { gt: now }
        }
      ],
      startTime: { gte: start },
      endTime: { lte: end }
    }
  });

  const durationBlocks = Math.ceil(service.duration / SLOT_DURATION);

  const availability: Record<string, { available: boolean; slots: any[] }> = {};

  for (const day of days) {
    const dateStr = format(day, "yyyy-MM-dd");
    
    // Check if holiday
    if (vacationDays.includes(dateStr)) {
      availability[dateStr] = { available: false, slots: [] };
      continue;
    }

    // Check if open on this day of week
    const dayOfWeek = getDay(day); // 0=Sun, 1=Mon, ...
    const dayConfig = openingHours.find(h => h.dayOfWeek === dayOfWeek);

    if (!dayConfig || !dayConfig.isOpen) {
      availability[dateStr] = { available: false, slots: [] };
      continue;
    }

    // Generate slots
    const daySlots = [];
    const openTimeStr = `${dateStr}T${dayConfig.openTime}:00`;
    const closeTimeStr = `${dateStr}T${dayConfig.closeTime}:00`;
    
    let current = toDate(openTimeStr, { timeZone: TIME_ZONE });
    const closeTime = toDate(closeTimeStr, { timeZone: TIME_ZONE });
    
    const breakStart = dayConfig.hasBreak ? toDate(`${dateStr}T${dayConfig.breakStart}:00`, { timeZone: TIME_ZONE }) : null;
    const breakEnd = dayConfig.hasBreak ? toDate(`${dateStr}T${dayConfig.breakEnd}:00`, { timeZone: TIME_ZONE }) : null;

    const nowInTZ = toDate(new Date(), { timeZone: TIME_ZONE });
    const leadTimeThreshold = addMinutes(nowInTZ, MIN_LEAD_TIME_HOURS * 60);

    while (isBefore(current, closeTime)) {
      const slotEnd = addMinutes(current, service.duration); // Duration in minutes
      const timeStr = formatInTimeZone(current, TIME_ZONE, "HH:mm");
      
      let isAvailable = true;

      // Rule 1: Exceeds closing time
      if (isAfter(slotEnd, closeTime)) {
        isAvailable = false;
      }

      // Rule 2: Minimum lead time (now + 2 hours)
      if (isAvailable && isBefore(current, leadTimeThreshold)) {
        isAvailable = false;
      }

      // Rule 3: Break time overlap
      if (isAvailable && dayConfig.hasBreak && breakStart && breakEnd) {
        if (isBefore(current, breakEnd) && isAfter(slotEnd, breakStart)) {
          isAvailable = false;
        }
      }

      // Rule 4: Existing booking overlap
      if (isAvailable) {
        for (const booking of bookings) {
          const bStart = booking.startTime;
          const bEnd = booking.endTime;
          if (isBefore(current, bEnd) && isAfter(slotEnd, bStart)) {
            isAvailable = false;
            break;
          }
        }
      }

      if (isAvailable) {
        daySlots.push({
          time: timeStr,
          startTime: current.toISOString(),
          endTime: slotEnd.toISOString()
        });
      }

      current = addMinutes(current, SLOT_DURATION);
    }

    availability[dateStr] = {
      available: daySlots.length > 0,
      slots: daySlots
    };
  }

  return availability;
}
