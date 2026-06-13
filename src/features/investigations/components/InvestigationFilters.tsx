"use client";

import { INVESTIGATION_STATUSES } from "../types";
import type { InvestigationFilters as Filters } from "../types";

interface InvestigationFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function InvestigationFilters({ filters, onChange }: InvestigationFiltersProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <select
        value={filters.status ?? ""}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value || undefined })
        }
        className="h-8 rounded-lg border border-navy-200 bg-white px-2 pr-6 text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <option value="">All statuses</option>
        {INVESTIGATION_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
