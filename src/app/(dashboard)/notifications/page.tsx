import { Bell } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";
import { RequirePermission } from "@/components/auth/RequirePermission";

export default function NotificationsPage() {
  return (
    <RequirePermission permission="notification.read">
      <PageSurface>
        <PageHeader
          title="Notifications"
          description="System notifications and unread items"
          icon={Bell}
        />
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-sm text-navy-400">
              Phase 6 Step 5 — Alerts + Notifications UI coming next
            </p>
          </CardContent>
        </Card>
      </PageSurface>
    </RequirePermission>
  );
}
