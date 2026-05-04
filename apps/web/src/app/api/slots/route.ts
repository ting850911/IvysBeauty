import { NextRequest, NextResponse } from "next/server";
import { getMonthAvailability } from "@/lib/booking/availability";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const locationId = url.searchParams.get("locationId");
    const serviceId = url.searchParams.get("serviceId");
    const date = url.searchParams.get("date"); // YYYY-MM-DD
    const month = url.searchParams.get("month"); // YYYY-MM (Optional, for monthly overview)

    if (!locationId || !serviceId) {
      return NextResponse.json(
        { success: false, error: { message: "缺少必要參數" } },
        { status: 400 }
      );
    }

    if (month) {
      const [year, m] = month.split("-").map(Number);
      const availability = await getMonthAvailability(locationId, serviceId, year, m);
      return NextResponse.json({ success: true, data: availability });
    }

    if (date) {
      const [year, m, d] = date.split("-").map(Number);
      const availability = await getMonthAvailability(locationId, serviceId, year, m);
      const dayData = availability[date] || { available: false, slots: [] };
      
      return NextResponse.json({ 
        success: true, 
        data: {
          date,
          slots: dayData.slots.map(s => ({
            startTime: s.startTime,
            endTime: s.endTime,
            available: true // getMonthAvailability already filtered unavailable ones
          }))
        } 
      });
    }

    return NextResponse.json(
      { success: false, error: { message: "請提供日期或月份" } },
      { status: 400 }
    );

  } catch (error: any) {
    console.error("Slots API Error:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message || "伺服器錯誤" } },
      { status: 500 }
    );
  }
}
