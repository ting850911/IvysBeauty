import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getSafeRedirectPath } from "./lib/auth-helpers";

// 定義受保護的頁面與 API (對齊 proxy.md)
const PROTECTED_PAGES = ["/history", "/booking", "/admin"];
const PROTECTED_APIS = ["/api/history", "/api/bookings", "/api/admin"];

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;

  const isProtectedPage = PROTECTED_PAGES.some((p) => pathname.startsWith(p));
  const isProtectedApi = PROTECTED_APIS.some((p) => pathname.startsWith(p));
  const isLoginPage = pathname.startsWith("/login");
  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  // 輔助函數：拒絕存取
  const deny = (expired = false) => {
    // API 請求權限不足應回傳 401 禁止 Redirect
    if (isProtectedApi) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: expired ? "登入已過期，請重新登入" : "請先登入",
          },
        },
        { status: 401 },
      );
    }
    
    // 頁面請求導向登入頁，並附帶安全的 redirect 參數
    const url = new URL("/login", req.url);
    const originalPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    url.searchParams.set("redirect", getSafeRedirectPath(originalPath));
    
    const res = NextResponse.redirect(url);
    // 只有在明確過期時才清除 cookie
    if (expired) res.cookies.delete("auth_token");
    return res;
  };

  // ==== 1. 預先驗證 Token ====
  let payload: any = null;
  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error("[Proxy] CRITICAL: JWT_SECRET is missing");
        return deny(true);
      }
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload: verifiedPayload } = await jwtVerify(token, secret);
      payload = verifiedPayload;
    } catch (err) {
      console.log("[Proxy] Token invalid or expired:", pathname);
    }
  }

  // ==== 2. 登入頁面處理 (對齊 proxy.md 第 136 點) ====
  if (isLoginPage) {
    // 已登入且 Token 有效者進入 /login -> 導回首頁 (禁止直接在 /login 清 token)
    if (payload) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // 未登入或 Token 無效者，清除無效 cookie 並放行進入登入頁
    const res = NextResponse.next();
    if (token && !payload) res.cookies.delete("auth_token");
    return res;
  }

  // ==== 3. 存取權限檢查 ====
  if (isProtectedPage || isProtectedApi) {
    // 3a. 未登入或 Token 無效
    if (!payload) {
      return deny(!!token); // 有 token 但驗證失敗視為過期
    }

    // 3b. Admin 權限檢查 (對齊 proxy.md 第 31, 32 點)
    if (isAdminPath && payload.role !== "OWNER") {
      console.log(`[Proxy] Access denied for user ${payload.email}: insufficient role`);
      
      // API 回傳 403 Forbidden
      if (isProtectedApi) {
        return NextResponse.json(
          { success: false, error: { code: "FORBIDDEN", message: "權限不足" } },
          { status: 403 }
        );
      }
      // 頁面重導向至首頁
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 3c. 驗證成功，將身分寫入 Header 並放行
    const requestHeaders = new Headers(req.headers);
    if (payload.sub) requestHeaders.set("x-user-id", String(payload.sub));
    if (payload.role) requestHeaders.set("x-user-role", String(payload.role));

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 非受保護路徑 -> 放行
  return NextResponse.next();
}

// 設定哪些路徑需要經過這個 proxy
export const config = {
  matcher: [
    "/history/:path*",
    "/booking/:path*",
    "/admin/:path*",
    "/login",
    "/api/history/:path*",
    "/api/bookings/:path*",
    "/api/admin/:path*"
  ],
};
