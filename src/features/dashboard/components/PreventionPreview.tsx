import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { Skeleton } from "@/components/foundation/Skeleton";
import { cn } from "@/lib/utils";
import type { PreventionSummary } from "../types";

interface PriorityRowProps {
  label: string;
  count: number;
  colorClass: string;
}

function PriorityRow({ label, count, colorClass }: PriorityRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className={cn("text-xs font-medium", colorClass)}>{label}</span>
      <span className={cn("text-xs font-bold tabular-nums", colorClass)}>{count}</span>
    </div>
  );
}

interface PreventionPreviewProps {
  data: PreventionSummary | undefined;
  isLoading: boolean;
}

export function PreventionPreview({ data, isLoading }: PreventionPreviewProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <ShieldCheck size={14} className="text-success-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-navy-900">Prevention</p>
          <p className="mt-0.5 text-xs text-navy-500">Open recommendations</p>
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
              <PriorityRow label="Critical" count={data.critical} colorClass="text-danger-600" />
              <PriorityRow label="High" count={data.high} colorClass="text-orange-600" />
              <PriorityRow label="Medium" count={data.medium} colorClass="text-warning-600" />
              <PriorityRow label="Low" count={data.low} colorClass="text-success-600" />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
