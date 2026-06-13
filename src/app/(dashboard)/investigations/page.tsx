import { Folder } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";
import { RequirePermission } from "@/components/auth/RequirePermission";

export default function InvestigationsPage() {
  return (
    <RequirePermission permission="investigation.read">
      <PageSurface>
        <PageHeader
          title="Investigations"
          description="Open and closed investigation workspaces"
          icon={Folder}
        />
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-sm text-navy-400">
              Phase 6 Step 4 — Investigation Workspace coming next
            </p>
          </CardContent>
        </Card>
      </PageSurface>
    </RequirePermission>
  );
}
