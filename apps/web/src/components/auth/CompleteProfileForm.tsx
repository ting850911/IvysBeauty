"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getSafeRedirectPath } from "@/lib/auth-helpers";

export function CompleteProfileForm() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState(user?.phone || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !birthday) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          phone,
          birthday
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error?.message || "更新失敗");
      }

      updateUser({ phone, birthday });

      // Handle redirect after completion (對齊 proxy.md 第 89 點)
      const params = new URLSearchParams(window.location.search);
      const rawRedirect = params.get("redirect");
      const safeRedirect = getSafeRedirectPath(rawRedirect);

      // 如果有跳轉參數且不是為了補資料才來的 (即目標不是 /booking)，則導向目標
      if (safeRedirect !== "/" && !safeRedirect.startsWith("/booking")) {
        router.push(safeRedirect);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-surface rounded-[2rem] shadow-soft p-6 md:p-10 animate-fade-in relative z-10">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 rounded-[2rem] flex items-center justify-center backdrop-blur-[2px] z-20 animate-fade-in">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="text-center space-y-2 mb-8">
        <p className="text-eyebrow">Profile Completion</p>
        <h3>完善會員資料</h3>
        <p>為了後續能收到通知，請提供以下資訊。</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold tracking-wide text-foreground">手機</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            placeholder="0912345678"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold tracking-wide text-foreground">生日</label>
          <input
            type="date"
            required
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground"
          />
        </div>

        <Button type="submit" className="w-full mt-6" size="lg" disabled={isLoading}>
          繼續
        </Button>
      </form>
    </div>
  );
}
