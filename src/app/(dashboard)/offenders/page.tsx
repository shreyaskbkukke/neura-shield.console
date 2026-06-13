import { Users } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { OffendersScreen } from "@/features/offenders/components/OffendersScreen";

export default function OffendersPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Offender Intelligence"
        description="Repeat offenders, behavioral profiles, MO analysis, and risk scores"
        icon={Users}
      />
      <RequirePermission permission="offender.read">
        <OffendersScreen />
      </RequirePermission>
    </PageSurface>
  );
}
