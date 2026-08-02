import { apiGet, apiPost } from "@/lib/api/client";
import { config } from "@/lib/config";
import type { ConversationThread, ConversationMessage, ToolTrace, Citation } from "@/stores/assistantStore";
import type { ConversationDetail, ConversationExport } from "./types";

// The REST API persists guardrails as whatever the assistant pipeline
// produced: null for user messages (they never carry guardrails), or a
// flat { unsupported_claim_blocked, blocked_reason, ... } object for
// assistant messages — not the string[] of triggered codes the rest of
// the frontend expects (matching what the WS guardrail event's `code`
// already carries, e.g. "UNSUPPORTED_GUILT_ASSERTION"). Normalize here,
// at the one place raw REST message data enters the app, so components
// can always trust ConversationMessage.guardrails is a real array.
function normalizeGuardrails(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[];
  if (raw && typeof raw === "object" && "unsupported_claim_blocked" in raw) {
    const g = raw as { unsupported_claim_blocked?: boolean };
    return g.unsupported_claim_blocked ? ["UNSUPPORTED_GUILT_ASSERTION"] : [];
  }
  return [];
}

// Same story as guardrails: the backend only ever persisted
// { tools_used: string[] } (tool names only, no args/result_summary —
// that level of detail was never captured), not the ToolTrace[] shape
// this UI displays. null for user messages, which never run tools.
function normalizeToolTrace(raw: unknown): ToolTrace[] {
  if (Array.isArray(raw)) return raw as ToolTrace[];
  if (raw && typeof raw === "object" && "tools_used" in raw) {
    const names = (raw as { tools_used?: unknown }).tools_used;
    if (Array.isArray(names)) {
      return names.map((name) => ({
        tool_name: String(name),
        args: {},
        result_summary: "",
      }));
    }
  }
  return [];
}

// Backend stores { resource_type, resource_id, reason } per citation
// (see modules/assistant/schemas.py CitationSchema in the main
// backend); the frontend's Citation type is { id, type, title,
// reference }. Field names don't line up, so REST-loaded citations
// silently rendered blank rather than crashing — same mapping the WS
// `citation` event handler already applies in ws.ts.
function normalizeCitations(raw: unknown): Citation[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((c) => {
    const r = c as Record<string, string | undefined>;
    if ("id" in r && "type" in r) return c as Citation;
    return {
      id: r.resource_id ?? "",
      type: r.resource_type ?? "",
      title: r.resource_type ?? "",
      reference: r.reason ?? "",
    };
  });
}

export async function listThreads(): Promise<ConversationThread[]> {
  return apiGet<ConversationThread[]>("/conversations");
}

export async function getThread(threadId: string): Promise<ConversationDetail> {
  const detail = await apiGet<ConversationDetail>(`/conversations/${threadId}`);
  return {
    ...detail,
    messages: detail.messages.map((m) => ({
      ...m,
      // Backend persists role as "USER"/"ASSISTANT"/"SYSTEM" (see
      // chat_service.py's add_message calls) — the WS-live path
      // hardcodes lowercase locally so it always looked right when
      // sending, but REST-loaded history (thread switch, reload) came
      // through uppercase, which ChatMessageBubble's role === "user"
      // check never matched, so every message rendered identically.
      role: m.role.toLowerCase() as ConversationMessage["role"],
      guardrails: normalizeGuardrails(m.guardrails),
      tool_trace: normalizeToolTrace(m.tool_trace),
      citations: normalizeCitations(m.citations),
    })),
  };
}

export async function getThreadMessages(threadId: string): Promise<ConversationMessage[]> {
  const detail = await getThread(threadId);
  return detail.messages;
}

export async function exportThreadPdf(threadId: string): Promise<ConversationExport> {
  return apiPost<ConversationExport>(`/conversations/${threadId}/export`);
}

export async function listThreadExports(threadId: string): Promise<ConversationExport[]> {
  return apiGet<ConversationExport[]>(`/conversations/${threadId}/exports`);
}

export function getExportDownloadUrl(exportId: string): string {
  return `${config.apiBaseUrl}/conversations/exports/${exportId}/download`;
}
