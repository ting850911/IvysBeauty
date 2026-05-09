"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

const inputBaseStyles = "w-full h-11 px-4 rounded-xl border border-border/60 bg-background shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-muted-foreground/40";
const readOnlyStyles = "opacity-50 cursor-not-allowed focus:ring-0 focus:border-none hover:border-none";

/**
 * AdminField - 標準化表單欄位外殼
 * 負責 Label 的字體、顏色與間距
 */
interface AdminFieldProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AdminField({ label, children, className }: AdminFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-xs font-bold uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * AdminInput - 標準化輸入框
 */
export function AdminInput({ className, readOnly, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      readOnly={readOnly}
      className={cn(
        inputBaseStyles,
        readOnly && readOnlyStyles,
        className
      )}
    />
  );
}

/**
 * AdminSelect - 標準化選擇器
 */
export function AdminSelect({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(
          inputBaseStyles,
          "cursor-pointer appearance-none pr-10",
          className
        )}
      >
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/**
 * AdminTextarea - 標準化多行文本框
 */
export function AdminTextarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        inputBaseStyles,
        "h-auto py-3 rounded-xl resize-none",
        className
      )}
    />
  );
}
