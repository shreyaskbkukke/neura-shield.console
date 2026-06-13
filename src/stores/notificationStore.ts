"use client";

import { create } from "zustand";

interface NotificationStoreState {
  unreadCount: number;
  lastNotificationTitle: string | null;
  showToast: boolean;
}

interface NotificationStoreActions {
  incrementUnread: (title: string) => void;
  setUnreadCount: (count: number) => void;
  dismissToast: () => void;
}

export const useNotificationStore = create<NotificationStoreState & NotificationStoreActions>(
  (set) => ({
    unreadCount: 0,
    lastNotificationTitle: null,
    showToast: false,

    incrementUnread: (title) =>
      set((s) => ({
        unreadCount: s.unreadCount + 1,
        lastNotificationTitle: title,
        showToast: true,
      })),

    setUnreadCount: (count) => set({ unreadCount: count }),

    dismissToast: () => set({ showToast: false }),
  }),
);
