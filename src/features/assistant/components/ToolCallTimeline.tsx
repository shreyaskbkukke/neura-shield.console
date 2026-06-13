import { useState } from "react";
import { ChevronDown, ChevronRight, Wrench } from "lucide-react";
import type { ToolTrace } from "@/stores/assistantStore";

interface ToolCallTimelineProps {
  traces: ToolTrace[];
}

export function ToolCallTimeline({ traces }: ToolCallTimelineProps) {
  const [open, setOpen] = useState(false);

  if (!traces.length) return null;

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[11px] text-navy-400 hover:text-navy-600 transition-colors"
      >
        {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
        <Wrench size={11} />
        {traces.length} tool call{traces.length !== 1 ? "s" : ""}
      </button>

      {open && (
        <div className="mt-2 space-y-1">
          {traces.map((t, i) => (
            <div
              key={i}
              className="rounded-lg border border-navy-100 bg-white px-3 py-2"
            >
              <p className="text-[11px] font-mono font-medium text-brand-700">{t.tool_name}</p>
              <p className="text-[11px] text-navy-500 mt-0.5">{t.result_summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
