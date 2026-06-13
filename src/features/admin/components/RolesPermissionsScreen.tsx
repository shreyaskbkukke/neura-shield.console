"use client";

import { useRoles, usePermissions } from "../hooks";
import { DataTable } from "@/components/grounded/DataTable";
import type { AdminRole, AdminPermission } from "../types";
import type { Column } from "@/components/grounded/DataTable";

const roleColumns: Column<AdminRole>[] = [
  {
    key: "name",
    header: "Role",
    render: (row) => <span className="font-medium text-navy-900">{row.name.replace(/_/g, " ")}</span>,
  },
  {
    key: "description",
    header: "Description",
    render: (row) => <span className="text-navy-500">{row.description ?? "—"}</span>,
  },
  {
    key: "created_at",
    header: "Created",
    render: (row) => new Date(row.created_at).toLocaleDateString(),
  },
];

const permissionColumns: Column<AdminPermission>[] = [
  {
    key: "code",
    header: "Permission Code",
    render: (row) => (
      <span className="font-mono text-xs text-brand-700 bg-brand-50 border border-brand-100 rounded px-1.5 py-0.5">
        {row.code}
      </span>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (row) => <span className="text-navy-500">{row.description ?? "—"}</span>,
  },
];

export function RolesPermissionsScreen() {
  const roles = useRoles();
  const permissions = usePermissions();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-sm font-semibold text-navy-700 mb-3">Roles</h2>
        <DataTable
          columns={roleColumns}
          data={roles.data?.items ?? []}
          keyExtractor={(row) => row.id}
          isLoading={roles.isLoading}
          emptyTitle="No roles found"
        />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-navy-700 mb-3">
          Permissions
          {permissions.data && (
            <span className="ml-2 text-xs font-normal text-navy-400">
              ({permissions.data.total})
            </span>
          )}
        </h2>
        <DataTable
          columns={permissionColumns}
          data={permissions.data?.items ?? []}
          keyExtractor={(row) => row.id}
          isLoading={permissions.isLoading}
          emptyTitle="No permissions found"
        />
      </section>
    </div>
  );
}
