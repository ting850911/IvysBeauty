import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET() {
  try {
    const content = await prisma.homeContent.findUnique({
      where: { id: "singleton" },
    });

    if (!content) {
      return NextResponse.json({ success: false, error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error("Failed to fetch home content:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
