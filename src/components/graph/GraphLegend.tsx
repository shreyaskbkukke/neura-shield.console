import { colors } from "@/theme/colors";

export const ENTITY_TYPE_COLORS: Record<string, string> = {
  OFFENDER: colors.danger[500],
  CASE: colors.brand[500],
  LOCATION: colors.intelligence[500],
  CATEGORY: colors.warning[500],
  FINANCIAL_ACCOUNT: colors.success[500],
  POLICE_STATION: colors.navy[500],
};

const EDGE_TYPES = [
  { label: "Co-offender", color: colors.danger[400] },
  { label: "Linked case", color: colors.brand[400] },
  { label: "Same location", color: colors.intelligence[400] },
  { label: "Financial link", color: colors.success[400] },
];

interface GraphLegendProps {
  className?: string;
}

export function GraphLegend({ className }: GraphLegendProps) {
  return (
    <div className={className}>
      <div className="mb-3">
        <p className="text-[11px] font-semibold text-navy-500 uppercase tracking-wide mb-1.5">
          Entity Types
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(ENTITY_TYPE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[11px] text-navy-600">{type.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-navy-500 uppercase tracking-wide mb-1.5">
          Edge Types
        </p>
        <div className="flex flex-wrap gap-2">
          {EDGE_TYPES.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-4 h-0.5 shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[11px] text-navy-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
