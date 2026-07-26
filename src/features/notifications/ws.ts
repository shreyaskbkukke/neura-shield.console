import { getNotificationClient } from "@/lib/ws/wsClient";
import { useNotificationStore } from "@/stores/notificationStore";
import { useWsStore } from "@/stores/wsStore";

interface NotificationCreatedEvent {
  type: "notification_created";
  title: string;
  notification_id: string;
}

export function setupNotificationWsHandlers(
  onInvalidate: () => void,
): () => void {
  const client = getNotificationClient();
  const store = useNotificationStore.getState;

  const offCreated = client.on("notification_created", (raw) => {
    const ev = raw as NotificationCreatedEvent;
    store().incrementUnread(ev.title);
    onInvalidate();
  });

  useWsStore.getState().setChannelStatus("notifications", client.status);
  const offStatus = client.onStatusChange((status) => {
    useWsStore.getState().setChannelStatus("notifications", status);
  });

  return () => {
    offCreated();
    offStatus();
  };
}
