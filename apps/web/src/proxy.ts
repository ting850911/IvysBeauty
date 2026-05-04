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

  // 若為登入頁面且帶有 token，這表示前端可能發生 localStorage 清除但 cookie 仍存在的狀況 (Split-brain)。
  // 為了讓使用者能夠重新登入，我們直接在這裡清除舊的 cookie，放行進入登入頁面。
  if (isLoginPage && token) {
    const res = NextResponse.next();
    res.cookies.delete("auth_token");
    return res;
  }

  // 若不屬於受保護的路由，直接放行
  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // ==== 以下為存取「受保護路由」的處理 ====

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

  // 1. 沒 token 直接拒絕
  if (!token) return deny();

  // 2. 有 token，進行驗證
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // 驗證成功，將身分寫入 Header 讓後端 API 方便取用
    const requestHeaders = new Headers(req.headers);
    if (payload.sub) requestHeaders.set("x-user-id", String(payload.sub));
    if (payload.role) requestHeaders.set("x-user-role", String(payload.role));

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    // Token 過期或無效
    return deny(true);
  }
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
