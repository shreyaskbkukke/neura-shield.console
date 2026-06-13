import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import type { SuspiciousAssociationsResponse } from "../types";

interface SuspiciousAssociationsPanelProps {
  data: SuspiciousAssociationsResponse | undefined;
  isLoading: boolean;
}

export function SuspiciousAssociationsPanel({ data, isLoading }: SuspiciousAssociationsPanelProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <AlertTriangle size={14} className="text-warning-600" />
        <p className="text-sm font-semibold text-navy-900">Suspicious Associations</p>
        {data && (
          <span className="ml-auto rounded-full bg-warning-100 px-2 py-0.5 text-[11px] font-medium text-warning-700">
            {data.total}
          </span>
        )}
      </div>
      <CardContent className="pt-1 pb-4">
        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : !data || data.items.length === 0 ? (
          <EmptyState icon={AlertTriangle} title="No suspicious associations" description="No signals detected" />
        ) : (
          <div className="space-y-2">
            {data.items.slice(0, 5).map((item, i) => (
              <div key={i} className="rounded-lg border border-warning-100 bg-warning-50 p-3 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-navy-800">{item.signal_type.replace(/_/g, " ")}</span>
                  <ConfidenceScore score={item.confidence_score} label="Conf" />
                </div>
                <p className="text-[11px] text-navy-700">{item.description}</p>
                <p className="text-[11px] text-navy-500">
                  {item.offender_ids.length} offender(s) · {item.crime_ids.length} crime(s)
                </p>
              </div>
            ))}
            <DisclaimerBox text={data.items[0]?.disclaimer ?? ""} compact />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
