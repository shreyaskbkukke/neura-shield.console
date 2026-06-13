import { Key } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { RolesPermissionsScreen } from "@/features/admin/components/RolesPermissionsScreen";

export default function AdminPermissionsPage() {
  return (
    <RequirePermission permission="admin.manage_users">
      <PageSurface>
        <PageHeader
          title="Roles & Permissions"
          description="Role definitions and permission code assignments"
          icon={Key}
        />
        <RolesPermissionsScreen />
      </PageSurface>
    </RequirePermission>
  );
}
