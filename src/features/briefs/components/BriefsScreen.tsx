"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { ErrorState } from "@/components/foundation/ErrorState";
import { GenerateBriefPanel } from "./GenerateBriefPanel";
import { BriefDetail } from "./BriefDetail";
import { useBriefs } from "../hooks";
import type { IntelligenceBriefSchema } from "../types";

const columns: Column<IntelligenceBriefSchema>[] = [
  {
    key: "title",
    header: "Brief",
    render: (row) => (
      <div>
        <p className="text-xs font-medium text-navy-800 line-clamp-1">{row.title}</p>
        <p className="text-[11px] text-navy-400">{row.brief_type.replace("_", " ")}</p>
      </div>
    ),
  },
  {
    key: "risk_level",
    header: "Risk",
    align: "center",
    render: (row) => row.risk_level ? <SeverityBadge severity={row.risk_level} /> : <span className="text-navy-400">—</span>,
  },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (row) => <ConfidenceScore score={row.confidence_score} />,
  },
  {
    key: "created_at",
    header: "Generated",
    align: "right",
    render: (row) => (
      <span className="text-xs text-navy-500">
        {new Date(row.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
      </span>
    ),
  },
];

export function BriefsScreen() {
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);

  const briefsQuery = useBriefs();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Left: list + generate */}
      <div className="lg:col-span-1 space-y-4">
        <GenerateBriefPanel />

        {briefsQuery.isError ? (
          <ErrorState title="Failed to load briefs" message={briefsQuery.error?.message} onRetry={() => void briefsQuery.refetch()} />
        ) : (
          <DataTable
            columns={columns}
            data={briefsQuery.data?.items ?? []}
            keyExtractor={(row) => row.id}
            isLoading={briefsQuery.isLoading}
            emptyTitle="No briefs"
            emptyDescription="Generate a brief above to start"
            onRowClick={(row) => setSelectedBriefId(row.id)}
          />
        )}
      </div>

      {/* Right: brief detail */}
      <div className="lg:col-span-2 rounded-xl border border-navy-200 bg-white p-5 overflow-y-auto max-h-[calc(100vh-14rem)]">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-100">
          <FileText size={14} className="text-purple-600" />
          <p className="text-sm font-semibold text-navy-900">Brief Content</p>
        </div>
        <BriefDetail briefId={selectedBriefId} />
      </div>
    </div>
  );
}
