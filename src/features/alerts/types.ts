export interface AlertEntityRef {
  id: string;
  name: string;
}

export interface AlertListItem {
  id: string;
  alert_type: string;
  title: string;
  district: AlertEntityRef | null;
  police_station: AlertEntityRef | null;
  severity: string;
  confidence_score: number | null;
  status: string;
  assigned_to: string | null;
  acknowledged_at: string | null;
  resolved_at: string | null;
  created_at: string;
}

export interface AlertDetail extends AlertListItem {
  description: string | null;
  resolution_note: string | null;
  evidence: Record<string, unknown> | null;
  updated_at: string;
}

export interface AlertListResponse {
  total: number;
  page: number;
  limit: number;
  items: AlertListItem[];
}

export interface AlertFilters {
  severity?: string;
  status?: string;
  district_id?: string;
  alert_type?: string;
}

export const ALERT_STATUSES = ["OPEN", "ACKNOWLEDGED", "UNDER_REVIEW", "RESOLVED"] as const;
export const ALERT_SEVERITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

export const ALERT_TRANSITIONS: Record<string, string[]> = {
  OPEN: ["ACKNOWLEDGED"],
  ACKNOWLEDGED: ["UNDER_REVIEW", "RESOLVED"],
  UNDER_REVIEW: ["RESOLVED"],
  RESOLVED: [],
};
