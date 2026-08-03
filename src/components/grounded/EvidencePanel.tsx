import { cn } from "@/lib/utils";
import { titleCase } from "@/lib/formatters";

interface EvidencePanelProps {
  evidence: Record<string, unknown>;
  title?: string;
  className?: string;
  collapsible?: boolean;
}

function NestedObject({ data }: { data: Record<string, unknown> | unknown[] }) {
  if (Array.isArray(data)) {
    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {data.map((item, i) => (
          <span key={i} className="inline-flex items-center rounded bg-navy-100 px-1.5 py-0.5 text-[10px] font-medium text-navy-700">
            {String(item)}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-1">
      {Object.entries(data).map(([key, val]) => (
        <div key={key} className="rounded-md border border-navy-200 bg-white p-2.5 shadow-sm">
          <p className="text-[10px] font-bold text-navy-700 uppercase tracking-wide mb-1.5">{titleCase(key)}</p>
          {typeof val === "object" && val !== null ? (
            <div className="flex flex-col gap-1">
              {Object.entries(val).map(([subK, subV]) => (
                <div key={subK} className="flex sm:items-start gap-2 text-[11px]">
                  <span className="text-navy-500 w-24 shrink-0 font-medium">{titleCase(subK)}</span>
                  <span className="text-navy-900 font-medium break-words flex-1">
                    {subK.toLowerCase() === "impact" ? (
                      <span className={cn(
                        "inline-block px-1.5 py-0.5 rounded text-[10px] font-bold",
                        subV === "HIGH" || subV === "CRITICAL" ? "bg-danger-50 text-danger-600" :
                        subV === "MEDIUM" ? "bg-warning-50 text-warning-600" :
                        "bg-success-50 text-success-600"
                      )}>
                        {String(subV)}
                      </span>
                    ) : (
                      String(subV)
                    )}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-navy-900 font-medium">{String(val)}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function formatValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString("en-IN");
  if (typeof value === "object") {
    return <NestedObject data={value as Record<string, unknown>} />;
  }
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
          <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 px-3 py-2">
            <dt className="text-xs text-navy-500 shrink-0 sm:w-28 font-medium">
              {titleCase(key)}
            </dt>
            <dd className="text-xs text-navy-800 font-mono break-words flex-1 min-w-0">
              {formatValue(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
