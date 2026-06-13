import { DollarSign } from "lucide-react";
import { PageSurface } from "@/components/foundation/PageSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { FinancialScreen } from "@/features/financial/components/FinancialScreen";

export default function FinancialPage() {
  return (
    <PageSurface>
      <PageHeader
        title="Financial Intelligence"
        description="Suspicious transaction patterns, account networks, and money trail candidates"
        icon={DollarSign}
      />
      <RequirePermission permission="financial.read">
        <FinancialScreen />
      </RequirePermission>
    </PageSurface>
  );
}
