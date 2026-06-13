import { DataTable, type Column } from "@/components/grounded/DataTable";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import { formatDateTime } from "@/lib/formatters";
import type { Investigation } from "../types";

interface InvestigationTableProps {
  data: Investigation[];
  isLoading: boolean;
  onRowClick: (row: Investigation) => void;
}

const columns: Column<Investigation>[] = [
  {
    key: "case_ref",
    header: "Case Ref",
    render: (row) => (
      <span className="font-mono text-xs font-medium text-brand-600">{row.case_ref}</span>
    ),
  },
  {
    key: "title",
    header: "Title",
    render: (row) => (
      <p className="text-xs font-medium text-navy-800 line-clamp-1 max-w-[240px]">{row.title}</p>
    ),
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "priority",
    header: "Priority",
    align: "center",
    render: (row) => <SeverityBadge severity={row.priority} />,
  },
  {
    key: "created_at",
    header: "Opened",
    align: "right",
    render: (row) => (
      <span className="text-xs text-navy-500">{formatDateTime(row.created_at)}</span>
    ),
  },
];

export function InvestigationTable({
  data,
  isLoading,
  onRowClick,
}: InvestigationTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
      isLoading={isLoading}
      emptyTitle="No investigations"
      emptyDescription="Open a new investigation using the button above"
      onRowClick={onRowClick}
    />
  );
}
