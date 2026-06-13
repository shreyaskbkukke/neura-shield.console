import { apiGet, apiPost } from "@/lib/api/client";
import { config } from "@/lib/config";
import type { ConversationThread, ConversationMessage } from "@/stores/assistantStore";
import type { ConversationDetail, ConversationExport } from "./types";

export async function listThreads(): Promise<ConversationThread[]> {
  return apiGet<ConversationThread[]>("/conversations");
}

export async function getThread(threadId: string): Promise<ConversationDetail> {
  return apiGet<ConversationDetail>(`/conversations/${threadId}`);
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
