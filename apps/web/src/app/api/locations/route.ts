import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET() {
  try {
    const locations = await prisma.location.findMany();
    return NextResponse.json({ success: true, data: locations });
  } catch (err) {
    console.error("Fetch locations error:", err);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "無法取得地點清單" } },
      { status: 500 }
    );
  }
}
