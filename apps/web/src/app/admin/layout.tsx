"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Sidebar, NAV_ITEMS } from "@/components/admin/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isInitializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitializing) {
      if (!user) {
        router.push("/login?redirect=/admin");
      } else if (user.role !== "OWNER") {
        router.push("/"); // 非店長直接回首頁
      }
    }
  }, [isInitializing, user, router]);

  if (isInitializing || !user || user.role !== "OWNER") {
    return (
      <div className="min-h-screen flex flex-col selection:bg-accent-primary selection:text-white pt-24">
        <Navbar />
        <main className="flex-1 flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </main>
      </div>
    );
  }

  const currentNavItem = NAV_ITEMS.find(i => i.href === pathname);
  const currentTitle = currentNavItem?.label || "管理控制台";

  return (
    <div className="min-h-screen text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen w-full pt-16 lg:pt-0">
        {/* Header Area */}
        <header className="hidden lg:flex h-20 px-10 bg-surface">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-eyebrow">Console</span>
              <h4 className="text-xl font-bold tracking-widest">{currentTitle}</h4>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
