"use client";

import React, { ReactNode, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminField, AdminInput, AdminSelect, AdminTextarea } from "@/components/ui/admin-field";

// Re-export shared components with Modal aliases for backward compatibility
export { 
  AdminField as ModalField, 
  AdminInput as ModalInput, 
  AdminSelect as ModalSelect, 
  AdminTextarea as ModalTextarea 
};

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
