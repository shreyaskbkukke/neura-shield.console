"use client";

import { Brain, BookOpen, DollarSign, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { Skeleton } from "@/components/foundation/Skeleton";
import { ErrorState } from "@/components/foundation/ErrorState";
import { EmptyState } from "@/components/foundation/EmptyState";
import {
  useSociologyInsights,
  useMOPatterns,
  useFinancialPatternsSummary,
  useBriefsSummary,
} from "../hooks";

function SectionSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
    </div>
  );
}

export function IntelligenceScreen() {
  const sociologyQuery = useSociologyInsights();
  const moQuery = useMOPatterns();
  const financialQuery = useFinancialPatternsSummary();
  const briefsQuery = useBriefsSummary();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sociology Insights */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <Brain size={14} className="text-intelligence-600" />
            <p className="text-sm font-semibold text-navy-900">Sociology Insights</p>
          </div>
          <CardContent className="pt-1 pb-4 space-y-4">
            {sociologyQuery.isLoading ? <SectionSkeleton /> :
              sociologyQuery.isError ? <ErrorState title="Failed to load" message={sociologyQuery.error?.message} /> :
              !sociologyQuery.data || sociologyQuery.data.items.length === 0 ? (
                <EmptyState icon={Brain} title="No insights available" />
              ) : (
                <div className="space-y-2">
                  {sociologyQuery.data.items.map((insight) => (
                    <div key={insight.id} className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-navy-800 line-clamp-1">{insight.title}</p>
                        <SeverityBadge severity={insight.severity} />
                      </div>
                      <p className="text-[11px] text-navy-600 line-clamp-2">{insight.summary}</p>
                      <div className="flex items-center gap-2">
                        <ConfidenceScore score={insight.confidence_score} />
                        {insight.district_name && (
                          <span className="text-[11px] text-navy-400">{insight.district_name}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  <DisclaimerBox text={sociologyQuery.data.items[0]?.disclaimer ?? ""} compact />
                </div>
              )
            }
          </CardContent>
        </Card>

        {/* MO Patterns */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <BookOpen size={14} className="text-brand-600" />
            <p className="text-sm font-semibold text-navy-900">Modus Operandi Patterns</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {moQuery.isLoading ? <SectionSkeleton /> :
              moQuery.isError ? <ErrorState title="Failed to load" message={moQuery.error?.message} /> :
              !moQuery.data || moQuery.data.items.length === 0 ? (
                <EmptyState icon={BookOpen} title="No MO patterns" />
              ) : (
                <div className="space-y-2">
                  {moQuery.data.items.map((mo) => (
                    <div key={mo.id} className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-navy-800">{mo.mo_name}</p>
                        <span className="font-mono text-[11px] text-brand-600">{mo.mo_code}</span>
                      </div>
                      <p className="text-[11px] text-navy-600 line-clamp-2">{mo.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {mo.keywords.slice(0, 4).map((kw) => (
                          <span key={kw} className="rounded bg-brand-50 border border-brand-100 px-1.5 py-0.5 text-[10px] text-brand-700">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </CardContent>
        </Card>

        {/* Financial Patterns */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <DollarSign size={14} className="text-success-600" />
            <p className="text-sm font-semibold text-navy-900">Financial Patterns</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {financialQuery.isLoading ? <SectionSkeleton /> :
              financialQuery.isError ? <ErrorState title="Failed to load" message={financialQuery.error?.message} /> :
              !financialQuery.data || financialQuery.data.items.length === 0 ? (
                <EmptyState icon={DollarSign} title="No financial patterns" />
              ) : (
                <div className="space-y-2">
                  {financialQuery.data.items.map((p) => (
                    <div key={p.id} className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-navy-800 line-clamp-1">{p.title}</p>
                        <SeverityBadge severity={p.severity} />
                      </div>
                      <p className="text-[11px] text-navy-600 line-clamp-2">{p.summary}</p>
                      <ConfidenceScore score={p.confidence_score} />
                    </div>
                  ))}
                </div>
              )
            }
          </CardContent>
        </Card>

        {/* Cross-Intelligence Briefs */}
        <Card>
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <FileText size={14} className="text-purple-600" />
            <p className="text-sm font-semibold text-navy-900">Intelligence Briefs</p>
          </div>
          <CardContent className="pt-1 pb-4">
            {briefsQuery.isLoading ? <SectionSkeleton /> :
              briefsQuery.isError ? <ErrorState title="Failed to load" message={briefsQuery.error?.message} /> :
              !briefsQuery.data || briefsQuery.data.items.length === 0 ? (
                <EmptyState icon={FileText} title="No briefs generated" description="Use /briefs to generate intelligence briefs" />
              ) : (
                <div className="space-y-2">
                  {briefsQuery.data.items.map((brief) => (
                    <div key={brief.id} className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-navy-800 line-clamp-1">{brief.title}</p>
                        {brief.risk_level && <SeverityBadge severity={brief.risk_level} />}
                      </div>
                      <p className="text-[11px] text-navy-600 line-clamp-2">{brief.summary}</p>
                      <div className="flex items-center gap-2">
                        <ConfidenceScore score={brief.confidence_score} />
                        <span className="text-[11px] text-navy-400">{brief.brief_type.replace("_", " ")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
