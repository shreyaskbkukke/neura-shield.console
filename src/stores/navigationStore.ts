"use client";

import { create } from "zustand";

interface NavigationState {
  activeGroupId: string | null;
  megaMenuPinned: boolean;
  setActiveGroup: (id: string) => void;
  clearActiveGroup: () => void;
  togglePinMegaMenu: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeGroupId: null,
  megaMenuPinned: false,

  setActiveGroup: (id) => set({ activeGroupId: id }),
  clearActiveGroup: () => set((state) => ({ activeGroupId: state.megaMenuPinned ? state.activeGroupId : null })),
  togglePinMegaMenu: () => set((state) => ({ megaMenuPinned: !state.megaMenuPinned })),
}));
