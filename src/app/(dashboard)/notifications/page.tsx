import { Bell } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { NotificationsScreen } from "@/features/notifications/components/NotificationsScreen";

export default function NotificationsPage() {
  return (
    <RequirePermission permission="notification.read">
      <PageSurface>
        <PageHeader
          title="Notifications"
          description="System notifications and unread items"
          icon={Bell}
        />
        <NotificationsScreen />
      </PageSurface>
    </RequirePermission>
  );
}
