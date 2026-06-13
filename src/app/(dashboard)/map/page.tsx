import { Map } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { MapScreen } from "@/features/map/components/MapScreen";

export default function MapPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Geo Intelligence"
        description="Hotspot clustering, district risk scores, and spatial crime concentration"
        icon={Map}
      />
      <RequirePermission permission="analytics.read">
        <MapScreen />
      </RequirePermission>
    </PageSurface>
  );
}
