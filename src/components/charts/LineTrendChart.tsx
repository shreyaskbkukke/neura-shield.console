"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { colors } from "@/theme/colors";

interface DataPoint {
  period: string;
  crime_count: number;
}

interface LineTrendChartProps {
  data: DataPoint[];
}

export function LineTrendChart({ data }: LineTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.navy[100]} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 11, fill: colors.navy[500] }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
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
          itemStyle={{ color: colors.chart.blue }}
          labelStyle={{ color: colors.navy[700], fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="crime_count"
          name="Incidents"
          stroke={colors.chart.blue}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: colors.chart.blue }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
