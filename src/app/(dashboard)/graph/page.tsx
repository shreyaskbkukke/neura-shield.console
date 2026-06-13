import { Network } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { GraphScreen } from "@/features/graph/components/GraphScreen";

export default function GraphPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Relationship Graph"
        description="Expanded offender network, suspicious associations, and organized group candidates"
        icon={Network}
      />
      <RequirePermission permission="criminology.read">
        <GraphScreen />
      </RequirePermission>
    </PageSurface>
  );
}
