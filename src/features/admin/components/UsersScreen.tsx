"use client";

import { useState } from "react";
import { useUsers } from "../hooks";
import { DataTable } from "@/components/grounded/DataTable";
import { Badge } from "@/components/foundation/Badge";
import { UserDetailDrawer } from "./UserDetailDrawer";
import type { AdminUser } from "../types";
import type { Column } from "@/components/grounded/DataTable";

const columns: Column<AdminUser>[] = [
  {
    key: "full_name",
    header: "Name",
    render: (row) => (
      <span className="font-medium text-navy-900">{row.full_name}</span>
    ),
  },
  { key: "email", header: "Email" },
  {
    key: "designation",
    header: "Designation",
    render: (row) => <span className="text-navy-600">{row.designation ?? "—"}</span>,
  },
  {
    key: "department",
    header: "Department",
    render: (row) => <span className="text-navy-600">{row.department ?? "—"}</span>,
  },
  {
    key: "roles",
    header: "Roles",
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.roles.length === 0 ? (
          <span className="text-navy-400 text-xs">—</span>
        ) : (
          row.roles.map((r) => (
            <Badge key={r} variant="default">
              {r.replace(/_/g, " ")}
            </Badge>
          ))
        )}
      </div>
    ),
  },
  {
    key: "is_active",
    header: "Status",
    align: "center",
    render: (row) => (
      <Badge
        variant={row.is_active ? "success" : "default"}
              >
        {row.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
];

export function UsersScreen() {
  const [page] = useState(1);
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const { data, isLoading } = useUsers(page);

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No users found"
        onRowClick={setSelected}
      />
      {selected && (
        <UserDetailDrawer user={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
