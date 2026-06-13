"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/foundation/Button";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { ErrorState } from "@/components/foundation/ErrorState";
import { LiveEventToast } from "@/components/grounded/LiveEventToast";
import { NotificationItem } from "./NotificationItem";
import { NotificationPreferencesPanel } from "./NotificationPreferencesPanel";
import { useNotifications, useMarkRead, useMarkAllRead } from "../hooks";
import { setupNotificationWsHandlers } from "../ws";
import { useNotificationStore } from "@/stores/notificationStore";
import { getNotificationClient } from "@/lib/ws/wsClient";
import { Bell } from "lucide-react";

export function NotificationsScreen() {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const notifQuery = useNotifications(showUnreadOnly ? "UNREAD" : undefined);
  const queryClient = useQueryClient();
  const markReadMutation = useMarkRead();
  const markAllMutation = useMarkAllRead();
  const { showToast, lastNotificationTitle, dismissToast, setUnreadCount } = useNotificationStore();

  // Sync unread count into store
  useEffect(() => {
    if (notifQuery.data) {
      setUnreadCount(notifQuery.data.unread_count);
    }
  }, [notifQuery.data, setUnreadCount]);

  useEffect(() => {
    getNotificationClient().connect();
    const teardown = setupNotificationWsHandlers(() => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });
    return teardown;
  }, [queryClient]);

  const items = notifQuery.data?.items ?? [];
  const unreadCount = notifQuery.data?.unread_count ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Main list */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUnreadOnly(false)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                !showUnreadOnly
                  ? "bg-brand-600 text-white"
                  : "bg-navy-100 text-navy-600 hover:bg-navy-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setShowUnreadOnly(true)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                showUnreadOnly
                  ? "bg-brand-600 text-white"
                  : "bg-navy-100 text-navy-600 hover:bg-navy-200"
              }`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => markAllMutation.mutate()}
              isLoading={markAllMutation.isPending}
            >
              Mark all read
            </Button>
          )}
        </div>

        <div className="rounded-xl border border-navy-200 bg-white overflow-hidden">
          {notifQuery.isLoading ? (
            <div className="p-3 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : notifQuery.isError ? (
            <ErrorState
              title="Failed to load notifications"
              message={notifQuery.error?.message}
              onRetry={() => void notifQuery.refetch()}
            />
          ) : !items.length ? (
            <div className="py-12">
              <EmptyState icon={Bell} title="No notifications" />
            </div>
          ) : (
            items.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkRead={(id) => markReadMutation.mutate(id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Preferences */}
      <div>
        <NotificationPreferencesPanel />
      </div>

      <LiveEventToast
        title="New notification"
        message={lastNotificationTitle ?? undefined}
        visible={showToast}
        onDismiss={dismissToast}
        variant="notification"
      />
    </div>
  );
}
