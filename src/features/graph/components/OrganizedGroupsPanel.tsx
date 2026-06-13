import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import type { OrganizedGroupsResponse } from "../types";

interface OrganizedGroupsPanelProps {
  data: OrganizedGroupsResponse | undefined;
  isLoading: boolean;
}

export function OrganizedGroupsPanel({ data, isLoading }: OrganizedGroupsPanelProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <Users size={14} className="text-intelligence-600" />
        <p className="text-sm font-semibold text-navy-900">Group Candidates</p>
        {data && (
          <span className="ml-auto rounded-full bg-intelligence-100 px-2 py-0.5 text-[11px] font-medium text-intelligence-700">
            {data.total}
          </span>
        )}
      </div>
      <CardContent className="pt-1 pb-4">
        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14" />)}</div>
        ) : !data || data.items.length === 0 ? (
          <EmptyState icon={Users} title="No group candidates" description="No organized activity patterns detected" />
        ) : (
          <div className="space-y-2">
            {data.items.slice(0, 5).map((group) => (
              <div key={group.id} className="rounded-lg border border-navy-200 bg-navy-50 p-3 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-navy-800">
                    {group.title ?? group.candidate_key}
                  </span>
                  <ConfidenceScore score={group.confidence_score} label="Conf" />
                </div>
                <p className="text-[11px] text-navy-500">
                  {group.member_count} member(s) · {group.shared_case_ids.length} shared case(s)
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
