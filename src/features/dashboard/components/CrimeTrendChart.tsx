import { ChartCard } from "@/components/charts/ChartCard";
import { LineTrendChart } from "@/components/charts/LineTrendChart";
import type { CrimeTrendsResponse } from "../types";

interface CrimeTrendChartProps {
  data: CrimeTrendsResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function CrimeTrendChart({ data, isLoading, error }: CrimeTrendChartProps) {
  return (
    <ChartCard
      title="Crime Trend"
      description="Incident count over time"
      isLoading={isLoading}
      error={error}
      height={240}
    >
      {data && data.items.length > 0 ? (
        <LineTrendChart data={data.items} />
      ) : (
        <div className="flex items-center justify-center h-full text-xs text-navy-400">
          No trend data available
        </div>
      )}
    </ChartCard>
  );
}
