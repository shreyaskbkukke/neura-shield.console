import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listEarlyWarnings, getEarlyWarning, getEarlyWarningSummary, updateWarningStatus } from "./api";
import type { EarlyWarningFilters } from "./types";

export function useEarlyWarnings(filters?: EarlyWarningFilters) {
  return useQuery({
    queryKey: ["early-warnings", "list", filters],
    queryFn: () => listEarlyWarnings(filters),
  });
}

export function useEarlyWarning(id: string | null) {
  return useQuery({
    queryKey: ["early-warnings", "detail", id],
    queryFn: () => getEarlyWarning(id!),
    enabled: !!id,
  });
}

export function useEarlyWarningSummary() {
  return useQuery({
    queryKey: ["early-warnings", "summary"],
    queryFn: getEarlyWarningSummary,
  });
}

export function useUpdateWarningStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: string) => updateWarningStatus(id, status),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["early-warnings"] }),
  });
}
