import { cn } from "@/lib/utils";

interface SummaryStripItem {
  label: string;
  value: number | string;
  variant?: "default" | "danger" | "warning" | "success" | "brand";
}

interface SummaryStripProps {
  items: SummaryStripItem[];
  className?: string;
}

const variantMap: Record<string, string> = {
  default: "text-navy-900",
  danger: "text-danger-600",
  warning: "text-warning-600",
  success: "text-success-600",
  brand: "text-brand-600",
};

export function SummaryStrip({ items, className }: SummaryStripProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {items.map(({ label, value, variant = "default" }) => (
        <div
          key={label}
          className="flex-1 min-w-[100px] rounded-xl border border-navy-200 bg-white px-4 py-3"
        >
          <p className={cn("text-xl font-bold", variantMap[variant])}>{value}</p>
          <p className="text-[11px] text-navy-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}
