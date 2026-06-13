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
