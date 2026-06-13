"use client";

import { Key } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuthStore } from "@/stores/authStore";
import { AccessDenied } from "@/components/auth/AccessDenied";
import { Skeleton } from "@/components/foundation/Skeleton";
import { RolePermissionMatrix } from "@/features/admin/components/RolePermissionMatrix";

export default function AdminRolesPage() {
  const { user, isLoading, hasPermission } = useAuthStore();

  if (isLoading) {
    return (
      <PageSurface>
        <div className="space-y-4 p-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </PageSurface>
    );
  }

  if (!user || !hasPermission("admin.manage_users")) {
    return (
      <PageSurface>
        <AccessDenied permission="admin.manage_users" />
      </PageSurface>
    );
  }

  return (
    <PageSurface>
      <PageHeader
        title="Roles & Permissions Matrix"
        description="Inspect RBAC access configurations and permission boundaries"
        icon={Key}
      />
      <div className="mt-6">
        <RolePermissionMatrix />
      </div>
    </PageSurface>
  );
}
