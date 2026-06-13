import { Brain } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { IntelligenceScreen } from "@/features/intelligence/components/IntelligenceScreen";

export default function IntelligencePage() {
  return (
    <PageSurface>
      <PageHeader
        title="Intelligence Hub"
        description="Sociology insights, MO patterns, financial signals, and cross-intelligence briefs"
        icon={Brain}
      />
      <RequirePermission permission="intelligence.read">
        <IntelligenceScreen />
      </RequirePermission>
    </PageSurface>
  );
}
