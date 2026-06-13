import { apiGet } from "@/lib/api/client";
import type { AuditLogListResponse, AuditLog, AuditLogFilters } from "./types";

export async function listAuditLogs(
  filters: AuditLogFilters = {},
  page = 1,
  limit = 30,
): Promise<AuditLogListResponse> {
  const params: Record<string, string | number | boolean> = { page, limit };
  if (filters.user_id) params.user_id = filters.user_id;
  if (filters.action) params.action = filters.action;
  if (filters.resource_type) params.resource_type = filters.resource_type;
  if (filters.start_date) params.start_date = filters.start_date;
  if (filters.end_date) params.end_date = filters.end_date;
  return apiGet("/audit-logs", params);
}

export async function getAuditLog(auditId: string): Promise<AuditLog> {
  return apiGet(`/audit-logs/${auditId}`);
}
