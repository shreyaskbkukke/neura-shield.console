"use client";

import { useState } from "react";
import { Layers, History } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { SummaryStrip } from "@/components/grounded/SummaryStrip";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { InsightSection } from "@/components/grounded/InsightSection";
import { ErrorState } from "@/components/foundation/ErrorState";
import { useForecastFeatures, useBacktestWindows } from "../hooks";
import { formatDate } from "@/lib/formatters";
import type { CrimeForecastFeature, ForecastBacktestWindow, ForecastFeatureFilters } from "../types";

const featureColumns: Column<CrimeForecastFeature>[] = [
  {
    key: "feature_key",
    header: "Entity",
    render: (r) => (
      <div>
        <p className="text-xs font-medium text-navy-800">{r.entity_type}</p>
        <p className="text-[10px] text-navy-400">{formatDate(r.period_start)} – {formatDate(r.period_end)}</p>
      </div>
    ),
  },
  {
    key: "crime_count",
    header: "Crimes",
    align: "right",
    render: (r) => <span className="text-xs font-semibold text-navy-800">{r.crime_count}</span>,
  },
  {
    key: "crime_count_7d",
    header: "7d / 30d",
    align: "right",
    render: (r) => <span className="text-xs text-navy-600">{r.crime_count_7d} / {r.crime_count_30d}</span>,
  },
  {
    key: "growth_rate",
    header: "Growth",
    align: "right",
    render: (r) =>
      r.growth_rate == null ? (
        <span className="text-xs text-navy-300">—</span>
      ) : (
        <span className={`text-xs font-medium ${r.growth_rate >= 0 ? "text-danger-600" : "text-success-600"}`}>
          {r.growth_rate >= 0 ? "+" : ""}{(r.growth_rate * 100).toFixed(1)}%
        </span>
      ),
  },
  {
    key: "hotspot_count",
    header: "Hotspots / Alerts",
    align: "right",
    render: (r) => <span className="text-xs text-navy-600">{r.hotspot_count} / {r.alert_count}</span>,
  },
  {
    key: "sociology_risk_score",
    header: "Risk Score",
    align: "right",
    render: (r) => (
      <span className="text-xs font-medium text-navy-800">
        {r.sociology_risk_score != null ? r.sociology_risk_score.toFixed(2) : "—"}
      </span>
    ),
  },
];

const windowColumns: Column<ForecastBacktestWindow>[] = [
  { key: "window_name", header: "Window", render: (r) => <span className="text-xs font-medium text-navy-800">{r.window_name}</span> },
  {
    key: "train_start",
    header: "Train Period",
    render: (r) => <span className="text-xs text-navy-600">{formatDate(r.train_start)} – {formatDate(r.train_end)}</span>,
  },
  {
    key: "test_start",
    header: "Test Period",
    render: (r) => <span className="text-xs text-navy-600">{formatDate(r.test_start)} – {formatDate(r.test_end)}</span>,
  },
  { key: "granularity", header: "Granularity", align: "center", render: (r) => <span className="text-xs text-navy-500">{r.granularity}</span> },
];

export function ForecastFeaturesScreen() {
  const [filters, setFilters] = useState<ForecastFeatureFilters>({});
  const [selectedFeature, setSelectedFeature] = useState<CrimeForecastFeature | null>(null);

  const featuresQuery = useForecastFeatures(filters);
  const windowsQuery = useBacktestWindows();

  const features = featuresQuery.data?.items ?? [];
  const windows = windowsQuery.data?.items ?? [];

  const avgCrimeCount7d =
    features.length > 0 ? features.reduce((s, f) => s + f.crime_count_7d, 0) / features.length : 0;
  const avgGrowthRate = (() => {
    const withGrowth = features.filter((f) => f.growth_rate != null);
    if (withGrowth.length === 0) return null;
    return withGrowth.reduce((s, f) => s + (f.growth_rate ?? 0), 0) / withGrowth.length;
  })();

  return (
    <div className="space-y-5">
      <DisclaimerBox text="Feature windows are engineered inputs to the forecasting models — rolled-up crime counts and cross-domain signals per district/station per period. They are not predictions themselves; see Crime Forecasts for model output." />

      {featuresQuery.isLoading ? null : (
        <SummaryStrip
          items={[
            { label: "Feature Rows", value: featuresQuery.data?.total ?? 0 },
            { label: "Backtest Windows", value: windowsQuery.data?.total ?? 0 },
            { label: "Avg 7d Crime Count", value: avgCrimeCount7d.toFixed(1) },
            {
              label: "Avg Growth Rate",
              value: avgGrowthRate == null ? "—" : `${avgGrowthRate >= 0 ? "+" : ""}${(avgGrowthRate * 100).toFixed(1)}%`,
              variant: avgGrowthRate != null && avgGrowthRate >= 0 ? "danger" : "success",
            },
          ]}
        />
      )}

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.entity_type ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, entity_type: e.target.value || undefined }))}
          className="h-8 rounded-lg border border-navy-200 bg-white px-2 text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All entity types</option>
          <option value="DISTRICT">District</option>
          <option value="STATION">Station</option>
        </select>
        <select
          value={filters.granularity ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, granularity: e.target.value || undefined }))}
          className="h-8 rounded-lg border border-navy-200 bg-white px-2 text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All granularities</option>
          <option value="WEEKLY">Weekly</option>
        </select>
      </div>

      <Card>
        <div className="px-5 pt-4 pb-2 flex items-center gap-2">
          <Layers size={14} className="text-brand-600" />
          <p className="text-sm font-semibold text-navy-900">Feature Windows</p>
        </div>
        <CardContent className="pt-1 pb-4">
          {featuresQuery.isError ? (
            <ErrorState title="Failed to load feature windows" message={featuresQuery.error?.message} />
          ) : (
            <DataTable
              columns={featureColumns}
              data={features}
              keyExtractor={(r) => r.id}
              isLoading={featuresQuery.isLoading}
              emptyTitle="No feature windows"
              emptyDescription="Run the forecast-features job to generate weekly feature rows"
              onRowClick={setSelectedFeature}
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <div className="px-5 pt-4 pb-2 flex items-center gap-2">
          <History size={14} className="text-intelligence-600" />
          <p className="text-sm font-semibold text-navy-900">Backtest Windows</p>
        </div>
        <CardContent className="pt-1 pb-4">
          {windowsQuery.isError ? (
            <ErrorState title="Failed to load backtest windows" message={windowsQuery.error?.message} />
          ) : (
            <DataTable
              columns={windowColumns}
              data={windows}
              keyExtractor={(r) => r.id}
              isLoading={windowsQuery.isLoading}
              emptyTitle="No backtest windows"
              emptyDescription="Backtest windows are created alongside the forecast feature store"
            />
          )}
        </CardContent>
      </Card>

      <DetailDrawer
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature ? `${selectedFeature.entity_type} feature window` : ""}
        description={
          selectedFeature
            ? `${formatDate(selectedFeature.period_start)} – ${formatDate(selectedFeature.period_end)} · ${selectedFeature.granularity}`
            : undefined
        }
        width="md"
      >
        {selectedFeature && (
          <div className="space-y-4">
            <InsightSection title="Crime volume">
              <EvidencePanel
                title="Volume"
                evidence={{
                  crime_count: selectedFeature.crime_count,
                  crime_count_7d: selectedFeature.crime_count_7d,
                  crime_count_30d: selectedFeature.crime_count_30d,
                  crime_count_90d: selectedFeature.crime_count_90d,
                  previous_period_count: selectedFeature.previous_period_count,
                  growth_rate: selectedFeature.growth_rate,
                  moving_average_3: selectedFeature.moving_average_3,
                  moving_average_6: selectedFeature.moving_average_6,
                }}
              />
            </InsightSection>
            <InsightSection title="Cross-intelligence signals">
              <EvidencePanel
                title="Signals"
                evidence={{
                  hotspot_count: selectedFeature.hotspot_count,
                  alert_count: selectedFeature.alert_count,
                  anomaly_count: selectedFeature.anomaly_count,
                  pattern_count: selectedFeature.pattern_count,
                  repeat_offender_count: selectedFeature.repeat_offender_count,
                  high_risk_offender_count: selectedFeature.high_risk_offender_count,
                  sociology_risk_score: selectedFeature.sociology_risk_score,
                  dominant_mo_count: selectedFeature.dominant_mo_count,
                  mo_diversity_score: selectedFeature.mo_diversity_score,
                  behavior_profile_count: selectedFeature.behavior_profile_count,
                  high_habitual_score_count: selectedFeature.high_habitual_score_count,
                  graph_candidate_count: selectedFeature.graph_candidate_count,
                  financial_pattern_count: selectedFeature.financial_pattern_count,
                  money_trail_count: selectedFeature.money_trail_count,
                }}
              />
            </InsightSection>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
