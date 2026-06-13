import { CheckSquare } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { PreventionScreen } from "@/features/prevention/components/PreventionScreen";

export default function PreventionPage() {
  return (
    <RequirePermission permission="forecast.read">
      <PageSurface>
        <PageHeader
          title="Prevention Recommendations"
          description="Reviewable prevention recommendations generated from early warning signals"
          icon={CheckSquare}
        />
        <PreventionScreen />
      </PageSurface>
    </RequirePermission>
  );
}
