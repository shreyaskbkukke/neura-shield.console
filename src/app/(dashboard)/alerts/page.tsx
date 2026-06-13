import { AlertTriangle } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";
import { RequirePermission } from "@/components/auth/RequirePermission";

export default function AlertsPage() {
  return (
    <RequirePermission permission="alert.read">
      <PageSurface>
        <PageHeader
          title="Alerts"
          description="Live crime alerts and triggered rule notifications"
          icon={AlertTriangle}
        />
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-sm text-navy-400">
              Phase 6 Step 5 — Alerts + Notifications UI coming next
            </p>
          </CardContent>
        </Card>
      </PageSurface>
    </RequirePermission>
  );
}
