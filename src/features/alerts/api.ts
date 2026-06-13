import { apiGet, apiPatch } from "@/lib/api/client";
import type { AlertListResponse, AlertDetail, AlertFilters } from "./types";

export async function listAlerts(filters?: AlertFilters, limit = 50, page = 1): Promise<AlertListResponse> {
  const params: Record<string, string | number | boolean> = { limit, page };
  if (filters?.severity) params.severity = filters.severity;
  if (filters?.status) params.status = filters.status;
  if (filters?.district_id) params.district_id = filters.district_id;
  if (filters?.alert_type) params.alert_type = filters.alert_type;
  return apiGet<AlertListResponse>("/alerts", params);
}

export async function getAlert(id: string): Promise<AlertDetail> {
  return apiGet<AlertDetail>(`/alerts/${id}`);
}

export async function updateAlertStatus(
  id: string,
  status: string,
  note?: string,
): Promise<AlertDetail> {
  return apiPatch<AlertDetail>(`/alerts/${id}/status`, { status, note });
}
