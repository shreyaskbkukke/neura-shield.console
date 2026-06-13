import { Card, CardContent } from "@/components/foundation/Card";
import { DataTable, type Column } from "@/components/grounded/DataTable";
import { RiskBadge } from "@/components/grounded/RiskBadge";
import type { DistrictRiskItem, DistrictRiskResponse } from "../types";

const columns: Column<DistrictRiskItem>[] = [
  { key: "district_name", header: "District" },
  {
    key: "total_crimes",
    header: "Incidents",
    align: "right",
    render: (row) => row.total_crimes.toLocaleString(),
  },
  {
    key: "open_cases",
    header: "Open",
    align: "right",
    render: (row) => row.open_cases.toLocaleString(),
  },
  {
    key: "high_severity_cases",
    header: "High Sev.",
    align: "right",
    render: (row) => row.high_severity_cases.toLocaleString(),
  },
  {
    key: "risk_score",
    header: "Risk Score",
    align: "right",
    render: (row) => row.risk_score.toFixed(2),
  },
  {
    key: "risk_level",
    header: "Risk Level",
    align: "center",
    render: (row) => <RiskBadge riskLevel={row.risk_level} />,
  },
];

interface DistrictRiskTableProps {
  data: DistrictRiskResponse | undefined;
  isLoading: boolean;
}

export function DistrictRiskTable({ data, isLoading }: DistrictRiskTableProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2">
        <p className="text-sm font-semibold text-navy-900">District Risk</p>
        <p className="mt-0.5 text-xs text-navy-500">Risk levels by jurisdiction</p>
      </div>
      <CardContent className="pt-1 pb-4">
        <DataTable
          columns={columns}
          data={data?.items ?? []}
          keyExtractor={(row) => row.district_id}
          isLoading={isLoading}
          emptyTitle="No district data"
          emptyDescription="Risk scores will appear once incidents are recorded"
        />
      </CardContent>
    </Card>
  );
}
