import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontal, X } from "lucide-react";

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

export function PortfolioFilter({ sections, activeCount, onClear }: PortfolioFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="size-4" />
          篩選
          {activeCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(92vw,28rem)] rounded-3xl border-border bg-background p-6 shadow-elevated"
      >
        <div className="mb-5 flex items-center justify-between">
          <p className="font-display text-lg">篩選作品</p>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1 text-xs font-light text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3" />
              清除全部
            </button>
          )}
        </div>
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.label} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">
                {section.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {section.options.map((opt) => (
                  <Button
                    key={opt.value}
                    variant="pill"
                    size="sm"
                    data-active={section.value === opt.value}
                    onClick={() => section.onChange(opt.value)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
