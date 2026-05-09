"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Image as ImageIcon, Settings, Menu, X, Clock, LayoutDashboard, Users } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useState } from "react";

export const NAV_ITEMS = [
  { label: "預約列表", href: "/admin", icon: Calendar, subtitle: "管理與查看所有顧客預約" },
  { label: "首頁內容", href: "/admin/home-content", icon: LayoutDashboard, subtitle: "編輯首頁各區塊內容與預覽" },
  { label: "基本設定", href: "/admin/settings", icon: Settings, subtitle: "社群連結、地點與服務項目" },
  { label: "排班設定", href: "/admin/schedules", icon: Clock, subtitle: "設定分店營業時間與休假" },
  { label: "作品列表", href: "/admin/portfolio", icon: ImageIcon, subtitle: "管理展示作品與分類" },
  { label: "會員列表", href: "/admin/members", icon: Users, subtitle: "管理顧客資料、等級與消費紀錄" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-surface border-b border-border/50 z-50 flex items-center justify-between px-6">
        <Link href="/">
          <Image src={logo} alt="Logo" width={80} height={80} priority />
        </Link>
        <p>{NAV_ITEMS.find(i => i.href === pathname)?.label || "管理控制台"}</p>
        <button
          className="p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-fit bg-surface border-r border-border/50
        flex flex-col z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-8">
          <Link href="/">
            <Image src={logo}
              alt="Logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>

        <div className="flex-1 px-4 py-2 space-y-8 overflow-y-auto">
          <div>
            <p className="text-eyebrow p-4">後台管理</p>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors
                      ${isActive
                        ? "bg-accent-primary/10 text-accent-primary"
                        : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} className={isActive ? "text-accent-primary" : "text-muted-foreground"} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
