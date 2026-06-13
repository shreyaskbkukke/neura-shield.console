"use client";

import { useState } from "react";
import { DashboardFiltersBar } from "./DashboardFilters";
import { DashboardKpiGrid } from "./DashboardKpiGrid";
import { CrimeTrendChart } from "./CrimeTrendChart";
import { CategoryDistributionChart } from "./CategoryDistributionChart";
import { DistrictRiskTable } from "./DistrictRiskTable";
import { HotspotPreviewCard } from "./HotspotPreviewCard";
import { EarlyWarningPreview } from "./EarlyWarningPreview";
import { PreventionPreview } from "./PreventionPreview";
import { ModelHealthCard } from "./ModelHealthCard";
import { RecentInvestigations } from "./RecentInvestigations";
import {
  useDashboardSummary,
  useCrimeTrends,
  useCategoryStats,
  useHotspotPreview,
  useDistrictRisk,
  useEarlyWarningsPreview,
  usePreventionPreview,
  useMonitoringSummary,
  useRecentInvestigations,
} from "../hooks";
import type { DashboardFilters } from "../types";

const DEFAULT_FILTERS: DashboardFilters = {
  interval: "weekly",
  districtId: "",
};

export function DashboardScreen() {
  const [filters, setFilters] = useState<DashboardFilters>(DEFAULT_FILTERS);

  const summaryQuery = useDashboardSummary(filters);
  const trendsQuery = useCrimeTrends(filters);
  const categoryQuery = useCategoryStats(filters);
  const hotspotQuery = useHotspotPreview(filters);
  const districtRiskQuery = useDistrictRisk();
  const earlyWarningQuery = useEarlyWarningsPreview(filters);
  const preventionQuery = usePreventionPreview(filters);
  const monitoringQuery = useMonitoringSummary(filters);
  const investigationsQuery = useRecentInvestigations();

  return (
    <div className="space-y-5">
      <DashboardFiltersBar filters={filters} onChange={setFilters} />

      <DashboardKpiGrid
        data={summaryQuery.data}
        isLoading={summaryQuery.isLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CrimeTrendChart
            data={trendsQuery.data}
            isLoading={trendsQuery.isLoading}
            error={trendsQuery.error}
          />
        </div>
        <div className="lg:col-span-1">
          <CategoryDistributionChart
            data={categoryQuery.data}
            isLoading={categoryQuery.isLoading}
            error={categoryQuery.error}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DistrictRiskTable
            data={districtRiskQuery.data}
            isLoading={districtRiskQuery.isLoading}
          />
        </div>
        <div className="lg:col-span-1">
          <HotspotPreviewCard
            data={hotspotQuery.data}
            isLoading={hotspotQuery.isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <EarlyWarningPreview
          data={earlyWarningQuery.data}
          isLoading={earlyWarningQuery.isLoading}
        />
        <PreventionPreview
          data={preventionQuery.data}
          isLoading={preventionQuery.isLoading}
        />
        <ModelHealthCard
          data={monitoringQuery.data}
          isLoading={monitoringQuery.isLoading}
        />
      </div>

      <RecentInvestigations
        data={investigationsQuery.data}
        isLoading={investigationsQuery.isLoading}
      />
    </div>
  );
}
