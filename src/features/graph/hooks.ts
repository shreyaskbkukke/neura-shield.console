import { useQuery } from "@tanstack/react-query";
import {
  fetchOffenderNetwork,
  fetchOffenderConnections,
  fetchSuspiciousAssociations,
  fetchOrganizedGroups,
  fetchGraphPath,
  fetchGraphCommunities,
} from "./api";

export function useOffenderNetwork(offenderId: string | null) {
  return useQuery({
    queryKey: ["graph", "network", offenderId],
    queryFn: () => fetchOffenderNetwork(offenderId!),
    enabled: !!offenderId,
  });
}

export function useOffenderConnections(offenderId: string | null) {
  return useQuery({
    queryKey: ["graph", "connections", offenderId],
    queryFn: () => fetchOffenderConnections(offenderId!),
    enabled: !!offenderId,
  });
}

export function useSuspiciousAssociations() {
  return useQuery({
    queryKey: ["graph", "suspicious-associations"],
    queryFn: () => fetchSuspiciousAssociations(),
  });
}

export function useOrganizedGroups() {
  return useQuery({
    queryKey: ["graph", "organized-groups"],
    queryFn: () => fetchOrganizedGroups(),
  });
}

export function useGraphPath(sourceId: string | null, targetId: string | null) {
  return useQuery({
    queryKey: ["graph", "path", sourceId, targetId],
    queryFn: () => fetchGraphPath(sourceId!, targetId!),
    enabled: !!sourceId && !!targetId,
  });
}

export function useGraphCommunities(page = 1) {
  return useQuery({
    queryKey: ["graph", "communities", page],
    queryFn: () => fetchGraphCommunities(page),
  });
}
