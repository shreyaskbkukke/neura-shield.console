"use client";

import { useState } from "react";
import { useAuditLogs } from "../hooks";
import { DataTable } from "@/components/grounded/DataTable";
import { AuditLogFilterBar } from "./AuditLogFilters";
import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import type { AuditLog, AuditLogFilters } from "../types";
import type { Column } from "@/components/grounded/DataTable";

const columns: Column<AuditLog>[] = [
  {
    key: "created_at",
    header: "Time",
    render: (row) => (
      <span className="text-xs text-navy-500 whitespace-nowrap">
        {new Date(row.created_at).toLocaleString()}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (row) => (
      <span className="font-mono text-xs text-brand-700 bg-brand-50 border border-brand-100 rounded px-1.5 py-0.5">
        {row.action}
      </span>
    ),
  },
  {
    key: "resource_type",
    header: "Resource",
    render: (row) => (
      <span className="text-navy-600 text-xs">
        {row.resource_type ?? "—"}
        {row.resource_id && (
          <span className="ml-1 text-navy-400 font-mono">
            #{row.resource_id.slice(0, 8)}
          </span>
        )}
      </span>
    ),
  },
  {
    key: "user_id",
    header: "User",
    render: (row) => (
      <span className="font-mono text-xs text-navy-500">
        {row.user_id ? row.user_id.slice(0, 8) + "…" : "system"}
      </span>
    ),
  },
  {
    key: "ip_address",
    header: "IP",
    render: (row) => (
      <span className="text-xs text-navy-400">{row.ip_address ?? "—"}</span>
    ),
  },
];

function AuditDetailDrawer({ log, onClose }: { log: AuditLog; onClose: () => void }) {
  return (
    <DetailDrawer isOpen title={log.action} description={log.resource_type ?? undefined} onClose={onClose}>
      <div className="flex flex-col gap-4 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">Time</p>
            <p className="mt-0.5 text-navy-800">{new Date(log.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">User ID</p>
            <p className="mt-0.5 font-mono text-xs text-navy-700">{log.user_id ?? "system"}</p>
          </div>
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">Resource</p>
            <p className="mt-0.5 text-navy-800">{log.resource_type ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">Resource ID</p>
            <p className="mt-0.5 font-mono text-xs text-navy-700">{log.resource_id ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">IP Address</p>
            <p className="mt-0.5 text-navy-800">{log.ip_address ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">Log ID</p>
            <p className="mt-0.5 font-mono text-xs text-navy-700">{log.id}</p>
          </div>
        </div>

        {log.metadata && Object.keys(log.metadata).length > 0 && (
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide mb-1">Metadata</p>
            <pre className="text-xs bg-navy-50 rounded-lg p-3 overflow-x-auto text-navy-700 border border-navy-100">
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </DetailDrawer>
  );
}

export function AuditLogScreen() {
  const [filters, setFilters] = useState<AuditLogFilters>({});
  const [page] = useState(1);
  const [selected, setSelected] = useState<AuditLog | null>(null);
  const { data, isLoading } = useAuditLogs(filters, page);

  return (
    <div className="flex flex-col gap-5">
      <AuditLogFilterBar filters={filters} onChange={setFilters} />
      {data && (
        <p className="text-xs text-navy-500">
          {data.total} log{data.total !== 1 ? "s" : ""}
        </p>
      )}
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No audit logs found"
        emptyDescription="Try adjusting your filters."
        onRowClick={setSelected}
      />
      {selected && (
        <AuditDetailDrawer log={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
