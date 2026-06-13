import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="rounded-full bg-navy-100 p-4">
          <Icon size={24} className="text-navy-400" />
        </div>
      )}
      <div className="space-y-1">
        <p className="text-sm font-medium text-navy-700">{title}</p>
        {description && (
          <p className="text-xs text-navy-500 max-w-xs">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
