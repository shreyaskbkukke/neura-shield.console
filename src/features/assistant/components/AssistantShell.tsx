"use client";

import { useEffect } from "react";
import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { ThreadList } from "./ThreadList";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { AssistantDisclaimer } from "./AssistantDisclaimer";
import { ConversationExportButton } from "./ConversationExportButton";
import { ActionReviewPanel } from "@/components/grounded/ActionReviewPanel";
import { useAssistantStore } from "@/stores/assistantStore";
import { getChatClient } from "@/lib/ws/wsClient";
import { setupChatWsHandlers } from "../ws";
import { useThreadList, useThreadMessages } from "../hooks";

function WsStatusIndicator({ status }: { status: string }) {
  if (status === "connected") {
    return (
      <div className="flex items-center gap-1.5 text-success-600">
        <Wifi size={12} />
        <span className="text-[11px]">Connected</span>
      </div>
    );
  }
  if (status === "connecting") {
    return (
      <div className="flex items-center gap-1.5 text-warning-600">
        <Loader2 size={12} className="animate-spin" />
        <span className="text-[11px]">Connecting…</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-danger-600">
      <WifiOff size={12} />
      <span className="text-[11px]">Disconnected</span>
    </div>
  );
}

export function AssistantShell() {
  const {
    threads,
    activeThreadId,
    messages,
    streamingContent,
    isStreaming,
    wsStatus,
    pendingDraft,
    setThreads,
    setActiveThread,
    setMessages,
    setPendingDraft,
  } = useAssistantStore();

  const threadsQuery = useThreadList();
  const messagesQuery = useThreadMessages(activeThreadId);

  // Sync REST thread list into store
  useEffect(() => {
    if (threadsQuery.data) setThreads(threadsQuery.data);
  }, [threadsQuery.data, setThreads]);

  // Sync REST messages into store when thread switches
  useEffect(() => {
    if (messagesQuery.data && activeThreadId) {
      setMessages(activeThreadId, messagesQuery.data);
    }
  }, [messagesQuery.data, activeThreadId, setMessages]);

  // Connect WS and register handlers
  useEffect(() => {
    const client = getChatClient();
    client.connect();
    const teardown = setupChatWsHandlers();
    return teardown;
  }, []);

  const activeMessages = activeThreadId ? (messages[activeThreadId] ?? []) : [];

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-navy-200 overflow-hidden bg-white">
      {/* Thread sidebar */}
      <div className="w-64 border-r border-navy-100 flex flex-col shrink-0">
        <ThreadList
          threads={threads}
          activeThreadId={activeThreadId}
          isLoading={threadsQuery.isLoading}
          onSelect={setActiveThread}
        />
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="px-4 py-3 border-b border-navy-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            {activeThreadId ? (
              <p className="text-sm font-semibold text-navy-900">
                {threads.find((t) => t.thread_id === activeThreadId)?.title ??
                  "New Conversation"}
              </p>
            ) : (
              <p className="text-sm text-navy-400">Select a conversation</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <WsStatusIndicator status={wsStatus} />
            <ConversationExportButton threadId={activeThreadId} />
          </div>
        </div>

        {/* Pending draft approval (if any) */}
        {pendingDraft && (
          <div className="px-4 pt-3">
            <ActionReviewPanel
              title={pendingDraft.title}
              description={pendingDraft.description}
              disclaimer="This action was drafted by the AI assistant. Review carefully before approving — it will be submitted to the backend."
              actions={[
                {
                  label: "Approve & Commit",
                  variant: "primary",
                  onClick: () => {
                    setPendingDraft(null);
                  },
                },
                {
                  label: "Discard",
                  variant: "outline",
                  onClick: () => setPendingDraft(null),
                },
              ]}
            />
          </div>
        )}

        {/* Messages */}
        <ChatMessageList
          messages={activeMessages}
          streamingContent={streamingContent}
          isStreaming={isStreaming}
          isLoading={!!activeThreadId && messagesQuery.isLoading}
        />

        {/* Disclaimer + Input */}
        <div className="shrink-0 space-y-0">
          {!activeThreadId && (
            <div className="px-4 py-2">
              <AssistantDisclaimer />
            </div>
          )}
          <ChatInput
            threadId={activeThreadId}
            isStreaming={isStreaming}
            disabled={wsStatus !== "connected"}
          />
        </div>
      </div>
    </div>
  );
}
