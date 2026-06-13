"use client";

import { useState } from "react";
import { useRoles, usePermissions } from "../hooks";
import { Check, Search, Shield, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/foundation/Card";
import { Input } from "@/components/foundation/Input";
import { Badge } from "@/components/foundation/Badge";
import { Skeleton } from "@/components/foundation/Skeleton";

// Static mapping matching seed_auth_data.py exactly
const ROLE_PERMISSIONS_MATRIX: Record<string, string[]> = {
  ADMIN: [
    "crime.read", "crime.write", "offender.read", "offender.write",
    "analytics.read", "intelligence.read", "alert.read", "alert.update",
    "investigation.read", "investigation.write", "assistant.use", "graph.read",
    "risk.read", "audit.read", "notifications.read", "sociology.read",
    "criminology.read", "financial.read", "financial.write", "forecast.read",
    "admin.manage_users", "admin.run_jobs"
  ],
  STATE_OFFICER: [
    "crime.read", "offender.read", "analytics.read", "intelligence.read",
    "alert.read", "graph.read", "risk.read", "audit.read", "assistant.use",
    "notifications.read", "sociology.read", "criminology.read", "financial.read",
    "forecast.read"
  ],
  DISTRICT_OFFICER: [
    "crime.read", "crime.write", "offender.read", "analytics.read",
    "intelligence.read", "alert.read", "alert.update", "graph.read",
    "risk.read", "investigation.read", "assistant.use", "notifications.read",
    "sociology.read", "criminology.read", "financial.read", "forecast.read"
  ],
  STATION_OFFICER: [
    "crime.read", "crime.write", "offender.read", "analytics.read",
    "alert.read", "alert.update", "investigation.read", "investigation.write",
    "assistant.use", "notifications.read", "sociology.read", "criminology.read",
    "financial.read"
  ],
  INVESTIGATOR: [
    "crime.read", "offender.read", "investigation.read", "investigation.write",
    "graph.read", "assistant.use", "notifications.read", "financial.read",
    "financial.write"
  ],
  ANALYST: [
    "crime.read", "offender.read", "analytics.read", "intelligence.read",
    "graph.read", "risk.read", "assistant.use", "notifications.read",
    "sociology.read", "criminology.read", "financial.read", "forecast.read"
  ],
  POLICYMAKER: [
    "crime.read", "analytics.read", "intelligence.read", "risk.read",
    "audit.read", "assistant.use", "notifications.read", "sociology.read",
    "forecast.read"
  ],
  VIEWER: [
    "crime.read", "analytics.read", "risk.read"
  ],
};

export function RolePermissionMatrix() {
  const rolesQuery = useRoles();
  const permissionsQuery = usePermissions();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const isLoading = rolesQuery.isLoading || permissionsQuery.isLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const roles = rolesQuery.data?.items ?? [];
  const permissions = permissionsQuery.data?.items ?? [];

  const filteredPermissions = permissions.filter(
    (p) =>
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-navy-400" />
          <Input
            placeholder="Search permissions by code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider self-center mr-2">
            Highlight Role:
          </span>
          <button
            onClick={() => setSelectedRole(null)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              selectedRole === null
                ? "bg-navy-800 text-white border-navy-800"
                : "bg-white text-navy-600 border-navy-200 hover:bg-navy-50"
            }`}
          >
            All Roles
          </button>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.name)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                selectedRole === r.name
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-navy-600 border-navy-200 hover:bg-navy-50"
              }`}
            >
              {r.name.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Matrix Table */}
        <Card className="lg:col-span-3 overflow-hidden">
          <CardHeader className="p-4 border-b border-navy-100">
            <CardTitle className="text-sm font-semibold text-navy-900">
              Role-Permission Matrix Map
            </CardTitle>
            <CardDescription>
              Cross-reference roles and permission codes enforced at the gateway.
            </CardDescription>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-navy-50 border-b border-navy-100">
                  <th className="p-3 text-xs font-semibold text-navy-600 uppercase tracking-wider min-w-[200px]">
                    Permission Code
                  </th>
                  {roles.map((r) => (
                    <th
                      key={r.id}
                      className={`p-3 text-xs font-semibold text-navy-600 uppercase tracking-wider text-center transition-colors ${
                        selectedRole === r.name ? "bg-brand-50 text-brand-700" : ""
                      }`}
                    >
                      {r.name.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {filteredPermissions.length === 0 ? (
                  <tr>
                    <td colSpan={roles.length + 1} className="p-8 text-center text-sm text-navy-400">
                      No permissions match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredPermissions.map((p) => (
                    <tr key={p.id} className="hover:bg-navy-25 transition-colors">
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-navy-800">{p.code}</span>
                          {p.description && (
                            <span className="text-[11px] text-navy-500 mt-0.5">{p.description}</span>
                          )}
                        </div>
                      </td>
                      {roles.map((r) => {
                        const hasPerm = ROLE_PERMISSIONS_MATRIX[r.name]?.includes(p.code);
                        return (
                          <td
                            key={r.id}
                            className={`p-3 text-center transition-colors ${
                              selectedRole === r.name ? "bg-brand-25" : ""
                            }`}
                          >
                            {hasPerm ? (
                              <div className="inline-flex items-center justify-center p-1 rounded-full bg-success-50 text-success-600 border border-success-100">
                                <Check size={12} className="stroke-[3]" />
                              </div>
                            ) : (
                              <span className="text-navy-300 font-bold">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Roles Details / Accordion panel */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-brand-600" />
                <CardTitle className="text-sm font-semibold text-navy-900">Role Info</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              {roles.map((r) => (
                <div key={r.id} className="p-3 rounded-lg border border-navy-100 bg-navy-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-800 uppercase tracking-wide">
                      {r.name.replace(/_/g, " ")}
                    </span>
                    <Badge variant={r.name === "ADMIN" ? "purple" : "default"}>
                      {ROLE_PERMISSIONS_MATRIX[r.name]?.length ?? 0} perms
                    </Badge>
                  </div>
                  <p className="text-[11px] text-navy-500 leading-snug">{r.description ?? "No description"}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-brand-50 border-brand-100">
            <CardContent className="p-4 flex gap-3">
              <Info className="shrink-0 text-brand-600 mt-0.5" size={16} />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-brand-900">RBAC Enforcement</h4>
                <p className="text-[11px] text-brand-700 leading-relaxed">
                  These mappings are hard-gated both on backend routers and within Next.js view containers. Dynamic roles are seeded during server deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
