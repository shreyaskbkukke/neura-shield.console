import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import type { Citation } from "@/stores/assistantStore";

interface CitationPanelProps {
  citations: Citation[];
}

export function CitationPanel({ citations }: CitationPanelProps) {
  const [open, setOpen] = useState(false);

  if (!citations.length) return null;

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[11px] text-navy-500 hover:text-navy-700 transition-colors"
      >
        {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
        <BookOpen size={11} />
        {citations.length} source{citations.length !== 1 ? "s" : ""}
      </button>

      {open && (
        <div className="mt-2 space-y-1">
          {citations.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-medium text-navy-800 line-clamp-1">{c.title}</p>
                <span className="shrink-0 rounded bg-brand-50 border border-brand-100 px-1.5 py-0.5 text-[10px] text-brand-700 uppercase">
                  {c.type}
                </span>
              </div>
              <p className="text-[11px] text-navy-500 font-mono mt-0.5">{c.reference}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
