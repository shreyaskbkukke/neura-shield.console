import { LineChart } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { ForecastScreen } from "@/features/forecast/components/ForecastScreen";

export default function ForecastPage() {
  return (
    <RequirePermission permission="forecast.read">
      <PageSurface>
        <PageHeader
          title="Crime Forecasts"
          description="Projected crime volumes and hotspot risk scores by district and station"
          icon={LineChart}
        />
        <ForecastScreen />
      </PageSurface>
    </RequirePermission>
  );
}
