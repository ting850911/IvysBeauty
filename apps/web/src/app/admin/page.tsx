import { prisma, decryptField } from "@ivysbeauty/database";
import { DashboardClient } from "@/components/admin/dashboard/DashboardClient";
import { AdminBooking } from "@/components/admin/bookings/BookingList";

// 強制為 Server Component
export default async function AdminDashboardPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { startTime: 'asc' },
    include: {
      customer: true,
      service: true,
      location: true,
    },
  });

  const safeBookings: AdminBooking[] = bookings.map((booking: any) => {
    // 處理 decrypt 錯誤，當不小心用明文存入資料庫時能平穩回傳原字串
    const safeDecrypt = (val: string | null) => {
      try {
        return decryptField(val);
      } catch (e) {
        return val;
      }
    };

    return {
      id: booking.id,
      status: booking.status as AdminBooking["status"],
      startTime: booking.startTime.toISOString(),
      createdAt: booking.createdAt.toISOString(),
      location: { name: booking.location?.name || "未知地點" },
      service: { name: booking.service?.name || "未知服務", price: booking.service?.price || 0 },
      customer: {
        name: booking.customer.name || "未知客人",
        phone: safeDecrypt(booking.customer.phone) || "",
        email: booking.customer.email || "",
      },
      notes: safeDecrypt(booking.notes) || undefined,
    };
  });

  return <DashboardClient initialBookings={safeBookings} />;
}
