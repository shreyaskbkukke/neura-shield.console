"use client";

import { User, Brain, BookOpen } from "lucide-react";
import { RiskBadge } from "@/components/grounded/RiskBadge";
import { InsightSection } from "@/components/grounded/InsightSection";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { Skeleton } from "@/components/foundation/Skeleton";
import { ErrorState } from "@/components/foundation/ErrorState";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { useOffenderDetail, useOffenderBehaviorProfile, useOffenderMOProfile } from "../hooks";
import type { OffenderDetail } from "../types";

interface ScoreBarProps {
  label: string;
  score: number;
}

function ScoreBar({ label, score }: ScoreBarProps) {
  const pct = Math.round(score * 100);
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-navy-600">{label}</span>
        <span className="font-medium text-navy-800">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-navy-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OffenderMeta({ detail }: { detail: OffenderDetail }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-navy-100 p-3">
          <User size={18} className="text-navy-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-navy-900">{detail.full_name}</p>
          {detail.alias_name && <p className="text-xs text-navy-500">a.k.a. {detail.alias_name}</p>}
          <p className="text-xs text-navy-500">{detail.district_name ?? "Unknown district"}</p>
        </div>
        <RiskBadge riskLevel={detail.risk_level} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Cases", value: detail.total_crimes },
          { label: "High Severity", value: detail.high_severity_crimes },
          { label: "Districts", value: detail.districts_active },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg bg-navy-50 border border-navy-100 p-2 text-center">
            <p className="text-base font-bold text-navy-900">{value}</p>
            <p className="text-[10px] text-navy-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface OffenderProfilePanelProps {
  offenderId: string | null;
}

export function OffenderProfilePanel({ offenderId }: OffenderProfilePanelProps) {
  const detailQuery = useOffenderDetail(offenderId);
  const behaviorQuery = useOffenderBehaviorProfile(offenderId);
  const moQuery = useOffenderMOProfile(offenderId);

  if (!offenderId) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-navy-400">
        Select an offender to view their profile
      </div>
    );
  }

  if (detailQuery.isLoading) {
    return <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>;
  }

  if (detailQuery.isError) {
    return <ErrorState title="Failed to load profile" message={detailQuery.error?.message} onRetry={() => void detailQuery.refetch()} />;
  }

  if (!detailQuery.data) return null;

  return (
    <div className="space-y-5">
      <OffenderMeta detail={detailQuery.data} />

      {/* Behavior profile */}
      {behaviorQuery.data && (
        <InsightSection title="Behavior Profile" icon={Brain} iconColor="text-brand-600">
          <div className="rounded-lg border border-navy-200 bg-white p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-navy-700">{behaviorQuery.data.profile_type.replace(/_/g, " ")}</span>
            </div>
            <div className="space-y-1.5">
              <ScoreBar label="Habitual Offender" score={behaviorQuery.data.scores.habitual_offender_score} />
              <ScoreBar label="Escalation Risk" score={behaviorQuery.data.scores.escalation_score} />
              <ScoreBar label="Specialization" score={behaviorQuery.data.scores.specialization_score} />
              <ScoreBar label="Geo Mobility" score={behaviorQuery.data.scores.geographic_mobility_score} />
              <ScoreBar label="MO Consistency" score={behaviorQuery.data.scores.mo_consistency_score} />
            </div>
            {behaviorQuery.data.summary && (
              <p className="text-[11px] text-navy-600">{behaviorQuery.data.summary}</p>
            )}
            <DisclaimerBox text={behaviorQuery.data.disclaimer} compact />
          </div>
        </InsightSection>
      )}

      {/* MO profile */}
      {moQuery.data && (
        <InsightSection title="MO Profile" icon={BookOpen} iconColor="text-intelligence-600">
          <div className="rounded-lg border border-navy-200 bg-white p-3 space-y-1.5">
            {moQuery.data.primary_mo_name && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-navy-800">{moQuery.data.primary_mo_name}</span>
                <span className="font-mono text-[11px] text-intelligence-600">{moQuery.data.primary_mo_code}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-navy-600">
              <span>MO patterns: <b className="text-navy-800">{moQuery.data.mo_count}</b></span>
              <span>Linked cases: <b className="text-navy-800">{moQuery.data.total_linked_cases}</b></span>
            </div>
            <ConfidenceScore score={moQuery.data.consistency_score} label="Consistency" />
          </div>
        </InsightSection>
      )}

      {/* Recent crime links */}
      {detailQuery.data.crime_links.length > 0 && (
        <InsightSection title="Recent Cases">
          <div className="space-y-1.5">
            {detailQuery.data.crime_links.slice(0, 5).map((c) => (
              <div key={c.crime_id} className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2 space-y-0.5">
                <p className="text-xs font-medium text-navy-800">{c.incident_number} — {c.category_name}</p>
                <p className="text-[11px] text-navy-500">{c.district_name} · {c.role} · {c.arrest_status}</p>
              </div>
            ))}
          </div>
        </InsightSection>
      )}
    </div>
  );
}
