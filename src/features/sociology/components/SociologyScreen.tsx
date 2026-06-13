"use client";

import { useState } from "react";
import { useSociologyInsights, useDistrictProfiles, useRiskFactors, useCorrelations } from "../hooks";
import { DataTable } from "@/components/grounded/DataTable";
import { Badge } from "@/components/foundation/Badge";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { severityClassMap } from "@/theme/badges";
import { cn } from "@/lib/utils";
import type { SociologyInsight, DistrictSocioProfile, RiskFactor, Correlation } from "../types";
import type { Column } from "@/components/grounded/DataTable";

type Tab = "insights" | "districts" | "risk-factors" | "correlations";

const TABS: { id: Tab; label: string }[] = [
  { id: "insights", label: "Insights" },
  { id: "districts", label: "District Profiles" },
  { id: "risk-factors", label: "Risk Factors" },
  { id: "correlations", label: "Correlations" },
];

const insightColumns: Column<SociologyInsight>[] = [
  {
    key: "title",
    header: "Insight",
    render: (row) => <span className="font-medium text-navy-900 text-sm">{row.title}</span>,
  },
  {
    key: "insight_type",
    header: "Type",
    render: (row) => <Badge variant="default">{row.insight_type.replaceAll("_", " ")}</Badge>,
  },
  {
    key: "severity",
    header: "Severity",
    render: (row) => (
      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", severityClassMap[row.severity] ?? severityClassMap.LOW)}>
        {row.severity}
      </span>
    ),
  },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (row) => <span className="text-xs text-navy-600">{(row.confidence_score * 100).toFixed(0)}%</span>,
  },
  {
    key: "district_name",
    header: "District",
    render: (row) => <span className="text-xs text-navy-500">{row.district_name ?? "All"}</span>,
  },
  {
    key: "period_year",
    header: "Year",
    align: "center",
    render: (row) => <span className="text-xs text-navy-500">{row.period_year}</span>,
  },
];

const districtColumns: Column<DistrictSocioProfile>[] = [
  {
    key: "district_name",
    header: "District",
    render: (row) => <span className="font-medium text-navy-900">{row.district_name ?? row.district_id.slice(0, 8)}</span>,
  },
  { key: "snapshot_year", header: "Year", align: "center" },
  {
    key: "literacy_rate",
    header: "Literacy %",
    align: "center",
    render: (row) => <span className="text-xs">{row.literacy_rate == null ? "—" : `${(row.literacy_rate * 100).toFixed(1)}%`}</span>,
  },
  {
    key: "unemployment_rate",
    header: "Unemployment %",
    align: "center",
    render: (row) => <span className="text-xs">{row.unemployment_rate == null ? "—" : `${(row.unemployment_rate * 100).toFixed(1)}%`}</span>,
  },
  {
    key: "economic_stress_index",
    header: "Economic Stress",
    align: "center",
    render: (row) => <span className="text-xs">{row.economic_stress_index?.toFixed(2) ?? "—"}</span>,
  },
  {
    key: "youth_population_ratio",
    header: "Youth Ratio",
    align: "center",
    render: (row) => <span className="text-xs">{row.youth_population_ratio == null ? "—" : `${(row.youth_population_ratio * 100).toFixed(1)}%`}</span>,
  },
];

const riskColumns: Column<RiskFactor>[] = [
  {
    key: "rank",
    header: "#",
    align: "center",
    render: (row) => (
      <span className={cn(
        "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
        row.rank <= 3 ? "bg-danger-100 text-danger-700" : "bg-navy-100 text-navy-600"
      )}>
        {row.rank}
      </span>
    ),
  },
  {
    key: "indicator_name",
    header: "Indicator",
    render: (row) => <span className="font-medium text-navy-900">{row.indicator_name.replaceAll("_", " ")}</span>,
  },
  {
    key: "avg_association_score",
    header: "Avg Score",
    align: "center",
    render: (row) => <span className="text-xs font-semibold text-navy-700">{row.avg_association_score.toFixed(3)}</span>,
  },
  {
    key: "district_count",
    header: "Districts",
    align: "center",
    render: (row) => <span className="text-xs text-navy-600">{row.district_count}</span>,
  },
  {
    key: "top_crime_categories",
    header: "Top Crime Types",
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.top_crime_categories.slice(0, 3).map((c) => (
          <span key={c} className="text-[10px] bg-navy-100 text-navy-600 rounded px-1.5 py-0.5">{c}</span>
        ))}
      </div>
    ),
  },
];

const correlationColumns: Column<Correlation>[] = [
  {
    key: "indicator_name",
    header: "Indicator",
    render: (row) => <span className="font-medium text-navy-900">{row.indicator_name.replaceAll("_", " ")}</span>,
  },
  {
    key: "crime_category_code",
    header: "Crime Category",
    render: (row) => <span className="text-xs text-navy-600">{row.crime_category_code ?? "—"}</span>,
  },
  {
    key: "correlation_score",
    header: "Score",
    align: "center",
    render: (row) => (
      <span className={cn("text-xs font-semibold", row.correlation_score > 0 ? "text-danger-600" : "text-success-600")}>
        {row.correlation_score > 0 ? "+" : ""}{row.correlation_score.toFixed(3)}
      </span>
    ),
  },
  {
    key: "direction",
    header: "Direction",
    align: "center",
    render: (row) => (
      <Badge variant={row.direction === "POSITIVE" ? "danger" : "success"}>
        {row.direction}
      </Badge>
    ),
  },
  { key: "district_name", header: "District", render: (row) => <span className="text-xs text-navy-500">{row.district_name ?? "—"}</span> },
  { key: "period_year", header: "Year", align: "center", render: (row) => <span className="text-xs text-navy-500">{row.period_year}</span> },
];

function InsightsTab() {
  const { data, isLoading } = useSociologyInsights();
  return (
    <DataTable
      columns={insightColumns}
      data={data?.items ?? []}
      keyExtractor={(row) => row.id}
      isLoading={isLoading}
      emptyTitle="No insights found"
      emptyDescription="Run the Sociology Insights job from Admin Jobs to generate insights."
    />
  );
}

function DistrictsTab() {
  const { data, isLoading } = useDistrictProfiles();
  return (
    <>
      {data?.disclaimer && <DisclaimerBox text={data.disclaimer} />}
      <DataTable
        columns={districtColumns}
        data={data?.items ?? []}
        keyExtractor={(row) => row.district_id}
        isLoading={isLoading}
        emptyTitle="No district profiles found"
      />
    </>
  );
}

function RiskFactorsTab() {
  const { data, isLoading } = useRiskFactors();
  return (
    <>
      {data?.source_note && <DisclaimerBox text={data.source_note} />}
      <DataTable
        columns={riskColumns}
        data={data?.items ?? []}
        keyExtractor={(row) => String(row.rank)}
        isLoading={isLoading}
        emptyTitle="No risk factors found"
      />
    </>
  );
}

function CorrelationsTab() {
  const { data, isLoading } = useCorrelations();
  return (
    <DataTable
      columns={correlationColumns}
      data={data?.items ?? []}
      keyExtractor={(row) => row.id}
      isLoading={isLoading}
      emptyTitle="No correlations found"
    />
  );
}

export function SociologyScreen() {
  const [tab, setTab] = useState<Tab>("insights");

  return (
    <div className="flex flex-col gap-5">
      <DisclaimerBox text="Sociological insights represent observed associations in synthetic data, not causal conclusions. Do not use for policy decisions or public reporting without independent expert review." />

      <div className="flex border-b border-navy-200 gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold border-b-2 transition-colors -mb-px",
              tab === t.id
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-navy-500 hover:text-navy-800"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "insights" && <InsightsTab />}
      {tab === "districts" && <DistrictsTab />}
      {tab === "risk-factors" && <RiskFactorsTab />}
      {tab === "correlations" && <CorrelationsTab />}
    </div>
  );
}
