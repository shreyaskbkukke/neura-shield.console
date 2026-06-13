import { apiGet, apiPatch } from "@/lib/api/client";
import type {
  PreventionRecommendationListResponse,
  PreventionRecommendation,
  PreventionSummary,
  PreventionFilters,
} from "./types";

export async function listRecommendations(
  filters?: PreventionFilters,
  limit = 50,
  offset = 0,
): Promise<PreventionRecommendationListResponse> {
  const params: Record<string, string | number | boolean> = { limit, offset };
  if (filters?.status) params.status = filters.status;
  if (filters?.priority) params.priority = filters.priority;
  if (filters?.recommendation_type) params.recommendation_type = filters.recommendation_type;
  return apiGet<PreventionRecommendationListResponse>("/prevention/recommendations", params);
}

export async function getRecommendation(id: string): Promise<PreventionRecommendation> {
  return apiGet<PreventionRecommendation>(`/prevention/recommendations/${id}`);
}

export async function getPreventionSummary(): Promise<PreventionSummary> {
  return apiGet<PreventionSummary>("/prevention/recommendations/summary");
}

export async function updateRecommendationStatus(
  id: string,
  status: string,
): Promise<PreventionRecommendation> {
  return apiPatch<PreventionRecommendation>(`/prevention/recommendations/${id}/status`, { status });
}
