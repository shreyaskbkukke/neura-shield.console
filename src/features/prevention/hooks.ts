import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listRecommendations,
  getRecommendation,
  getPreventionSummary,
  updateRecommendationStatus,
} from "./api";
import type { PreventionFilters } from "./types";

export function usePreventionRecommendations(filters?: PreventionFilters) {
  return useQuery({
    queryKey: ["prevention", "list", filters],
    queryFn: () => listRecommendations(filters),
  });
}

export function usePreventionRecommendation(id: string | null) {
  return useQuery({
    queryKey: ["prevention", "detail", id],
    queryFn: () => getRecommendation(id!),
    enabled: !!id,
  });
}

export function usePreventionSummary() {
  return useQuery({
    queryKey: ["prevention", "summary"],
    queryFn: getPreventionSummary,
  });
}

export function useUpdateRecommendationStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: string) => updateRecommendationStatus(id, status),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["prevention"] }),
  });
}
