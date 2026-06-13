"use client";

import { MapPin, AlertTriangle } from "lucide-react";
import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { RiskBadge } from "@/components/grounded/RiskBadge";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import { InsightSection } from "@/components/grounded/InsightSection";
import { Skeleton } from "@/components/foundation/Skeleton";
import { useHotspotDetail, useHotspotCrimes } from "../hooks";

interface HotspotDetailDrawerProps {
  hotspotId: string | null;
  onClose: () => void;
}

export function HotspotDetailDrawer({ hotspotId, onClose }: HotspotDetailDrawerProps) {
  const { data: detail, isLoading: loadingDetail } = useHotspotDetail(hotspotId);
  const { data: crimes, isLoading: loadingCrimes } = useHotspotCrimes(hotspotId);

  return (
    <DetailDrawer
      isOpen={!!hotspotId}
      onClose={onClose}
      title="Hotspot Detail"
      description="Crime concentration area analysis"
      width="md"
    >
      {loadingDetail ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
      ) : !detail ? null : (
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-navy-100 p-2.5">
              <MapPin size={18} className="text-navy-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">
                {detail.district?.name ?? "Unknown district"}
              </p>
              <p className="text-xs text-navy-500">
                {detail.police_station?.name ?? "No station"}
              </p>
            </div>
            {detail.risk_level && <RiskBadge riskLevel={detail.risk_level} className="ml-auto" />}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Crimes", value: detail.crime_count },
              { label: "High Severity", value: detail.high_severity_count },
              { label: "Risk Score", value: detail.risk_score?.toFixed(2) ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-navy-50 border border-navy-100 p-3 text-center">
                <p className="text-lg font-bold text-navy-900">{value}</p>
                <p className="text-[11px] text-navy-500">{label}</p>
              </div>
            ))}
          </div>

          {detail.top_category && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-navy-500">Top category:</span>
              <SeverityBadge severity={detail.top_category} />
            </div>
          )}

          {detail.explanation && Object.keys(detail.explanation).length > 0 && (
            <InsightSection title="Explanation">
              <EvidencePanel evidence={detail.explanation} />
            </InsightSection>
          )}

          <InsightSection title="Linked Crimes" icon={AlertTriangle}>
            {loadingCrimes ? (
              <Skeleton className="h-24 w-full" />
            ) : !crimes || crimes.items.length === 0 ? (
              <p className="text-xs text-navy-400">No linked crimes recorded</p>
            ) : (
              <div className="space-y-1.5">
                {crimes.items.slice(0, 8).map((c) => (
                  <div key={c.crime_id} className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2">
                    <p className="text-xs font-medium text-navy-800">{c.title}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[11px] text-navy-500">{c.incident_number}</span>
                      <span className="text-[11px] text-navy-400">·</span>
                      <span className="text-[11px] text-navy-500">{c.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </InsightSection>

          <DisclaimerBox
            text="Hotspot analysis is based on historical incident clustering. It is a decision-support signal only and does not predict future crime with certainty."
            compact
          />
        </div>
      )}
    </DetailDrawer>
  );
}
