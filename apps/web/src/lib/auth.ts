import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export interface AuthUser {
  id: string;
  email: string;
  role: "OWNER" | "MEMBER";
}

/**
 * 驗證請求的身分
 * 支援從 Request 的 Cookie 或 Header 中提取 Token
 */
export async function verifyAuth(req?: Request): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload || !payload.sub) {
      return null;
    }

    return {
      id: payload.sub as string,
      email: payload.email as string,
      role: (payload.role as "OWNER" | "MEMBER") || "MEMBER",
    };
  } catch (error) {
    console.error("[Auth Verify Error]", error);
    return null;
  }
}
