import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listInvestigations,
  createInvestigation,
  getInvestigation,
  updateStatus,
  addNote,
  listNotes,
  getTimeline,
  getRelatedCases,
  getLinkedOffenders,
  generateBrief,
  type CreateInvestigationRequest,
} from "./api";
import type { InvestigationFilters } from "./types";

export function useInvestigationList(filters?: InvestigationFilters) {
  return useQuery({
    queryKey: ["investigations", "list", filters],
    queryFn: () => listInvestigations(filters),
  });
}

export function useInvestigation(id: string | null) {
  return useQuery({
    queryKey: ["investigations", "detail", id],
    queryFn: () => getInvestigation(id!),
    enabled: !!id,
  });
}

export function useCreateInvestigation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateInvestigationRequest) => createInvestigation(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["investigations", "list"] });
    },
  });
}

export function useUpdateStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ status, assignedTo }: { status: string; assignedTo?: string }) =>
      updateStatus(id, status, assignedTo),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["investigations", "detail", id] });
      void queryClient.invalidateQueries({ queryKey: ["investigations", "list"] });
    },
  });
}

export function useAddNote(investigationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ content, noteType }: { content: string; noteType: string }) =>
      addNote(investigationId, content, noteType),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["investigations", "notes", investigationId] });
      void queryClient.invalidateQueries({ queryKey: ["investigations", "detail", investigationId] });
    },
  });
}

export function useInvestigationNotes(id: string | null) {
  return useQuery({
    queryKey: ["investigations", "notes", id],
    queryFn: () => listNotes(id!),
    enabled: !!id,
  });
}

export function useInvestigationTimeline(id: string | null) {
  return useQuery({
    queryKey: ["investigations", "timeline", id],
    queryFn: () => getTimeline(id!),
    enabled: !!id,
  });
}

export function useRelatedCases(id: string | null) {
  return useQuery({
    queryKey: ["investigations", "related-cases", id],
    queryFn: () => getRelatedCases(id!),
    enabled: !!id,
  });
}

export function useLinkedOffenders(id: string | null) {
  return useQuery({
    queryKey: ["investigations", "offenders", id],
    queryFn: () => getLinkedOffenders(id!),
    enabled: !!id,
  });
}

export function useGenerateBrief(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => generateBrief(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["investigations", "detail", id] });
    },
  });
}
