import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET() {
  try {
    const storeInfo = await prisma.storeInfo.findUnique({
      where: { id: "global" },
    });

    if (!storeInfo) {
      return NextResponse.json({
        success: true,
        data: {
          phone: "",
          line: "",
          instagram: "",
          facebook: "",
          bankCode: "",
          bankName: "",
          bankAccount: "",
          bankAccountName: ""
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: storeInfo
    });
  } catch (error) {
    console.error("[StoreInfo Fetch Error]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch store info" }, { status: 500 });
  }
}
