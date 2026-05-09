import { prisma, encryptField, decryptField } from "@ivysbeauty/database";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, phone, email, birthday, level, memberNotes, status, points, prepaidBalance } = body;

    const member = await (prisma.user as any).update({
      where: { id },
      data: {
        name: name !== undefined ? encryptField(name) : undefined,
        phone: phone !== undefined ? encryptField(phone) : undefined,
        email,
        birthday: birthday !== undefined ? encryptField(birthday) : undefined,
        level,
        memberNotes,
        status,
        points,
        prepaidBalance,
      }
    });

    return NextResponse.json({
      ...member,
      name: decryptField(member.name),
      phone: decryptField(member.phone),
      birthday: decryptField(member.birthday),
    });
  } catch (error) {
    console.error("Update member error:", error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await (prisma.user as any).delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete member error:", error);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
