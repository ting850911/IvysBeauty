import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/auth-session";
import { prisma } from "@ivysbeauty/database";

// GET /api/admin/portfolio
export async function GET(req: Request) {
  try {
    await requireOwner();

    const portfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        location: true,
        service: true,
      },
    });

    return NextResponse.json({ success: true, data: portfolios });
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("Fetch portfolios error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch portfolios" }, { status: 500 });
  }
}

// POST /api/admin/portfolio
export async function POST(req: Request) {
  try {
    await requireOwner();

    const data = await req.json();
    const { title, imageUrls, description, gender, locationId, serviceId, tags } = data;

    if (!title || !imageUrls || imageUrls.length === 0) {
      return NextResponse.json({ error: "Missing required fields (title or images)" }, { status: 400 });
    }

    const newPortfolio = await prisma.portfolio.create({
      data: {
        title,
        imageUrls,
        description,
        gender: gender || "FEMALE",
        tags: tags || [],
        ...(locationId && { location: { connect: { id: locationId } } }),
        ...(serviceId && { service: { connect: { id: serviceId } } }),
      },
      include: {
        location: true,
        service: true,
      },
    });

    return NextResponse.json({ success: true, data: newPortfolio });
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("Create portfolio error:", error);
    return NextResponse.json({ success: false, error: error?.message || String(error) || "Failed to create portfolio" }, { status: 500 });
  }
}
