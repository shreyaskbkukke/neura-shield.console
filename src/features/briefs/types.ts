export interface BriefSection {
  section_type: string;
  title: string;
  summary: string;
  severity: string | null;
  confidence_score: number | null;
  evidence: Record<string, unknown>;
}

export interface IntelligenceBriefSchema {
  id: string;
  brief_type: string;
  subject_type: string;
  subject_id: string;
  title: string;
  summary: string;
  risk_level: string | null;
  confidence_score: number;
  sections: BriefSection[];
  recommendations: string[];
  disclaimer: string;
  generated_by: string;
  created_at: string;
  updated_at: string;
}

export interface BriefListResponse {
  items: IntelligenceBriefSchema[];
  total: number;
  page: number;
  limit: number;
}

export interface BriefGenerateRequest {
  brief_type: string;
  subject_type: string;
  subject_id: string;
  force?: boolean;
}

export interface BriefGenerateResponse {
  brief_id: string;
  brief_type: string;
  subject_type: string;
  subject_id: string;
  status: string;
}

export const BRIEF_TYPES = ["CASE_BRIEF", "OFFENDER_BRIEF", "DISTRICT_BRIEF"] as const;
export const SUBJECT_TYPES = ["CASE", "OFFENDER", "DISTRICT"] as const;
