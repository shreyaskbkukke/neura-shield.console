export interface DistrictSummary {
  id: string;
  name: string;
}

export interface StationSummary {
  id: string;
  name: string;
}

export interface HotspotListItem {
  id: string;
  district: DistrictSummary | null;
  police_station: StationSummary | null;
  center_latitude: number;
  center_longitude: number;
  radius_meters: number | null;
  crime_count: number;
  high_severity_count: number;
  top_category: string | null;
  risk_score: number | null;
  risk_level: string | null;
  detection_method: string | null;
  detected_from: string | null;
  detected_to: string | null;
  is_active: boolean;
}

export interface HotspotListResponse {
  total: number;
  page: number;
  limit: number;
  items: HotspotListItem[];
}

export interface HotspotDetail extends HotspotListItem {
  explanation: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface HotspotCrimeItem {
  crime_id: string;
  incident_number: string;
  title: string;
  category: string;
  incident_at: string;
  latitude: number;
  longitude: number;
  severity_score: number | null;
  distance_from_center_meters: number;
}

export interface HotspotCrimesResponse {
  total: number;
  items: HotspotCrimeItem[];
}

export interface DistrictRiskItem {
  district_id: string;
  district_name: string;
  score_date: string;
  risk_score: number;
  risk_level: string;
  crime_count_7d: number | null;
  crime_count_30d: number | null;
  high_severity_count_30d: number | null;
  repeat_offender_count: number | null;
  hotspot_count: number | null;
  anomaly_count: number | null;
  top_reasons: string[];
}

export interface DistrictRiskListResponse {
  total: number;
  page: number;
  limit: number;
  items: DistrictRiskItem[];
}

export interface MapFilters {
  riskLevel: string;
  activeOnly: boolean;
  districtId: string;
}

export interface HotspotExplanationResponse {
  hotspot_id: string;
  risk_score: number | null;
  risk_level: string | null;
  explanation: Record<string, unknown> | null;
}

export interface DistrictRiskDetail extends DistrictRiskItem {
  explanation: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface StationRiskItem {
  police_station_id: string;
  station_name: string;
  district_name: string | null;
  score_date: string;
  risk_score: number;
  risk_level: string;
  crime_count_7d: number | null;
  crime_count_30d: number | null;
  high_severity_count_30d: number | null;
  active_hotspot_count: number | null;
  model_version: string | null;
  top_reasons: string[];
}

export interface StationRiskListResponse {
  total: number;
  page: number;
  limit: number;
  items: StationRiskItem[];
}

export interface OffenderRiskItem {
  offender_id: string;
  offender_name: string;
  score_date: string;
  risk_score: number;
  risk_level: string;
  total_cases: number | null;
  high_severity_cases: number | null;
  recent_case_count_90d: number | null;
}

export interface OffenderRiskListResponse {
  total: number;
  page: number;
  limit: number;
  items: OffenderRiskItem[];
}

export interface GridHotspotItem {
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

export interface GridHotspotResponse {
  items: GridHotspotItem[];
}

