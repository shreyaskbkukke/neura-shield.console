"use client";

import { create } from "zustand";

interface AlertStoreState {
  liveCount: number;
  lastAlertTitle: string | null;
  showToast: boolean;
}

interface AlertStoreActions {
  incrementLive: (title: string) => void;
  dismissToast: () => void;
}

export const useAlertStore = create<AlertStoreState & AlertStoreActions>((set) => ({
  liveCount: 0,
  lastAlertTitle: null,
  showToast: false,

  incrementLive: (title) =>
    set((s) => ({ liveCount: s.liveCount + 1, lastAlertTitle: title, showToast: true })),

  dismissToast: () => set({ showToast: false }),
}));
