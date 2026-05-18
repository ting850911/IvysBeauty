import { prisma } from "@ivysbeauty/database";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { Role } from "@ivysbeauty/database";

export const SESSION_COOKIE_NAME = "ivys_session";

export interface SessionUser {
  id: string;
  email: string | null;
  name: string | null;
  role: Role;
  phone: string | null;
  birthday: string | null;
}

/**
 * 建立新的使用者 Session 並寫入 Cookie
 */
export async function createSession(userId: string, provider?: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.session.create({
    data: {
      sessionToken: token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
  
  cookieStore.set(SESSION_COOKIE_NAME, token, cookieOptions);
  
  if (provider) {
    cookieStore.set("ivys_auth_provider", provider, cookieOptions);
  }

  return token;
}

/**
 * 撤銷當前 Session 並清除 Cookie
 */
export async function revokeSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await prisma.session.deleteMany({
      where: { sessionToken: token },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete("ivys_auth_provider");
}

/**
 * 取得當前 Session 所屬的使用者（不報錯，若無則回傳 null）
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: {
      user: true,
    },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role as Role,
    phone: session.user.phone,
    birthday: session.user.birthday,
  };
}

/**
 * 強制要求有登入的使用者，否則丟出 Error
 */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/**
 * 強制要求具備 OWNER 權限的使用者
 */
export async function requireOwner(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "OWNER") {
    throw new Error("Forbidden");
  }
  return user;
}
