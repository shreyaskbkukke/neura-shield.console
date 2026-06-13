"use client";

import { useModels } from "../hooks";
import { DataTable } from "@/components/grounded/DataTable";
import { Badge } from "@/components/foundation/Badge";
import type { ModelRegistryItem } from "../types";
import type { Column } from "@/components/grounded/DataTable";

const columns: Column<ModelRegistryItem>[] = [
  {
    key: "model_name",
    header: "Model Name",
    render: (row) => (
      <span className="font-mono text-xs text-navy-800">{row.model_name}</span>
    ),
  },
  {
    key: "model_type",
    header: "Type",
    render: (row) => <span className="text-navy-600">{row.model_type}</span>,
  },
  {
    key: "model_version",
    header: "Version",
    render: (row) => (
      <span className="font-mono text-xs">{row.model_version}</span>
    ),
  },
  {
    key: "is_active",
    header: "Status",
    align: "center",
    render: (row) => (
      <Badge variant={row.is_active ? "success" : "default"}>
        {row.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    key: "created_at",
    header: "Registered",
    render: (row) => new Date(row.created_at).toLocaleDateString(),
  },
];

export function SystemScreen() {
  const { data, isLoading } = useModels();

  return (
    <div className="flex flex-col gap-4">
      {data && (
        <p className="text-xs text-navy-500">
          {data.total} model{data.total !== 1 ? "s" : ""} registered
        </p>
      )}
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No models registered"
        emptyDescription="Run the seed endpoint to populate the model registry."
      />
    </div>
  );
}
