export interface ForecastRun {
  id: string;
  run_key: string;
  model_name: string;
  model_version: string;
  forecast_start: string;
  forecast_end: string;
  forecast_weeks: number;
  status: string;
  total_districts: number;
  total_stations: number;
  total_forecasts_generated: number;
  created_at: string;
}

export interface ForecastRunListResponse {
  items: ForecastRun[];
  total: number;
}

export interface CrimeForecast {
  id: string;
  forecast_run_id: string;
  forecast_key: string;
  entity_type: string;
  entity_id: string;
  district_id: string | null;
  police_station_id: string | null;
  crime_category_id: string | null;
  period_start: string;
  period_end: string;
  model_name: string;
  predicted_count: number;
  lower_bound: number;
  upper_bound: number;
}

export interface CrimeForecastListResponse {
  items: CrimeForecast[];
  total: number;
}

export interface HotspotForecast {
  id: string;
  forecast_run_id: string;
  district_id: string | null;
  police_station_id: string | null;
  period_start: string;
  period_end: string;
  predicted_hotspot_count: number;
  predicted_risk_score: number;
  high_risk_zones: string[];
  contributing_factors: Record<string, unknown>;
  confidence_score: number;
  disclaimer: string;
  created_at: string;
}

export interface HotspotForecastListResponse {
  items: HotspotForecast[];
  total: number;
}

export interface ForecastEvaluation {
  id: string;
  forecast_run_id: string | null;
  model_name: string;
  entity_type: string;
  evaluation_start: string;
  evaluation_end: string;
  mean_absolute_error: number;
  root_mean_squared_error: number;
  mean_absolute_percentage_error: number | null;
  coverage_rate: number;
}

export interface ForecastEvaluationListResponse {
  items: ForecastEvaluation[];
  total: number;
}

export interface CrimeForecastFeature {
  id: string;
  feature_key: string;
  entity_type: string;
  entity_id: string;
  district_id: string | null;
  police_station_id: string | null;
  crime_category_id: string | null;
  period_start: string;
  period_end: string;
  granularity: string;

  crime_count: number;
  crime_count_7d: number;
  crime_count_30d: number;
  crime_count_90d: number;
  previous_period_count: number;
  growth_rate: number | null;
  moving_average_3: number | null;
  moving_average_6: number | null;

  hotspot_count: number;
  alert_count: number;
  anomaly_count: number;
  pattern_count: number;
  repeat_offender_count: number;
  high_risk_offender_count: number;

  sociology_risk_score: number | null;
  dominant_mo_count: number;
  mo_diversity_score: number | null;
  behavior_profile_count: number;
  high_habitual_score_count: number;
  graph_candidate_count: number;
  financial_pattern_count: number;
  money_trail_count: number;

  source: string;
  created_at: string;
  updated_at: string;
}

export interface ForecastFeatureListResponse {
  items: CrimeForecastFeature[];
  total: number;
}

export interface ForecastFeatureFilters {
  entity_type?: string;
  granularity?: string;
  district_id?: string;
}

export interface ForecastBacktestWindow {
  id: string;
  window_name: string;
  train_start: string;
  train_end: string;
  test_start: string;
  test_end: string;
  granularity: string;
  created_at: string;
}

export interface BacktestWindowListResponse {
  items: ForecastBacktestWindow[];
  total: number;
}
