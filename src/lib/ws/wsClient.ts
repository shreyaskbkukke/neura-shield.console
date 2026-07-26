import { config } from "@/lib/config";

type WsStatus = "disconnected" | "connecting" | "connected" | "error";
type EventHandler = (data: unknown) => void;

interface WsEvent {
  type: string;
  [key: string]: unknown;
}

export class WsClient {
  private socket: WebSocket | null = null;
  private handlers = new Map<string, Set<EventHandler>>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private path: string;

  status: WsStatus = "disconnected";
  lastError: string | null = null;

  private statusListeners = new Set<(status: WsStatus) => void>();

  constructor(path: string) {
    this.path = path;
  }

  connect(): void {
    if (this.socket?.readyState === WebSocket.OPEN) return;
    this.status = "connecting";
    this.notifyStatus();

    const token =
      globalThis.window === undefined
        ? null
        : localStorage.getItem("ns_auth_token");
    const query = token ? `?token=${encodeURIComponent(token)}` : "";
    const url = `${config.wsBaseUrl}${this.path}${query}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.status = "connected";
      this.lastError = null;
      this.reconnectAttempts = 0;
      this.notifyStatus();
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data as string) as WsEvent;
        const typeHandlers = this.handlers.get(data.type);
        typeHandlers?.forEach((handler) => handler(data));
        const wildcardHandlers = this.handlers.get("*");
        wildcardHandlers?.forEach((handler) => handler(data));
      } catch {
        // ignore malformed messages
      }
    };

    this.socket.onerror = () => {
      this.status = "error";
      this.lastError = "WebSocket connection error";
      this.notifyStatus();
    };

    this.socket.onclose = () => {
      this.status = "disconnected";
      this.notifyStatus();
      this.scheduleReconnect();
    };
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.reconnectAttempts = this.maxReconnectAttempts; // prevent auto-reconnect
    this.socket?.close();
    this.socket = null;
    this.status = "disconnected";
    this.notifyStatus();
  }

  send(type: string, data: Record<string, unknown> = {}): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, ...data }));
    }
  }

  on(eventType: string, handler: EventHandler): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
    return () => this.off(eventType, handler);
  }

  off(eventType: string, handler: EventHandler): void {
    this.handlers.get(eventType)?.delete(handler);
  }

  onStatusChange(listener: (status: WsStatus) => void): () => void {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener);
  }

  private notifyStatus(): void {
    this.statusListeners.forEach((l) => l(this.status));
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;
    this.reconnectAttempts++;
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30_000);
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }
}

// Singleton clients for each WS channel
let chatClient: WsClient | null = null;
let alertClient: WsClient | null = null;
let notificationClient: WsClient | null = null;

export function getChatClient(): WsClient {
  if (!chatClient) chatClient = new WsClient("/ws/chat");
  return chatClient;
}

export function getAlertClient(): WsClient {
  if (!alertClient) alertClient = new WsClient("/ws/alerts");
  return alertClient;
}

export function getNotificationClient(): WsClient {
  if (!notificationClient) notificationClient = new WsClient("/ws/notifications");
  return notificationClient;
}
