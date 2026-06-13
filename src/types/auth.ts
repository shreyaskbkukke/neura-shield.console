export interface JurisdictionScope {
  scope: "ALL" | "STATE" | "DISTRICT" | "STATION";
  district_ids: string[];
  station_ids: string[];
}

export interface CurrentUser {
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  roles: string[];
  permissions: string[];
  jurisdiction: JurisdictionScope | null;
}

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  DISTRICT_OFFICER: "DISTRICT_OFFICER",
  STATION_OFFICER: "STATION_OFFICER",
  ANALYST: "ANALYST",
  INVESTIGATOR: "INVESTIGATOR",
  SUPERVISOR: "SUPERVISOR",
  VIEWER: "VIEWER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
