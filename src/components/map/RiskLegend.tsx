import { riskClassMap } from "@/theme/badges";

const LEVELS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

interface RiskLegendProps {
  className?: string;
}

export function RiskLegend({ className }: RiskLegendProps) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold text-navy-500 uppercase tracking-wide mb-1.5">
        Risk Legend
      </p>
      <div className="flex flex-wrap gap-1.5">
        {LEVELS.map((level) => (
          <span
            key={level}
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${riskClassMap[level]}`}
          >
            {level}
          </span>
        ))}
      </div>
    </div>
  );
}
