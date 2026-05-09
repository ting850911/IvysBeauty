import { prisma, encryptField, decryptField } from "@ivysbeauty/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const level = searchParams.get("level") || "全部等級";
    const status = searchParams.get("status") || "全部狀態";

    const where: any = {
      role: 'MEMBER',
    };

    if (level !== "全部等級") {
      where.level = level;
    }

    if (status !== "全部狀態") {
      where.status = status;
    }

    const members = await (prisma.user as any).findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Decrypt and filter in memory for encrypted fields (name, phone)
    const decryptedMembers = members.map((m: any) => ({
      ...m,
      name: decryptField(m.name),
      phone: decryptField(m.phone),
      birthday: decryptField(m.birthday),
    }));

    const filteredMembers = decryptedMembers.filter((m: any) => {
      if (!search) return true;
      return (
        m.name?.toLowerCase().includes(search) ||
        m.phone?.includes(search) ||
        m.email?.toLowerCase().includes(search)
      );
    });

    return NextResponse.json(filteredMembers);
  } catch (error) {
    console.error("Fetch members error:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, birthday, level, memberNotes } = body;

    const member = await (prisma.user as any).create({
      data: {
        name: encryptField(name),
        phone: encryptField(phone),
        email,
        birthday: encryptField(birthday),
        level: level || "一般會員",
        memberNotes,
        role: 'MEMBER',
      }
    });

    return NextResponse.json({
      ...member,
      name: decryptField(member.name),
      phone: decryptField(member.phone),
      birthday: decryptField(member.birthday),
    });
  } catch (error) {
    console.error("Create member error:", error);
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
