export interface Investigation {
  id: string;
  case_ref: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  crime_incident_id: string | null;
  alert_id: string | null;
  district_id: string | null;
  created_by_user_id: string;
  assigned_to_user_id: string | null;
  brief_summary: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvestigationNote {
  id: string;
  investigation_id: string;
  created_by_user_id: string;
  content: string;
  note_type: string;
  created_at: string;
}

export interface InvestigationDetail extends Investigation {
  notes: InvestigationNote[];
}

export interface InvestigationTimelineEvent {
  id: string;
  crime_id: string | null;
  investigation_id: string | null;
  event_type: string;
  title: string;
  description: string | null;
  occurred_at: string;
  source: string | null;
  created_at: string;
}

export interface RelatedCase {
  crime_incident_id: string;
  incident_number: string;
  title: string;
  district_id: string;
  category_id: string;
  status: string;
  severity_score: number | null;
  relevance_score: number;
}

export interface LinkedOffender {
  offender_id: string;
  full_name: string;
  alias_name: string | null;
  risk_level: string;
  arrest_status: string;
  role: string;
}

export interface GenerateBriefResponse {
  investigation_id: string;
  brief_summary: string;
  evidence_count: number;
  tools_used: string[];
}

export interface InvestigationFilters {
  status?: string;
}

export const INVESTIGATION_STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "PENDING_REVIEW",
  "CLOSED",
  "ARCHIVED",
] as const;

export const INVESTIGATION_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

export const NOTE_TYPES = ["OBSERVATION", "EVIDENCE", "ACTION", "DECISION"] as const;
