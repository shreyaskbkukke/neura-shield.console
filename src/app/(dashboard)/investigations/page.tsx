import { Folder } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { InvestigationListPage } from "@/features/investigations/components/InvestigationListPage";

export default function InvestigationsPage() {
  return (
    <RequirePermission permission="investigation.read">
      <PageSurface>
        <PageHeader
          title="Investigations"
          description="Open and closed investigation workspaces"
          icon={Folder}
        />
        <InvestigationListPage />
      </PageSurface>
    </RequirePermission>
  );
}
