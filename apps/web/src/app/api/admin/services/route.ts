import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";
import { verifyAuth } from "@/lib/auth";

// GET /api/admin/services
export async function GET(req: Request) {
  try {
    const auth = await verifyAuth(req);
    if (!auth || auth.role !== "OWNER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        locations: true,
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Fetch services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST /api/admin/services
export async function POST(req: Request) {
  try {
    const auth = await verifyAuth(req);
    if (!auth || auth.role !== "OWNER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, price, duration, isPublished, locationIds } = data;

    if (!name || typeof price !== "number" || typeof duration !== "number") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        name,
        price,
        duration,
        isPublished: isPublished ?? true,
        locations: {
          connect: (locationIds || []).map((id: string) => ({ id })),
        },
      },
      include: {
        locations: true,
      },
    });

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
