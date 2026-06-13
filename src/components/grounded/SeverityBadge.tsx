import { severityClassMap } from "@/theme/badges";
import { cn } from "@/lib/utils";

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface SeverityBadgeProps {
  severity: Severity | string;
  className?: string;
  showDot?: boolean;
}

export function SeverityBadge({ severity, className, showDot }: SeverityBadgeProps) {
  const upper = severity.toUpperCase();
  const classes = severityClassMap[upper] ?? "bg-navy-100 text-navy-600 border-navy-300";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        classes,
        className,
      )}
    >
      {showDot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {severity}
    </span>
  );
}
