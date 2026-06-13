import { Activity } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { Skeleton } from "@/components/foundation/Skeleton";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { cn } from "@/lib/utils";
import type { MonitoringSummary } from "../types";

const overallStatusColor: Record<string, string> = {
  HEALTHY: "text-success-600",
  DEGRADED: "text-warning-600",
  CRITICAL: "text-danger-600",
  UNKNOWN: "text-navy-500",
};

interface MetricGroupProps {
  label: string;
  counts: Record<string, number>;
}

function MetricGroup({ label, counts }: MetricGroupProps) {
  const total = Object.values(counts).reduce((s, v) => s + v, 0);
  return (
    <div>
      <p className="text-[11px] font-semibold text-navy-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      {total === 0 ? (
        <p className="text-xs text-navy-400">No data</p>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {Object.entries(counts).map(([k, v]) => (
            <span key={k} className="text-xs text-navy-700">
              <span className="font-medium">{k}:</span> {v}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface ModelHealthCardProps {
  data: MonitoringSummary | undefined;
  isLoading: boolean;
}

export function ModelHealthCard({ data, isLoading }: ModelHealthCardProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <Activity size={14} className="text-intelligence-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-navy-900">Model Health</p>
          <p className="mt-0.5 text-xs text-navy-500">Monitoring status</p>
        </div>
      </div>
      <CardContent className="pt-1 pb-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : !data ? (
          <p className="text-xs text-navy-400 text-center py-4">No data</p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-baseline justify-between pb-2 border-b border-navy-100">
              <span className="text-xs text-navy-500">Overall</span>
              <span
                className={cn(
                  "text-sm font-bold",
                  overallStatusColor[data.overall_status] ?? "text-navy-700",
                )}
              >
                {data.overall_status}
              </span>
            </div>
            <MetricGroup label="Quality" counts={data.forecast_quality} />
            <MetricGroup label="Drift" counts={data.model_drift} />
            <MetricGroup label="Freshness" counts={data.data_freshness} />
            <DisclaimerBox text={data.disclaimer} compact />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
