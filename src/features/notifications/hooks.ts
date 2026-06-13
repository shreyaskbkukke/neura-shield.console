import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listNotifications,
  markRead,
  markAllRead,
  listPreferences,
  updatePreference,
} from "./api";

export function useNotifications(status?: string) {
  return useQuery({
    queryKey: ["notifications", "list", status],
    queryFn: () => listNotifications(status),
  });
}

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ["notifications", "preferences"],
    queryFn: listPreferences,
  });
}

export function useMarkRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markRead(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["notifications", "list"] }),
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllRead,
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["notifications", "list"] }),
  });
}

export function useUpdatePreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      notification_type,
      channel,
      is_enabled,
    }: {
      notification_type: string;
      channel: string;
      is_enabled: boolean;
    }) => updatePreference(notification_type, channel, is_enabled),
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: ["notifications", "preferences"] }),
  });
}
