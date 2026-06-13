import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listThreads, getThreadMessages, exportThreadPdf, listThreadExports } from "./api";

export function useThreadList() {
  return useQuery({
    queryKey: ["conversations", "list"],
    queryFn: listThreads,
  });
}

export function useThreadMessages(threadId: string | null) {
  return useQuery({
    queryKey: ["conversations", "messages", threadId],
    queryFn: () => getThreadMessages(threadId!),
    enabled: !!threadId,
  });
}

export function useThreadExports(threadId: string | null) {
  return useQuery({
    queryKey: ["conversations", "exports", threadId],
    queryFn: () => listThreadExports(threadId!),
    enabled: !!threadId,
  });
}

export function useExportThread(threadId: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => exportThreadPdf(threadId!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["conversations", "exports", threadId] });
    },
  });
}
