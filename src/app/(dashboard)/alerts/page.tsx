import { AlertTriangle } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { AlertsScreen } from "@/features/alerts/components/AlertsScreen";

export default function AlertsPage() {
  return (
    <RequirePermission permission="alert.read">
      <PageSurface>
        <PageHeader
          title="Alerts"
          description="Live crime alerts and triggered rule notifications"
          icon={AlertTriangle}
        />
        <AlertsScreen />
      </PageSurface>
    </RequirePermission>
  );
}
