"use client";

import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { InsightSection } from "@/components/grounded/InsightSection";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { SuggestedActionList } from "@/components/grounded/SuggestedActionList";
import { StatusTransitionMenu } from "@/components/grounded/StatusTransitionMenu";
import { Skeleton } from "@/components/foundation/Skeleton";
import { usePreventionRecommendation, useUpdateRecommendationStatus } from "../hooks";
import { PREVENTION_TRANSITIONS } from "../types";

interface PreventionDetailDrawerProps {
  recommendationId: string | null;
  onClose: () => void;
  canUpdate: boolean;
}

export function PreventionDetailDrawer({
  recommendationId,
  onClose,
  canUpdate,
}: PreventionDetailDrawerProps) {
  const recQuery = usePreventionRecommendation(recommendationId);
  const updateMutation = useUpdateRecommendationStatus(recommendationId ?? "");
  const detail = recQuery.data;

  return (
    <DetailDrawer
      isOpen={!!recommendationId}
      onClose={onClose}
      title={detail?.title ?? "Recommendation Detail"}
      description={detail?.recommendation_type.replace(/_/g, " ")}
      width="md"
    >
      {recQuery.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
      ) : detail ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <SeverityBadge severity={detail.priority} />
              <StatusBadge status={detail.status} />
              <ConfidenceScore score={detail.confidence_score} size="md" />
            </div>
            {canUpdate && (
              <StatusTransitionMenu
                currentStatus={detail.status}
                transitions={PREVENTION_TRANSITIONS[detail.status] ?? []}
                onTransition={(s) => updateMutation.mutate(s)}
                isLoading={updateMutation.isPending}
              />
            )}
          </div>

          <p className="text-sm text-navy-700">{detail.summary}</p>

          {detail.expected_outcome && (
            <div className="rounded-lg border border-success-100 bg-success-50 px-3 py-2">
              <p className="text-[11px] font-medium text-success-700">Expected Outcome</p>
              <p className="text-xs text-success-700 mt-0.5">{detail.expected_outcome}</p>
            </div>
          )}

          {detail.review_owner_role && (
            <p className="text-xs text-navy-500">
              Review owner: <span className="font-medium text-navy-800">{detail.review_owner_role}</span>
            </p>
          )}

          {detail.suggested_actions.length > 0 && (
            <InsightSection title="Suggested Actions">
              <SuggestedActionList actions={detail.suggested_actions} title="" />
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
