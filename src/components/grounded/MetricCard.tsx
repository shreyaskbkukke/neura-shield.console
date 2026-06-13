import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const trendConfig = {
  up: { icon: TrendingUp, color: "text-success-600" },
  down: { icon: TrendingDown, color: "text-danger-600" },
  neutral: { icon: Minus, color: "text-navy-400" },
} as const;

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-brand-600",
  trend,
  trendValue,
  className,
}: MetricCardProps) {
  const TrendIcon = trend ? trendConfig[trend].icon : null;
  const trendColor = trend ? trendConfig[trend].color : "";

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-navy-500 uppercase tracking-wide">
              {title}
            </p>
            <p className="mt-1.5 text-2xl font-bold text-navy-900 leading-none">
              {value}
            </p>
            {subtitle && (
              <p className="mt-1 text-xs text-navy-500">{subtitle}</p>
            )}
            {trend && TrendIcon && trendValue && (
              <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", trendColor)}>
                <TrendIcon size={12} />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="shrink-0 ml-3 rounded-lg bg-navy-50 p-2.5">
              <Icon size={18} className={iconColor} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
