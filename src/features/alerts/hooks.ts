import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listAlerts, getAlert, updateAlertStatus } from "./api";
import type { AlertFilters } from "./types";

export function useAlerts(filters?: AlertFilters) {
  return useQuery({
    queryKey: ["alerts", "list", filters],
    queryFn: () => listAlerts(filters),
    refetchInterval: 30_000,
  });
}

export function useAlert(id: string | null) {
  return useQuery({
    queryKey: ["alerts", "detail", id],
    queryFn: () => getAlert(id!),
    enabled: !!id,
  });
}

export function useUpdateAlertStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ status, note }: { status: string; note?: string }) =>
      updateAlertStatus(id, status, note),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}
