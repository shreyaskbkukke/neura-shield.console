import { getChatClient } from "@/lib/ws/wsClient";
import {
  useAssistantStore,
  type ConversationThread,
  type ConversationMessage,
} from "@/stores/assistantStore";
import { useWsStore } from "@/stores/wsStore";

interface TokenEvent {
  type: "chat.token";
  thread_id: string;
  token: string;
}

interface MessageEvent {
  type: "chat.message";
  thread_id: string;
  message: ConversationMessage;
}

interface ErrorEvent {
  type: "chat.error";
  thread_id: string;
  error: string;
}

interface ThreadCreatedEvent {
  type: "chat.thread_created";
  thread: ConversationThread;
}

export function setupChatWsHandlers(): () => void {
  const client = getChatClient();
  const store = useAssistantStore.getState;

  const offToken = client.on("chat.token", (raw) => {
    const ev = raw as TokenEvent;
    store().appendToken(ev.token);
  });

  const offMessage = client.on("chat.message", (raw) => {
    const ev = raw as MessageEvent;
    store().clearStreaming();
    store().addMessage(ev.thread_id, ev.message);
  });

  const offError = client.on("chat.error", (raw) => {
    const ev = raw as ErrorEvent;
    store().clearStreaming();
    console.warn("[NeuraShield WS] chat error:", ev.error);
  });

  const offThreadCreated = client.on("chat.thread_created", (raw) => {
    const ev = raw as ThreadCreatedEvent;
    store().prependThread(ev.thread);
    store().setActiveThread(ev.thread.thread_id);
  });

  store().setWsStatus(client.status);
  useWsStore.getState().setChannelStatus("chat", client.status);
  const offStatus = client.onStatusChange((status) => {
    store().setWsStatus(status);
    useWsStore.getState().setChannelStatus("chat", status);
  });

  return () => {
    offToken();
    offMessage();
    offError();
    offThreadCreated();
    offStatus();
  };
}

export function sendChatMessage(threadId: string, content: string): void {
  getChatClient().send("chat.send", { thread_id: threadId, content });
}

export function requestNewThread(): void {
  getChatClient().send("chat.new_thread", {});
}
