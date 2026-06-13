"use client";

import { useState } from "react";
import { useMOProfiles } from "../hooks";
import { DataTable } from "@/components/grounded/DataTable";
import { Badge } from "@/components/foundation/Badge";
import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import type { MOProfile } from "../types";
import type { Column } from "@/components/grounded/DataTable";

const CATEGORY_COLORS: Record<string, string> = {
  VIOLENT: "danger",
  PROPERTY: "warning",
  CYBER: "purple",
  FINANCIAL: "success",
  ORGANIZED: "orange",
};

const columns: Column<MOProfile>[] = [
  {
    key: "mo_code",
    header: "Code",
    render: (row) => (
      <span className="font-mono text-xs font-bold text-navy-800 bg-navy-50 border border-navy-100 rounded px-1.5 py-0.5">
        {row.mo_code}
      </span>
    ),
  },
  {
    key: "mo_name",
    header: "MO Name",
    render: (row) => <span className="font-medium text-navy-900">{row.mo_name}</span>,
  },
  {
    key: "mo_category",
    header: "Category",
    render: (row) => (
      <Badge variant={(CATEGORY_COLORS[row.mo_category] as "danger" | "warning" | "purple" | "success" | "orange") ?? "default"}>
        {row.mo_category}
      </Badge>
    ),
  },
  {
    key: "severity_weight",
    header: "Severity",
    align: "center",
    render: (row) => (
      <span className={`text-xs font-semibold ${row.severity_weight >= 0.8 ? "text-danger-600" : row.severity_weight >= 0.5 ? "text-warning-600" : "text-success-600"}`}>
        {(row.severity_weight * 100).toFixed(0)}%
      </span>
    ),
  },
  {
    key: "keywords",
    header: "Keywords",
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.keywords.slice(0, 3).map((kw) => (
          <span key={kw} className="text-[10px] bg-navy-100 text-navy-600 rounded px-1.5 py-0.5">{kw}</span>
        ))}
        {row.keywords.length > 3 && (
          <span className="text-[10px] text-navy-400">+{row.keywords.length - 3}</span>
        )}
      </div>
    ),
  },
];

function MODetailDrawer({ profile, onClose }: { profile: MOProfile; onClose: () => void }) {
  return (
    <DetailDrawer isOpen title={profile.mo_name} description={profile.mo_code} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">Category</p>
            <Badge variant={(CATEGORY_COLORS[profile.mo_category] as "danger" | "warning" | "purple" | "success" | "orange") ?? "default"} className="mt-1">
              {profile.mo_category}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-navy-400 uppercase tracking-wide">Severity Weight</p>
            <p className="mt-1 font-semibold text-navy-800">{(profile.severity_weight * 100).toFixed(0)}%</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-navy-400 uppercase tracking-wide mb-1">Description</p>
          <p className="text-sm text-navy-700 leading-relaxed">{profile.description}</p>
        </div>

        <div>
          <p className="text-xs text-navy-400 uppercase tracking-wide mb-2">Keywords</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.keywords.map((kw) => (
              <span key={kw} className="text-xs bg-navy-100 text-navy-700 rounded-full px-2.5 py-0.5">{kw}</span>
            ))}
          </div>
        </div>
      </div>
    </DetailDrawer>
  );
}

export function MOPatternsScreen() {
  const [selected, setSelected] = useState<MOProfile | null>(null);
  const { data, isLoading } = useMOProfiles();

  return (
    <div className="flex flex-col gap-4">
      <DisclaimerBox text="MO profiles are extracted from synthetic crime data using keyword matching and pattern rules. Results are for investigative decision support only — not legal evidence." />
      {data && (
        <p className="text-xs text-navy-500">{data.total} modus operandi profiles</p>
      )}
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No MO profiles found"
        emptyDescription="Run the MO Intelligence job from Admin Jobs to populate profiles."
        onRowClick={setSelected}
      />
      {selected && <MODetailDrawer profile={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
