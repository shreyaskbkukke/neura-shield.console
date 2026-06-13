"use client";

import { Activity, BarChart3, Database, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { SummaryStrip } from "@/components/grounded/SummaryStrip";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { ErrorState } from "@/components/foundation/ErrorState";
import { Skeleton } from "@/components/foundation/Skeleton";
import { cn } from "@/lib/utils";
import { qualityClassMap, freshnessClassMap, driftSeverityClassMap } from "@/theme/badges";
import { titleCase } from "@/lib/formatters";
import {
  useForecastQuality,
  useModelDrift,
  useDataFreshness,
  useMonitoringSummary,
} from "../hooks";
import type { ForecastQualitySnapshot, ModelDriftMetric, DataFreshnessCheck } from "../types";

function QualityBadge({ level }: { level: string }) {
  const classes = qualityClassMap[level] ?? "bg-navy-100 text-navy-600 border-navy-300";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", classes)}>
      {titleCase(level)}
    </span>
  );
}

function FreshnessBadge({ status }: { status: string }) {
  const classes = freshnessClassMap[status] ?? "bg-navy-100 text-navy-600 border-navy-300";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", classes)}>
      {titleCase(status)}
    </span>
  );
}

function DriftBadge({ severity }: { severity: string }) {
  const classes = driftSeverityClassMap[severity] ?? "bg-navy-100 text-navy-600 border-navy-300";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", classes)}>
      {severity}
    </span>
  );
}

const qualityColumns: Column<ForecastQualitySnapshot>[] = [
  {
    key: "model_name",
    header: "Model",
    render: (r) => (
      <div>
        <p className="text-xs font-medium text-navy-800">{r.model_name} v{r.model_version}</p>
        <p className="text-[11px] text-navy-400">{r.forecast_type}</p>
      </div>
    ),
  },
  { key: "quality_level", header: "Quality", align: "center", render: (r) => <QualityBadge level={r.quality_level} /> },
  {
    key: "quality_score",
    header: "Score",
    align: "right",
    render: (r) => <span className="text-xs font-medium text-navy-800">{(r.quality_score * 100).toFixed(0)}%</span>,
  },
  {
    key: "mae",
    header: "MAE",
    align: "right",
    render: (r) => <span className="text-xs text-navy-600">{r.mae?.toFixed(3) ?? "—"}</span>,
  },
  {
    key: "forecast_count",
    header: "Forecasts",
    align: "right",
    render: (r) => r.forecast_count,
  },
];

const driftColumns: Column<ModelDriftMetric>[] = [
  {
    key: "model_name",
    header: "Model",
    render: (r) => (
      <div>
        <p className="text-xs font-medium text-navy-800">{r.model_name}</p>
        <p className="text-[11px] text-navy-400">{r.metric_type.replace(/_/g, " ")}</p>
      </div>
    ),
  },
  { key: "severity", header: "Drift", align: "center", render: (r) => <DriftBadge severity={r.severity} /> },
  {
    key: "drift_score",
    header: "Score",
    align: "right",
    render: (r) => <span className="text-xs font-medium text-navy-800">{r.drift_score.toFixed(3)}</span>,
  },
  {
    key: "metric_value",
    header: "Value",
    align: "right",
    render: (r) => <span className="text-xs text-navy-600">{r.metric_value.toFixed(3)}</span>,
  },
];

const freshnessColumns: Column<DataFreshnessCheck>[] = [
  {
    key: "source_table",
    header: "Source",
    render: (r) => (
      <div>
        <p className="text-xs font-mono font-medium text-navy-800">{r.source_table}</p>
        <p className="text-[11px] text-navy-400">{r.source_type}</p>
      </div>
    ),
  },
  { key: "status", header: "Status", align: "center", render: (r) => <FreshnessBadge status={r.status} /> },
  {
    key: "actual_age_hours",
    header: "Age (h)",
    align: "right",
    render: (r) => (
      <span className="text-xs text-navy-600">
        {r.actual_age_hours != null ? r.actual_age_hours.toFixed(1) : "—"}
      </span>
    ),
  },
  {
    key: "expected_max_age_hours",
    header: "Max (h)",
    align: "right",
    render: (r) => (
      <span className="text-xs text-navy-400">
        {r.expected_max_age_hours ?? "—"}
      </span>
    ),
  },
];

export function MonitoringScreen() {
  const qualityQuery = useForecastQuality();
  const driftQuery = useModelDrift();
  const freshnessQuery = useDataFreshness();
  const summaryQuery = useMonitoringSummary();

  const summary = summaryQuery.data;

  return (
    <div className="space-y-5">
      <DisclaimerBox text="Model monitoring metrics are statistical quality indicators. They describe historical forecast accuracy — not real-time predictive reliability. Monitor trends across multiple runs before drawing conclusions." />

      {/* Overall status */}
      {summaryQuery.isLoading ? (
        <Skeleton className="h-16 rounded-xl" />
      ) : summary && (
        <div className="rounded-xl border border-navy-200 bg-white px-5 py-4 flex items-center gap-4">
          <CheckCircle2 size={20} className={
            summary.overall_status === "HEALTHY"
              ? "text-success-600"
              : summary.overall_status === "DEGRADED"
                ? "text-warning-600"
                : "text-danger-600"
          } />
          <div>
            <p className="text-sm font-semibold text-navy-900">
              System Status:{" "}
              <span className={
                summary.overall_status === "HEALTHY"
                  ? "text-success-600"
                  : summary.overall_status === "DEGRADED"
                    ? "text-warning-600"
                    : "text-danger-600"
              }>
                {summary.overall_status}
              </span>
            </p>
            <p className="text-xs text-navy-400 mt-0.5">{summary.disclaimer}</p>
          </div>
        </div>
      )}

      {/* Summary strip */}
      {summary && (
        <SummaryStrip
          items={[
            { label: "Good Quality", value: summary.forecast_quality.GOOD ?? 0, variant: "success" },
            { label: "Weak Quality", value: summary.forecast_quality.WEAK ?? 0, variant: "warning" },
            { label: "High Drift", value: summary.model_drift.HIGH ?? 0, variant: "warning" },
            { label: "Critical Drift", value: summary.model_drift.CRITICAL ?? 0, variant: "danger" },
            { label: "Stale Sources", value: summary.data_freshness.STALE ?? 0, variant: "warning" },
            { label: "Missing Sources", value: summary.data_freshness.MISSING ?? 0, variant: "danger" },
          ]}
        />
      )}

      <div className="space-y-5">
        {/* Forecast quality */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <BarChart3 size={14} className="text-brand-600" />
            <p className="text-sm font-semibold text-navy-900">Forecast Quality</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {qualityQuery.isError ? (
              <ErrorState title="Failed to load quality metrics" message={qualityQuery.error?.message} />
            ) : (
              <DataTable
                columns={qualityColumns}
                data={qualityQuery.data?.items ?? []}
                keyExtractor={(r) => r.id}
                isLoading={qualityQuery.isLoading}
                emptyTitle="No quality snapshots"
                emptyDescription="Run the model monitoring job to compute quality metrics"
              />
            )}
          </CardContent>
        </Card>

        {/* Model drift */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <Activity size={14} className="text-warning-600" />
            <p className="text-sm font-semibold text-navy-900">Model Drift</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {driftQuery.isError ? (
              <ErrorState title="Failed to load drift metrics" message={driftQuery.error?.message} />
            ) : (
              <DataTable
                columns={driftColumns}
                data={driftQuery.data?.items ?? []}
                keyExtractor={(r) => r.id}
                isLoading={driftQuery.isLoading}
                emptyTitle="No drift metrics"
              />
            )}
          </CardContent>
        </Card>

        {/* Data freshness */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <Database size={14} className="text-intelligence-600" />
            <p className="text-sm font-semibold text-navy-900">Data Freshness</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {freshnessQuery.isError ? (
              <ErrorState title="Failed to load freshness checks" message={freshnessQuery.error?.message} />
            ) : (
              <DataTable
                columns={freshnessColumns}
                data={freshnessQuery.data?.items ?? []}
                keyExtractor={(r) => r.id}
                isLoading={freshnessQuery.isLoading}
                emptyTitle="No freshness checks"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
