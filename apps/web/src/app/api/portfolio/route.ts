import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        location: true,
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: portfolios });
  } catch (error) {
    console.error("Fetch portfolios error:", error);
    return NextResponse.json(
      { success: false, error: "無法獲取作品集資料" },
      { status: 500 }
    );
  }
}
