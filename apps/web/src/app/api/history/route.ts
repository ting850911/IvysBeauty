import { NextRequest, NextResponse } from "next/server";
import { decryptField, prisma } from "@ivysbeauty/database";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customerId");

  if (!customerId) {
    return NextResponse.json({ success: false, error: { message: "未提供顧客 ID" } }, { status: 400 });
  }

  try {
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
      where: { customerId },
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
  } catch (err) {
    console.error("Fetch history error:", err);
    return NextResponse.json({ success: false, error: { message: "無法取得歷史紀錄" } }, { status: 500 });
  }
}
