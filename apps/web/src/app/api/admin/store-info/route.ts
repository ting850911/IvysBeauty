import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function PUT(req: Request) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { phone, line, instagram, facebook, bankCode, bankName, bankAccount, bankAccountName } = body;

    const existing = await prisma.storeInfo.findFirst();
    const storeInfo = await prisma.storeInfo.upsert({
      where: { id: existing?.id || 'temp-id' },
      update: { phone, line, instagram, facebook, bankCode, bankName, bankAccount, bankAccountName },
      create: { phone, line, instagram, facebook, bankCode, bankName, bankAccount, bankAccountName },
    });

    return NextResponse.json(storeInfo);
  } catch (error: any) {
    console.error("[StoreInfo Update Error]", error);
    return NextResponse.json({ error: "Failed to update store info" }, { status: 500 });
  }
}
