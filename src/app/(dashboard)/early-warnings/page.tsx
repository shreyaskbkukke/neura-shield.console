import { AlertCircle } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { EarlyWarningsScreen } from "@/features/early-warnings/components/EarlyWarningsScreen";

export default function EarlyWarningsPage() {
  return (
    <RequirePermission permission="forecast.read">
      <PageSurface>
        <PageHeader
          title="Early Warnings"
          description="Forecast-based decision-support signals for district risk management"
          icon={AlertCircle}
        />
        <EarlyWarningsScreen />
      </PageSurface>
    </RequirePermission>
  );
}
