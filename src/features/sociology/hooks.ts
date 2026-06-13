import { useQuery } from "@tanstack/react-query";
import { listInsights, listDistrictProfiles, listRiskFactors, listCorrelations } from "./api";

export function useSociologyInsights(page = 1) {
  return useQuery({
    queryKey: ["sociology", "insights", page],
    queryFn: () => listInsights(page),
  });
}

export function useDistrictProfiles(page = 1) {
  return useQuery({
    queryKey: ["sociology", "districts", page],
    queryFn: () => listDistrictProfiles(page),
  });
}

export function useRiskFactors() {
  return useQuery({
    queryKey: ["sociology", "risk-factors"],
    queryFn: () => listRiskFactors(),
  });
}

export function useCorrelations(page = 1) {
  return useQuery({
    queryKey: ["sociology", "correlations", page],
    queryFn: () => listCorrelations(page),
  });
}
