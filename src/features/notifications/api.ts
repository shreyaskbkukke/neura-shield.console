import { apiGet, apiPatch } from "@/lib/api/client";
import type { NotificationListResponse, NotificationItem, NotificationPreference } from "./types";

export async function listNotifications(
  status?: string,
  limit = 50,
  page = 1,
): Promise<NotificationListResponse> {
  const params: Record<string, string | number | boolean> = { limit, page };
  if (status) params.status = status;
  return apiGet<NotificationListResponse>("/notifications", params);
}

export async function markRead(id: string): Promise<NotificationItem> {
  return apiPatch<NotificationItem>(`/notifications/${id}/read`, {});
}

export async function markAllRead(): Promise<{ updated: number }> {
  return apiPatch<{ updated: number }>("/notifications/read-all", {});
}

export async function listPreferences(): Promise<NotificationPreference[]> {
  return apiGet<NotificationPreference[]>("/notifications/preferences");
}

export async function updatePreference(
  notification_type: string,
  channel: string,
  is_enabled: boolean,
): Promise<NotificationPreference> {
  return apiPatch<NotificationPreference>("/notifications/preferences", {
    notification_type,
    channel,
    is_enabled,
  });
}
