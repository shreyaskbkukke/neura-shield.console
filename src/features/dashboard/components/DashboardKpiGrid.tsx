import {
  AlertTriangle,
  FolderOpen,
  FolderCheck,
  Activity,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { MetricCard } from "@/components/grounded/MetricCard";
import { Skeleton } from "@/components/foundation/Skeleton";
import type { DashboardSummary } from "../types";

interface DashboardKpiGridProps {
  data: DashboardSummary | undefined;
  isLoading: boolean;
}

function kpiSkeleton() {
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-5">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-7 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function DashboardKpiGrid({ data, isLoading }: DashboardKpiGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>{kpiSkeleton()}</div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const changePct = data.crime_change_percentage;
  const changeTrend =
    changePct == null ? "neutral" : changePct > 0 ? "up" : "down";
  const changeTrendValue =
    changePct == null
      ? undefined
      : `${changePct > 0 ? "+" : ""}${changePct.toFixed(1)}% vs prior`;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      <MetricCard
        title="Total Incidents"
        value={data.total_crimes.toLocaleString()}
        icon={Activity}
        iconColor="text-brand-600"
        trend={changeTrend}
        trendValue={changeTrendValue}
      />
      <MetricCard
        title="Open Cases"
        value={data.open_cases.toLocaleString()}
        icon={FolderOpen}
        iconColor="text-warning-600"
        subtitle={`${data.closed_cases.toLocaleString()} closed`}
      />
      <MetricCard
        title="High Severity"
        value={data.high_severity_cases.toLocaleString()}
        icon={AlertTriangle}
        iconColor="text-danger-600"
        subtitle="cases requiring attention"
      />
      <MetricCard
        title="Avg Severity"
        value={data.avg_severity_score != null ? data.avg_severity_score.toFixed(2) : "—"}
        icon={TrendingUp}
        iconColor="text-orange-600"
        subtitle="severity score (0–10)"
      />
      <MetricCard
        title="Districts"
        value={data.unique_districts}
        icon={MapPin}
        iconColor="text-intelligence-600"
        subtitle={`${data.unique_police_stations} police stations`}
      />
      <MetricCard
        title="Closed Cases"
        value={data.closed_cases.toLocaleString()}
        icon={FolderCheck}
        iconColor="text-success-600"
        subtitle={`of ${data.total_crimes} total`}
      />
    </div>
  );
}
