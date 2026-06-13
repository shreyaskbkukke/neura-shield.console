import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/foundation/Card";
import { Skeleton } from "@/components/foundation/Skeleton";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  error?: Error | null;
  children: ReactNode;
  action?: ReactNode;
  height?: number;
  className?: string;
}

export function ChartCard({
  title,
  description,
  isLoading,
  error,
  children,
  action,
  height = 240,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <div className="flex items-start justify-between px-5 pt-4 pb-2">
        <div>
          <p className="text-sm font-semibold text-navy-900">{title}</p>
          {description && (
            <p className="mt-0.5 text-xs text-navy-500">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0 ml-3">{action}</div>}
      </div>
      <CardContent className="pt-1 pb-4">
        {isLoading ? (
          <div style={{ height }} className="flex flex-col gap-2 justify-end">
            <Skeleton className="h-3/4 w-full rounded-lg" />
          </div>
        ) : error ? (
          <div
            style={{ height }}
            className="flex items-center justify-center text-xs text-danger-500"
          >
            Failed to load data
          </div>
        ) : (
          <div style={{ height }}>{children}</div>
        )}
      </CardContent>
    </Card>
  );
}
