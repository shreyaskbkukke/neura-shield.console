import { useQuery } from "@tanstack/react-query";
import {
  fetchOffenders,
  fetchOffenderDetail,
  fetchOffenderBehaviorProfile,
  fetchOffenderMOProfile,
  fetchRepeatOffenders,
  fetchHabitualOffenders,
  fetchEscalationRisk,
  fetchBehaviorProfiles,
} from "./api";

export function useOffenders(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: ["offenders", "list", params],
    queryFn: () => fetchOffenders(params),
  });
}

export function useOffenderDetail(id: string | null) {
  return useQuery({
    queryKey: ["offenders", "detail", id],
    queryFn: () => fetchOffenderDetail(id!),
    enabled: !!id,
  });
}

export function useOffenderBehaviorProfile(offenderId: string | null) {
  return useQuery({
    queryKey: ["offenders", "behavior", offenderId],
    queryFn: () => fetchOffenderBehaviorProfile(offenderId!),
    enabled: !!offenderId,
    retry: false,
  });
}

export function useOffenderMOProfile(offenderId: string | null) {
  return useQuery({
    queryKey: ["offenders", "mo", offenderId],
    queryFn: () => fetchOffenderMOProfile(offenderId!),
    enabled: !!offenderId,
    retry: false,
  });
}

export function useRepeatOffenders() {
  return useQuery({
    queryKey: ["offenders", "repeat"],
    queryFn: fetchRepeatOffenders,
  });
}

export function useHabitualOffenders(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: ["offenders", "habitual", params],
    queryFn: () => fetchHabitualOffenders(params),
  });
}

export function useEscalationRisk(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: ["offenders", "escalation", params],
    queryFn: () => fetchEscalationRisk(params),
  });
}

export function useBehaviorProfiles(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: ["offenders", "behavior-profiles", params],
    queryFn: () => fetchBehaviorProfiles(params),
  });
}
