/**
 * 安全轉址路徑驗證器
 * 對齊 proxy.md 規範：禁止外部網址、// 開頭的網址、未知路徑。
 */
export function getSafeRedirectPath(path: string | null | undefined): string {
  if (!path) return "/";

  // 1. 禁止外部連結 (http:// 或 https://)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return "/";
  }

  // 2. 禁止協定相關連結 (//example.com)
  if (path.startsWith("//")) {
    return "/";
  }

  // 3. 僅允許特定的站內路徑 (白名單)
  const allowedPrefixes = ["/", "/booking", "/history", "/admin"];
  
  // 檢查是否匹配白名單路徑或其子路徑
  const isAllowed = allowedPrefixes.some(prefix => {
    return path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(`${prefix}?`);
  });

  if (!isAllowed) {
    return "/";
  }

  return path;
}
