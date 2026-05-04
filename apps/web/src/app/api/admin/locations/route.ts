import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { name, address, imageUrls, openingHours, vacationDays } = body;

    if (!name || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const location = await prisma.location.create({
      data: {
        name,
        address,
        imageUrls: imageUrls || [],
        openingHours, // Json field
        vacationDays: vacationDays || [],
      },
    });

    return NextResponse.json({ success: true, location });
  } catch (error: any) {
    console.error("[Location Create Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
