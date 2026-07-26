import { getAlertClient } from "@/lib/ws/wsClient";
import { useAlertStore } from "@/stores/alertStore";
import { useWsStore } from "@/stores/wsStore";

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

  useWsStore.getState().setChannelStatus("alerts", client.status);
  const offStatus = client.onStatusChange((status) => {
    useWsStore.getState().setChannelStatus("alerts", status);
  });

  return () => {
    offCreated();
    offStatus();
  };
}
