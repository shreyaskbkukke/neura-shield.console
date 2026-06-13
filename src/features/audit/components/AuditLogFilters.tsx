"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/foundation/Input";
import { Button } from "@/components/foundation/Button";
import type { AuditLogFilters } from "../types";

interface Props {
  filters: AuditLogFilters;
  onChange: (f: AuditLogFilters) => void;
}

export function AuditLogFilterBar({ filters, onChange }: Props) {
  const [action, setAction] = useState(filters.action ?? "");
  const [resourceType, setResourceType] = useState(filters.resource_type ?? "");

  function apply() {
    onChange({
      ...filters,
      action: action || undefined,
      resource_type: resourceType || undefined,
    });
  }

  function clear() {
    setAction("");
    setResourceType("");
    onChange({});
  }

  const hasFilters = action || resourceType;

  return (
    <div className="flex items-end gap-3 flex-wrap">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-navy-500">Action</label>
        <Input
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="e.g. CREATE_INVESTIGATION"
          className="w-56"
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-navy-500">Resource type</label>
        <Input
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          placeholder="e.g. investigation"
          className="w-48"
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>
      <Button variant="secondary" size="sm" onClick={apply}>
        <Search size={13} />
        Filter
      </Button>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clear}>
          <X size={13} />
          Clear
        </Button>
      )}
    </div>
  );
}
