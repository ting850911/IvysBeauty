"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { resolveErrorMessage } from "@ivysbeauty/shared";
import { useRouter } from "next/navigation";
import { getSafeRedirectPath } from "@/lib/auth-helpers";

export function AuthForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [isMember, setIsMember] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password || (!isMember && !name)) {
      setErrorMsg("請填寫所有必填欄位");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email,
        password,
        name: !isMember ? name : undefined,
        isRegistered: isMember,
      };

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(resolveErrorMessage(res.status, data));
      }

      // 如果是註冊成功，不自動登入，而是切換到登入畫面
      if (!isMember) {
        alert("註冊成功！請使用新帳號登入。");
        setIsMember(true);
        setPassword("");
        return;
      }

      // 以下為登入成功的邏輯
      login(data.token, data.user);

      // Handle redirect safely
      const params = new URLSearchParams(window.location.search);
      const rawRedirect = params.get("redirect");
      const safeRedirect = getSafeRedirectPath(rawRedirect);

      // 如果缺少手機或生日，導向預約頁面進行資料補全 (需帶上原始跳轉目標)
      if (!data.user.phone || !data.user.birthday) {
        const nextUrl = safeRedirect !== "/"
          ? `/booking?redirect=${encodeURIComponent(safeRedirect)}`
          : "/booking";
        router.push(nextUrl);
      } else {
        // 資料完整，直接前往目標或首頁
        router.push(safeRedirect);
      }

      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "操作失敗，請稍後再試。",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-surface rounded-4xl shadow-soft p-6 md:p-10 animate-fade-in relative">
      {/* 載入中的透明遮罩 */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 rounded-4xl flex items-center justify-center backdrop-blur-[2px] z-10 animate-fade-in">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="text-center space-y-2 mb-8">
        <p className="text-eyebrow">
          {isMember ? "Welcome Back" : "Join Us"}
        </p>
        <h5>{isMember ? "會員登入" : "註冊會員"}</h5>
        <p>
          {isMember
            ? "請先登入會員以接續預約流程"
            : "成為會員，預約專屬服務"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="bg-red-50 text-red-500 text-xs px-4 py-2 rounded-lg font-medium text-center border border-red-100">
            {errorMsg}
          </div>
        )}

        {!isMember && (
          <div className="space-y-1">
            <label className="text-xs font-bold tracking-wide text-foreground">
              稱呼
            </label>
            <input
              type="text"
              required={!isMember}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="您希望的稱呼"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold tracking-wide text-foreground">
            電子信箱 (Email)
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold tracking-wide text-foreground">
            密碼
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            placeholder="輸入密碼"
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          size="lg"
          disabled={isLoading}
        >
          {isMember ? "確認登入" : "建立帳號"}
        </Button>
      </form>

      <div className="mt-8 text-center border-t border-border/50 pt-6">
        <span className="text-sm font-medium">
          {!isMember ? "已經有帳號了" : "還不是會員"}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsMember(!isMember);
          }}
          className="text-primary hover:cursor-pointer font-bold transition-all text-sm"
        >
          {!isMember ? "立即登入" : "立即註冊"}
        </button>
      </div>
    </div>
  );
}
