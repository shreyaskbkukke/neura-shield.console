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
import { PreventionDetailDrawer } from "./PreventionDetailDrawer";
import { usePreventionRecommendations, usePreventionSummary } from "../hooks";
import { useAuthStore } from "@/stores/authStore";
import type { PreventionRecommendation, PreventionFilters } from "../types";

const columns: Column<PreventionRecommendation>[] = [
  {
    key: "title",
    header: "Recommendation",
    render: (r) => (
      <div>
        <p className="text-xs font-medium text-navy-800 line-clamp-1">{r.title}</p>
        <p className="text-[11px] text-navy-400">{r.recommendation_type.replace(/_/g, " ")}</p>
      </div>
    ),
  },
  { key: "priority", header: "Priority", align: "center", render: (r) => <SeverityBadge severity={r.priority} /> },
  { key: "status", header: "Status", align: "center", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (r) => <ConfidenceScore score={r.confidence_score} />,
  },
  {
    key: "suggested_actions",
    header: "Actions",
    align: "right",
    render: (r) => <span className="text-xs text-navy-600">{r.suggested_actions.length}</span>,
  },
];

export function PreventionScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<PreventionFilters>({});

  const listQuery = usePreventionRecommendations(filters);
  const summaryQuery = usePreventionSummary();
  const { hasPermission } = useAuthStore();
  const canUpdate = hasPermission("alert.update");

  const summary = summaryQuery.data;

  return (
    <div className="space-y-5">
      <DisclaimerBox text="Prevention recommendations are decision-support review suggestions derived from early warning signals. These are not enforcement orders. All suggestions require review by the responsible officer before any operational action." />

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

      {/* Status filter */}
      <div className="flex flex-wrap items-center gap-2">
        {(["OPEN", "ACKNOWLEDGED", "UNDER_REVIEW", "IMPLEMENTED", "DISMISSED"] as const).map((s) => (
          <button
            key={s}
            onClick={() =>
              setFilters((f) => ({ ...f, status: f.status === s ? undefined : s }))
            }
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
              filters.status === s
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-navy-200 bg-white text-navy-600 hover:bg-navy-50"
            }`}
          >
            {s.replace(/_/g, " ")}
          </button>
        ))}
        {filters.status && (
          <button
            onClick={() => setFilters((f) => ({ ...f, status: undefined }))}
            className="text-[11px] text-navy-400 hover:text-navy-700 ml-1"
          >
            Clear
          </button>
        )}
      </div>

      {listQuery.isError ? (
        <ErrorState
          title="Failed to load recommendations"
          message={listQuery.error?.message}
          onRetry={() => void listQuery.refetch()}
        />
      ) : (
        <DataTable
          columns={columns}
          data={listQuery.data?.items ?? []}
          keyExtractor={(r) => r.id}
          isLoading={listQuery.isLoading}
          emptyTitle="No prevention recommendations"
          emptyDescription="Run the prevention recommendation job to generate suggestions"
          onRowClick={(r) => setSelectedId(r.id)}
        />
      )}

      <PreventionDetailDrawer
        recommendationId={selectedId}
        onClose={() => setSelectedId(null)}
        canUpdate={canUpdate}
      />
    </div>
  );
}
