import { NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function GET(req: Request) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const storeInfo = await prisma.storeInfo.findFirst();
    return NextResponse.json({ success: true, data: storeInfo });
  } catch (error: any) {
    console.error("[StoreInfo Fetch Error]", error);
    return NextResponse.json({ error: "Failed to fetch store info" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const role = req.headers.get('x-user-role');
    if (role !== 'OWNER') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { phone, line, instagram, threads, bankCode, bankName, bankAccount, bankAccountName } = body;

    // Find the first record (singleton)
    const existing = await prisma.storeInfo.findFirst();

    let storeInfo;
    if (existing) {
      storeInfo = await prisma.storeInfo.update({
        where: { id: existing.id },
        data: { phone, line, instagram, threads, bankCode, bankName, bankAccount, bankAccountName },
      });
    } else {
      storeInfo = await prisma.storeInfo.create({
        data: { phone, line, instagram, threads, bankCode, bankName, bankAccount, bankAccountName },
      });
    }

    // Revalidate the landing page cache
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/');

    return NextResponse.json({ success: true, data: storeInfo });
  } catch (error: any) {
    console.error("[StoreInfo Update Error]", error);
    return NextResponse.json({ error: "Failed to update store info" }, { status: 500 });
  }
}
