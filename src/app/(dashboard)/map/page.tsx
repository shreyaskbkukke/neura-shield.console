import { Map } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/foundation/Card";

export default function MapPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Map View"
        description="Geospatial crime distribution and hotspot risk overlay"
        icon={Map}
      />
      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-sm text-navy-400">
            Phase 6 Step 3 — Map + Geospatial Intelligence coming next
          </p>
        </CardContent>
      </Card>
    </PageSurface>
  );
}
