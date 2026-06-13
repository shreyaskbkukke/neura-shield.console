import { useQuery } from "@tanstack/react-query";
import {
  fetchDashboardSummary,
  fetchCrimeTrends,
  fetchCategoryStats,
  fetchHotspots,
  fetchDistrictRisk,
  fetchEarlyWarningSummary,
  fetchPreventionSummary,
  fetchMonitoringSummary,
  fetchRecentInvestigations,
} from "./api";
import type { DashboardFilters } from "./types";

export function useDashboardSummary(filters: Pick<DashboardFilters, "districtId">) {
  return useQuery({
    queryKey: ["dashboard", "summary", filters],
    queryFn: () => fetchDashboardSummary(filters),
  });
}

export function useCrimeTrends(filters: DashboardFilters) {
  return useQuery({
    queryKey: ["dashboard", "trends", filters],
    queryFn: () => fetchCrimeTrends(filters),
  });
}

export function useCategoryStats(filters: Pick<DashboardFilters, "districtId">) {
  return useQuery({
    queryKey: ["dashboard", "categories", filters],
    queryFn: () => fetchCategoryStats(filters),
  });
}

export function useHotspotPreview(filters: Pick<DashboardFilters, "districtId">) {
  return useQuery({
    queryKey: ["dashboard", "hotspots", filters],
    queryFn: () => fetchHotspots(filters),
  });
}

export function useDistrictRisk() {
  return useQuery({
    queryKey: ["dashboard", "district-risk"],
    queryFn: fetchDistrictRisk,
  });
}

export function useEarlyWarningsPreview(filters: Pick<DashboardFilters, "districtId">) {
  return useQuery({
    queryKey: ["dashboard", "early-warnings", filters],
    queryFn: () => fetchEarlyWarningSummary(filters),
  });
}

export function usePreventionPreview(filters: Pick<DashboardFilters, "districtId">) {
  return useQuery({
    queryKey: ["dashboard", "prevention", filters],
    queryFn: () => fetchPreventionSummary(filters),
  });
}

export function useMonitoringSummary(filters: Pick<DashboardFilters, "districtId">) {
  return useQuery({
    queryKey: ["dashboard", "monitoring", filters],
    queryFn: () => fetchMonitoringSummary(filters),
  });
}

export function useRecentInvestigations() {
  return useQuery({
    queryKey: ["dashboard", "recent-investigations"],
    queryFn: fetchRecentInvestigations,
  });
}
