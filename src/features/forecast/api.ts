import { apiGet } from "@/lib/api/client";
import type {
  ForecastRunListResponse,
  CrimeForecastListResponse,
  HotspotForecastListResponse,
  ForecastEvaluationListResponse,
  ForecastFeatureListResponse,
  BacktestWindowListResponse,
  ForecastFeatureFilters,
} from "./types";

export async function listForecastRuns(limit = 10): Promise<ForecastRunListResponse> {
  return apiGet<ForecastRunListResponse>("/forecast/runs", { limit });
}

export async function listDistrictForecasts(districtId: string): Promise<CrimeForecastListResponse> {
  return apiGet<CrimeForecastListResponse>(`/forecast/districts/${districtId}/forecasts`);
}

export async function listHotspotForecasts(limit = 20): Promise<HotspotForecastListResponse> {
  return apiGet<HotspotForecastListResponse>("/forecast/hotspots", { limit });
}

export async function listForecastEvaluations(limit = 20): Promise<ForecastEvaluationListResponse> {
  return apiGet<ForecastEvaluationListResponse>("/forecast/evaluations", { limit });
}

export async function listForecastFeatures(
  filters: ForecastFeatureFilters = {},
  limit = 50,
): Promise<ForecastFeatureListResponse> {
  const params: Record<string, string | number | boolean> = { limit };
  if (filters.entity_type) params.entity_type = filters.entity_type;
  if (filters.granularity) params.granularity = filters.granularity;
  if (filters.district_id) params.district_id = filters.district_id;
  return apiGet<ForecastFeatureListResponse>("/forecast/features", params);
}

export async function listBacktestWindows(limit = 50): Promise<BacktestWindowListResponse> {
  return apiGet<BacktestWindowListResponse>("/forecast/backtest-windows", { limit });
}
