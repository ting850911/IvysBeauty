"use client";

import React, { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSection {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface PortfolioFilterProps {
  sections: FilterSection[];
  activeCount: number;
  onClear: () => void;
}

export function PortfolioFilter({
  sections,
  activeCount,
  onClear,
}: PortfolioFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2 w-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SlidersHorizontal className="w-4 h-4" />
        篩選
        {activeCount > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
            {activeCount}
          </span>
        )}
      </Button>

      {/* Filter Content (Popover) */}
      {isOpen && (
        <div
          className="absolute top-full right-0 z-50 mt-2 w-[20rem] rounded-3xl border border-border bg-white p-4 shadow-2xl animate-in fade-in-0 zoom-in-95"
        >
          {activeCount > 0 && (
            <div className="absolute top-2 right-4">
              <button
                onClick={onClear}
                className="text-xs text-muted-foreground/50 hover:text-primary cursor-pointer"
              >
                清除
              </button>
            </div>
          )}

          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.label} className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  {section.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {section.options.map((option) => {
                    const isSelected = section.value === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => section.onChange(option.value)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all duration-300",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
