import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, requireUser } from "@/lib/auth-session";
import { prisma, encryptField, decryptField } from "@ivysbeauty/database";
import { UpdateProfileSchema } from "@ivysbeauty/shared";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: true, data: { user: null } });
    }

    // 將 PII 欄位解密後再回傳給前端
    const decryptedPhone = user.phone ? decryptField(user.phone) : null;
    const decryptedBirthday = user.birthday ? decryptField(user.birthday) : null;

    return NextResponse.json({
      success: true,
      data: {
        user: {
          ...user,
          phone: decryptedPhone,
          birthday: decryptedBirthday,
        },
      },
    });
  } catch (error) {
    console.error("[GET /api/me] Error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal server error" } }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();

    const parsed = UpdateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid payload", details: parsed.error.format() } },
        { status: 400 }
      );
    }

    const { name, phone, birthday } = parsed.data;

    // 將 PII 欄位加密後再存入資料庫
    const encryptedPhone = encryptField(phone);
    const encryptedBirthday = encryptField(birthday);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        phone: encryptedPhone,
        birthday: encryptedBirthday,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          phone: decryptField(updatedUser.phone!),
          birthday: decryptField(updatedUser.birthday!),
        },
      },
    });
  } catch (error: any) {
    console.error("[PATCH /api/me] Error:", error);
    if (error.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: { message: "Internal server error" } }, { status: 500 });
  }
}
