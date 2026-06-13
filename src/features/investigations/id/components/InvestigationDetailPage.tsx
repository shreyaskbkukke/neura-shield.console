"use client";

import { PageSurface } from "@/components/foundation/PageSurface";
import { ErrorState } from "@/components/foundation/ErrorState";
import { Skeleton } from "@/components/foundation/Skeleton";
import { InvestigationHeader } from "./InvestigationHeader";
import { InvestigationStatusMenu } from "./InvestigationStatusMenu";
import { InvestigationOverviewCard } from "./InvestigationOverviewCard";
import { InvestigationNotesPanel } from "./InvestigationNotesPanel";
import { CaseTimelinePanel } from "./CaseTimelinePanel";
import { RelatedCasesPanel } from "./RelatedCasesPanel";
import { LinkedOffendersPanel } from "./LinkedOffendersPanel";
import { InvestigationBriefPanel } from "./InvestigationBriefPanel";
import { useInvestigation } from "../../hooks";
import { useAuthStore } from "@/stores/authStore";

interface InvestigationDetailPageProps {
  investigationId: string;
}

export function InvestigationDetailPage({ investigationId }: InvestigationDetailPageProps) {
  const detailQuery = useInvestigation(investigationId);
  const { hasPermission } = useAuthStore();
  const canWrite = hasPermission("investigation.write");

  if (detailQuery.isLoading) {
    return (
      <PageSurface>
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </PageSurface>
    );
  }

  if (detailQuery.isError) {
    return (
      <PageSurface>
        <ErrorState
          title="Failed to load investigation"
          message={detailQuery.error?.message}
          onRetry={() => void detailQuery.refetch()}
        />
      </PageSurface>
    );
  }

  if (!detailQuery.data) return null;

  const inv = detailQuery.data;

  return (
    <PageSurface>
      <div className="space-y-5">
        {/* Header + status actions */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <InvestigationHeader investigation={inv} />
          </div>
          {canWrite && (
            <InvestigationStatusMenu
              investigationId={inv.id}
              currentStatus={inv.status}
            />
          )}
        </div>

        {/* Overview card */}
        <InvestigationOverviewCard investigation={inv} />

        {/* Two-column layout: left=notes+timeline, right=brief+related+offenders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left column */}
          <div className="space-y-5">
            <InvestigationNotesPanel
              investigationId={inv.id}
              canWrite={canWrite}
            />
            <CaseTimelinePanel investigationId={inv.id} />
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <InvestigationBriefPanel investigation={inv} canWrite={canWrite} />
            <RelatedCasesPanel
              investigationId={inv.id}
              hasLinkedIncident={!!inv.crime_incident_id}
            />
            <LinkedOffendersPanel
              investigationId={inv.id}
              hasLinkedIncident={!!inv.crime_incident_id}
            />
          </div>
        </div>
      </div>
    </PageSurface>
  );
}
