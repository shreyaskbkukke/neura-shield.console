import { statusClassMap } from "@/theme/badges";
import { cn } from "@/lib/utils";
import { titleCase } from "@/lib/formatters";

export type Status =
  | "OPEN"
  | "ACKNOWLEDGED"
  | "UNDER_REVIEW"
  | "RESOLVED"
  | "IMPLEMENTED"
  | "DISMISSED";

interface StatusBadgeProps {
  status: Status | string;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, showDot = true }: StatusBadgeProps) {
  const upper = status.toUpperCase();
  const classes = statusClassMap[upper] ?? "bg-navy-100 text-navy-600 border-navy-300";
  const label = titleCase(status.replace(/_/g, " "));

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        classes,
        className,
      )}
    >
      {showDot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />}
      {label}
    </span>
  );
}
