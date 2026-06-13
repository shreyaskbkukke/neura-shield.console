import { Terminal } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { JobsScreen } from "@/features/admin/components/JobsScreen";

export default function AdminJobsPage() {
  return (
    <RequirePermission permission="admin.run_jobs">
      <PageSurface>
        <PageHeader
          title="Admin Jobs"
          description="Trigger intelligence, forecasting, and monitoring pipeline jobs"
          icon={Terminal}
        />
        <JobsScreen />
      </PageSurface>
    </RequirePermission>
  );
}
