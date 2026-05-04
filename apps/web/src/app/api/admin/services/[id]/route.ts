import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";
import { verifyAuth } from "@/lib/auth";

// PUT /api/admin/services/[id]
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await verifyAuth(req);
    if (!auth || auth.role !== "OWNER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();
    const { name, price, duration, isPublished, locationIds } = data;

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(price !== undefined && { price }),
        ...(duration !== undefined && { duration }),
        ...(isPublished !== undefined && { isPublished }),
        ...(locationIds && {
          locations: {
            set: locationIds.map((locId: string) => ({ id: locId })),
          },
        }),
      },
      include: {
        locations: true,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/admin/services/[id]
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await verifyAuth(req);
    if (!auth || auth.role !== "OWNER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
