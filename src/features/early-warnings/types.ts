export interface EarlyWarning {
  id: string;
  warning_key: string;
  warning_type: string;
  title: string;
  summary: string;
  district_id: string | null;
  police_station_id: string | null;
  category_id: string | null;
  related_forecast_id: string | null;
  related_hotspot_forecast_id: string | null;
  severity: string;
  confidence_score: number;
  forecast_period_start: string | null;
  forecast_period_end: string | null;
  evidence: Record<string, unknown>;
  recommended_review_points: string[];
  status: string;
  disclaimer: string;
  created_at: string;
  updated_at: string;
  acknowledged_at: string | null;
  resolved_at: string | null;
}

export interface EarlyWarningListResponse {
  items: EarlyWarning[];
  total: number;
}

export interface EarlyWarningSummary {
  total_open: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  warning_type_breakdown: Record<string, number>;
}

export interface EarlyWarningFilters {
  severity?: string;
  status?: string;
}

export const EW_TRANSITIONS: Record<string, string[]> = {
  OPEN: ["ACKNOWLEDGED", "DISMISSED"],
  ACKNOWLEDGED: ["UNDER_REVIEW", "DISMISSED"],
  UNDER_REVIEW: ["RESOLVED", "DISMISSED"],
  RESOLVED: [],
  DISMISSED: [],
};
