"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/foundation/Button";
import { ErrorState } from "@/components/foundation/ErrorState";
import { InvestigationTable } from "./InvestigationTable";
import { InvestigationFilters } from "./InvestigationFilters";
import { CreateInvestigationDialog } from "./CreateInvestigationDialog";
import { useInvestigationList } from "../hooks";
import { useAuthStore } from "@/stores/authStore";
import type { InvestigationFilters as Filters, Investigation } from "../types";

export function InvestigationListPage() {
  const router = useRouter();
  const { hasPermission } = useAuthStore();
  const canWrite = hasPermission("investigation.write");
  const [filters, setFilters] = useState<Filters>({});
  const [createOpen, setCreateOpen] = useState(false);

  const listQuery = useInvestigationList(filters);

  function handleRowClick(row: Investigation) {
    router.push(`/investigations/${row.id}`);
  }

  function handleCreated(id: string) {
    router.push(`/investigations/${id}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <InvestigationFilters filters={filters} onChange={setFilters} />
        {canWrite && (
          <Button size="sm" variant="primary" onClick={() => setCreateOpen(true)}>
            <Plus size={13} />
            Open Investigation
          </Button>
        )}
      </div>

      {listQuery.isError ? (
        <ErrorState
          title="Failed to load investigations"
          message={listQuery.error?.message}
          onRetry={() => void listQuery.refetch()}
        />
      ) : (
        <InvestigationTable
          data={listQuery.data?.items ?? []}
          isLoading={listQuery.isLoading}
          onRowClick={handleRowClick}
        />
      )}

      <CreateInvestigationDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}
