import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/auth-session";
import { prisma } from "@ivysbeauty/database";

export async function PUT(req: Request) {
  try {
    await requireOwner();

    const body = await req.json();
    const { hero, about, notice } = body;

    // We use "singleton" as the fixed ID for home content 
    // as it's a structural requirement for this specific table.
    const homeContent = await prisma.homeContent.upsert({
      where: { id: "singleton" },
      update: { hero, about, notice },
      create: { id: "singleton", hero, about, notice },
    });

    // Important: Revalidate the landing page cache
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/');

    return NextResponse.json({ success: true, data: homeContent });
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[HomeContent Update Error]", error);
    return NextResponse.json({ success: false, error: "Failed to update home content" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await requireOwner();

    const content = await prisma.homeContent.findFirst();
    return NextResponse.json({ success: true, data: content });
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[HomeContent Fetch Error]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch home content" }, { status: 500 });
  }
}
