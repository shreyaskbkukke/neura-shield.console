"use client";

import { useState } from "react";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { SummaryStrip } from "@/components/grounded/SummaryStrip";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { ErrorState } from "@/components/foundation/ErrorState";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EarlyWarningDetailDrawer } from "./EarlyWarningDetailDrawer";
import { useEarlyWarnings, useEarlyWarningSummary } from "../hooks";
import { useAuthStore } from "@/stores/authStore";
import { formatDate } from "@/lib/formatters";
import type { EarlyWarning, EarlyWarningFilters } from "../types";

const columns: Column<EarlyWarning>[] = [
  {
    key: "title",
    header: "Signal",
    render: (r) => (
      <div>
        <p className="text-xs font-medium text-navy-800 line-clamp-1">{r.title}</p>
        <p className="text-[11px] text-navy-400">{r.warning_type.replace(/_/g, " ")}</p>
      </div>
    ),
  },
  { key: "severity", header: "Severity", align: "center", render: (r) => <SeverityBadge severity={r.severity} /> },
  { key: "status", header: "Status", align: "center", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (r) => <ConfidenceScore score={r.confidence_score} />,
  },
  {
    key: "forecast_period_start",
    header: "Period",
    render: (r) =>
      r.forecast_period_start ? (
        <span className="text-xs text-navy-500">{formatDate(r.forecast_period_start)}</span>
      ) : (
        <span className="text-xs text-navy-400">—</span>
      ),
  },
];

export function EarlyWarningsScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<EarlyWarningFilters>({});

  const listQuery = useEarlyWarnings(filters);
  const summaryQuery = useEarlyWarningSummary();
  const { hasPermission } = useAuthStore();
  const canUpdate = hasPermission("alert.update");

  const summary = summaryQuery.data;

  return (
    <div className="space-y-5">
      <DisclaimerBox text="Early warning signals are forecast-based decision-support outputs. They represent projected risk indicators — not confirmed criminal activity. All signals require investigator review before operational action." />

      {summaryQuery.isLoading ? (
        <div className="flex gap-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="flex-1 h-16 rounded-xl" />)}</div>
      ) : summary && (
        <SummaryStrip
          items={[
            { label: "Total Open", value: summary.total_open, variant: "brand" },
            { label: "Critical", value: summary.critical, variant: "danger" },
            { label: "High", value: summary.high, variant: "warning" },
            { label: "Medium", value: summary.medium },
            { label: "Low", value: summary.low, variant: "success" },
          ]}
        />
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((s) => (
          <button
            key={s}
            onClick={() =>
              setFilters((f) => ({ ...f, severity: f.severity === s ? undefined : s }))
            }
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
              filters.severity === s
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-navy-200 bg-white text-navy-600 hover:bg-navy-50"
            }`}
          >
            {s}
          </button>
        ))}
        {filters.severity && (
          <button
            onClick={() => setFilters((f) => ({ ...f, severity: undefined }))}
            className="text-[11px] text-navy-400 hover:text-navy-700 ml-1"
          >
            Clear
          </button>
        )}
      </div>

      {listQuery.isError ? (
        <ErrorState
          title="Failed to load early warnings"
          message={listQuery.error?.message}
          onRetry={() => void listQuery.refetch()}
        />
      ) : (
        <DataTable
          columns={columns}
          data={listQuery.data?.items ?? []}
          keyExtractor={(r) => r.id}
          isLoading={listQuery.isLoading}
          emptyTitle="No early warnings"
          emptyDescription="Run the early warning job to generate forecast-based signals"
          onRowClick={(r) => setSelectedId(r.id)}
        />
      )}

      <EarlyWarningDetailDrawer
        warningId={selectedId}
        onClose={() => setSelectedId(null)}
        canUpdate={canUpdate}
      />
    </div>
  );
}
