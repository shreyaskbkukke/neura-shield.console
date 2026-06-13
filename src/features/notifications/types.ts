export interface NotificationItem {
  id: string;
  user_id: string;
  notification_type: string;
  title: string;
  message: string | null;
  severity: string | null;
  status: string;
  related_resource_type: string | null;
  related_resource_id: string | null;
  metadata: unknown;
  created_at: string;
  read_at: string | null;
}

export interface NotificationListResponse {
  items: NotificationItem[];
  page: number;
  limit: number;
  total: number;
  unread_count: number;
}

export interface NotificationPreference {
  id: string;
  user_id: string;
  notification_type: string;
  channel: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}
