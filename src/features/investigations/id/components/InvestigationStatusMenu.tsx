"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useUpdateStatus } from "../../hooks";

const VALID_TRANSITIONS: Record<string, string[]> = {
  OPEN: ["IN_PROGRESS"],
  IN_PROGRESS: ["PENDING_REVIEW", "CLOSED"],
  PENDING_REVIEW: ["IN_PROGRESS", "CLOSED"],
  CLOSED: ["ARCHIVED"],
  ARCHIVED: [],
};

interface InvestigationStatusMenuProps {
  investigationId: string;
  currentStatus: string;
}

export function InvestigationStatusMenu({
  investigationId,
  currentStatus,
}: InvestigationStatusMenuProps) {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateStatus(investigationId);

  const nextStatuses = VALID_TRANSITIONS[currentStatus] ?? [];

  if (!nextStatuses.length) return null;

  async function handleTransition(status: string) {
    setOpen(false);
    await updateMutation.mutateAsync({ status });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={updateMutation.isPending}
        className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-navy-200 bg-white text-xs text-navy-700 hover:bg-navy-50 transition-colors disabled:opacity-50"
      >
        {updateMutation.isPending ? "Updating…" : "Change status"}
        <ChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-xl border border-navy-200 bg-white shadow-lg overflow-hidden">
          {nextStatuses.map((s) => (
            <button
              key={s}
              onClick={() => void handleTransition(s)}
              className="w-full text-left px-3 py-2 text-xs text-navy-700 hover:bg-navy-50 transition-colors"
            >
              {s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
