import { MessageSquare } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";

export default function AssistantPage() {
  return (
    <PageSurface>
      <PageHeader
        title="AI Assistant"
        description="Natural language intelligence queries and investigation decision support"
        icon={MessageSquare}
      />
      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-sm text-navy-400">
            Phase 6 Step 4 — Assistant + Investigation Workspace coming next
          </p>
        </CardContent>
      </Card>
    </PageSurface>
  );
}
