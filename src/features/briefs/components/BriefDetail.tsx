"use client";

import { Skeleton } from "@/components/foundation/Skeleton";
import { ErrorState } from "@/components/foundation/ErrorState";
import { InsightSection } from "@/components/grounded/InsightSection";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { useBriefDetail } from "../hooks";

interface BriefDetailProps {
  briefId: string | null;
}

export function BriefDetail({ briefId }: BriefDetailProps) {
  const { data, isLoading, isError, error } = useBriefDetail(briefId);

  if (!briefId) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-navy-400">
        Select a brief to view its sections
      </div>
    );
  }

  if (isLoading) {
    return <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>;
  }

  if (isError || !data) {
    return <ErrorState title="Failed to load brief" message={error?.message} />;
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-bold text-navy-900">{data.title}</h2>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className="text-[11px] text-navy-500">{data.brief_type.replace("_", " ")}</span>
          <span className="text-[11px] text-navy-400">·</span>
          <span className="text-[11px] text-navy-500">{data.subject_type}</span>
          {data.risk_level && <SeverityBadge severity={data.risk_level} />}
          <ConfidenceScore score={data.confidence_score} />
        </div>
      </div>

      <p className="text-xs text-navy-700 leading-relaxed">{data.summary}</p>

      {data.sections.map((section) => (
        <InsightSection key={section.section_type} title={section.title}>
          <div className="rounded-lg border border-navy-100 bg-navy-50 p-3 space-y-2">
            <p className="text-xs text-navy-700">{section.summary}</p>
            {section.severity && <SeverityBadge severity={section.severity} />}
            {section.confidence_score != null && (
              <ConfidenceScore score={section.confidence_score} label="Section confidence" />
            )}
            {Object.keys(section.evidence).length > 0 && (
              <EvidencePanel evidence={section.evidence} />
            )}
          </div>
        </InsightSection>
      ))}

      {data.recommendations.length > 0 && (
        <InsightSection title="Recommendations">
          <ul className="space-y-1.5">
            {data.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-2 text-xs text-navy-700">
                <span className="text-brand-500 shrink-0">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </InsightSection>
      )}

      <DisclaimerBox text={data.disclaimer} />
    </div>
  );
}
