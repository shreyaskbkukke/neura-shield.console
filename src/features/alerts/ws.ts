import { getAlertClient } from "@/lib/ws/wsClient";
import { useAlertStore } from "@/stores/alertStore";

interface AlertCreatedEvent {
  type: "alert_created";
  title: string;
  severity: string;
  alert_id: string;
}

export function setupAlertWsHandlers(
  onInvalidate: () => void,
): () => void {
  const client = getAlertClient();
  const store = useAlertStore.getState;

  const offCreated = client.on("alert_created", (raw) => {
    const ev = raw as AlertCreatedEvent;
    store().incrementLive(ev.title);
    onInvalidate();
  });

  return () => {
    offCreated();
  };
}
