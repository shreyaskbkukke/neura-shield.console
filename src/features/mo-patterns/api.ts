import { apiGet } from "@/lib/api/client";
import type { MOProfileListResponse, MOProfile } from "./types";

export async function listMOProfiles(
  page = 1,
  limit = 30,
  mo_category?: string,
): Promise<MOProfileListResponse> {
  const params: Record<string, string | number> = { page, limit };
  if (mo_category) params.mo_category = mo_category;
  return apiGet("/criminology/mo-patterns", params);
}

export async function getMOProfile(moId: string): Promise<MOProfile> {
  return apiGet(`/criminology/mo-patterns/${moId}`);
}
