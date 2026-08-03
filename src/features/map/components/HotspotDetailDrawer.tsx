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
import type { GridHotspotItem } from "../types";

interface HotspotDetailDrawerProps {
  hotspotId: string | null;
  selectedGridCell?: GridHotspotItem | null;
  onClose: () => void;
}

export function HotspotDetailDrawer({
  hotspotId,
  selectedGridCell,
  onClose,
}: Readonly<HotspotDetailDrawerProps>) {
  const isUUID = !!hotspotId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(hotspotId);
  const detailQueryId = isUUID ? hotspotId : null;

  const { data: detail, isLoading: loadingDetail } = useHotspotDetail(detailQueryId);
  const { data: crimes, isLoading: loadingCrimes } = useHotspotCrimes(detailQueryId);

  const gridDetail = selectedGridCell ? {
    district: { name: selectedGridCell.district_name },
    police_station: null,
    crime_count: selectedGridCell.crime_count,
    high_severity_count: selectedGridCell.high_severity_count,
    risk_score: selectedGridCell.risk_score,
    top_category: selectedGridCell.top_category,
    risk_level: selectedGridCell.risk_score >= 80 ? "CRITICAL" : selectedGridCell.risk_score >= 50 ? "HIGH" : selectedGridCell.risk_score >= 25 ? "MEDIUM" : "LOW",
    explanation: {
      "Analysis Layer": "Grid Cell Aggregation (0.01 deg)",
      "Latitude Center": selectedGridCell.center_latitude.toFixed(6),
      "Longitude Center": selectedGridCell.center_longitude.toFixed(6),
      "Avg Severity Score": selectedGridCell.avg_severity_score?.toFixed(2) ?? "N/A",
      "Crime Volume": `${selectedGridCell.crime_count} incidents in cell area`,
      "High Severity Cases": `${selectedGridCell.high_severity_count} high-intensity crimes`
    }
  } : null;

  const displayDetail = detail || gridDetail;
  const isLoading = loadingDetail && !gridDetail;

  return (
    <DetailDrawer
      isOpen={!!hotspotId}
      onClose={onClose}
      title={isUUID ? "Hotspot Detail" : "Grid Cell Detail"}
      description={isUUID ? "Crime concentration area analysis" : "Grid aggregation cell analysis"}
      width="md"
    >
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
      ) : !displayDetail ? null : (
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-navy-100 p-2.5">
              <MapPin size={18} className="text-navy-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">
                {displayDetail.district?.name ?? "Unknown district"}
              </p>
              <p className="text-xs text-navy-500">
                {displayDetail.police_station?.name ?? "Grid Cell Area"}
              </p>
            </div>
            {displayDetail.risk_level && <RiskBadge riskLevel={displayDetail.risk_level} className="ml-auto" />}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Crimes", value: displayDetail.crime_count },
              { label: "High Severity", value: displayDetail.high_severity_count },
              { label: "Risk Score", value: displayDetail.risk_score?.toFixed(2) ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-navy-50 border border-navy-100 p-3 text-center">
                <p className="text-lg font-bold text-navy-900">{value}</p>
                <p className="text-[11px] text-navy-500">{label}</p>
              </div>
            ))}
          </div>

          {displayDetail.top_category && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-navy-500">Top category:</span>
              <SeverityBadge severity={displayDetail.top_category} />
            </div>
          )}

          {displayDetail.explanation && Object.keys(displayDetail.explanation).length > 0 && (
            <InsightSection title="Explanation">
              <EvidencePanel evidence={displayDetail.explanation} />
            </InsightSection>
          )}

          {isUUID && (
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
          )}

          <DisclaimerBox
            text="Hotspot analysis is based on historical incident clustering. It is a decision-support signal only and does not predict future crime with certainty."
            compact
          />
        </div>
      )}
    </DetailDrawer>
  );
}
