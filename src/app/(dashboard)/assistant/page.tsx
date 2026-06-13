import { MessageSquare } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { AssistantShell } from "@/features/assistant/components/AssistantShell";

export default function AssistantPage() {
  return (
    <RequirePermission permission="assistant.use">
      <PageSurface>
        <PageHeader
          title="AI Assistant"
          description="Natural language intelligence queries and investigation decision support"
          icon={MessageSquare}
        />
        <AssistantShell />
      </PageSurface>
    </RequirePermission>
  );
}
