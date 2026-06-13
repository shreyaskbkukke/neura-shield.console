export interface PreventionRecommendation {
  id: string;
  recommendation_key: string;
  recommendation_type: string;
  title: string;
  summary: string;
  district_id: string | null;
  police_station_id: string | null;
  category_id: string | null;
  related_warning_id: string | null;
  related_forecast_id: string | null;
  related_hotspot_forecast_id: string | null;
  priority: string;
  confidence_score: number;
  suggested_actions: string[];
  evidence: Record<string, unknown>;
  expected_outcome: string | null;
  review_owner_role: string | null;
  status: string;
  disclaimer: string;
  created_at: string;
  updated_at: string;
  acknowledged_at: string | null;
  resolved_at: string | null;
}

export interface PreventionRecommendationListResponse {
  items: PreventionRecommendation[];
  total: number;
}

export interface PreventionSummary {
  total_open: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  recommendation_type_breakdown: Record<string, number>;
}

export interface PreventionFilters {
  status?: string;
  priority?: string;
  recommendation_type?: string;
}

export const PREVENTION_TRANSITIONS: Record<string, string[]> = {
  OPEN: ["ACKNOWLEDGED", "DISMISSED"],
  ACKNOWLEDGED: ["UNDER_REVIEW", "DISMISSED"],
  UNDER_REVIEW: ["IMPLEMENTED", "DISMISSED"],
  IMPLEMENTED: [],
  DISMISSED: [],
};
