import { Clock } from "lucide-react";
import { InsightSection } from "@/components/grounded/InsightSection";
import { Timeline, type TimelineEvent } from "@/components/grounded/Timeline";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { useInvestigationTimeline } from "../../hooks";
import type { InvestigationTimelineEvent } from "../../types";

function toTimelineEvent(ev: InvestigationTimelineEvent): TimelineEvent {
  let accent: TimelineEvent["accent"] = "default";
  const t = ev.event_type.toUpperCase();
  if (t.includes("CLOSED") || t.includes("ARCHIVED")) accent = "danger";
  else if (t.includes("STATUS_CHANGED")) accent = "brand";
  else if (t.includes("NOTE_ADDED")) accent = "success";
  else if (t.includes("BRIEF")) accent = "warning";

  return {
    id: ev.id,
    label: ev.title,
    description: ev.description ?? undefined,
    timestamp: ev.occurred_at,
    accent,
  };
}

interface CaseTimelinePanelProps {
  investigationId: string;
}

export function CaseTimelinePanel({ investigationId }: CaseTimelinePanelProps) {
  const timelineQuery = useInvestigationTimeline(investigationId);

  return (
    <InsightSection title="Case Timeline" icon={Clock}>
      {timelineQuery.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !timelineQuery.data?.length ? (
        <EmptyState icon={Clock} title="No timeline events" />
      ) : (
        <Timeline events={timelineQuery.data.map(toTimelineEvent)} />
      )}
    </InsightSection>
  );
}
