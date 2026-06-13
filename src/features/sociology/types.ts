export interface SociologyInsight {
  id: string;
  district_id: string | null;
  district_name: string | null;
  insight_type: string;
  title: string;
  summary: string;
  severity: string;
  confidence_score: number;
  related_indicator: string | null;
  related_category_code: string | null;
  period_year: number;
  evidence: Record<string, unknown> | null;
  disclaimer: string;
  created_at: string;
}

export interface SociologyInsightListResponse {
  items: SociologyInsight[];
  page: number;
  limit: number;
  total: number;
}

export interface DistrictSocioProfile {
  district_id: string;
  district_name: string | null;
  snapshot_year: number;
  population: number | null;
  population_density: number | null;
  urbanization_rate: number | null;
  literacy_rate: number | null;
  unemployment_rate: number | null;
  economic_stress_index: number | null;
  education_index: number | null;
  youth_population_ratio: number | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

export interface DistrictSocioProfileListResponse {
  items: DistrictSocioProfile[];
  page: number;
  limit: number;
  total: number;
  disclaimer: string;
}

export interface RiskFactor {
  rank: number;
  indicator_name: string;
  avg_association_score: number;
  max_association_score: number;
  district_count: number;
  top_crime_categories: string[];
}

export interface RiskFactorListResponse {
  items: RiskFactor[];
  total: number;
  period_year: number;
  source_note: string;
}

export interface Correlation {
  id: string;
  district_name: string | null;
  crime_category_code: string | null;
  indicator_name: string;
  correlation_score: number;
  direction: string;
  sample_size: number;
  method: string;
  period_year: number;
  created_at: string;
}

export interface CorrelationListResponse {
  items: Correlation[];
  page: number;
  limit: number;
  total: number;
}
