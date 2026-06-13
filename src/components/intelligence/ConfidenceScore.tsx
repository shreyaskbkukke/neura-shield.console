import { cn } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

function scoreColor(score: number): string {
  if (score >= 0.8) return "text-success-700 bg-success-50 border-success-200";
  if (score >= 0.6) return "text-warning-700 bg-warning-50 border-warning-200";
  if (score >= 0.4) return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-danger-700 bg-danger-50 border-danger-200";
}

export function ConfidenceScore({ score, label = "Confidence", size = "sm", className }: ConfidenceScoreProps) {
  const pct = Math.round(score * 100);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        scoreColor(score),
        className,
      )}
    >
      {label}: {pct}%
    </span>
  );
}
