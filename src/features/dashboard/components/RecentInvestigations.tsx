import { FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import type { Investigation } from "../types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const columns: Column<Investigation>[] = [
  {
    key: "case_ref",
    header: "Case Ref",
    width: "w-28",
    render: (row) => (
      <span className="font-mono text-xs text-brand-700">{row.case_ref}</span>
    ),
  },
  {
    key: "title",
    header: "Title",
    render: (row) => (
      <span className="text-xs text-navy-800 line-clamp-1">{row.title}</span>
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
      <span className="text-xs text-navy-500">{formatDate(row.created_at)}</span>
    ),
  },
];

interface RecentInvestigationsProps {
  data: Investigation[] | undefined;
  isLoading: boolean;
}

export function RecentInvestigations({ data, isLoading }: RecentInvestigationsProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <FolderOpen size={14} className="text-brand-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-navy-900">Recent Investigations</p>
          <p className="mt-0.5 text-xs text-navy-500">Latest opened cases</p>
        </div>
      </div>
      <CardContent className="pt-1 pb-4">
        <DataTable
          columns={columns}
          data={data ?? []}
          keyExtractor={(row) => row.id}
          isLoading={isLoading}
          emptyTitle="No investigations"
          emptyDescription="Cases opened by your team will appear here"
        />
      </CardContent>
    </Card>
  );
}
