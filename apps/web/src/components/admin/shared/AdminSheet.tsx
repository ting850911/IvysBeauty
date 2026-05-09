"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

interface AdminSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
  maxWidth?: string;
}

export function AdminSheet({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  isLoading = false,
  maxWidth = "max-w-sm",
}: AdminSheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-foreground/10 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Sheet Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full ${maxWidth} bg-white backdrop-blur-2xl border-l border-border/40 shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border/10 flex items-center justify-between shrink-0 bg-surface/30">
          <div>
            <h6>{title}</h6>
            {description && <p className="text-xs text-muted-foreground mt-1 opacity-70">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-all text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 size={32} className="animate-spin text-primary opacity-40" />
                <p className="text-sm text-muted-foreground animate-pulse">讀取中...</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-5 border-t border-border/20 bg-surface/20 shrink-0">
            {footer}
          </div>
        )}
      </div>

    </>
  );
}

/**
 * Helper component for Tabs within the Sheet
 */
export function SheetTabs({
  tabs,
  activeTab,
  onTabChange
}: {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (id: string) => void
}) {
  return (
    <div className="flex gap-1 p-1 bg-surface/50 rounded-2xl mb-6 border border-border/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id
            ? "bg-white text-primary shadow-sm"
            : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
