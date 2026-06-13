export interface DashboardSummary {
  total_crimes: number;
  open_cases: number;
  closed_cases: number;
  high_severity_cases: number;
  avg_severity_score: number | null;
  unique_districts: number;
  unique_police_stations: number;
  crime_change_percentage: number | null;
}

export interface TrendPoint {
  period: string;
  crime_count: number;
}

export interface CrimeTrendsResponse {
  interval: string;
  items: TrendPoint[];
}

export interface CategoryStat {
  category_id: string;
  category_name: string;
  count: number;
  percentage: number;
  severity_level: number;
}

export interface CategoryStatsResponse {
  items: CategoryStat[];
}

export interface HotspotItem {
  hotspot_id: string;
  center_latitude: number;
  center_longitude: number;
  district_id: string;
  district_name: string;
  crime_count: number;
  high_severity_count: number;
  avg_severity_score: number | null;
  top_category: string;
  risk_score: number;
}

export interface HotspotResponse {
  items: HotspotItem[];
}

export interface DistrictRiskItem {
  district_id: string;
  district_name: string;
  total_crimes: number;
  open_cases: number;
  high_severity_cases: number;
  avg_severity_score: number | null;
  risk_score: number;
  risk_level: string;
}

export interface DistrictRiskResponse {
  items: DistrictRiskItem[];
}

export interface EarlyWarningSummary {
  total_open: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  warning_type_breakdown: Record<string, number>;
}

export interface PreventionSummary {
  total_open: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  recommendation_type_breakdown: Record<string, number>;
}

export interface MonitoringSummary {
  forecast_quality: Record<string, number>;
  model_drift: Record<string, number>;
  data_freshness: Record<string, number>;
  overall_status: string;
  disclaimer: string;
}

export interface Investigation {
  id: string;
  case_ref: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  district_id: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardFilters {
  interval: "daily" | "weekly" | "monthly";
  districtId: string;
}
