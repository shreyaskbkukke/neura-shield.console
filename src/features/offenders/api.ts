import { apiGet } from "@/lib/api/client";
import type {
  OffenderListResponse,
  OffenderDetail,
  OffenderBehaviorProfile,
  OffenderBehaviorProfileListResponse,
  OffenderMOProfile,
  RepeatOffendersResponse,
} from "./types";

export function fetchOffenders(params: Record<string, string | number> = {}) {
  return apiGet<OffenderListResponse>("/offenders", { limit: 20, ...params });
}

export function fetchOffenderDetail(id: string) {
  return apiGet<OffenderDetail>(`/offenders/${id}`);
}

export function fetchOffenderBehaviorProfile(offenderId: string) {
  return apiGet<OffenderBehaviorProfile>(`/criminology/offenders/${offenderId}/behavior-profile`);
}

export function fetchOffenderMOProfile(offenderId: string) {
  return apiGet<OffenderMOProfile>(`/criminology/offenders/${offenderId}/mo-profile`);
}

export function fetchRepeatOffenders() {
  return apiGet<RepeatOffendersResponse>("/analytics/repeat-offenders", { limit: 10 });
}

export function fetchHabitualOffenders(params: Record<string, string | number> = {}) {
  return apiGet<OffenderBehaviorProfileListResponse>("/criminology/habitual-offenders", { limit: 20, ...params });
}

export function fetchEscalationRisk(params: Record<string, string | number> = {}) {
  return apiGet<OffenderBehaviorProfileListResponse>("/criminology/escalation-risk", { limit: 20, ...params });
}

export function fetchBehaviorProfiles(params: Record<string, string | number> = {}) {
  return apiGet<OffenderBehaviorProfileListResponse>("/criminology/behavior-profiles", { limit: 20, ...params });
}
