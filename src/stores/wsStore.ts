"use client";

import { create } from "zustand";

type WsStatus = "disconnected" | "connecting" | "connected" | "error";

interface WsChannelState {
  chat: WsStatus;
  alerts: WsStatus;
  notifications: WsStatus;
}

interface WsActions {
  setChannelStatus: (channel: keyof WsChannelState, status: WsStatus) => void;
}

export const useWsStore = create<WsChannelState & WsActions>((set) => ({
  chat: "disconnected",
  alerts: "disconnected",
  notifications: "disconnected",

  setChannelStatus: (channel, status) => set({ [channel]: status }),
}));
