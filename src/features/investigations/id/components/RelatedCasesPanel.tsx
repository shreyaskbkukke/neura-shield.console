import { Link2 } from "lucide-react";
import { InsightSection } from "@/components/grounded/InsightSection";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { useRelatedCases } from "../../hooks";

interface RelatedCasesPanelProps {
  investigationId: string;
  hasLinkedIncident: boolean;
}

export function RelatedCasesPanel({
  investigationId,
  hasLinkedIncident,
}: RelatedCasesPanelProps) {
  const relatedQuery = useRelatedCases(hasLinkedIncident ? investigationId : null);

  if (!hasLinkedIncident) {
    return (
      <InsightSection title="Related Cases" icon={Link2}>
        <p className="text-xs text-navy-400">No linked crime incident — related cases unavailable.</p>
      </InsightSection>
    );
  }

  return (
    <InsightSection title="Related Cases" icon={Link2}>
      {relatedQuery.isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !relatedQuery.data?.length ? (
        <EmptyState icon={Link2} title="No related cases found" />
      ) : (
        <div className="space-y-2">
          {relatedQuery.data.map((c) => (
            <div
              key={c.crime_incident_id}
              className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-medium text-brand-600">
                  {c.incident_number}
                </span>
                <div className="flex items-center gap-1.5">
                  {c.severity_score != null && (
                    <span className="text-[10px] text-navy-500">
                      score {c.severity_score.toFixed(1)}
                    </span>
                  )}
                  <SeverityBadge severity={c.status} />
                </div>
              </div>
              <p className="text-xs text-navy-700 line-clamp-1">{c.title}</p>
              <p className="text-[10px] text-navy-400">
                Relevance: {c.relevance_score}
              </p>
            </div>
          ))}
        </div>
      )}
    </InsightSection>
  );
}
