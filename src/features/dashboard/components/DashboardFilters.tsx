"use client";

import { FilterBar, FilterSelect } from "@/components/grounded/FilterBar";
import type { DashboardFilters } from "../types";

const INTERVAL_OPTIONS = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const DISTRICT_OPTIONS = [
  { label: "All Districts", value: "" },
  { label: "Bengaluru", value: "bengaluru" },
  { label: "Mysuru", value: "mysuru" },
  { label: "Mangaluru", value: "mangaluru" },
];

interface DashboardFiltersProps {
  filters: DashboardFilters;
  onChange: (next: DashboardFilters) => void;
}

export function DashboardFiltersBar({ filters, onChange }: DashboardFiltersProps) {
  return (
    <FilterBar>
      <FilterSelect
        label="Interval"
        value={filters.interval}
        options={INTERVAL_OPTIONS}
        onChange={(v) => onChange({ ...filters, interval: v as DashboardFilters["interval"] })}
      />
      <FilterSelect
        label="District"
        value={filters.districtId}
        options={DISTRICT_OPTIONS}
        onChange={(v) => onChange({ ...filters, districtId: v })}
      />
    </FilterBar>
  );
}
