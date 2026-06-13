import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerBoxProps {
  text: string;
  className?: string;
  compact?: boolean;
}

export function DisclaimerBox({ text, className, compact }: DisclaimerBoxProps) {
  return (
    <div
      className={cn(
        "flex gap-2.5 rounded-lg border border-warning-200 bg-warning-50",
        compact ? "px-3 py-2" : "px-4 py-3",
        className,
      )}
    >
      <ShieldAlert
        size={compact ? 13 : 15}
        className="text-warning-600 shrink-0 mt-0.5"
      />
      <p className={cn("text-warning-800", compact ? "text-[11px]" : "text-xs")}>
        {text}
      </p>
    </div>
  );
}
