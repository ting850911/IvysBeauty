import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";
import { requireOwner } from "@/lib/auth-session";

// GET /api/admin/services
export async function GET(req: Request) {
  try {
    await requireOwner();

    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        locations: true,
      },
    });

    return NextResponse.json(services);
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("Fetch services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST /api/admin/services
export async function POST(req: Request) {
  try {
    await requireOwner();

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
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
