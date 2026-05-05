import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// 定義受保護的頁面與 API (Method A)
const PROTECTED_PAGES = ["/history", "/booking", "/admin"];
const PROTECTED_APIS = ["/api/history", "/api/bookings", "/api/admin"];

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;

  const isProtectedPage = PROTECTED_PAGES.some((p) => pathname.startsWith(p));
  const isProtectedApi = PROTECTED_APIS.some((p) => pathname.startsWith(p));
  const isLoginPage = pathname.startsWith("/login");

  // ==== 1. 登入頁面安全性處理 ====
  // 如果使用者「主動進入」登入頁面，為了安全，我們清除舊的 Token (防止多帳號混用)
  // 但我們必須排除 Next.js 的預取 (prefetch) 請求，否則會打斷剛登入成功的跳轉流程
  if (isLoginPage && token) {
    const isPrefetch = req.headers.get("x-middleware-prefetch") === "1";
    const isRsc = req.headers.get("rsc") === "1";
    
    if (!isPrefetch && !isRsc) {
      console.log("[Proxy] Manual entry to login page, clearing token for safety");
      const res = NextResponse.next();
      res.cookies.delete("auth_token");
      return res;
    }
  }

  // 若不屬於受保護的路由且不是登入頁，直接放行
  if (!isProtectedPage && !isProtectedApi && !isLoginPage) {
    return NextResponse.next();
  }

  const deny = (expired = false) => {
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
    
    // 導向登入頁面，並附帶 redirect 參數
    const url = new URL("/login", req.url);
    const originalPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    url.searchParams.set("redirect", originalPath);
    
    const res = NextResponse.redirect(url);
    if (expired) res.cookies.delete("auth_token");
    return res;
  };

  // ==== 預先驗證 Token (如果有的話) ====
  let payload: any = null;
  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (jwtSecret) {
        const secret = new TextEncoder().encode(jwtSecret);
        const { payload: verifiedPayload } = await jwtVerify(token, secret);
        payload = verifiedPayload;
      }
    } catch (err) {
      console.log("[Proxy] Token invalid or expired:", pathname);
    }
  }

  // 1. 如果在登入頁且 Token 有效 -> 導向首頁
  if (isLoginPage && payload) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. 如果在登入頁但 Token 無效 -> 刪除無效 Cookie 並放行（讓使用者重新登入）
  if (isLoginPage && !payload) {
    const res = NextResponse.next();
    if (token) res.cookies.delete("auth_token");
    return res;
  }

  // 3. 存取受保護路由但沒 Token 或 Token 無效 -> 拒絕存取
  if (!payload) {
    return deny(!payload && !!token); // 如果有 token 但沒 payload 表示過期
  }

  // 4. 驗證成功，將身分寫入 Header 並放行
  const requestHeaders = new Headers(req.headers);
  if (payload.sub) requestHeaders.set("x-user-id", String(payload.sub));
  if (payload.role) requestHeaders.set("x-user-role", String(payload.role));

  return NextResponse.next({ request: { headers: requestHeaders } });
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
