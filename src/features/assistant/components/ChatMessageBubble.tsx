import { Bot, User } from "lucide-react";
import { CitationPanel } from "./CitationPanel";
import { GuardrailNotice } from "./GuardrailNotice";
import { ToolCallTimeline } from "./ToolCallTimeline";
import { formatDateTime } from "@/lib/formatters";
import type { ConversationMessage } from "@/stores/assistantStore";

interface ChatMessageBubbleProps {
  message: ConversationMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="max-w-[80%] space-y-1">
          <div className="rounded-xl rounded-tr-none bg-brand-600 px-3 py-2.5">
            <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{message.content}</p>
          </div>
          <p className="text-[10px] text-navy-400 text-right">{formatDateTime(message.created_at)}</p>
        </div>
        <div className="mt-1 rounded-full bg-navy-100 p-1.5 shrink-0">
          <User size={13} className="text-navy-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-full bg-brand-100 p-1.5 shrink-0">
        <Bot size={13} className="text-brand-600" />
      </div>
      <div className="flex-1 max-w-[80%] space-y-1">
        <div className="rounded-xl rounded-tl-none bg-navy-50 border border-navy-100 px-3 py-2.5">
          <p className="text-sm text-navy-800 whitespace-pre-wrap leading-relaxed">{message.content}</p>
          {message.intent && (
            <span className="mt-1.5 inline-block rounded bg-intelligence-50 border border-intelligence-100 px-1.5 py-0.5 text-[10px] text-intelligence-700 font-mono">
              {message.intent}
            </span>
          )}
        </div>
        <GuardrailNotice guardrails={message.guardrails} />
        <ToolCallTimeline traces={message.tool_trace} />
        <CitationPanel citations={message.citations} />
        <p className="text-[10px] text-navy-400">{formatDateTime(message.created_at)}</p>
      </div>
    </div>
  );
}
