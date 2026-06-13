import { apiGet } from "@/lib/api/client";
import type {
  ForecastRunListResponse,
  CrimeForecastListResponse,
  HotspotForecastListResponse,
  ForecastEvaluationListResponse,
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
