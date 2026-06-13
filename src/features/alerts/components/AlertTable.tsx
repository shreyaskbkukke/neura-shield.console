import { DataTable, type Column } from "@/components/grounded/DataTable";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { formatDateTime } from "@/lib/formatters";
import type { AlertListItem } from "../types";

interface AlertTableProps {
  data: AlertListItem[];
  isLoading: boolean;
  onRowClick: (row: AlertListItem) => void;
}

const columns: Column<AlertListItem>[] = [
  {
    key: "title",
    header: "Alert",
    render: (row) => (
      <div>
        <p className="text-xs font-medium text-navy-800 line-clamp-1">{row.title}</p>
        <p className="text-[11px] text-navy-400">{row.alert_type.replace(/_/g, " ")}</p>
      </div>
    ),
  },
  {
    key: "severity",
    header: "Severity",
    align: "center",
    render: (row) => <SeverityBadge severity={row.severity} />,
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "district",
    header: "District",
    render: (row) => (
      <span className="text-xs text-navy-600">{row.district?.name ?? "—"}</span>
    ),
  },
  {
    key: "confidence_score",
    header: "Confidence",
    align: "center",
    render: (row) =>
      row.confidence_score != null ? (
        <ConfidenceScore score={row.confidence_score} />
      ) : (
        <span className="text-[11px] text-navy-400">—</span>
      ),
  },
  {
    key: "created_at",
    header: "Created",
    align: "right",
    render: (row) => <span className="text-xs text-navy-500">{formatDateTime(row.created_at)}</span>,
  },
];

export function AlertTable({ data, isLoading, onRowClick }: AlertTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
      isLoading={isLoading}
      emptyTitle="No alerts"
      emptyDescription="No alerts match the selected filters"
      onRowClick={onRowClick}
    />
  );
}
