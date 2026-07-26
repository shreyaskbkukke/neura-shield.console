import { Share2 } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { ExpandedNetworkScreen } from "@/features/graph/components/ExpandedNetworkScreen";

export default function NetworkPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Expanded Network"
        description="Suspected organized group candidates, suspicious associations, and network communities"
        icon={Share2}
      />
      <RequirePermission permission="criminology.read">
        <ExpandedNetworkScreen />
      </RequirePermission>
    </PageSurface>
  );
}
