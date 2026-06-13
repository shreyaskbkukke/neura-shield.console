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

export interface MOProfileSchema {
  id: string;
  mo_code: string;
  mo_name: string;
  mo_category: string;
  description: string;
  keywords: string[];
  severity_weight: number;
  created_at: string;
}

export interface MOProfileListResponse {
  items: MOProfileSchema[];
  page: number;
  limit: number;
  total: number;
}

export interface SuspiciousPatternItem {
  id: string;
  pattern_type: string;
  title: string;
  summary: string;
  confidence_score: number;
  severity: string;
  involved_account_ids: string[];
  involved_transaction_ids: string[];
  linked_crime_ids: string[];
  disclaimer: string;
  created_at: string;
}

export interface SuspiciousPatternListResponse {
  items: SuspiciousPatternItem[];
  total: number;
  page: number;
  limit: number;
}

export interface IntelligenceBriefItem {
  id: string;
  brief_type: string;
  subject_type: string;
  subject_id: string;
  title: string;
  summary: string;
  risk_level: string | null;
  confidence_score: number;
  generated_by: string;
  created_at: string;
}

export interface BriefListResponse {
  items: IntelligenceBriefItem[];
  total: number;
  page: number;
  limit: number;
}
