import { Network } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";

export default function GraphPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Graph View"
        description="Relationship graph between offenders, cases, and locations"
        icon={Network}
      />
      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-sm text-navy-400">
            Phase 6 Step 3 — Graph + Relationship Intelligence coming next
          </p>
        </CardContent>
      </Card>
    </PageSurface>
  );
}
