import { NextRequest, NextResponse } from "next/server";
import { getSafeRedirectPath } from "./lib/auth-helpers";

// 定義受保護的頁面與 API (對齊 proxy.md)
const PROTECTED_PAGES = ["/history", "/booking", "/admin"];
const PROTECTED_APIS = ["/api/history", "/api/bookings", "/api/admin"];

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const token = req.cookies.get("ivys_session")?.value;

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
    if (expired) res.cookies.delete("ivys_session");
    return res;
  };

  // ==== 1. 登入頁面處理 ====
  if (isLoginPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // ==== 2. 存取權限檢查 ====
  if (isProtectedPage || isProtectedApi) {
    // 2a. 未登入
    if (!token) {
      return deny();
    }

    // 2b. Admin 權限檢查 - 由於 middleware 無法直接讀取 DB，將 isAdmin 判斷延後至 Server Action 或 API 或 Layout (AuthContext)
    // 這裡只先檢查 isAdminPath 並假設有 token 才能進去，實際攔截由 AuthContext / API 處理

    return NextResponse.next();
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
