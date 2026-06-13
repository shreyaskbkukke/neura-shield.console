import { apiGet, apiPost } from "@/lib/api/client";
import type {
  UserListResponse,
  AdminUser,
  RoleListResponse,
  PermissionListResponse,
  ModelRegistryResponse,
  JobResult,
} from "./types";

export async function listUsers(page = 1, limit = 50): Promise<UserListResponse> {
  return apiGet("/admin/users", { page, limit });
}

export async function getUser(userId: string): Promise<AdminUser> {
  return apiGet(`/admin/users/${userId}`);
}

export async function listRoles(): Promise<RoleListResponse> {
  return apiGet("/admin/roles");
}

export async function listPermissions(): Promise<PermissionListResponse> {
  return apiGet("/admin/permissions");
}

export async function listModels(page = 1, limit = 50): Promise<ModelRegistryResponse> {
  return apiGet("/admin/models", { page, limit });
}

export async function runJob(endpoint: string): Promise<JobResult> {
  return apiPost(endpoint);
}
