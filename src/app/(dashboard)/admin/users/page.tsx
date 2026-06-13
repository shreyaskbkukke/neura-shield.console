import { Users } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { UsersScreen } from "@/features/admin/components/UsersScreen";

export default function AdminUsersPage() {
  return (
    <RequirePermission permission="admin.manage_users">
      <PageSurface>
        <PageHeader
          title="User Management"
          description="All registered users, their roles, and account status"
          icon={Users}
        />
        <UsersScreen />
      </PageSurface>
    </RequirePermission>
  );
}
