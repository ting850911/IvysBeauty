import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {

    const { id } = await params;
    const body = await req.json();
    const { name, address, imageUrls, openingHours, vacationDays } = body;

    const location = await prisma.location.update({
      where: { id },
      data: {
        name,
        address,
        imageUrls,
        openingHours,
        vacationDays,
      },
    });

    return NextResponse.json({ success: true, location });
  } catch (error: any) {
    console.error("[Location Update Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {

    const { id } = await params;

    // TODO: Verify if there are active bookings or related services before deleting
    await prisma.location.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Location Delete Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
