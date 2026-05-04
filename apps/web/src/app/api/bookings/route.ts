import { NextRequest, NextResponse } from "next/server";
import { decryptField, encryptField, prisma } from "@ivysbeauty/database";
import { CreateBookingSchema } from "@ivysbeauty/shared";
import { addDays, parseISO } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 透過 Zod Schema 強制防堵不合法的輸入
    const validation = CreateBookingSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { code: "BAD_REQUEST", message: "預約資料格式錯誤", details: validation.error.format() } },
        { status: 400 }
      );
    }

    const { locationId, serviceId, customerId, startTime, notes } = validation.data;
    
    // 檢查 Service 長度
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "找不到該服務" } }, { status: 404 });
    }

    const startDateTime = parseISO(startTime);
    // 計算結束時間
    const endDateTime = new Date(startDateTime.getTime() + service.duration * 60000);
    
    // --- Overlap Check ---
    const now = new Date();
    const existingBookings = await prisma.booking.findMany({
      where: {
        locationId,
        OR: [
          { status: "CONFIRMED" },
          { 
            status: "PENDING",
            expiredAt: { gt: now }
          }
        ],
        // Basic range check
        startTime: { lte: endDateTime },
        endTime: { gte: startDateTime }
      }
    });

    const isConflict = existingBookings.some(b => 
      startDateTime < b.endTime && b.startTime < endDateTime
    );

    if (isConflict) {
      return NextResponse.json({ 
        success: false, 
        error: { code: "CONFLICT", message: "該時段已被預約，請選擇其他時段" } 
      }, { status: 409 });
    }
    // ---------------------

    // 設定到店付款期限 (預防佔用)
    const expiredAt = addDays(new Date(), 1);

    const booking = await prisma.booking.create({
      data: {
        locationId,
        serviceId,
        customerId,
        startTime: startDateTime,
        endTime: endDateTime,
        expiredAt,
        notes: notes ? encryptField(notes) : null,
        status: "PENDING"
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        ...booking,
        notes: decryptField(booking.notes),
      },
    });

  } catch (err) {
    console.error("Booking Create error:", err);
    return NextResponse.json({ success: false, error: { code: "INTERNAL_ERROR", message: "預約建立失敗" } }, { status: 500 });
  }
}
