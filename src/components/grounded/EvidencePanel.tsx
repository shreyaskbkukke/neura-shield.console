import { cn } from "@/lib/utils";
import { titleCase } from "@/lib/formatters";

interface EvidencePanelProps {
  evidence: Record<string, unknown>;
  title?: string;
  className?: string;
  collapsible?: boolean;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString("en-IN");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function EvidencePanel({ evidence, title = "Evidence", className }: EvidencePanelProps) {
  const entries = Object.entries(evidence);
  if (entries.length === 0) return null;

  return (
    <div className={cn("rounded-lg border border-navy-200 bg-navy-50", className)}>
      <div className="px-3 py-2 border-b border-navy-200">
        <span className="text-xs font-semibold text-navy-600 uppercase tracking-wide">
          {title}
        </span>
      </div>
      <dl className="divide-y divide-navy-100">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-baseline gap-2 px-3 py-1.5">
            <dt className="text-xs text-navy-500 shrink-0 w-36">
              {titleCase(key)}
            </dt>
            <dd className="text-xs text-navy-800 font-mono truncate">
              {formatValue(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
