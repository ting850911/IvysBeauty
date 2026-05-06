import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const location = await prisma.location.findUnique({
      where: { id },
    });

    if (!location) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: location });
  } catch (error: any) {
    console.error("[Location Fetch Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    await prisma.location.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Location Delete Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
