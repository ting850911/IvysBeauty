import { prisma, decryptField } from "@ivysbeauty/database";
import { MembersClient } from "@/components/admin/members/MembersClient";
import { startOfMonth, endOfMonth, addDays } from "date-fns";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const now = new Date();
  const startMonth = startOfMonth(now);
  const endMonth = endOfMonth(now);

  // Fetch Stats & Members with their Booking history
  const [
    totalCount,
    newThisMonthCount,
    activeCount,
    prepaidSum,
    allMembers,
  ] = await Promise.all([
    (prisma.user as any).count({ where: { role: 'MEMBER' } }),
    (prisma.user as any).count({
      where: {
        role: 'MEMBER',
        createdAt: { gte: startMonth, lte: endMonth }
      }
    }),
    (prisma.booking as any).groupBy({
      by: ['customerId'],
      where: {
        status: 'DONE',
        startTime: { gte: addDays(now, -30) }
      }
    }).then((groups: any[]) => groups.length).catch(() => 0),
    (prisma.user as any).aggregate({
      where: { role: 'MEMBER' },
      _sum: { prepaidBalance: true }
    }),
    (prisma.user as any).findMany({
      where: { role: 'MEMBER' },
      include: {
        bookings: {
          // Fetch all bookings for history view, ordered by most recent
          orderBy: { startTime: 'desc' },
          include: { 
            service: true,
            location: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  ]);

  // Upcoming birthdays (Members whose birthday month is current month)
  const birthdayMembers = allMembers.filter((m: any) => {
    const bday = decryptField(m.birthday);
    if (!bday || !bday.includes('-')) return false;
    const parts = bday.split('-');
    const month = parts.length > 1 ? parts[1] : null;
    return month && parseInt(month) === (now.getMonth() + 1);
  }).slice(0, 5);

  const formattedMembers = allMembers.map((m: any) => {
    // Dynamically calculate stats based ONLY on "DONE" bookings
    const allBookings = m.bookings || [];
    const doneBookings = allBookings.filter((b: any) => b.status === 'DONE');
    
    const calculatedVisitCount = doneBookings.length;
    const calculatedSpending = doneBookings.reduce((sum: number, b: any) => sum + (b.service?.price || 0), 0);
    
    // Find last visit date (the most recent DONE booking)
    const lastDoneVisit = doneBookings.length > 0 
      ? new Date(doneBookings[0].startTime) // Already sorted by desc in query
      : null;

    return {
      id: m.id,
      name: decryptField(m.name) || "未命名",
      phone: decryptField(m.phone) || "-",
      email: m.email || "",
      birthday: decryptField(m.birthday),
      level: m.level,
      points: m.points,
      prepaidBalance: m.prepaidBalance,
      cumulativeSpending: calculatedSpending,
      visitCount: calculatedVisitCount,
      lastVisit: lastDoneVisit?.toISOString() || null,
      status: m.status,
      memberNotes: m.memberNotes,
      bookings: allBookings, // Pass all bookings for history sheet
    };
  });

  const formattedBirthdayMembers = birthdayMembers.map(m => {
    const found = formattedMembers.find(fm => fm.id === m.id);
    return found ? { ...found } : null;
  }).filter(Boolean);

  const stats = {
    total: totalCount,
    newThisMonth: newThisMonthCount,
    active: activeCount,
    totalPrepaid: prepaidSum._sum.prepaidBalance || 0,
  };

  return (
    <MembersClient
      initialMembers={formattedMembers as any}
      stats={stats}
      upcomingBirthdays={formattedBirthdayMembers as any}
    />
  );
}
