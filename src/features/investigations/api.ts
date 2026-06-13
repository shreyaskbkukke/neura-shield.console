import { apiGet, apiPost, apiPatch } from "@/lib/api/client";
import type {
  Investigation,
  InvestigationDetail,
  InvestigationNote,
  InvestigationTimelineEvent,
  RelatedCase,
  LinkedOffender,
  GenerateBriefResponse,
  InvestigationFilters,
} from "./types";

export interface CreateInvestigationRequest {
  title: string;
  description?: string;
  priority: string;
  district_id: string;
  crime_incident_id?: string;
  alert_id?: string;
}

export interface ListInvestigationsResponse {
  items: Investigation[];
  total: number;
}

export async function listInvestigations(
  filters?: InvestigationFilters,
  limit = 50,
  offset = 0,
): Promise<ListInvestigationsResponse> {
  const params: Record<string, string | number | boolean> = { limit, offset };
  if (filters?.status) params.status = filters.status;
  const items = await apiGet<Investigation[]>("/workspace", params);
  return { items, total: items.length };
}

export async function createInvestigation(
  body: CreateInvestigationRequest,
): Promise<Investigation> {
  return apiPost<Investigation>("/workspace", body);
}

export async function getInvestigation(id: string): Promise<InvestigationDetail> {
  return apiGet<InvestigationDetail>(`/workspace/${id}`);
}

export async function updateStatus(
  id: string,
  status: string,
  assignedToUserId?: string,
): Promise<Investigation> {
  return apiPatch<Investigation>(`/workspace/${id}/status`, {
    status,
    assigned_to_user_id: assignedToUserId,
  });
}

export async function addNote(
  investigationId: string,
  content: string,
  noteType: string,
): Promise<InvestigationNote> {
  return apiPost<InvestigationNote>(`/workspace/${investigationId}/notes`, {
    content,
    note_type: noteType,
  });
}

export async function listNotes(investigationId: string): Promise<InvestigationNote[]> {
  return apiGet<InvestigationNote[]>(`/workspace/${investigationId}/notes`);
}

export async function getTimeline(investigationId: string): Promise<InvestigationTimelineEvent[]> {
  return apiGet<InvestigationTimelineEvent[]>(`/workspace/${investigationId}/timeline`);
}

export async function getRelatedCases(investigationId: string): Promise<RelatedCase[]> {
  return apiGet<RelatedCase[]>(`/workspace/${investigationId}/related-cases`);
}

export async function getLinkedOffenders(investigationId: string): Promise<LinkedOffender[]> {
  return apiGet<LinkedOffender[]>(`/workspace/${investigationId}/offenders`);
}

export async function generateBrief(investigationId: string): Promise<GenerateBriefResponse> {
  return apiPost<GenerateBriefResponse>(`/workspace/${investigationId}/brief`);
}
