import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";
import { requireUser } from "@/lib/auth-session";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    
    // 實作 Lazy Auto-Cancel 機制 (超過付款期限的 PENDING 訂單自動轉為 CANCELLED)
    await prisma.booking.updateMany({
      where: {
        status: "PENDING",
        expiredAt: {
          lt: new Date(),
        },
      },
      data: {
        status: "CANCELLED",
      },
    });

    const bookings = await prisma.booking.findMany({
      where: { customerId: user.id }, // Strict binding to session user
      include: {
        location: true,
        service: true,
      },
      orderBy: { startTime: 'desc' }
    });

    const safeBookings = bookings.map((booking) => ({
      ...booking,
      notes: booking.notes, // 備註已改為明文儲存
    }));

    return NextResponse.json({ success: true, data: safeBookings });
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: { message: "請先登入" } }, { status: 401 });
    }
    console.error("Fetch history error:", err);
    return NextResponse.json({ success: false, error: { message: "無法取得歷史紀錄" } }, { status: 500 });
  }
}
