import { useQuery } from "@tanstack/react-query";
import { listAuditLogs } from "./api";
import type { AuditLogFilters } from "./types";

export function useAuditLogs(filters: AuditLogFilters = {}, page = 1) {
  return useQuery({
    queryKey: ["audit-logs", filters, page],
    queryFn: () => listAuditLogs(filters, page),
  });
}
