"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface StatusTransitionMenuProps {
  currentStatus: string;
  transitions: string[];
  onTransition: (status: string) => void;
  isLoading?: boolean;
  label?: string;
}

export function StatusTransitionMenu({
  transitions,
  onTransition,
  isLoading,
  label = "Change status",
}: StatusTransitionMenuProps) {
  const [open, setOpen] = useState(false);

  if (!transitions.length) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={isLoading}
        className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-navy-200 bg-white text-xs text-navy-700 hover:bg-navy-50 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Updating…" : label}
        <ChevronDown size={12} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-xl border border-navy-200 bg-white shadow-lg overflow-hidden">
            {transitions.map((s) => (
              <button
                key={s}
                onClick={() => { setOpen(false); onTransition(s); }}
                className="w-full text-left px-3 py-2 text-xs text-navy-700 hover:bg-navy-50 transition-colors"
              >
                {s.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
