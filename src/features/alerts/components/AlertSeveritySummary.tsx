import { SummaryStrip } from "@/components/grounded/SummaryStrip";
import type { AlertListResponse } from "../types";

interface AlertSeveritySummaryProps {
  data: AlertListResponse | undefined;
  isLoading: boolean;
}

export function AlertSeveritySummary({ data, isLoading }: AlertSeveritySummaryProps) {
  if (isLoading || !data) {
    return (
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-1 min-w-[100px] h-16 rounded-xl bg-navy-100 animate-pulse" />
        ))}
      </div>
    );
  }

  const items = data.items;
  const critical = items.filter((a) => a.severity === "CRITICAL").length;
  const high = items.filter((a) => a.severity === "HIGH").length;
  const open = items.filter((a) => a.status === "OPEN").length;
  const underReview = items.filter((a) => a.status === "UNDER_REVIEW").length;
  const resolved = items.filter((a) => a.status === "RESOLVED").length;

  return (
    <SummaryStrip
      items={[
        { label: "Total", value: data.total },
        { label: "Critical", value: critical, variant: "danger" },
        { label: "High", value: high, variant: "warning" },
        { label: "Open", value: open, variant: "brand" },
        { label: "Under Review", value: underReview, variant: "warning" },
        { label: "Resolved", value: resolved, variant: "success" },
      ]}
    />
  );
}
