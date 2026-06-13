import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { Skeleton } from "@/components/foundation/Skeleton";
import { cn } from "@/lib/utils";
import type { EarlyWarningSummary } from "../types";

interface SeverityRowProps {
  label: string;
  count: number;
  colorClass: string;
}

function SeverityRow({ label, count, colorClass }: SeverityRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className={cn("text-xs font-medium", colorClass)}>{label}</span>
      <span className={cn("text-xs font-bold tabular-nums", colorClass)}>{count}</span>
    </div>
  );
}

interface EarlyWarningPreviewProps {
  data: EarlyWarningSummary | undefined;
  isLoading: boolean;
}

export function EarlyWarningPreview({ data, isLoading }: EarlyWarningPreviewProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <AlertTriangle size={14} className="text-warning-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-navy-900">Early Warnings</p>
          <p className="mt-0.5 text-xs text-navy-500">Active signals</p>
        </div>
      </div>
      <CardContent className="pt-1 pb-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-full" />
            ))}
          </div>
        ) : !data ? (
          <p className="text-xs text-navy-400 text-center py-4">No data</p>
        ) : (
          <>
            <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-navy-100">
              <span className="text-xs text-navy-500">Total open</span>
              <span className="text-2xl font-bold text-navy-900">{data.total_open}</span>
            </div>
            <div className="divide-y divide-navy-50">
              <SeverityRow label="Critical" count={data.critical} colorClass="text-danger-600" />
              <SeverityRow label="High" count={data.high} colorClass="text-orange-600" />
              <SeverityRow label="Medium" count={data.medium} colorClass="text-warning-600" />
              <SeverityRow label="Low" count={data.low} colorClass="text-success-600" />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
