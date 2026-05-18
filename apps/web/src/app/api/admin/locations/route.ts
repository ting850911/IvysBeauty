import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";
import { requireOwner } from "@/lib/auth-session";

export async function GET(req: NextRequest) {
  try {
    await requireOwner();

    const locations = await prisma.location.findMany();
    return NextResponse.json({ success: true, data: locations });
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[Location Fetch Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireOwner();

    const body = await req.json();
    const { name, address, imageUrls } = body;

    if (!name || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const location = await prisma.location.create({
      data: {
        name,
        address,
        imageUrls: imageUrls || [],
      },
    });

    return NextResponse.json({ success: true, location });
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[Location Create Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
