import { Database } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { SystemScreen } from "@/features/admin/components/SystemScreen";

export default function AdminSystemPage() {
  return (
    <RequirePermission permission="admin.manage_users">
      <PageSurface>
        <PageHeader
          title="Model Registry"
          description="Active model registrations, versions, and training metadata"
          icon={Database}
        />
        <SystemScreen />
      </PageSurface>
    </RequirePermission>
  );
}
