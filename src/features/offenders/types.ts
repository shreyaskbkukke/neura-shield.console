export interface OffenderListItem {
  id: string;
  full_name: string;
  alias_name: string | null;
  age: number | null;
  gender: string;
  district_name: string | null;
  total_crimes: number;
  risk_level: string;
  risk_score: number;
}

export interface CrimeLinkItem {
  crime_id: string;
  incident_number: string;
  category_name: string;
  district_name: string;
  role: string;
  arrest_status: string;
}

export interface OffenderDetail {
  id: string;
  full_name: string;
  alias_name: string | null;
  age: number | null;
  gender: string;
  address: string | null;
  district_name: string | null;
  risk_level: string;
  risk_score: number;
  total_crimes: number;
  high_severity_crimes: number;
  districts_active: number;
  crime_links: CrimeLinkItem[];
}

export interface OffenderListResponse {
  total: number;
  page: number;
  limit: number;
  items: OffenderListItem[];
}

export interface BehaviorScores {
  habitual_offender_score: number;
  escalation_score: number;
  specialization_score: number;
  geographic_mobility_score: number;
  temporal_pattern_score: number;
  mo_consistency_score: number;
}

export interface OffenderBehaviorProfile {
  id: string;
  offender_id: string;
  offender_name: string;
  profile_type: string;
  scores: BehaviorScores;
  dominant_category: { id: string; code: string } | null;
  dominant_mo: { id: string; mo_code: string; mo_name: string } | null;
  linked_case_count: number;
  recent_case_count_90d: number;
  district_count: number;
  summary: string | null;
  disclaimer: string;
  computed_at: string;
}

export interface OffenderBehaviorProfileListResponse {
  items: OffenderBehaviorProfile[];
  page: number;
  limit: number;
  total: number;
}

export interface OffenderMOProfile {
  id: string;
  offender_id: string;
  offender_name: string;
  primary_mo_code: string | null;
  primary_mo_name: string | null;
  mo_count: number;
  total_linked_cases: number;
  consistency_score: number;
  specialization_score: number;
  evidence: Record<string, unknown> | null;
}

export interface RepeatOffenderItem {
  offender_id: string;
  full_name: string;
  alias_name: string | null;
  gender: string;
  district_name: string | null;
  total_cases: number;
  high_severity_cases: number;
  districts_active: number;
  recent_cases: number;
  risk_score: number;
  risk_level: string;
}

export interface RepeatOffendersResponse {
  total: number;
  items: RepeatOffenderItem[];
}
