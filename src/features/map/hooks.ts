import { useQuery } from "@tanstack/react-query";
import {
  fetchHotspots,
  fetchHotspotDetail,
  fetchHotspotCrimes,
  fetchHotspotExplanation,
  fetchDistrictRiskList,
  fetchDistrictRiskDetail,
  fetchStationRiskList,
  fetchOffenderRiskList,
} from "./api";

export function useHotspots(params: Record<string, string | number | boolean> = {}) {
  return useQuery({
    queryKey: ["map", "hotspots", params],
    queryFn: () => fetchHotspots(params),
  });
}

export function useHotspotDetail(id: string | null) {
  return useQuery({
    queryKey: ["map", "hotspot", id],
    queryFn: () => fetchHotspotDetail(id!),
    enabled: !!id,
  });
}

export function useHotspotCrimes(id: string | null) {
  return useQuery({
    queryKey: ["map", "hotspot-crimes", id],
    queryFn: () => fetchHotspotCrimes(id!),
    enabled: !!id,
  });
}

export function useHotspotExplanation(id: string | null) {
  return useQuery({
    queryKey: ["map", "hotspot-explanation", id],
    queryFn: () => fetchHotspotExplanation(id!),
    enabled: !!id,
  });
}

export function useDistrictRiskList() {
  return useQuery({
    queryKey: ["map", "district-risk"],
    queryFn: fetchDistrictRiskList,
  });
}

export function useDistrictRiskDetail(districtId: string | null) {
  return useQuery({
    queryKey: ["map", "district-risk-detail", districtId],
    queryFn: () => fetchDistrictRiskDetail(districtId!),
    enabled: !!districtId,
  });
}

export function useStationRiskList(page = 1) {
  return useQuery({
    queryKey: ["map", "station-risk", page],
    queryFn: () => fetchStationRiskList(page),
  });
}

export function useOffenderRiskList(page = 1) {
  return useQuery({
    queryKey: ["map", "offender-risk", page],
    queryFn: () => fetchOffenderRiskList(page),
  });
}
