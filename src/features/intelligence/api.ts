import { apiGet } from "@/lib/api/client";
import type {
  SociologyInsightListResponse,
  MOProfileListResponse,
  SuspiciousPatternListResponse,
  BriefListResponse,
} from "./types";

export function fetchSociologyInsights(params: Record<string, string | number> = {}) {
  return apiGet<SociologyInsightListResponse>("/sociology/insights", { limit: 8, ...params });
}

export function fetchMOPatterns(params: Record<string, string | number> = {}) {
  return apiGet<MOProfileListResponse>("/criminology/mo-patterns", { limit: 8, ...params });
}

export function fetchFinancialPatternsSummary(params: Record<string, string | number> = {}) {
  return apiGet<SuspiciousPatternListResponse>("/financial/suspicious-patterns", { limit: 6, ...params });
}

export function fetchBriefsSummary(params: Record<string, string | number> = {}) {
  return apiGet<BriefListResponse>("/intelligence/briefs", { limit: 6, ...params });
}
