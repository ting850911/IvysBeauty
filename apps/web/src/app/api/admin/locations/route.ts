import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET(req: NextRequest) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const locations = await prisma.location.findMany();
    return NextResponse.json({ success: true, data: locations });
  } catch (error: any) {
    console.error("[Location Fetch Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
    console.error("[Location Create Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
