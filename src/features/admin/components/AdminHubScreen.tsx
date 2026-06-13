"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  Key,
  Terminal,
  Database,
  FileText,
  Activity,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { GovernanceMetricGrid } from "./GovernanceMetricGrid";

const SECTIONS = [
  {
    href: "/admin/users",
    icon: Users,
    label: "User Management",
    description: "Manage system operators, designation, and jurisdiction settings.",
    color: "text-brand-600 bg-brand-50 border-brand-100",
  },
  {
    href: "/admin/audit-logs",
    icon: FileText,
    label: "Audit Logs",
    description: "Full audit trail registry of sensitive operator actions and logs.",
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    href: "/admin/roles",
    icon: Key,
    label: "Roles & Permissions Matrix",
    description: "Cross-reference role-to-permission mapping matrices.",
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    href: "/admin/system-health",
    icon: Activity,
    label: "System Health & Deployment",
    description: "Test API reachability and WebSocket channel states.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    href: "/admin/data-governance",
    icon: Shield,
    label: "Data Governance & disclaimers",
    description: "Review safety guardrails, privacy policies, and system limits.",
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    href: "/admin/jobs",
    icon: Terminal,
    label: "Admin Jobs",
    description: "Trigger intelligence, forecasting, and data pipeline runs.",
    color: "text-warning-600 bg-warning-50 border-warning-100",
  },
  {
    href: "/admin/system",
    icon: Database,
    label: "Model Registry",
    description: "Inspect registered forecasting model weights and metrics.",
    color: "text-navy-600 bg-navy-50 border-navy-100",
  },
];

export function AdminHubScreen() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* KPI Stats overview */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-navy-800 uppercase tracking-wider">
          Governance & Monitoring KPI Overview
        </h3>
        <GovernanceMetricGrid />
      </section>

      {/* Nav Hub Sections */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-navy-800 uppercase tracking-wider">
          Administrative Modules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.href}
                className="cursor-pointer hover:shadow-md transition-shadow border hover:border-navy-300"
                onClick={() => router.push(s.href)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border ${s.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-navy-800">{s.label}</p>
                      <p className="mt-0.5 text-[11px] text-navy-500 leading-snug">{s.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
