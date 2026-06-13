import { Users } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { SociologyScreen } from "@/features/sociology/components/SociologyScreen";

export default function SociologyPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Sociology Intelligence"
        description="Socioeconomic indicators, district profiles, risk factors, and crime-indicator correlations"
        icon={Users}
      />
      <RequirePermission permission="sociology.read">
        <SociologyScreen />
      </RequirePermission>
    </PageSurface>
  );
}
