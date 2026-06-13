import { riskClassMap } from "@/theme/badges";
import { cn } from "@/lib/utils";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface RiskBadgeProps {
  riskLevel: RiskLevel | string;
  className?: string;
}

export function RiskBadge({ riskLevel, className }: RiskBadgeProps) {
  const upper = riskLevel.toUpperCase();
  const classes = riskClassMap[upper] ?? "bg-navy-100 text-navy-600 border-navy-300";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        classes,
        className,
      )}
    >
      {riskLevel}
    </span>
  );
}
