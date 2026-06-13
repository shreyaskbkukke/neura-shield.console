import { Fingerprint } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { MOPatternsScreen } from "@/features/mo-patterns/components/MOPatternsScreen";

export default function MOPatternsPage() {
  return (
    <PageSurface>
      <PageHeader
        title="MO Patterns"
        description="Modus operandi profiles extracted from crime data — keyword clusters, severity weights, and behavioral signatures"
        icon={Fingerprint}
      />
      <RequirePermission permission="criminology.read">
        <MOPatternsScreen />
      </RequirePermission>
    </PageSurface>
  );
}
