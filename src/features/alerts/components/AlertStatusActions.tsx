"use client";

import { StatusTransitionMenu } from "@/components/grounded/StatusTransitionMenu";
import { useUpdateAlertStatus } from "../hooks";
import { ALERT_TRANSITIONS } from "../types";

interface AlertStatusActionsProps {
  alertId: string;
  currentStatus: string;
}

export function AlertStatusActions({ alertId, currentStatus }: AlertStatusActionsProps) {
  const mutation = useUpdateAlertStatus(alertId);
  const transitions = ALERT_TRANSITIONS[currentStatus] ?? [];

  return (
    <StatusTransitionMenu
      currentStatus={currentStatus}
      transitions={transitions}
      onTransition={(status) => mutation.mutate({ status })}
      isLoading={mutation.isPending}
    />
  );
}
