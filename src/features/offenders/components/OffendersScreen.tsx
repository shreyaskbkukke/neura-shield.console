"use client";

import { useState } from "react";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { RiskBadge } from "@/components/grounded/RiskBadge";
import { ErrorState } from "@/components/foundation/ErrorState";
import { FilterBar, FilterSelect } from "@/components/grounded/FilterBar";
import { OffenderProfilePanel } from "./OffenderProfilePanel";
import { useOffenders } from "../hooks";
import type { OffenderListItem } from "../types";

const RISK_OPTIONS = [
  { label: "All Risk Levels", value: "" },
  { label: "Critical", value: "CRITICAL" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

const columns: Column<OffenderListItem>[] = [
  {
    key: "full_name",
    header: "Name",
    render: (row) => (
      <div>
        <p className="text-xs font-medium text-navy-800">{row.full_name}</p>
        {row.alias_name && <p className="text-[11px] text-navy-400">a.k.a. {row.alias_name}</p>}
      </div>
    ),
  },
  { key: "district_name", header: "District", render: (row) => <span className="text-xs text-navy-600">{row.district_name ?? "—"}</span> },
  { key: "total_crimes", header: "Cases", align: "right", render: (row) => row.total_crimes },
  { key: "risk_score", header: "Score", align: "right", render: (row) => row.risk_score.toFixed(2) },
  {
    key: "risk_level",
    header: "Risk",
    align: "center",
    render: (row) => <RiskBadge riskLevel={row.risk_level} />,
  },
];

export function OffendersScreen() {
  const [riskFilter, setRiskFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const params: Record<string, string | number> = {};
  if (riskFilter) params.risk_level = riskFilter;

  const offendersQuery = useOffenders(params);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Left: offender list */}
      <div className="lg:col-span-2 space-y-3">
        <FilterBar>
          <FilterSelect
            label="Risk"
            value={riskFilter}
            options={RISK_OPTIONS}
            onChange={setRiskFilter}
          />
        </FilterBar>

        {offendersQuery.isError ? (
          <ErrorState title="Failed to load offenders" message={offendersQuery.error?.message} onRetry={() => void offendersQuery.refetch()} />
        ) : (
          <DataTable
            columns={columns}
            data={offendersQuery.data?.items ?? []}
            keyExtractor={(row) => row.id}
            isLoading={offendersQuery.isLoading}
            emptyTitle="No offenders found"
            emptyDescription="Adjust filters or run the offender intelligence job"
            onRowClick={(row) => setSelectedId(row.id)}
          />
        )}
      </div>

      {/* Right: profile panel */}
      <div className="lg:col-span-1 rounded-xl border border-navy-200 bg-white p-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
        <OffenderProfilePanel offenderId={selectedId} />
      </div>
    </div>
  );
}
