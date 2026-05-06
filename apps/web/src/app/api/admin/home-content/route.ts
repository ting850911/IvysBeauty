import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function PUT(req: Request) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { hero, about, notice } = body;

    // We use "singleton" as the fixed ID for home content 
    // as it's a structural requirement for this specific table.
    const homeContent = await prisma.homeContent.upsert({
      where: { id: "singleton" },
      update: { hero, about, notice },
      create: { id: "singleton", hero, about, notice },
    });

    return NextResponse.json({ success: true, data: homeContent });
  } catch (error: any) {
    console.error("[HomeContent Update Error]", error);
    return NextResponse.json({ success: false, error: "Failed to update home content" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const content = await prisma.homeContent.findFirst();
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error("[HomeContent Fetch Error]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch home content" }, { status: 500 });
  }
}
