"use client";

import { useAuthStore } from "@/stores/authStore";
import { AccessDenied } from "./AccessDenied";
import { Skeleton } from "@/components/foundation/Skeleton";

interface RequirePermissionProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequirePermission({
  permission,
  children,
  fallback,
}: RequirePermissionProps) {
  const { user, isLoading, hasPermission } = useAuthStore();

  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (!user || !hasPermission(permission)) {
    return fallback ? <>{fallback}</> : <AccessDenied permission={permission} />;
  }

  return <>{children}</>;
}
