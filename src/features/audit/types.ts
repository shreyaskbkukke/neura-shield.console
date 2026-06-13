export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface AuditLogListResponse {
  total: number;
  page: number;
  limit: number;
  items: AuditLog[];
}

export interface AuditLogFilters {
  user_id?: string;
  action?: string;
  resource_type?: string;
  start_date?: string;
  end_date?: string;
}
