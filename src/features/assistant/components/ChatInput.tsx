"use client";

import { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { sendChatMessage } from "../ws";

interface ChatInputProps {
  threadId: string | null;
  isStreaming: boolean;
  disabled?: boolean;
}

export function ChatInput({ threadId, isStreaming, disabled }: ChatInputProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = content.trim();
    if (!trimmed || isStreaming || disabled) return;
    sendChatMessage(threadId, trimmed);
    setContent("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const canSend = !!content.trim() && !isStreaming && !disabled;

  let placeholder = "Ask a question… (Enter to send, Shift+Enter for newline)";
  if (isStreaming) {
    placeholder = "Waiting for response…";
  } else if (!threadId) {
    placeholder = "Ask a question to start a new conversation…";
  }

  return (
    <div className="border-t border-navy-100 bg-white px-4 py-3">
      <div className="flex items-end gap-2 rounded-xl border border-navy-200 bg-navy-50 px-3 py-2 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isStreaming || disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-navy-800 placeholder:text-navy-400 focus:outline-none disabled:opacity-50"
          style={{ minHeight: "24px", maxHeight: "120px" }}
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          className="rounded-lg p-1.5 bg-brand-600 text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {isStreaming ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
        </button>
      </div>
      <p className="mt-1 text-[10px] text-navy-400 text-center">
        AI responses are for decision support only. Verify before acting.
      </p>
    </div>
  );
}
