import { Calendar } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { ForecastFeaturesScreen } from "@/features/forecast/components/ForecastFeaturesScreen";

export default function ForecastFeaturesPage() {
  return (
    <RequirePermission permission="forecast.read">
      <PageSurface>
        <PageHeader
          title="Forecast Features"
          description="Weekly crime feature windows and backtest history feeding the forecasting models"
          icon={Calendar}
        />
        <ForecastFeaturesScreen />
      </PageSurface>
    </RequirePermission>
  );
}
