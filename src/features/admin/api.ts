import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "@/lib/api/client";
import type {
  AdminRoleDetail,
  SetPasswordPayload,
  AdminUser,
  AssignPermissionsPayload,
  AssignRolesPayload,
  CreateRolePayload,
  CreateUserPayload,
  InviteResponse,
  JobResult,
  ModelRegistryResponse,
  PermissionListResponse,
  ResetPasswordResponse,
  RoleListResponse,
  SimpleMessageResponse,
  UpdateJurisdictionPayload,
  UpdateRolePayload,
  UpdateUserPayload,
  UserJurisdiction,
  UserListResponse,
  UserStatusPayload,
} from "./types";

// ── User list / detail ──────────────────────────────────────────────

export async function listUsers(
  page = 1,
  limit = 50,
  activeOnly = true,
  status?: string,
): Promise<UserListResponse> {
  const params: Record<string, string | number | boolean> = {
    page,
    limit,
    active_only: activeOnly,
  };
  if (status !== undefined) params["status"] = status;
  return apiGet("/admin/users", params);
}

export async function getUser(userId: string): Promise<AdminUser> {
  return apiGet(`/admin/users/${userId}`);
}

// ── User CRUD ───────────────────────────────────────────────────────

export async function createUser(
  payload: CreateUserPayload,
): Promise<AdminUser> {
  return apiPost("/admin/users", payload);
}

export async function updateUser(
  userId: string,
  payload: UpdateUserPayload,
): Promise<AdminUser> {
  return apiPatch(`/admin/users/${userId}`, payload);
}

export async function updateUserStatus(
  userId: string,
  payload: UserStatusPayload,
): Promise<AdminUser> {
  return apiPatch(`/admin/users/${userId}/status`, payload);
}

export async function deleteUser(userId: string): Promise<void> {
  return apiDelete(`/admin/users/${userId}`);
}

// ── User → Roles ────────────────────────────────────────────────────

export async function replaceUserRoles(
  userId: string,
  payload: AssignRolesPayload,
): Promise<AdminUser> {
  return apiPut(`/admin/users/${userId}/roles`, payload);
}

export async function addUserRole(
  userId: string,
  roleId: string,
): Promise<AdminUser> {
  return apiPost(`/admin/users/${userId}/roles/${roleId}`);
}

export async function removeUserRole(
  userId: string,
  roleId: string,
): Promise<void> {
  return apiDelete(`/admin/users/${userId}/roles/${roleId}`);
}

// ── User → Jurisdiction ─────────────────────────────────────────────

export async function getUserJurisdiction(
  userId: string,
): Promise<UserJurisdiction[]> {
  return apiGet(`/admin/users/${userId}/jurisdiction`);
}

export async function setUserJurisdiction(
  userId: string,
  payload: UpdateJurisdictionPayload,
): Promise<UserJurisdiction[]> {
  return apiPut(`/admin/users/${userId}/jurisdiction`, payload);
}

// ── User lifecycle ──────────────────────────────────────────────────

export async function inviteUser(userId: string): Promise<InviteResponse> {
  return apiPost(`/admin/users/${userId}/invite`);
}

export async function resetPassword(
  userId: string,
): Promise<ResetPasswordResponse> {
  return apiPost(`/admin/users/${userId}/reset-password`);
}

export async function forceLogout(
  userId: string,
): Promise<SimpleMessageResponse> {
  return apiPost(`/admin/users/${userId}/force-logout`);
}

export async function setUserPassword(
  userId: string,
  payload: SetPasswordPayload,
): Promise<SimpleMessageResponse> {
  return apiPost(`/admin/users/${userId}/set-password`, payload);
}

export async function resetUserPassword(
  userId: string,
): Promise<ResetPasswordResponse> {
  return apiPost(`/admin/users/${userId}/reset-password`);
}

// ── Role CRUD ───────────────────────────────────────────────────────

export async function listRoles(): Promise<RoleListResponse> {
  return apiGet("/admin/roles");
}

export async function getRole(roleId: string): Promise<AdminRoleDetail> {
  return apiGet(`/admin/roles/${roleId}`);
}

export async function createRole(
  payload: CreateRolePayload,
): Promise<AdminRoleDetail> {
  return apiPost("/admin/roles", payload);
}

export async function updateRole(
  roleId: string,
  payload: UpdateRolePayload,
): Promise<AdminRoleDetail> {
  return apiPatch(`/admin/roles/${roleId}`, payload);
}

export async function deleteRole(roleId: string): Promise<void> {
  return apiDelete(`/admin/roles/${roleId}`);
}

// ── Role → Permissions ──────────────────────────────────────────────

export async function replaceRolePermissions(
  roleId: string,
  payload: AssignPermissionsPayload,
): Promise<AdminRoleDetail> {
  return apiPut(`/admin/roles/${roleId}/permissions`, payload);
}

export async function addRolePermission(
  roleId: string,
  permissionId: string,
): Promise<AdminRoleDetail> {
  return apiPost(`/admin/roles/${roleId}/permissions/${permissionId}`);
}

export async function removeRolePermission(
  roleId: string,
  permissionId: string,
): Promise<void> {
  return apiDelete(`/admin/roles/${roleId}/permissions/${permissionId}`);
}

// ── Permissions list ────────────────────────────────────────────────

export async function listPermissions(): Promise<PermissionListResponse> {
  return apiGet("/admin/permissions");
}

// ── Models & jobs ───────────────────────────────────────────────────

export async function listModels(
  page = 1,
  limit = 50,
): Promise<ModelRegistryResponse> {
  return apiGet("/admin/models", { page, limit });
}

export async function runJob(endpoint: string): Promise<JobResult> {
  return apiPost(endpoint);
}
