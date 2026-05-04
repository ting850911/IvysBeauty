import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET(req: NextRequest) {
  try {
    const locationId = req.nextUrl.searchParams.get("locationId");
    
    const services = await prisma.service.findMany({
      where: locationId ? { locations: { some: { id: locationId } } } : undefined
    });
    
    return NextResponse.json({ success: true, data: services });
  } catch (err) {
    console.error("Fetch services error:", err);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "無法取得服務清單" } },
      { status: 500 }
    );
  }
}
