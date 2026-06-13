"use client";

import { useState } from "react";
import { FilterBar, FilterSelect } from "@/components/grounded/FilterBar";
import { RiskLegend } from "@/components/map/RiskLegend";
import { ErrorState } from "@/components/foundation/ErrorState";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
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
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);

  const hotspotParams: Record<string, string | number | boolean> = {};
  if (filters.riskLevel) hotspotParams.risk_level = filters.riskLevel;
  if (filters.activeOnly) hotspotParams.active_only = true;

  const hotspotsQuery = useHotspots(hotspotParams);
  const districtRiskQuery = useDistrictRiskList();

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
        </FilterBar>
        <div className="ml-auto">
          <RiskLegend />
        </div>
      </div>

      <DisclaimerBox
        text="Geo Intelligence view — GIS map rendering requires MapLibre (not installed). Showing spatial risk summary view."
        compact
      />

      {hotspotsQuery.isError ? (
        <ErrorState
          title="Failed to load hotspot data"
          message={hotspotsQuery.error?.message}
          onRetry={() => void hotspotsQuery.refetch()}
        />
      ) : (
        <SpatialRiskGrid
          hotspots={hotspotsQuery.data?.items ?? []}
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
