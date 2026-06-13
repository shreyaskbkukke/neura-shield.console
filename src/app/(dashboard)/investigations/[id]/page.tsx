import { RequirePermission } from "@/components/auth/RequirePermission";
import { InvestigationDetailPage } from "@/features/investigations/id/components/InvestigationDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InvestigationDetailRoute({ params }: Props) {
  const { id } = await params;
  return (
    <RequirePermission permission="investigation.read">
      <InvestigationDetailPage investigationId={id} />
    </RequirePermission>
  );
}
