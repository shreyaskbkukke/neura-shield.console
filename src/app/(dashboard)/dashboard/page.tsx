import { LayoutDashboard } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";

export default function DashboardPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Dashboard"
        description="Command center — district crime overview, live alerts, and key metrics"
        icon={LayoutDashboard}
      />
      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-sm text-navy-400">
            Phase 6 Step 2 — Dashboard + Analytics UI coming next
          </p>
        </CardContent>
      </Card>
    </PageSurface>
  );
}
