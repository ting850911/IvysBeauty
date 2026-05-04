import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

// GET /api/admin/portfolio
export async function GET(req: Request) {
  try {
    const role = req.headers.get("x-user-role");
    
    if (role !== "OWNER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        location: true,
        service: true,
      },
    });

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Fetch portfolios error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 });
  }
}

// POST /api/admin/portfolio
export async function POST(req: Request) {
  try {
    const role = req.headers.get("x-user-role");
    
    if (role !== "OWNER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    return NextResponse.json(newPortfolio);
  } catch (error: any) {
    console.error("Create portfolio error:", error);
    return NextResponse.json({ error: error?.message || String(error) || "Failed to create portfolio" }, { status: 500 });
  }
}
