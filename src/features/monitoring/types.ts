export interface ForecastQualitySnapshot {
  id: string;
  snapshot_key: string;
  model_name: string;
  model_version: string;
  forecast_type: string;
  period_start: string | null;
  period_end: string | null;
  mae: number | null;
  rmse: number | null;
  mape: number | null;
  bias: number | null;
  average_confidence: number | null;
  forecast_count: number;
  quality_score: number;
  quality_level: string;
  evidence: Record<string, unknown>;
  created_at: string;
}

export interface ForecastQualityListResponse {
  items: ForecastQualitySnapshot[];
  total: number;
}

export interface ModelDriftMetric {
  id: string;
  metric_key: string;
  model_name: string;
  model_version: string;
  forecast_type: string;
  entity_type: string | null;
  district_id: string | null;
  metric_type: string;
  metric_value: number;
  baseline_value: number | null;
  drift_score: number;
  severity: string;
  period_start: string | null;
  period_end: string | null;
  evidence: Record<string, unknown>;
  created_at: string;
}

export interface ModelDriftListResponse {
  items: ModelDriftMetric[];
  total: number;
}

export interface DataFreshnessCheck {
  id: string;
  check_key: string;
  source_table: string;
  source_type: string;
  latest_record_at: string | null;
  expected_max_age_hours: number | null;
  actual_age_hours: number | null;
  status: string;
  severity: string;
  evidence: Record<string, unknown>;
  created_at: string;
}

export interface DataFreshnessListResponse {
  items: DataFreshnessCheck[];
  total: number;
}

export interface MonitoringSummary {
  forecast_quality: Record<string, number>;
  model_drift: Record<string, number>;
  data_freshness: Record<string, number>;
  overall_status: string;
  disclaimer: string;
}
