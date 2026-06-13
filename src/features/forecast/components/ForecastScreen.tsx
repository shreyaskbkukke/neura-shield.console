"use client";

import { TrendingUp, Map, BarChart3, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { SummaryStrip } from "@/components/grounded/SummaryStrip";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { ErrorState } from "@/components/foundation/ErrorState";
import { useForecastRuns, useHotspotForecasts, useForecastEvaluations } from "../hooks";
import { formatDate } from "@/lib/formatters";
import type { HotspotForecast, ForecastEvaluation, ForecastRun } from "../types";

const runColumns: Column<ForecastRun>[] = [
  {
    key: "run_key",
    header: "Run",
    render: (r) => (
      <div>
        <p className="font-mono text-[11px] text-brand-600">{r.model_name} v{r.model_version}</p>
        <p className="text-[10px] text-navy-400">{formatDate(r.forecast_start)} – {formatDate(r.forecast_end)}</p>
      </div>
    ),
  },
  { key: "status", header: "Status", align: "center", render: (r) => <SeverityBadge severity={r.status} /> },
  { key: "total_forecasts_generated", header: "Forecasts", align: "right", render: (r) => r.total_forecasts_generated },
  { key: "total_districts", header: "Districts", align: "right", render: (r) => r.total_districts },
];

const hotspotColumns: Column<HotspotForecast>[] = [
  {
    key: "period_start",
    header: "Period",
    render: (r) => (
      <span className="text-xs text-navy-600">{formatDate(r.period_start)} – {formatDate(r.period_end)}</span>
    ),
  },
  {
    key: "predicted_hotspot_count",
    header: "Hotspots",
    align: "center",
    render: (r) => <span className="text-xs font-bold text-danger-600">{r.predicted_hotspot_count}</span>,
  },
  {
    key: "predicted_risk_score",
    header: "Risk Score",
    align: "center",
    render: (r) => <span className="text-xs font-medium text-navy-800">{r.predicted_risk_score.toFixed(2)}</span>,
  },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (r) => <ConfidenceScore score={r.confidence_score} />,
  },
];

const evalColumns: Column<ForecastEvaluation>[] = [
  {
    key: "model_name",
    header: "Model",
    render: (r) => (
      <div>
        <p className="text-xs font-medium text-navy-800">{r.model_name}</p>
        <p className="text-[11px] text-navy-400">{r.entity_type}</p>
      </div>
    ),
  },
  {
    key: "mean_absolute_error",
    header: "MAE",
    align: "right",
    render: (r) => <span className="text-xs text-navy-700">{r.mean_absolute_error.toFixed(3)}</span>,
  },
  {
    key: "root_mean_squared_error",
    header: "RMSE",
    align: "right",
    render: (r) => <span className="text-xs text-navy-700">{r.root_mean_squared_error.toFixed(3)}</span>,
  },
  {
    key: "coverage_rate",
    header: "Coverage",
    align: "right",
    render: (r) => <span className="text-xs text-navy-700">{(r.coverage_rate * 100).toFixed(1)}%</span>,
  },
];

export function ForecastScreen() {
  const runsQuery = useForecastRuns();
  const hotspotsQuery = useHotspotForecasts();
  const evaluationsQuery = useForecastEvaluations();

  const runs = runsQuery.data?.items ?? [];
  const hotspots = hotspotsQuery.data?.items ?? [];
  const evaluations = evaluationsQuery.data?.items ?? [];

  const latestRun = runs[0];
  const highRiskHotspots = hotspots.filter((h) => h.predicted_risk_score >= 0.7).length;
  const avgConfidence =
    hotspots.length > 0
      ? hotspots.reduce((s, h) => s + h.confidence_score, 0) / hotspots.length
      : 0;

  return (
    <div className="space-y-5">
      <DisclaimerBox text="Forecast estimates are statistical projections based on historical patterns. They are decision-support signals — not guarantees of future crime activity. All outputs require investigator review before operational use." />

      {/* KPI strip */}
      {runsQuery.isLoading ? (
        <div className="flex gap-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="flex-1 h-16 rounded-xl" />)}</div>
      ) : (
        <SummaryStrip
          items={[
            { label: "Forecast Runs", value: runsQuery.data?.total ?? 0 },
            { label: "Hotspot Forecasts", value: hotspotsQuery.data?.total ?? 0 },
            { label: "High Risk Hotspots", value: highRiskHotspots, variant: "danger" },
            { label: "Avg Confidence", value: `${(avgConfidence * 100).toFixed(0)}%`, variant: "brand" },
          ]}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Forecast runs */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <Activity size={14} className="text-brand-600" />
            <p className="text-sm font-semibold text-navy-900">Forecast Runs</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {runsQuery.isError ? (
              <ErrorState title="Failed to load runs" message={runsQuery.error?.message} />
            ) : (
              <DataTable
                columns={runColumns}
                data={runs}
                keyExtractor={(r) => r.id}
                isLoading={runsQuery.isLoading}
                emptyTitle="No forecast runs"
                emptyDescription="Run the forecast job to generate predictions"
              />
            )}
          </CardContent>
        </Card>

        {/* Latest run summary */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <TrendingUp size={14} className="text-intelligence-600" />
            <p className="text-sm font-semibold text-navy-900">Latest Run</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {!latestRun ? (
              <EmptyState icon={TrendingUp} title="No forecast runs yet" />
            ) : (
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Model", value: `${latestRun.model_name} v${latestRun.model_version}` },
                    { label: "Status", value: latestRun.status },
                    { label: "Period", value: `${formatDate(latestRun.forecast_start)} – ${formatDate(latestRun.forecast_end)}` },
                    { label: "Forecasts", value: latestRun.total_forecasts_generated },
                    { label: "Districts", value: latestRun.total_districts },
                    { label: "Weeks", value: latestRun.forecast_weeks },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-navy-400">{label}</p>
                      <p className="font-medium text-navy-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hotspot forecasts */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <Map size={14} className="text-danger-600" />
            <p className="text-sm font-semibold text-navy-900">Hotspot Forecasts</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {hotspotsQuery.isError ? (
              <ErrorState title="Failed to load hotspots" message={hotspotsQuery.error?.message} />
            ) : (
              <DataTable
                columns={hotspotColumns}
                data={hotspots}
                keyExtractor={(r) => r.id}
                isLoading={hotspotsQuery.isLoading}
                emptyTitle="No hotspot forecasts"
              />
            )}
          </CardContent>
        </Card>

        {/* Evaluations */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <BarChart3 size={14} className="text-success-600" />
            <p className="text-sm font-semibold text-navy-900">Forecast Evaluations</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {evaluationsQuery.isError ? (
              <ErrorState title="Failed to load evaluations" message={evaluationsQuery.error?.message} />
            ) : (
              <DataTable
                columns={evalColumns}
                data={evaluations}
                keyExtractor={(r) => r.id}
                isLoading={evaluationsQuery.isLoading}
                emptyTitle="No evaluations yet"
                emptyDescription="Evaluations are computed after forecast runs complete"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
