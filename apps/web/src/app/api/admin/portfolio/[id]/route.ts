import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

// PUT /api/admin/portfolio/[id]
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const role = req.headers.get("x-user-role");
    
    if (role !== "OWNER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const data = await req.json();
    const { title, imageUrls, description, gender, locationId, serviceId, tags } = data;

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(imageUrls && { imageUrls }),
        ...(description !== undefined && { description }),
        ...(gender && { gender }),
        ...(tags !== undefined && { tags }),
        ...(locationId !== undefined && {
          locationId: locationId || null,
        }),
        ...(serviceId !== undefined && {
          serviceId: serviceId || null,
        }),
      },
      include: {
        location: true,
        service: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedPortfolio });
  } catch (error: any) {
    console.error("Update portfolio error:", error);
    return NextResponse.json({ success: false, error: error?.message || String(error) || "Failed to update portfolio" }, { status: 500 });
  }
}

// DELETE /api/admin/portfolio/[id]
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const role = req.headers.get("x-user-role");
    
    if (role !== "OWNER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete portfolio error:", error);
    return NextResponse.json({ success: false, error: error?.message || String(error) || "Failed to delete portfolio" }, { status: 500 });
  }
}
