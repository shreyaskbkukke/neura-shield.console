import { FileText } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { AuditLogScreen } from "@/features/audit/components/AuditLogScreen";

export default function AuditPage() {
  return (
    <RequirePermission permission="audit.read">
      <PageSurface>
        <PageHeader
          title="Audit Logs"
          description="Full audit trail of system actions, decisions, and user activity"
          icon={FileText}
        />
        <AuditLogScreen />
      </PageSurface>
    </RequirePermission>
  );
}
