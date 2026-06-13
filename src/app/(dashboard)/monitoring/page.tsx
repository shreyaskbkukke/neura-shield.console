import { Monitor } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { MonitoringScreen } from "@/features/monitoring/components/MonitoringScreen";

export default function MonitoringPage() {
  return (
    <RequirePermission permission="forecast.read">
      <PageSurface>
        <PageHeader
          title="Model Monitoring"
          description="Forecast quality snapshots, drift metrics, and data freshness status"
          icon={Monitor}
        />
        <MonitoringScreen />
      </PageSurface>
    </RequirePermission>
  );
}
