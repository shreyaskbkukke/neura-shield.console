export interface GraphNode {
  id: string;
  label: string;
  risk_level: string;
  network_degree: number;
  network_centrality: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  link_strength: number | null;
  strength_label: string;
  link_type: string;
  shared_cases_count: number;
}

export interface NetworkResponse {
  center_offender_id: string;
  depth: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ExpandedNode {
  id: string;
  entity_type: string;
  label: string;
  summary: string | null;
  district_id: string | null;
  metadata: Record<string, unknown>;
}

export interface ExpandedEdge {
  source: string;
  target: string;
  relationship_type: string;
  strength_score: number;
  confidence_score: number;
  evidence: Record<string, unknown>;
}

export interface SuspiciousAssociationItem {
  signal_type: string;
  offender_ids: string[];
  crime_ids: string[];
  confidence_score: number;
  description: string;
  evidence: Record<string, unknown>;
  district_id: string | null;
  disclaimer: string;
}

export interface SuspiciousAssociationsResponse {
  items: SuspiciousAssociationItem[];
  total: number;
}

export interface OrganizedGroupItem {
  id: string;
  candidate_key: string;
  title: string | null;
  confidence_score: number;
  member_count: number;
  member_offender_ids: string[];
  shared_case_ids: string[];
  evidence: Record<string, unknown>;
  district_id: string | null;
  disclaimer: string;
}

export interface OrganizedGroupsResponse {
  items: OrganizedGroupItem[];
  page: number;
  limit: number;
  total: number;
}

export interface ConnectionItem {
  offender_id: string;
  name: string;
  link_strength: number | null;
  strength_label: string;
  shared_cases_count: number;
  shared_locations_count: number;
  main_reason: string | null;
}

export interface ConnectionsResponse {
  offender_id: string;
  offender_name: string;
  total: number;
  connections: ConnectionItem[];
}

export interface PathNode {
  offender_id: string;
  name: string;
}

export interface PathResponse {
  source_offender_id: string;
  target_offender_id: string;
  path_found: boolean;
  path: PathNode[];
  edge_count: number;
}

export interface CommunityItem {
  community_id: string;
  offender_count: number;
  avg_link_strength: number | null;
}

export interface CommunitiesResponse {
  total_communities: number;
  total_offenders: number;
  page: number;
  limit: number;
  items: CommunityItem[];
}
