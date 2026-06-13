import { LayoutDashboard } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { DashboardScreen } from "@/features/dashboard/components/DashboardScreen";

export default function DashboardPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Dashboard"
        description="Command center — district crime overview, live alerts, and key metrics"
        icon={LayoutDashboard}
      />
      <RequirePermission permission="analytics.read">
        <DashboardScreen />
      </RequirePermission>
    </PageSurface>
  );
}
