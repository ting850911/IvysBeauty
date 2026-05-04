import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroupProps {
  label: string;
  options: FilterOption[];
  value: string;
  // Loose typing to allow consumers to pass strongly-typed setState dispatchers
  onChange: (value: never) => void;
}

export function FilterGroup({ label, options, value, onChange }: FilterGroupProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">
        {label}
      </p>
      <Select value={value} onValueChange={(v) => onChange(v as never)}>
        <SelectTrigger className="h-11 rounded-full border-border bg-background px-5 font-light">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="rounded-lg font-light">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
