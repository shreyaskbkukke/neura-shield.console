"use client";

import { create } from "zustand";
import type { CurrentUser } from "@/types/auth";

interface AuthState {
  user: CurrentUser | null;
  isLoading: boolean;
  error: string | null;
  devUserId: string | null;
}

interface AuthActions {
  loadMe: () => Promise<void>;
  setDevUser: (userId: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

function readDevUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ns_dev_user_id");
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  devUserId: null,

  loadMe: async () => {
    const devUserId = readDevUserId();
    set({ isLoading: true, error: null, devUserId });

    try {
      const { apiGet } = await import("@/lib/api/client");
      const user = await apiGet<CurrentUser>("/auth/me");
      set({ user, isLoading: false });
    } catch (err) {
      set({
        user: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to authenticate",
      });
    }
  },

  setDevUser: (userId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ns_dev_user_id", userId);
    }
    set({ devUserId: userId, user: null, error: null });
    get().loadMe();
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ns_dev_user_id");
    }
    set({ user: null, devUserId: null, error: null });
  },

  hasPermission: (permission: string) => {
    const { user } = get();
    if (!user) return false;
    return user.permissions.includes(permission);
  },

  hasRole: (role: string) => {
    const { user } = get();
    if (!user) return false;
    return user.role === role || user.roles.includes(role);
  },
}));
