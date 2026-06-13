"use client";

import { useEffect, useRef } from "react";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { StreamingTokenMessage } from "./StreamingTokenMessage";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { MessageSquare } from "lucide-react";
import type { ConversationMessage } from "@/stores/assistantStore";

interface ChatMessageListProps {
  messages: ConversationMessage[];
  streamingContent: string;
  isStreaming: boolean;
  isLoading: boolean;
}

export function ChatMessageList({
  messages,
  streamingContent,
  isStreaming,
  isLoading,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isStreaming, streamingContent]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className={`h-12 ${i % 2 === 0 ? "w-3/4" : "w-1/2 ml-auto"}`} />
        ))}
      </div>
    );
  }

  if (!messages.length && !isStreaming) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Start a conversation by typing a query below"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <ChatMessageBubble key={msg.id} message={msg} />
      ))}
      {isStreaming && streamingContent && (
        <StreamingTokenMessage content={streamingContent} />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
