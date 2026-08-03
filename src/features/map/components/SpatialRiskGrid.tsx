"use client";

import { MapPin } from "lucide-react";
import { RiskBadge } from "@/components/grounded/RiskBadge";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { cn } from "@/lib/utils";
import type { HotspotListItem, DistrictRiskItem, GridHotspotItem } from "../types";

function riskDotColor(level: string | null): string {
  switch (level?.toUpperCase()) {
    case "CRITICAL": return "bg-danger-500";
    case "HIGH": return "bg-orange-500";
    case "MEDIUM": return "bg-warning-500";
    default: return "bg-success-500";
  }
}

function getGridRiskLevel(score: number): string {
  if (score >= 80) return "CRITICAL";
  if (score >= 50) return "HIGH";
  if (score >= 25) return "MEDIUM";
  return "LOW";
}

interface SpatialRiskGridProps {
  overlayType: "clusters" | "grid";
  hotspots: HotspotListItem[];
  gridHotspots: GridHotspotItem[];
  districtRisk: DistrictRiskItem[];
  isLoadingHotspots: boolean;
  isLoadingRisk: boolean;
  selectedId: string | null;
  onSelectHotspot: (id: string) => void;
}

export function SpatialRiskGrid({
  overlayType,
  hotspots,
  gridHotspots,
  districtRisk,
  isLoadingHotspots,
  isLoadingRisk,
  selectedId,
  onSelectHotspot,
}: Readonly<SpatialRiskGridProps>) {
  return (
    <div className="space-y-5">
      {/* District risk summary */}
      <div>
        <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide mb-2">
          District Risk Overview
        </p>
        {isLoadingRisk ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {districtRisk.map((d) => (
              <div
                key={d.district_id}
                className="rounded-xl border border-navy-200 bg-white p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-navy-800">{d.district_name}</p>
                  <RiskBadge riskLevel={d.risk_level} />
                </div>
                <div className="text-[11px] text-navy-500 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Risk score</span>
                    <span className="font-mono font-medium text-navy-700">{d.risk_score.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>7-day crimes</span>
                    <span className="font-mono">{d.crime_count_7d ?? "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hotspots</span>
                    <span className="font-mono">{d.hotspot_count ?? "—"}</span>
                  </div>
                </div>
                {d.top_reasons.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {d.top_reasons.slice(0, 2).map((r) => (
                      <span key={r} className="rounded bg-navy-100 px-1.5 py-0.5 text-[10px] text-navy-600">
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hotspots or Grid list based on overlayType */}
      <div>
        <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide mb-2">
          {overlayType === "clusters" ? "Active Hotspots — click to inspect" : "Grid Cells (1km) — click to inspect"}
        </p>

        {isLoadingHotspots ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14" />)}
          </div>
        ) : overlayType === "clusters" ? (
          hotspots.length === 0 ? (
            <EmptyState icon={MapPin} title="No hotspots found" description="Adjust filters or run the hotspot job" />
          ) : (
            <div className="space-y-1.5">
              {hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => onSelectHotspot(hs.id)}
                  className={cn(
                    "w-full text-left rounded-xl border px-3 py-2.5 transition-colors",
                    selectedId === hs.id
                      ? "border-brand-300 bg-brand-50"
                      : "border-navy-200 bg-white hover:bg-navy-50",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", riskDotColor(hs.risk_level))} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-navy-800 truncate">
                        {hs.district?.name ?? "Unknown"}{hs.police_station ? ` · ${hs.police_station.name}` : ""}
                      </p>
                      <p className="text-[11px] text-navy-500">
                        {hs.crime_count} crimes · {hs.top_category ?? "Mixed"}
                        {hs.radius_meters && ` · ${(hs.radius_meters / 1000).toFixed(1)}km radius`}
                      </p>
                    </div>
                    {hs.risk_level && <RiskBadge riskLevel={hs.risk_level} />}
                  </div>
                </button>
              ))}
            </div>
          )
        ) : gridHotspots.length === 0 ? (
          <EmptyState icon={MapPin} title="No grid data found" description="Adjust filters or verify crime ingestion" />
        ) : (
          <div className="space-y-1.5">
            {gridHotspots.map((ghs) => {
              const riskLevel = getGridRiskLevel(ghs.risk_score);
              return (
                <button
                  key={ghs.hotspot_id}
                  onClick={() => onSelectHotspot(ghs.hotspot_id)}
                  className={cn(
                    "w-full text-left rounded-xl border px-3 py-2.5 transition-colors",
                    selectedId === ghs.hotspot_id
                      ? "border-brand-300 bg-brand-50"
                      : "border-navy-200 bg-white hover:bg-navy-50",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", riskDotColor(riskLevel))} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-navy-800 truncate">
                        {ghs.district_name} Cell ({ghs.center_latitude.toFixed(4)}, {ghs.center_longitude.toFixed(4)})
                      </p>
                      <p className="text-[11px] text-navy-500">
                        {ghs.crime_count} crimes · {ghs.top_category ?? "Mixed"} · Score: {ghs.risk_score.toFixed(1)}
                      </p>
                    </div>
                    <RiskBadge riskLevel={riskLevel} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
