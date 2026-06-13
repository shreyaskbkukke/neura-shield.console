import { Settings } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";
import { RequirePermission } from "@/components/auth/RequirePermission";

export default function AdminPage() {
  return (
    <RequirePermission permission="admin.manage_users">
      <PageSurface>
        <PageHeader
          title="Admin"
          description="User management, admin jobs, and system configuration"
          icon={Settings}
        />
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-sm text-navy-400">
              Phase 6 Step 6 — Governance + Admin UI coming next
            </p>
          </CardContent>
        </Card>
      </PageSurface>
    </RequirePermission>
  );
}
