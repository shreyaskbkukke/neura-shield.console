"use client";

import { useState } from "react";
import { AlertTriangle, Network } from "lucide-react";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { InsightSection } from "@/components/grounded/InsightSection";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { MetricCard } from "@/components/grounded/MetricCard";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { ErrorState } from "@/components/foundation/ErrorState";
import { Skeleton } from "@/components/foundation/Skeleton";
import { useSuspiciousPatterns, useTransactionNetwork } from "../hooks";
import type { SuspiciousPatternSchema } from "../types";

const columns: Column<SuspiciousPatternSchema>[] = [
  {
    key: "title",
    header: "Pattern",
    render: (row) => (
      <div>
        <p className="text-xs font-medium text-navy-800 line-clamp-1">{row.title}</p>
        <p className="text-[11px] text-navy-400">{row.pattern_type.replace(/_/g, " ")}</p>
      </div>
    ),
  },
  { key: "severity", header: "Severity", align: "center", render: (row) => <SeverityBadge severity={row.severity} /> },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (row) => <ConfidenceScore score={row.confidence_score} />,
  },
  {
    key: "involved_account_ids",
    header: "Accounts",
    align: "right",
    render: (row) => row.involved_account_ids.length,
  },
];

export function FinancialScreen() {
  const [selectedPattern, setSelectedPattern] = useState<SuspiciousPatternSchema | null>(null);

  const patternsQuery = useSuspiciousPatterns();
  const networkQuery = useTransactionNetwork();

  const patterns = patternsQuery.data?.items ?? [];
  const criticalCount = patterns.filter((p) => p.severity === "CRITICAL").length;
  const highCount = patterns.filter((p) => p.severity === "HIGH").length;
  const networkNodes = networkQuery.data?.nodes.length ?? 0;

  return (
    <div className="space-y-5">
      <DisclaimerBox text="Financial data shown represents recorded transaction links and analytical associations only. This is a decision-support tool — not a confirmed fraud determination. All findings require investigator verification." />

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard
          title="Total Patterns"
          value={patternsQuery.data?.total ?? "—"}
          icon={AlertTriangle}
          iconColor="text-danger-600"
        />
        <MetricCard title="Critical" value={criticalCount} icon={AlertTriangle} iconColor="text-danger-600" />
        <MetricCard title="High" value={highCount} icon={AlertTriangle} iconColor="text-orange-600" />
        <MetricCard title="Accounts in Network" value={networkNodes} icon={Network} iconColor="text-intelligence-600" />
      </div>

      {/* Transaction network summary */}
      {networkQuery.isLoading ? (
        <Skeleton className="h-16 w-full rounded-xl" />
      ) : networkQuery.data && (
        <div className="rounded-xl border border-navy-200 bg-navy-50 px-4 py-3 flex flex-wrap gap-4">
          <div className="text-xs text-navy-600">
            <span className="font-semibold text-navy-800">{networkQuery.data.nodes.length}</span> accounts ·{" "}
            <span className="font-semibold text-navy-800">{networkQuery.data.edges.length}</span> transaction links
          </div>
        </div>
      )}

      {/* Pattern table */}
      {patternsQuery.isError ? (
        <ErrorState title="Failed to load patterns" message={patternsQuery.error?.message} onRetry={() => void patternsQuery.refetch()} />
      ) : (
        <DataTable
          columns={columns}
          data={patterns}
          keyExtractor={(row) => row.id}
          isLoading={patternsQuery.isLoading}
          emptyTitle="No suspicious patterns"
          emptyDescription="Run the financial intelligence job to detect patterns"
          onRowClick={setSelectedPattern}
        />
      )}

      {/* Detail drawer */}
      <DetailDrawer
        isOpen={!!selectedPattern}
        onClose={() => setSelectedPattern(null)}
        title={selectedPattern?.title ?? ""}
        description={selectedPattern?.pattern_type.replace(/_/g, " ")}
        width="md"
      >
        {selectedPattern && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <SeverityBadge severity={selectedPattern.severity} />
              <ConfidenceScore score={selectedPattern.confidence_score} size="md" />
            </div>
            <p className="text-sm text-navy-700">{selectedPattern.summary}</p>
            <InsightSection title="Involvement">
              <div className="text-xs text-navy-600 space-y-1">
                <p><span className="font-medium">{selectedPattern.involved_account_ids.length}</span> accounts</p>
                <p><span className="font-medium">{selectedPattern.involved_transaction_ids.length}</span> transactions</p>
                <p><span className="font-medium">{selectedPattern.linked_crime_ids.length}</span> linked crimes</p>
              </div>
            </InsightSection>
            {Object.keys(selectedPattern.evidence).length > 0 && (
              <InsightSection title="Evidence">
                <EvidencePanel evidence={selectedPattern.evidence} />
              </InsightSection>
            )}
            <DisclaimerBox text={selectedPattern.disclaimer} />
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
