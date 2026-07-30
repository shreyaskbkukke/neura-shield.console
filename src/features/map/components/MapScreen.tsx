"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { FilterBar, FilterSelect } from "@/components/grounded/FilterBar";
import { RiskLegend } from "@/components/map/RiskLegend";
import { ErrorState } from "@/components/foundation/ErrorState";
import { HotspotGoogleMap } from "./HotspotGoogleMap";
import { SpatialRiskGrid } from "./SpatialRiskGrid";
import { HotspotDetailDrawer } from "./HotspotDetailDrawer";
import { useHotspots, useDistrictRiskList } from "../hooks";
import type { MapFilters } from "../types";

const RISK_OPTIONS = [
  { label: "All Risk Levels", value: "" },
  { label: "Critical", value: "CRITICAL" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

const ACTIVE_OPTIONS = [
  { label: "Active only", value: "true" },
  { label: "All hotspots", value: "false" },
];

const DEFAULT_FILTERS: MapFilters = { riskLevel: "", activeOnly: true, districtId: "" };

export function MapScreen() {
  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);

  const hotspotParams: Record<string, string | number | boolean> = {};
  if (filters.riskLevel) hotspotParams.risk_level = filters.riskLevel;
  if (filters.activeOnly) hotspotParams.active_only = true;

  const hotspotsQuery = useHotspots(hotspotParams);
  const districtRiskQuery = useDistrictRiskList();

  const allHotspots = hotspotsQuery.data?.items ?? [];
  const filteredHotspots = allHotspots.filter((hs) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const districtName = hs.district?.name?.toLowerCase() ?? "";
    const stationName = hs.police_station?.name?.toLowerCase() ?? "";
    const category = hs.top_category?.toLowerCase() ?? "";
    return (
      districtName.includes(query) ||
      stationName.includes(query) ||
      category.includes(query)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <FilterBar className="mb-0">
          <FilterSelect
            label="Risk Level"
            value={filters.riskLevel}
            options={RISK_OPTIONS}
            onChange={(v) => setFilters((f) => ({ ...f, riskLevel: v }))}
          />
          <FilterSelect
            label="Show"
            value={String(filters.activeOnly)}
            options={ACTIVE_OPTIONS}
            onChange={(v) => setFilters((f) => ({ ...f, activeOnly: v === "true" }))}
          />
          {/* Search Bar Input */}
          <div className="relative inline-flex items-center bg-white border border-navy-200 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all duration-200 shadow-sm w-60">
            <Search size={12} className="text-navy-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search district, station, category..."
              className="bg-transparent text-xs font-semibold text-navy-800 focus:outline-none placeholder:text-navy-400 placeholder:font-normal w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-navy-400 hover:text-navy-600 ml-1.5 shrink-0"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </FilterBar>
        <div className="ml-auto">
          <RiskLegend />
        </div>
      </div>

      <HotspotGoogleMap
        hotspots={filteredHotspots}
        selectedId={selectedHotspotId}
        onSelectHotspot={setSelectedHotspotId}
      />

      {hotspotsQuery.isError ? (
        <ErrorState
          title="Failed to load hotspot data"
          message={hotspotsQuery.error?.message}
          onRetry={() => void hotspotsQuery.refetch()}
        />
      ) : (
        <SpatialRiskGrid
          hotspots={filteredHotspots}
          districtRisk={districtRiskQuery.data?.items ?? []}
          isLoadingHotspots={hotspotsQuery.isLoading}
          isLoadingRisk={districtRiskQuery.isLoading}
          selectedId={selectedHotspotId}
          onSelectHotspot={setSelectedHotspotId}
        />
      )}

      <HotspotDetailDrawer
        hotspotId={selectedHotspotId}
        onClose={() => setSelectedHotspotId(null)}
      />
    </div>
  );
}
