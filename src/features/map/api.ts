import { apiGet } from "@/lib/api/client";
import type {
  HotspotListResponse,
  HotspotDetail,
  HotspotCrimesResponse,
  HotspotExplanationResponse,
  DistrictRiskListResponse,
  DistrictRiskDetail,
  StationRiskListResponse,
  OffenderRiskListResponse,
  GridHotspotResponse,
} from "./types";

export function fetchHotspots(params: Record<string, string | number | boolean> = {}) {
  return apiGet<HotspotListResponse>("/intelligence/hotspots", { limit: 50, ...params });
}

export function fetchGridHotspots(params: Record<string, string | number | boolean> = {}) {
  return apiGet<GridHotspotResponse>("/analytics/hotspots", { limit: 100, ...params });
}

export function fetchHotspotDetail(id: string) {
  return apiGet<HotspotDetail>(`/intelligence/hotspots/${id}`);
}

export function fetchHotspotCrimes(id: string) {
  return apiGet<HotspotCrimesResponse>(`/intelligence/hotspots/${id}/crimes`, { limit: 20 });
}

export function fetchHotspotExplanation(id: string) {
  return apiGet<HotspotExplanationResponse>(`/intelligence/hotspots/${id}/explanation`);
}

export function fetchDistrictRiskList() {
  return apiGet<DistrictRiskListResponse>("/intelligence/risk/districts", { limit: 20 });
}

export function fetchDistrictRiskDetail(districtId: string) {
  return apiGet<DistrictRiskDetail>(`/intelligence/risk/districts/${districtId}`);
}

export function fetchStationRiskList(page = 1, limit = 20) {
  return apiGet<StationRiskListResponse>("/intelligence/risk/police-stations", { page, limit });
}

export function fetchOffenderRiskList(page = 1, limit = 20) {
  return apiGet<OffenderRiskListResponse>("/intelligence/risk/offenders", { page, limit });
}
