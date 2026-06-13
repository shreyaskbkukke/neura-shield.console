import { Monitor } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";
import { RequirePermission } from "@/components/auth/RequirePermission";

export default function MonitoringPage() {
  return (
    <RequirePermission permission="forecast.read">
      <PageSurface>
        <PageHeader
          title="Model Monitoring"
          description="Forecast quality snapshots, drift metrics, and data freshness status"
          icon={Monitor}
        />
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-sm text-navy-400">
              Phase 6 Step 5 — Forecasting + Policy UI coming next
            </p>
          </CardContent>
        </Card>
      </PageSurface>
    </RequirePermission>
  );
}
