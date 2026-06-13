import { Users } from "lucide-react";
import { InsightSection } from "@/components/grounded/InsightSection";
import { RiskBadge } from "@/components/grounded/RiskBadge";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { useLinkedOffenders } from "../../hooks";

interface LinkedOffendersPanelProps {
  investigationId: string;
  hasLinkedIncident: boolean;
}

export function LinkedOffendersPanel({
  investigationId,
  hasLinkedIncident,
}: LinkedOffendersPanelProps) {
  const offendersQuery = useLinkedOffenders(hasLinkedIncident ? investigationId : null);

  if (!hasLinkedIncident) {
    return (
      <InsightSection title="Linked Offenders" icon={Users}>
        <p className="text-xs text-navy-400">No linked crime incident — offenders unavailable.</p>
      </InsightSection>
    );
  }

  return (
    <InsightSection title="Linked Offenders" icon={Users}>
      {offendersQuery.isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : !offendersQuery.data?.length ? (
        <EmptyState icon={Users} title="No linked offenders" />
      ) : (
        <div className="space-y-2">
          {offendersQuery.data.map((o) => (
            <div
              key={o.offender_id}
              className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 flex items-center justify-between gap-3"
            >
              <div>
                <p className="text-xs font-medium text-navy-800">{o.full_name}</p>
                {o.alias_name && (
                  <p className="text-[11px] text-navy-400">a.k.a. {o.alias_name}</p>
                )}
                <p className="text-[10px] text-navy-400">
                  {o.role} · {o.arrest_status}
                </p>
              </div>
              <RiskBadge riskLevel={o.risk_level} />
            </div>
          ))}
        </div>
      )}
    </InsightSection>
  );
}
