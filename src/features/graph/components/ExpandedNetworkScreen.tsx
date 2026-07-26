"use client";

import { useState } from "react";
import { AlertTriangle, Users, CircleDot } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { SummaryStrip } from "@/components/grounded/SummaryStrip";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { ErrorState } from "@/components/foundation/ErrorState";
import { NetworkItemDetailDrawer, type NetworkDrawerItem } from "./NetworkItemDetailDrawer";
import { useSuspiciousAssociations, useOrganizedGroups, useGraphCommunities } from "../hooks";
import type { SuspiciousAssociationItem, OrganizedGroupItem, CommunityItem } from "../types";

const associationColumns: Column<SuspiciousAssociationItem>[] = [
  {
    key: "signal_type",
    header: "Signal",
    render: (r) => <span className="text-xs font-semibold text-navy-800">{r.signal_type.replace(/_/g, " ")}</span>,
  },
  { key: "description", header: "Description", render: (r) => <span className="text-xs text-navy-600">{r.description}</span> },
  {
    key: "offender_ids",
    header: "Offenders / Crimes",
    align: "right",
    render: (r) => <span className="text-xs text-navy-500">{r.offender_ids.length} / {r.crime_ids.length}</span>,
  },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (r) => <ConfidenceScore score={r.confidence_score} />,
  },
];

const groupColumns: Column<OrganizedGroupItem>[] = [
  {
    key: "title",
    header: "Group",
    render: (r) => <span className="text-xs font-semibold text-navy-800">{r.title ?? r.candidate_key}</span>,
  },
  { key: "member_count", header: "Members", align: "right", render: (r) => <span className="text-xs text-navy-600">{r.member_count}</span> },
  {
    key: "shared_case_ids",
    header: "Shared Cases",
    align: "right",
    render: (r) => <span className="text-xs text-navy-600">{r.shared_case_ids.length}</span>,
  },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (r) => <ConfidenceScore score={r.confidence_score} />,
  },
];

const communityColumns: Column<CommunityItem>[] = [
  { key: "community_id", header: "Community", render: (r) => <span className="text-xs font-mono text-navy-700">{r.community_id}</span> },
  { key: "offender_count", header: "Offenders", align: "right", render: (r) => <span className="text-xs font-semibold text-navy-800">{r.offender_count}</span> },
  {
    key: "avg_link_strength",
    header: "Avg Link Strength",
    align: "right",
    render: (r) => <span className="text-xs text-navy-600">{r.avg_link_strength != null ? r.avg_link_strength.toFixed(1) : "—"}</span>,
  },
];

export function ExpandedNetworkScreen() {
  const [drawerItem, setDrawerItem] = useState<NetworkDrawerItem | null>(null);

  const associationsQuery = useSuspiciousAssociations();
  const groupsQuery = useOrganizedGroups();
  const communitiesQuery = useGraphCommunities();

  const associations = associationsQuery.data?.items ?? [];
  const groups = groupsQuery.data?.items ?? [];
  const communities = communitiesQuery.data?.items ?? [];

  return (
    <div className="space-y-5">
      <DisclaimerBox text="Relationships represent recorded links and analytical associations, not guilt determinations. All groupings and signals require investigator verification before operational use." />

      <SummaryStrip
        items={[
          { label: "Suspicious Signals", value: associationsQuery.data?.total ?? 0, variant: "warning" },
          { label: "Group Candidates", value: groupsQuery.data?.total ?? 0, variant: "brand" },
          { label: "Communities", value: communitiesQuery.data?.total_communities ?? 0 },
          { label: "Offenders in Communities", value: communitiesQuery.data?.total_offenders ?? 0 },
        ]}
      />

      <Card>
        <div className="px-5 pt-4 pb-2 flex items-center gap-2">
          <AlertTriangle size={14} className="text-warning-600" />
          <p className="text-sm font-semibold text-navy-900">Suspicious Associations</p>
        </div>
        <CardContent className="pt-1 pb-4">
          {associationsQuery.isError ? (
            <ErrorState title="Failed to load associations" message={associationsQuery.error?.message} />
          ) : (
            <DataTable
              columns={associationColumns}
              data={associations}
              keyExtractor={(r, i) => `${r.signal_type}-${i}`}
              isLoading={associationsQuery.isLoading}
              emptyTitle="No suspicious associations"
              emptyDescription="No analytical signals detected"
              onRowClick={(r) =>
                setDrawerItem({
                  title: r.signal_type.replace(/_/g, " "),
                  subtitle: r.description,
                  confidence_score: r.confidence_score,
                  evidence: r.evidence,
                  disclaimer: r.disclaimer,
                })
              }
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <div className="px-5 pt-4 pb-2 flex items-center gap-2">
          <Users size={14} className="text-intelligence-600" />
          <p className="text-sm font-semibold text-navy-900">Organized Group Candidates</p>
        </div>
        <CardContent className="pt-1 pb-4">
          {groupsQuery.isError ? (
            <ErrorState title="Failed to load group candidates" message={groupsQuery.error?.message} />
          ) : (
            <DataTable
              columns={groupColumns}
              data={groups}
              keyExtractor={(r) => r.id}
              isLoading={groupsQuery.isLoading}
              emptyTitle="No group candidates"
              emptyDescription="No organized activity patterns detected"
              onRowClick={(r) =>
                setDrawerItem({
                  title: r.title ?? r.candidate_key,
                  subtitle: `${r.member_count} member(s) · ${r.shared_case_ids.length} shared case(s)`,
                  confidence_score: r.confidence_score,
                  evidence: r.evidence,
                  disclaimer: r.disclaimer,
                })
              }
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <div className="px-5 pt-4 pb-2 flex items-center gap-2">
          <CircleDot size={14} className="text-success-600" />
          <p className="text-sm font-semibold text-navy-900">Network Communities</p>
        </div>
        <CardContent className="pt-1 pb-4">
          {communitiesQuery.isError ? (
            <ErrorState title="Failed to load communities" message={communitiesQuery.error?.message} />
          ) : (
            <DataTable
              columns={communityColumns}
              data={communities}
              keyExtractor={(r) => r.community_id}
              isLoading={communitiesQuery.isLoading}
              emptyTitle="No communities detected"
              emptyDescription="Connected components are computed from the criminal network graph"
            />
          )}
        </CardContent>
      </Card>

      <NetworkItemDetailDrawer item={drawerItem} onClose={() => setDrawerItem(null)} />
    </div>
  );
}
