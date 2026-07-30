"use client";

import { Plus, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/foundation/Skeleton";
import { formatRelative } from "@/lib/formatters";
import { requestNewThread } from "../ws";
import type { ConversationThread } from "@/stores/assistantStore";

interface ThreadListProps {
  threads: ConversationThread[];
  activeThreadId: string | null;
  isLoading: boolean;
  onSelect: (threadId: string) => void;
}

export function ThreadList({
  threads,
  activeThreadId,
  isLoading,
  onSelect,
}: ThreadListProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-3 border-b border-navy-100 flex items-center justify-between">
        <p className="text-xs font-semibold text-navy-700">Conversations</p>
        <button
          onClick={() => requestNewThread()}
          title="New conversation"
          className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-100 hover:text-navy-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-1">
        {isLoading ? (
          <div className="p-3 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-navy-400">
            <MessageSquare size={20} />
            <p className="text-xs">No conversations yet</p>
          </div>
        ) : (
          threads.map((thread) => (
            <button
              key={thread.thread_id}
              onClick={() => onSelect(thread.thread_id)}
              className={`w-full text-left px-3 py-2.5 hover:bg-navy-50 transition-colors ${
                activeThreadId === thread.thread_id
                  ? "bg-brand-50 border-l-2 border-brand-500"
                  : "border-l-2 border-transparent"
              }`}
            >
              <p className="text-xs font-medium text-navy-800 line-clamp-1">
                {thread.title ?? "New Conversation"}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`rounded-full text-[10px] px-1.5 py-0.5 ${
                    thread.status === "ACTIVE"
                      ? "bg-success-100 text-success-700"
                      : "bg-navy-100 text-navy-500"
                  }`}
                >
                  {thread.status}
                </span>
                <span className="text-[10px] text-navy-400">
                  {formatRelative(thread.updated_at)}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
