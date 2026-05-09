"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AdminField, AdminInput, AdminTextarea } from "@/components/ui/admin-field";

/**
 * AdminCard - 後台管理頁面的標準卡片容器
 * 包含統一的圓角、內距、背景色與陰影效果
 */
interface AdminCardProps {
  children: ReactNode;
  className?: string;
}

export function AdminCard({ children, className }: AdminCardProps) {
  return (
    <div className={cn(
      "bg-surface rounded-3xl p-6 space-y-6 animate-fade-in flex flex-col",
      className
    )}>
      {children}
    </div>
  );
}

/**
 * AdminCardHeader - 卡片的標題區域
 * 包含主標題 (h5) 與副標題 (p)
 */
interface AdminCardHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function AdminCardHeader({ title, description, className }: AdminCardHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h5>{title}</h5>
      {description && (
        <p className="text-sm">{description}</p>
      )}
    </div>
  );
}

/**
 * AdminCardContent - 卡片的內容區域
 * 預設帶有垂直間距，適合放置 ModalField 等表單欄位
 */
export function AdminCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}

/**
 * AdminCardFooter - 卡片的底部操作區
 * 帶有頂部邊框與右對齊的按鈕佈局
 */
export function AdminCardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("pt-6 mt-2 border-t border-border/10 flex justify-end gap-3", className)}>
      {children}
    </div>
  );
}

// Re-export shared components for convenience
export { AdminField, AdminInput, AdminTextarea };
