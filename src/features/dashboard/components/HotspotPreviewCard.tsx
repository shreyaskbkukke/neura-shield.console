import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { Skeleton } from "@/components/foundation/Skeleton";
import { cn } from "@/lib/utils";
import type { HotspotResponse } from "../types";

function riskColor(score: number): string {
  if (score >= 0.75) return "text-danger-600";
  if (score >= 0.5) return "text-orange-600";
  if (score >= 0.25) return "text-warning-600";
  return "text-success-600";
}

interface HotspotPreviewCardProps {
  data: HotspotResponse | undefined;
  isLoading: boolean;
}

export function HotspotPreviewCard({ data, isLoading }: HotspotPreviewCardProps) {
  return (
    <Card>
      <div className="px-5 pt-4 pb-2">
        <p className="text-sm font-semibold text-navy-900">Active Hotspots</p>
        <p className="mt-0.5 text-xs text-navy-500">Top crime concentration areas</p>
      </div>
      <CardContent className="pt-1 pb-4">
        {isLoading ? (
          <div className="space-y-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-xs text-navy-400">
            No hotspot data
          </div>
        ) : (
          <div className="space-y-1.5">
            {data.items.map((hs) => (
              <div
                key={hs.hotspot_id}
                className="flex items-center gap-2.5 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2"
              >
                <MapPin size={13} className={cn("shrink-0", riskColor(hs.risk_score))} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-navy-800 truncate">
                    {hs.district_name}
                  </p>
                  <p className="text-[11px] text-navy-500">{hs.top_category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn("text-xs font-bold", riskColor(hs.risk_score))}>
                    {(hs.risk_score * 100).toFixed(0)}
                  </p>
                  <p className="text-[11px] text-navy-400">{hs.crime_count} inc.</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
