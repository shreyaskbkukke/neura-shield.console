"use client";

import { create } from "zustand";
import type { CurrentUser } from "@/types/auth";
import { ApiClientError } from "@/types/api";

interface AuthState {
  user: CurrentUser | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  loadMe: () => Promise<void>;
  setToken: (token: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  loadMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const { apiGet } = await import("@/lib/api/client");
      const user = await apiGet<CurrentUser>("/auth/me");
      set({ user, isLoading: false });
    } catch (err) {
      // Only a server-confirmed rejection (401) means the token itself is
      // bad — clear it so we don't keep retrying a token that will never
      // work. A network/CORS-level failure leaves the token in place,
      // since it may still be valid once the transient issue clears.
      if (
        err instanceof ApiClientError &&
        err.status === 401 &&
        globalThis.window !== undefined
      ) {
        localStorage.removeItem("ns_auth_token");
      }
      set({
        user: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to authenticate",
      });
    }
  },

  setToken: (token: string) => {
    if (globalThis.window !== undefined) {
      localStorage.setItem("ns_auth_token", token);
    }
    set({ user: null, error: null });
    get().loadMe();
  },

  logout: () => {
    if (globalThis.window !== undefined) {
      localStorage.removeItem("ns_auth_token");
    }
    set({ user: null, error: null });
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
