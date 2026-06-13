import { apiGet, apiPost } from "@/lib/api/client";
import type {
  BriefListResponse,
  IntelligenceBriefSchema,
  BriefGenerateRequest,
  BriefGenerateResponse,
} from "./types";

export function fetchBriefs(params: Record<string, string | number> = {}) {
  return apiGet<BriefListResponse>("/intelligence/briefs", { limit: 20, ...params });
}

export function fetchBriefDetail(briefId: string) {
  return apiGet<IntelligenceBriefSchema>(`/intelligence/briefs/${briefId}`);
}

export function generateBrief(body: BriefGenerateRequest) {
  return apiPost<BriefGenerateResponse>("/intelligence/briefs/generate", body);
}
