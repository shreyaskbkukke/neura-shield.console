import { apiGet } from "@/lib/api/client";
import type {
  ForecastQualityListResponse,
  ModelDriftListResponse,
  DataFreshnessListResponse,
  MonitoringSummary,
} from "./types";

export async function listForecastQuality(limit = 20): Promise<ForecastQualityListResponse> {
  return apiGet<ForecastQualityListResponse>("/monitoring/forecast-quality", { limit });
}

export async function listModelDrift(limit = 20): Promise<ModelDriftListResponse> {
  return apiGet<ModelDriftListResponse>("/monitoring/model-drift", { limit });
}

export async function listDataFreshness(): Promise<DataFreshnessListResponse> {
  return apiGet<DataFreshnessListResponse>("/monitoring/data-freshness");
}

export async function getMonitoringSummary(): Promise<MonitoringSummary> {
  return apiGet<MonitoringSummary>("/monitoring/summary");
}
