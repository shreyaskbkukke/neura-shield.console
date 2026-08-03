"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { FilterBar, FilterSelect } from "@/components/grounded/FilterBar";
import { RiskLegend } from "@/components/map/RiskLegend";
import { ErrorState } from "@/components/foundation/ErrorState";
import { HotspotGoogleMap } from "./HotspotGoogleMap";
import { SpatialRiskGrid } from "./SpatialRiskGrid";
import { HotspotDetailDrawer } from "./HotspotDetailDrawer";
import { useHotspots, useGridHotspots, useDistrictRiskList } from "../hooks";
import type { MapFilters } from "../types";

const LAYER_OPTIONS = [
  { label: "DBSCAN Clusters", value: "clusters" },
  { label: "Spatial Grid (1km)", value: "grid" },
];

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
  const [overlayType, setOverlayType] = useState<"clusters" | "grid">("clusters");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);

  // 1. Fetch DBSCAN clusters
  const hotspotParams: Record<string, string | number | boolean> = {};
  if (filters.riskLevel) hotspotParams.risk_level = filters.riskLevel;
  if (filters.activeOnly) hotspotParams.active_only = true;
  const hotspotsQuery = useHotspots(hotspotParams);

  // 2. Fetch Spatial Grid
  const gridHotspotsQuery = useGridHotspots({});

  // 3. Fetch District Risk list
  const districtRiskQuery = useDistrictRiskList();

  // Filter DBSCAN clusters based on search query
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

  // Filter Grid cell hotspots based on search query
  const allGridHotspots = gridHotspotsQuery.data?.items ?? [];
  const filteredGridHotspots = allGridHotspots.filter((ghs) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const districtName = ghs.district_name?.toLowerCase() ?? "";
    const category = ghs.top_category?.toLowerCase() ?? "";
    return (
      districtName.includes(query) ||
      category.includes(query)
    );
  });

  const selectedGridCell = overlayType === "grid"
    ? filteredGridHotspots.find((ghs) => ghs.hotspot_id === selectedHotspotId)
    : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <FilterBar className="mb-0">
          <FilterSelect
            label="Layer"
            value={overlayType}
            options={LAYER_OPTIONS}
            onChange={(v) => {
              setOverlayType(v as "clusters" | "grid");
              setSelectedHotspotId(null);
            }}
          />
          {overlayType === "clusters" && (
            <>
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
            </>
          )}
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

      {/* Two Column Layout: Map on left, Data on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Map Container */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl shadow-sm lg:sticky lg:top-[72px]">
          <HotspotGoogleMap
            overlayType={overlayType}
            hotspots={filteredHotspots}
            gridHotspots={filteredGridHotspots}
            selectedId={selectedHotspotId}
            onSelectHotspot={setSelectedHotspotId}
            heightClass="h-[600px]"
          />
        </div>

        {/* Right Side: District overview and Hotspots list */}
        <div className="lg:col-span-5 xl:col-span-4 h-[600px] overflow-y-auto pr-1 space-y-5">
          {hotspotsQuery.isError || gridHotspotsQuery.isError ? (
            <ErrorState
              title="Failed to load map spatial data"
              message={hotspotsQuery.error?.message ?? gridHotspotsQuery.error?.message}
              onRetry={() => {
                void hotspotsQuery.refetch();
                void gridHotspotsQuery.refetch();
              }}
            />
          ) : (
            <SpatialRiskGrid
              overlayType={overlayType}
              hotspots={filteredHotspots}
              gridHotspots={filteredGridHotspots}
              districtRisk={districtRiskQuery.data?.items ?? []}
              isLoadingHotspots={overlayType === "clusters" ? hotspotsQuery.isLoading : gridHotspotsQuery.isLoading}
              isLoadingRisk={districtRiskQuery.isLoading}
              selectedId={selectedHotspotId}
              onSelectHotspot={setSelectedHotspotId}
            />
          )}
        </div>
      </div>

      <HotspotDetailDrawer
        hotspotId={selectedHotspotId}
        selectedGridCell={selectedGridCell}
        onClose={() => setSelectedHotspotId(null)}
      />
    </div>
  );
}
