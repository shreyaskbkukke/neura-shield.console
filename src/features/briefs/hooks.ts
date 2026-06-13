import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBriefs, fetchBriefDetail, generateBrief } from "./api";
import type { BriefGenerateRequest } from "./types";

export function useBriefs(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: ["briefs", "list", params],
    queryFn: () => fetchBriefs(params),
  });
}

export function useBriefDetail(briefId: string | null) {
  return useQuery({
    queryKey: ["briefs", "detail", briefId],
    queryFn: () => fetchBriefDetail(briefId!),
    enabled: !!briefId,
  });
}

export function useGenerateBrief() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: BriefGenerateRequest) => generateBrief(req),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["briefs", "list"] });
    },
  });
}
