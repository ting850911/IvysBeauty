import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export const dynamic = "force-dynamic";

// GET /api/admin/schedules?locationId=xxx&month=YYYY-MM
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const locationId = searchParams.get("locationId");
    const month = searchParams.get("month");

    if (!locationId || !month) {
      return NextResponse.json({ error: "Missing locationId or month" }, { status: 400 });
    }

    const schedule = await prisma.monthlySchedule.findUnique({
      where: {
        locationId_month: { locationId, month }
      }
    });

    return NextResponse.json(schedule || { all: [], overrides: {} });
  } catch (error) {
    console.error("[Schedules API GET] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/admin/schedules
// Body: { locationId, month, all, overrides }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { locationId, month, all, overrides } = body;

    if (!locationId || !month || !all) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const schedule = await prisma.monthlySchedule.upsert({
      where: {
        locationId_month: { locationId, month }
      },
      update: {
        all,
        overrides
      },
      create: {
        locationId,
        month,
        all,
        overrides
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("[Schedules API POST] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
