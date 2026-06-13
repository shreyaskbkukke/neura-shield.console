"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertSeveritySummary } from "./AlertSeveritySummary";
import { AlertTable } from "./AlertTable";
import { AlertDetailDrawer } from "./AlertDetailDrawer";
import { LiveEventToast } from "@/components/grounded/LiveEventToast";
import { ErrorState } from "@/components/foundation/ErrorState";
import { useAlerts } from "../hooks";
import { setupAlertWsHandlers } from "../ws";
import { useAlertStore } from "@/stores/alertStore";
import { useAuthStore } from "@/stores/authStore";
import { getAlertClient } from "@/lib/ws/wsClient";
import type { AlertListItem, AlertFilters } from "../types";
import { ALERT_SEVERITIES, ALERT_STATUSES } from "../types";

export function AlertsScreen() {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [filters, setFilters] = useState<AlertFilters>({});

  const alertsQuery = useAlerts(filters);
  const queryClient = useQueryClient();
  const { showToast, lastAlertTitle, dismissToast } = useAlertStore();
  const { hasPermission } = useAuthStore();
  const canUpdate = hasPermission("alert.update");

  useEffect(() => {
    getAlertClient().connect();
    const teardown = setupAlertWsHandlers(() => {
      void queryClient.invalidateQueries({ queryKey: ["alerts"] });
    });
    return teardown;
  }, [queryClient]);

  function handleRowClick(row: AlertListItem) {
    setSelectedAlertId(row.id);
  }

  return (
    <div className="space-y-5">
      <AlertSeveritySummary data={alertsQuery.data} isLoading={alertsQuery.isLoading} />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.severity ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, severity: e.target.value || undefined }))}
          className="h-8 rounded-lg border border-navy-200 bg-white px-2 text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All severities</option>
          {ALERT_SEVERITIES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filters.status ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value || undefined }))}
          className="h-8 rounded-lg border border-navy-200 bg-white px-2 text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All statuses</option>
          {ALERT_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      {alertsQuery.isError ? (
        <ErrorState
          title="Failed to load alerts"
          message={alertsQuery.error?.message}
          onRetry={() => void alertsQuery.refetch()}
        />
      ) : (
        <AlertTable
          data={alertsQuery.data?.items ?? []}
          isLoading={alertsQuery.isLoading}
          onRowClick={handleRowClick}
        />
      )}

      <AlertDetailDrawer
        alertId={selectedAlertId}
        onClose={() => setSelectedAlertId(null)}
        canUpdate={canUpdate}
      />

      <LiveEventToast
        title="New Alert"
        message={lastAlertTitle ?? undefined}
        visible={showToast}
        onDismiss={dismissToast}
        variant="alert"
      />
    </div>
  );
}
