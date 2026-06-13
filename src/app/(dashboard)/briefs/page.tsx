import { FileText } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { BriefsScreen } from "@/features/briefs/components/BriefsScreen";

export default function BriefsPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Intelligence Briefs"
        description="Cross-intelligence summaries for cases, offenders, and districts"
        icon={FileText}
      />
      <RequirePermission permission="intelligence.read">
        <BriefsScreen />
      </RequirePermission>
    </PageSurface>
  );
}
