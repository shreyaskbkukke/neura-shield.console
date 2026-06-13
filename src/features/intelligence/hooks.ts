import { useQuery } from "@tanstack/react-query";
import {
  fetchSociologyInsights,
  fetchMOPatterns,
  fetchFinancialPatternsSummary,
  fetchBriefsSummary,
} from "./api";

export function useSociologyInsights() {
  return useQuery({
    queryKey: ["intelligence", "sociology"],
    queryFn: () => fetchSociologyInsights(),
  });
}

export function useMOPatterns() {
  return useQuery({
    queryKey: ["intelligence", "mo-patterns"],
    queryFn: () => fetchMOPatterns(),
  });
}

export function useFinancialPatternsSummary() {
  return useQuery({
    queryKey: ["intelligence", "financial-patterns"],
    queryFn: () => fetchFinancialPatternsSummary(),
  });
}

export function useBriefsSummary() {
  return useQuery({
    queryKey: ["intelligence", "briefs"],
    queryFn: () => fetchBriefsSummary(),
  });
}
