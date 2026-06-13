"use client";

import { Users, Shield, FileText, AlertTriangle, Key, Activity, CheckSquare, Layers } from "lucide-react";
import { useUsers, useRoles } from "../hooks";
import { useAuditLogs } from "@/features/audit/hooks";
import { useAlerts } from "@/features/alerts/hooks";
import { useEarlyWarningsPreview, usePreventionPreview, useMonitoringSummary } from "@/features/dashboard/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/Card";
import { Badge } from "@/components/foundation/Badge";
import { Skeleton } from "@/components/foundation/Skeleton";

export function GovernanceMetricGrid() {
  // 1. Fetch Users Count
  const usersQuery = useUsers(1);
  const totalUsers = usersQuery.data?.total ?? usersQuery.data?.items?.length ?? 0;

  // 2. Fetch Active Roles Count
  const rolesQuery = useRoles();
  const totalRoles = rolesQuery.data?.total ?? rolesQuery.data?.items?.length ?? 0;

  // 3. Fetch Audit Events Today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const auditLogsQuery = useAuditLogs({ start_date: todayStart.toISOString() }, 1);
  const auditLogsToday = auditLogsQuery.data?.total ?? 0;

  // 4. Fetch Open Alerts Count
  const alertsQuery = useAlerts({ status: "OPEN" });
  const openAlerts = alertsQuery.data?.total ?? alertsQuery.data?.items?.length ?? 0;

  // 5. Fetch Open Early Warnings Count
  const earlyWarningsQuery = useEarlyWarningsPreview({ districtId: "" });
  const openWarnings = earlyWarningsQuery.data?.total_open ?? 0;

  // 6. Fetch Open Prevention Recommendations Count
  const preventionQuery = usePreventionPreview({ districtId: "" });
  const openPrevention = preventionQuery.data?.total_open ?? 0;

  // 7. Fetch Model Monitoring & Data Freshness Summary
  const monitoringQuery = useMonitoringSummary({ districtId: "" });
  const modelStatus = monitoringQuery.data?.overall_status ?? "HEALTHY";
  const dataFreshness = monitoringQuery.data?.data_freshness ?? {};
  
  // Calculate if there are stale tables
  const staleDataCount = Object.entries(dataFreshness)
    .filter(([status]) => status.toUpperCase() === "STALE" || status.toUpperCase() === "CRITICAL")
    .reduce((sum, [, count]) => sum + (count as number), 0);

  const isLoading =
    usersQuery.isLoading ||
    rolesQuery.isLoading ||
    auditLogsQuery.isLoading ||
    alertsQuery.isLoading ||
    earlyWarningsQuery.isLoading ||
    preventionQuery.isLoading ||
    monitoringQuery.isLoading;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "Registered operator accounts",
      icon: Users,
      colorClass: "text-brand-500 bg-brand-50 border-brand-100",
    },
    {
      title: "Active Roles",
      value: totalRoles,
      description: "RBAC security groups",
      icon: Shield,
      colorClass: "text-indigo-500 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Audit Events Today",
      value: auditLogsToday,
      description: "Logged administrative actions",
      icon: FileText,
      colorClass: "text-emerald-500 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Open Alerts",
      value: openAlerts,
      description: "Requires immediate attention",
      icon: AlertTriangle,
      colorClass: openAlerts > 0 ? "text-danger-500 bg-danger-50 border-danger-100 animate-pulse" : "text-navy-400 bg-navy-50 border-navy-100",
    },
    {
      title: "Early Warnings",
      value: openWarnings,
      description: "Triggered warning indicators",
      icon: Layers,
      colorClass: openWarnings > 0 ? "text-warning-500 bg-warning-50 border-warning-100" : "text-navy-400 bg-navy-50 border-navy-100",
    },
    {
      title: "Prevention Prompts",
      value: openPrevention,
      description: "Active policy recommendations",
      icon: CheckSquare,
      colorClass: "text-purple-500 bg-purple-50 border-purple-100",
    },
    {
      title: "Data Freshness",
      value: staleDataCount === 0 ? "Fresh" : `${staleDataCount} Stale`,
      description: staleDataCount === 0 ? "All pipeline feeds up-to-date" : "Feeds exceeding max age limits",
      icon: Activity,
      badge: (staleDataCount === 0 ? "success" : "danger") as "success" | "danger",
      colorClass: staleDataCount === 0 ? "text-success-500 bg-success-50 border-success-100" : "text-danger-500 bg-danger-50 border-danger-100",
    },
    {
      title: "AI Model Status",
      value: modelStatus.toUpperCase(),
      description: "Prediction and drift status",
      icon: Key,
      badge: (modelStatus.toUpperCase() === "HEALTHY" ? "success" : modelStatus.toUpperCase() === "WARNING" ? "warning" : "danger") as "success" | "warning" | "danger",
      colorClass: modelStatus.toUpperCase() === "HEALTHY" ? "text-success-500 bg-success-50 border-success-100" : "text-warning-500 bg-warning-50 border-warning-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <Card key={m.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                {m.title}
              </CardTitle>
              <div className={`p-1.5 rounded-lg border ${m.colorClass}`}>
                <Icon size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-navy-800 tracking-tight">
                  {m.value}
                </span>
                {m.badge && (
                  <Badge variant={m.badge}>
                    {m.value === "Fresh" || m.value === "HEALTHY" ? "Normal" : "Review"}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-navy-400 mt-1">{m.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
