"use client";

import React, { ReactNode, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string; // e.g., 'max-w-2xl'
  confirmText?: string;
  isLoading?: boolean;
  confirmDisabled?: boolean;
  formId?: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function AdminModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  footer,
  maxWidth = "max-w-lg",
  confirmText = "儲存",
  isLoading = false,
  confirmDisabled = false,
  formId,
  confirmVariant = "default",
}: AdminModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full ${maxWidth} bg-surface border border-border/50 rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[85vh]`}
      >
        {/* Header */}
        <div className="px-8 py-3 border-b border-border/50 flex items-center justify-between shrink-0 bg-surface/50 backdrop-blur-md">
          <h6 className="tracking-tight text-foreground font-bold">{title}</h6>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-8 custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {(footer !== null) && (
          <div className="px-8 py-3 border-t border-border/50 flex justify-end gap-3 shrink-0 bg-surface/50 backdrop-blur-md">
            {footer ? (
              footer
            ) : (
              <>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={onClose}
                  className="rounded-full px-6 text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                >
                  取消
                </Button>
                <Button
                  form={formId}
                  type={formId ? "submit" : "button"}
                  onClick={!formId ? onConfirm : undefined}
                  variant={confirmVariant}
                  disabled={isLoading || confirmDisabled}
                  className={cn(
                    "rounded-full px-12 py-6 text-white shadow-md min-w-[140px] text-base font-medium transition-all",
                    confirmVariant === "default" ? "bg-primary hover:bg-primary/90" : ""
                  )}
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin mr-2" /> : null}
                  {confirmText}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Helper Components for Uniform Styling ---

export function ModalField({ label, children, className }: { label: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="text-sm">{label}</div>
      {children}
    </div>
  );
}

const inputBaseStyles = "w-full h-11 px-4 rounded-xl border border-border/60 bg-background shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-muted-foreground/40";
const readOnlyStyles = "opacity-50 cursor-not-allowed";

export function ModalInput({ 
  className, 
  readOnly, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      className={cn(
        inputBaseStyles,
        readOnly && readOnlyStyles,
        className
      )}
      readOnly={readOnly}
      {...props}
    />
  );
}

export function ModalSelect({ 
  className, 
  children, 
  ...props 
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select 
        className={cn(
          inputBaseStyles,
          "cursor-pointer appearance-none pr-10",
          className
        )}
        {...props}
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

export function ModalTextarea({ 
  className, 
  ...props 
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea 
      className={cn(
        inputBaseStyles,
        "h-auto py-3 rounded-xl resize-none",
        className
      )}
      {...props}
    />
  );
}
