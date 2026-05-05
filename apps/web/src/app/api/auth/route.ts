import { NextRequest, NextResponse } from "next/server";
import { decryptField, encryptField, prisma } from "@ivysbeauty/database";
import { AuthPayloadSchema, UpdateProfileSchema, ErrorCodes } from "@ivysbeauty/shared";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const buildError = (
  status: number,
  code: string,
  message: string,
  details?: unknown,
) =>
  NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status },
  );

const toRawErrorResponse = (err: unknown) => {
  if (err && typeof err === "object") {
    const maybeError = err as {
      message?: string;
      code?: string;
      meta?: unknown;
      name?: string;
    };

    return NextResponse.json(
      {
        success: false,
        error: {
          code: maybeError.code ?? maybeError.name ?? ErrorCodes.INTERNAL_ERROR,
          message: maybeError.message ?? "Unknown error",
          details: maybeError.meta,
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: ErrorCodes.INTERNAL_ERROR,
        message: String(err),
      },
    },
    { status: 500 },
  );
};

const buildSafeUser = (user: {
  id: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  birthday: Date | string | null;
  role: string;
}) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  phone: decryptField(user.phone),
  birthday:
    user.birthday instanceof Date
      ? user.birthday.toISOString().slice(0, 10)
      : decryptField(user.birthday),
  role: user.role,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AuthPayloadSchema.safeParse(body);

    if (!parsed.success) {
      console.log("Error:", parsed.error.errors);

      return buildError(
        400,
        ErrorCodes.BAD_REQUEST,
        parsed.error.errors[0]?.message || "輸入資料格式錯誤",
        parsed.error.format()
      );
    }

    const { email, password, name, phone, birthday, isRegistered } =
      parsed.data;

    let user = await prisma.user.findUnique({ where: { email } });

    if (isRegistered) {
      // 登入：帳號必須存在
      if (!user) {
        return buildError(
          404,
          ErrorCodes.NOT_FOUND,
          "此帳號尚未註冊，請先註冊會員",
        );
      }
      const isMatched = await bcrypt.compare(password, user.passwordHash || "");
      if (!isMatched) {
        return buildError(401, ErrorCodes.UNAUTHORIZED, "密碼錯誤，請重新輸入");
      }
    } else {
      // 註冊：帳號不能已存在
      if (user) {
        return buildError(
          409,
          ErrorCodes.CONFLICT,
          "Email 已被註冊，請直接登入",
        );
      }
      const passwordHash = await bcrypt.hash(password, 12);
      user = await prisma.user.create({
        data: {
          email,
          name: name ?? null,
          phone: phone ? encryptField(phone) : null,
          birthday: birthday ? encryptField(birthday) : null,
          passwordHash,
        },
      });
    }

    if (!isRegistered) {
      return NextResponse.json({
        success: true,
        message: "註冊成功，請重新登入",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("[Auth API] CRITICAL: JWT_SECRET environment variable is missing");
      return buildError(500, ErrorCodes.INTERNAL_ERROR, "伺服器缺少 JWT 設定");
    }

    const isOwner = user.role === "OWNER";
    const expirationStr = isOwner ? "1d" : "30m";
    const maxAgeSeconds = isOwner ? 24 * 60 * 60 : 30 * 60;

    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime(expirationStr)
      .sign(new TextEncoder().encode(jwtSecret));

    const safeUser = buildSafeUser(user);

    const response = NextResponse.json({
      success: true,
      token,
      user: safeUser,
    });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAgeSeconds,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("Auth API error:", err);
    return toRawErrorResponse(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = UpdateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return buildError(
        400,
        ErrorCodes.BAD_REQUEST,
        "輸入資料格式錯誤",
        parsed.error.format(),
      );
    }

    const { email, phone, birthday } = parsed.data;

    const user = await prisma.user.update({
      where: { email },
      data: {
        ...(phone !== undefined ? { phone: encryptField(phone) } : {}),
        ...(birthday !== undefined ? { birthday: encryptField(birthday) } : {}),
      },
    });

    return NextResponse.json({ success: true, user: buildSafeUser(user) });
  } catch (err) {
    console.error("Auth PATCH error:", err);
    return toRawErrorResponse(err);
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("auth_token");
  return res;
}
