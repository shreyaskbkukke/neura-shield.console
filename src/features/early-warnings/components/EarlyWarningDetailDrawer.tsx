"use client";

import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { InsightSection } from "@/components/grounded/InsightSection";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { ReviewPointList } from "@/components/grounded/ReviewPointList";
import { StatusTransitionMenu } from "@/components/grounded/StatusTransitionMenu";
import { Skeleton } from "@/components/foundation/Skeleton";
import { useEarlyWarning, useUpdateWarningStatus } from "../hooks";
import { EW_TRANSITIONS } from "../types";
import { formatDate } from "@/lib/formatters";

interface EarlyWarningDetailDrawerProps {
  warningId: string | null;
  onClose: () => void;
  canUpdate: boolean;
}

export function EarlyWarningDetailDrawer({
  warningId,
  onClose,
  canUpdate,
}: EarlyWarningDetailDrawerProps) {
  const warningQuery = useEarlyWarning(warningId);
  const updateMutation = useUpdateWarningStatus(warningId ?? "");
  const detail = warningQuery.data;

  return (
    <DetailDrawer
      isOpen={!!warningId}
      onClose={onClose}
      title={detail?.title ?? "Warning Detail"}
      description={detail?.warning_type.replace(/_/g, " ")}
      width="md"
    >
      {warningQuery.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
      ) : detail ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <SeverityBadge severity={detail.severity} />
              <StatusBadge status={detail.status} />
              <ConfidenceScore score={detail.confidence_score} size="md" />
            </div>
            {canUpdate && (
              <StatusTransitionMenu
                currentStatus={detail.status}
                transitions={EW_TRANSITIONS[detail.status] ?? []}
                onTransition={(s) => updateMutation.mutate(s)}
                isLoading={updateMutation.isPending}
              />
            )}
          </div>

          <p className="text-sm text-navy-700">{detail.summary}</p>

          {(detail.forecast_period_start || detail.forecast_period_end) && (
            <div className="text-xs text-navy-500">
              Forecast period:{" "}
              {detail.forecast_period_start ? formatDate(detail.forecast_period_start) : "?"} –{" "}
              {detail.forecast_period_end ? formatDate(detail.forecast_period_end) : "?"}
            </div>
          )}

          {detail.recommended_review_points.length > 0 && (
            <InsightSection title="Recommended Review Points">
              <ReviewPointList points={detail.recommended_review_points} title="" />
            </InsightSection>
          )}

          {Object.keys(detail.evidence).length > 0 && (
            <InsightSection title="Evidence">
              <EvidencePanel evidence={detail.evidence} />
            </InsightSection>
          )}

          <DisclaimerBox text={detail.disclaimer} compact />
        </div>
      ) : null}
    </DetailDrawer>
  );
}
