import { apiGet, apiPatch } from "@/lib/api/client";
import type {
  EarlyWarningListResponse,
  EarlyWarning,
  EarlyWarningSummary,
  EarlyWarningFilters,
} from "./types";

export async function listEarlyWarnings(
  filters?: EarlyWarningFilters,
  limit = 50,
  offset = 0,
): Promise<EarlyWarningListResponse> {
  const params: Record<string, string | number | boolean> = { limit, offset };
  if (filters?.severity) params.severity = filters.severity;
  if (filters?.status) params.status = filters.status;
  return apiGet<EarlyWarningListResponse>("/early-warnings", params);
}

export async function getEarlyWarning(id: string): Promise<EarlyWarning> {
  return apiGet<EarlyWarning>(`/early-warnings/${id}`);
}

export async function getEarlyWarningSummary(): Promise<EarlyWarningSummary> {
  return apiGet<EarlyWarningSummary>("/early-warnings/summary");
}

export async function updateWarningStatus(id: string, status: string): Promise<EarlyWarning> {
  return apiPatch<EarlyWarning>(`/early-warnings/${id}/status`, { status });
}
