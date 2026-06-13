import { apiGet } from "@/lib/api/client";
import type {
  NetworkResponse,
  SuspiciousAssociationsResponse,
  OrganizedGroupsResponse,
  ConnectionsResponse,
  PathResponse,
  CommunitiesResponse,
} from "./types";

export function fetchOffenderNetwork(offenderId: string, depth = 1) {
  return apiGet<NetworkResponse>(`/graph/offenders/${offenderId}/network`, { depth });
}

export function fetchOffenderConnections(offenderId: string) {
  return apiGet<ConnectionsResponse>(`/graph/offenders/${offenderId}/connections`, { limit: 20 });
}

export function fetchSuspiciousAssociations(params: Record<string, string | number> = {}) {
  return apiGet<SuspiciousAssociationsResponse>("/graph/suspicious-associations", { limit: 20, ...params });
}

export function fetchOrganizedGroups(params: Record<string, string | number> = {}) {
  return apiGet<OrganizedGroupsResponse>("/graph/organized-groups", { limit: 20, ...params });
}

export function fetchGraphPath(sourceOffenderId: string, targetOffenderId: string) {
  return apiGet<PathResponse>("/graph/path", { source_offender_id: sourceOffenderId, target_offender_id: targetOffenderId });
}

export function fetchGraphCommunities(page = 1, limit = 50) {
  return apiGet<CommunitiesResponse>("/graph/communities", { page, limit });
}
