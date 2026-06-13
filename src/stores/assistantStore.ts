"use client";

import { create } from "zustand";

export type WsStatus = "disconnected" | "connecting" | "connected" | "error";

export interface ConversationThread {
  thread_id: string;
  user_id: string;
  title: string | null;
  language: string;
  status: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

export interface Citation {
  id: string;
  type: string;
  title: string;
  reference: string;
}

export interface ToolTrace {
  tool_name: string;
  args: Record<string, unknown>;
  result_summary: string;
}

export interface ConversationMessage {
  id: string;
  thread_id: string;
  user_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  intent: string | null;
  citations: Citation[];
  tool_trace: ToolTrace[];
  guardrails: string[];
  created_at: string;
}

export interface AssistantDraft {
  id: string;
  title: string;
  description: string;
  actionType: string;
  payload: Record<string, unknown>;
}

interface AssistantState {
  threads: ConversationThread[];
  activeThreadId: string | null;
  messages: Record<string, ConversationMessage[]>;
  streamingContent: string;
  isStreaming: boolean;
  wsStatus: WsStatus;
  pendingDraft: AssistantDraft | null;
}

interface AssistantActions {
  setThreads: (threads: ConversationThread[]) => void;
  prependThread: (thread: ConversationThread) => void;
  setActiveThread: (id: string | null) => void;
  setMessages: (threadId: string, messages: ConversationMessage[]) => void;
  addMessage: (threadId: string, message: ConversationMessage) => void;
  appendToken: (token: string) => void;
  clearStreaming: () => void;
  setPendingDraft: (draft: AssistantDraft | null) => void;
  setWsStatus: (status: WsStatus) => void;
}

export const useAssistantStore = create<AssistantState & AssistantActions>(
  (set) => ({
    threads: [],
    activeThreadId: null,
    messages: {},
    streamingContent: "",
    isStreaming: false,
    wsStatus: "disconnected",
    pendingDraft: null,

    setThreads: (threads) => set({ threads }),

    prependThread: (thread) =>
      set((s) => ({
        threads: [thread, ...s.threads.filter((t) => t.thread_id !== thread.thread_id)],
      })),

    setActiveThread: (id) => set({ activeThreadId: id }),

    setMessages: (threadId, messages) =>
      set((s) => ({ messages: { ...s.messages, [threadId]: messages } })),

    addMessage: (threadId, message) =>
      set((s) => ({
        messages: {
          ...s.messages,
          [threadId]: [...(s.messages[threadId] ?? []), message],
        },
      })),

    appendToken: (token) =>
      set((s) => ({
        streamingContent: s.streamingContent + token,
        isStreaming: true,
      })),

    clearStreaming: () => set({ streamingContent: "", isStreaming: false }),

    setPendingDraft: (draft) => set({ pendingDraft: draft }),

    setWsStatus: (wsStatus) => set({ wsStatus }),
  }),
);
