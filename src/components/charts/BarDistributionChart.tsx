"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { colors } from "@/theme/colors";

const CHART_COLORS = [
  colors.chart.blue,
  colors.chart.cyan,
  colors.chart.green,
  colors.chart.amber,
  colors.chart.purple,
  colors.chart.red,
];

interface DataPoint {
  name: string;
  value: number;
  percentage?: number;
  fill?: string;
}

interface BarDistributionChartProps {
  readonly data: DataPoint[];
  readonly valueLabel?: string;
}

function formatTooltipValue(
  val: number | string | undefined,
  pct: number | undefined,
): number | string {
  if (typeof val !== "number") return val ?? "";
  if (pct != null) return `${val} (${pct.toFixed(1)}%)`;
  return val;
}

function toColoredData(data: DataPoint[]): DataPoint[] {
  return data.map((d, idx) => ({
    ...d,
    fill: CHART_COLORS[idx % CHART_COLORS.length],
  }));
}

export function BarDistributionChart({
  data,
  valueLabel = "Count",
}: BarDistributionChartProps) {
  const coloredData = toColoredData(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={coloredData} margin={{ top: 4, right: 16, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.navy[100]} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: colors.navy[500] }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: colors.navy[500] }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: `1px solid ${colors.navy[200]}`,
            background: colors.surface.page,
            color: colors.navy[900],
          }}
          labelStyle={{ color: colors.navy[700], fontWeight: 600 }}
          formatter={(val, _name, props) => {
            const pct = (props.payload as { percentage?: number } | undefined)?.percentage;
            return [formatTooltipValue(val as number | string, pct), valueLabel];
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48} fill={CHART_COLORS[0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
