import { ChartCard } from "@/components/charts/ChartCard";
import { BarDistributionChart } from "@/components/charts/BarDistributionChart";
import type { CategoryStatsResponse } from "../types";

interface CategoryDistributionChartProps {
  data: CategoryStatsResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function CategoryDistributionChart({
  data,
  isLoading,
  error,
}: CategoryDistributionChartProps) {
  const chartData = data?.items.map((item) => ({
    name: item.category_name,
    value: item.count,
    percentage: item.percentage,
  }));

  return (
    <ChartCard
      title="By Category"
      description="Crime type breakdown"
      isLoading={isLoading}
      error={error}
      height={240}
    >
      {chartData && chartData.length > 0 ? (
        <BarDistributionChart data={chartData} valueLabel="Incidents" />
      ) : (
        <div className="flex items-center justify-center h-full text-xs text-navy-400">
          No category data available
        </div>
      )}
    </ChartCard>
  );
}
