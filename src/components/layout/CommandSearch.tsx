"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { useCommandStore } from "@/stores/commandStore";
import { useAuthStore } from "@/stores/authStore";
import { navGroups } from "@/lib/navigation/navConfig";
import { cn } from "@/lib/utils";

export function CommandSearch() {
  const router = useRouter();
  const { isOpen, query, open, close, setQuery } = useCommandStore();
  const { user } = useAuthStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K shortcut
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) { close(); } else { open(); }
      }
      if (e.key === "Escape" && isOpen) close();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, open, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  if (!isOpen) return null;

  // Collect all accessible items
  const allItems = navGroups.flatMap((group) =>
    group.items
      .filter(
        (item) =>
          !item.permission || user?.permissions.includes(item.permission),
      )
      .map((item) => ({ ...item, groupLabel: group.label })),
  );

  const filtered = query
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.groupLabel.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Palette */}
      <div className="fixed top-[20vh] left-1/2 z-50 -translate-x-1/2 w-full max-w-lg mx-4">
        <div className="rounded-xl border border-navy-200 bg-white shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-navy-100">
            <Search size={15} className="text-navy-400 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, modules, intelligence…"
              className="flex-1 text-sm text-navy-900 placeholder:text-navy-400 bg-transparent outline-none"
            />
            <button
              onClick={close}
              className="text-navy-400 hover:text-navy-600 transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-sm text-navy-400">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      close();
                    }}
                    className={cn(
                      "group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left",
                      "hover:bg-brand-50 transition-colors",
                    )}
                  >
                    <Icon size={14} className="text-navy-400 group-hover:text-brand-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-navy-800 group-hover:text-navy-900 font-medium">
                        {item.title}
                      </span>
                      <span className="ml-2 text-xs text-navy-400">{item.groupLabel}</span>
                    </div>
                    <ArrowRight
                      size={12}
                      className="text-navy-300 group-hover:text-brand-400 shrink-0"
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-navy-100 px-4 py-2 flex items-center gap-3 text-[10px] text-navy-400">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> open</span>
            <span><kbd className="font-mono">Esc</kbd> close</span>
          </div>
        </div>
      </div>
    </>
  );
}
