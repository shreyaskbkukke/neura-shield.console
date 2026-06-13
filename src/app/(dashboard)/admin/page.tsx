"use client";

import { Settings } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuthStore } from "@/stores/authStore";
import { AccessDenied } from "@/components/auth/AccessDenied";
import { Skeleton } from "@/components/foundation/Skeleton";
import { AdminHubScreen } from "@/features/admin/components/AdminHubScreen";

export default function AdminPage() {
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

  const hasAccess = user && (hasPermission("admin.manage_users") || hasPermission("audit.read"));

  if (!hasAccess) {
    return (
      <PageSurface>
        <AccessDenied permission="admin.manage_users OR audit.read" />
      </PageSurface>
    );
  }

  return (
    <PageSurface>
      <PageHeader
        title="Admin Governance"
        description="System health, audit tracking, role matrix, and deployment verification"
        icon={Settings}
      />
      <div className="mt-6">
        <AdminHubScreen />
      </div>
    </PageSurface>
  );
}
