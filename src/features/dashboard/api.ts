import { apiGet } from "@/lib/api/client";
import type {
  DashboardSummary,
  CrimeTrendsResponse,
  CategoryStatsResponse,
  HotspotResponse,
  DistrictRiskResponse,
  EarlyWarningSummary,
  PreventionSummary,
  MonitoringSummary,
  Investigation,
  DashboardFilters,
} from "./types";

export function fetchDashboardSummary(filters: Pick<DashboardFilters, "districtId">) {
  const params: Record<string, string> = {};
  if (filters.districtId) params.district_id = filters.districtId;
  return apiGet<DashboardSummary>("/analytics/summary", params);
}

export function fetchCrimeTrends(filters: DashboardFilters) {
  const params: Record<string, string> = { interval: filters.interval };
  if (filters.districtId) params.district_id = filters.districtId;
  return apiGet<CrimeTrendsResponse>("/analytics/trends", params);
}

export function fetchCategoryStats(filters: Pick<DashboardFilters, "districtId">) {
  const params: Record<string, string> = {};
  if (filters.districtId) params.district_id = filters.districtId;
  return apiGet<CategoryStatsResponse>("/analytics/categories", params);
}

export function fetchHotspots(filters: Pick<DashboardFilters, "districtId">) {
  const params: Record<string, string | number> = { limit: 5 };
  if (filters.districtId) params.district_id = filters.districtId;
  return apiGet<HotspotResponse>("/analytics/hotspots", params);
}

export function fetchDistrictRisk() {
  return apiGet<DistrictRiskResponse>("/analytics/risk/districts");
}

export function fetchEarlyWarningSummary(filters: Pick<DashboardFilters, "districtId">) {
  const params: Record<string, string> = {};
  if (filters.districtId) params.district_id = filters.districtId;
  return apiGet<EarlyWarningSummary>("/early-warnings/summary", params);
}

export function fetchPreventionSummary(filters: Pick<DashboardFilters, "districtId">) {
  const params: Record<string, string> = {};
  if (filters.districtId) params.district_id = filters.districtId;
  return apiGet<PreventionSummary>("/prevention/recommendations/summary", params);
}

export function fetchMonitoringSummary(filters: Pick<DashboardFilters, "districtId">) {
  const params: Record<string, string> = {};
  if (filters.districtId) params.district_id = filters.districtId;
  return apiGet<MonitoringSummary>("/monitoring/summary", params);
}

export function fetchRecentInvestigations() {
  return apiGet<Investigation[]>("/workspace", { limit: 8, offset: 0 });
}
