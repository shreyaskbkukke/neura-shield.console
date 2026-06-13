"use client";

import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { InsightSection } from "@/components/grounded/InsightSection";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { Skeleton } from "@/components/foundation/Skeleton";
import { AlertStatusActions } from "./AlertStatusActions";
import { useAlert } from "../hooks";
import { formatDateTime } from "@/lib/formatters";

interface AlertDetailDrawerProps {
  alertId: string | null;
  onClose: () => void;
  canUpdate: boolean;
}

export function AlertDetailDrawer({ alertId, onClose, canUpdate }: AlertDetailDrawerProps) {
  const alertQuery = useAlert(alertId);
  const detail = alertQuery.data;

  return (
    <DetailDrawer
      isOpen={!!alertId}
      onClose={onClose}
      title={detail?.title ?? "Alert Detail"}
      description={detail?.alert_type.replace(/_/g, " ")}
      width="md"
    >
      {alertQuery.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
      ) : detail ? (
        <div className="space-y-4">
          {/* Badges + actions */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <SeverityBadge severity={detail.severity} />
              <StatusBadge status={detail.status} />
              {detail.confidence_score != null && (
                <ConfidenceScore score={detail.confidence_score} size="md" />
              )}
            </div>
            {canUpdate && (
              <AlertStatusActions alertId={detail.id} currentStatus={detail.status} />
            )}
          </div>

          {detail.description && (
            <p className="text-sm text-navy-700">{detail.description}</p>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-navy-400">District</p>
              <p className="font-medium text-navy-800">{detail.district?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-navy-400">Station</p>
              <p className="font-medium text-navy-800">{detail.police_station?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-navy-400">Created</p>
              <p className="font-medium text-navy-800">{formatDateTime(detail.created_at)}</p>
            </div>
            {detail.assigned_to && (
              <div>
                <p className="text-navy-400">Assigned to</p>
                <p className="font-medium text-navy-800">{detail.assigned_to}</p>
              </div>
            )}
          </div>

          {/* Evidence */}
          {detail.evidence && Object.keys(detail.evidence).length > 0 && (
            <InsightSection title="Evidence">
              <EvidencePanel evidence={detail.evidence} />
            </InsightSection>
          )}

          {detail.resolution_note && (
            <InsightSection title="Resolution Note">
              <p className="text-xs text-navy-700">{detail.resolution_note}</p>
            </InsightSection>
          )}

          <DisclaimerBox
            text="Alert data is derived from live rule evaluations. Confidence scores are statistical indicators — not determinations of actual criminal activity."
            compact
          />
        </div>
      ) : null}
    </DetailDrawer>
  );
}
