import { getChatClient } from "@/lib/ws/wsClient";
import {
  useAssistantStore,
  type ConversationThread,
  type Citation,
} from "@/stores/assistantStore";
import { useWsStore } from "@/stores/wsStore";

// Event shapes match ws/protocol.py in neura-shield.ai.backend exactly —
// this is the actual server-side WS contract, not a REST-style event set.

interface ThreadStartedEvent {
  type: "thread_started";
  thread_id: string;
  language: string;
}

interface AssistantTokenEvent {
  type: "assistant_token";
  token: string;
}

interface CitationPayload {
  type: "citation";
  resource_type: string;
  resource_id: string;
  reason: string;
}

interface GuardrailPayload {
  type: "guardrail";
  code: string;
  message: string;
}

interface AssistantCompleteEvent {
  type: "assistant_complete";
  thread_id: string;
  message_id: string;
  citations: unknown[];
  guardrails: unknown;
}

interface ErrorPayload {
  type: "error";
  code: string;
  message: string;
}

// Accumulated per-turn (citations/guardrails arrive as separate events
// before assistant_complete finalizes the message).
let turnCitations: Citation[] = [];
let turnGuardrailCodes: string[] = [];

// Stashes the user's own message text between send() and thread_started,
// for brand-new threads where the real thread_id isn't known yet at
// send time. The backend never echoes the user's message back over the
// socket, so the local echo has to happen client-side.
let pendingUserContent: string | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

export function setupChatWsHandlers(): () => void {
  const client = getChatClient();
  const store = useAssistantStore.getState;

  const offThreadStarted = client.on("thread_started", (raw) => {
    const ev = raw as ThreadStartedEvent;
    turnCitations = [];
    turnGuardrailCodes = [];

    const thread: ConversationThread = {
      thread_id: ev.thread_id,
      user_id: "",
      title: null,
      language: ev.language,
      status: "ACTIVE",
      created_at: nowIso(),
      updated_at: nowIso(),
      closed_at: null,
    };
    store().prependThread(thread);
    store().setActiveThread(ev.thread_id);

    if (pendingUserContent !== null) {
      store().addMessage(ev.thread_id, {
        id: `local-${Date.now()}`,
        thread_id: ev.thread_id,
        user_id: "",
        role: "user",
        content: pendingUserContent,
        intent: null,
        citations: [],
        tool_trace: [],
        guardrails: [],
        created_at: nowIso(),
      });
      pendingUserContent = null;
    }
  });

  const offToken = client.on("assistant_token", (raw) => {
    const ev = raw as AssistantTokenEvent;
    store().appendToken(ev.token);
  });

  const offCitation = client.on("citation", (raw) => {
    const ev = raw as CitationPayload;
    turnCitations.push({
      id: ev.resource_id,
      type: ev.resource_type,
      title: ev.resource_type,
      reference: ev.reason,
    });
  });

  const offGuardrail = client.on("guardrail", (raw) => {
    const ev = raw as GuardrailPayload;
    turnGuardrailCodes.push(ev.code);
  });

  const offComplete = client.on("assistant_complete", (raw) => {
    const ev = raw as AssistantCompleteEvent;
    const content = store().streamingContent;
    store().clearStreaming();
    store().addMessage(ev.thread_id, {
      id: ev.message_id,
      thread_id: ev.thread_id,
      user_id: "",
      role: "assistant",
      content,
      intent: null,
      citations: turnCitations,
      tool_trace: [],
      guardrails: turnGuardrailCodes,
      created_at: nowIso(),
    });
    turnCitations = [];
    turnGuardrailCodes = [];
  });

  const offError = client.on("error", (raw) => {
    const ev = raw as ErrorPayload;
    store().clearStreaming();
    console.warn("[Crime Lens WS] chat error:", ev.code, ev.message);
  });

  store().setWsStatus(client.status);
  useWsStore.getState().setChannelStatus("chat", client.status);
  const offStatus = client.onStatusChange((status) => {
    store().setWsStatus(status);
    useWsStore.getState().setChannelStatus("chat", status);
  });

  return () => {
    offThreadStarted();
    offToken();
    offCitation();
    offGuardrail();
    offComplete();
    offError();
    offStatus();
  };
}

/** thread_id may be null — the backend creates a new thread on the fly. */
export function sendChatMessage(threadId: string | null, content: string): void {
  if (threadId) {
    useAssistantStore.getState().addMessage(threadId, {
      id: `local-${Date.now()}`,
      thread_id: threadId,
      user_id: "",
      role: "user",
      content,
      intent: null,
      citations: [],
      tool_trace: [],
      guardrails: [],
      created_at: nowIso(),
    });
  } else {
    pendingUserContent = content;
  }

  getChatClient().send("user_message", {
    thread_id: threadId,
    message: content,
    language: "en",
    response_mode: "text",
  });
}

/** No server round-trip — a "new conversation" is just deselecting the
 * active thread; the backend creates a real thread on the next message. */
export function requestNewThread(): void {
  useAssistantStore.getState().setActiveThread(null);
  useAssistantStore.getState().clearStreaming();
}
