"use client";

import { useEffect, useRef, useState } from "react";
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
  const activeItemRef = useRef<HTMLButtonElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    if (isOpen) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      if (filtered.length > 0 && filtered[selectedIndex]) {
        e.preventDefault();
        router.push(filtered[selectedIndex].href);
        close();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  // Auto-scroll selected item into view
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-navy-950/40 backdrop-blur-[2px] transition-all duration-300"
        onClick={close}
      />

      {/* Palette */}
      <div className="fixed top-[15vh] left-1/2 z-50 -translate-x-1/2 w-full max-w-lg mx-4 animate-drawer-in">
        <div className="rounded-[28px] border border-navy-150 bg-white shadow-2xl overflow-hidden p-2">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-navy-100/50">
            <Search size={18} className="text-brand-600 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search pages, modules, intelligence…"
              className="flex-1 text-sm text-navy-900 placeholder:text-navy-400 bg-transparent outline-none py-1 font-medium"
            />
            <button
              onClick={close}
              className="text-navy-400 hover:text-navy-700 transition-colors p-1.5 hover:bg-navy-50 rounded-full"
            >
              <X size={16} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-1.5 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-semibold text-navy-800">No results found</p>
                <p className="text-xs text-navy-400 mt-1">
                  We couldn&apos;t find anything matching &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : (
              filtered.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.href}
                    ref={isSelected ? activeItemRef : undefined}
                    onClick={() => {
                      router.push(item.href);
                      close();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "group w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left border border-transparent",
                      "hover:bg-brand-50/60 active:scale-[0.99] transition-all duration-200",
                      isSelected && "bg-brand-50/80 border-brand-200/50 shadow-sm"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-xl bg-navy-50 flex items-center justify-center transition-colors shrink-0",
                      isSelected ? "bg-brand-100/50 text-brand-600" : "group-hover:bg-brand-100/50"
                    )}>
                      <Icon size={16} className={cn(
                        "text-navy-500 transition-colors",
                        isSelected ? "text-brand-600" : "group-hover:text-brand-600"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <span className={cn(
                          "text-sm text-navy-800 font-semibold truncate",
                          isSelected ? "text-brand-900" : "group-hover:text-navy-900"
                        )}>
                          {item.title}
                        </span>
                        <span className={cn(
                          "text-[10px] font-bold text-navy-400 uppercase tracking-wider bg-navy-100/50 px-2 py-0.5 rounded-full transition-colors",
                          isSelected && "bg-brand-100 text-brand-700"
                        )}>
                          {item.groupLabel}
                        </span>
                      </div>
                      <p className={cn(
                        "text-xs text-navy-500 truncate mt-0.5 font-normal",
                        isSelected ? "text-brand-700/85" : ""
                      )}>
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className={cn(
                        "text-navy-300 transition-all shrink-0",
                        isSelected ? "text-brand-500 translate-x-0.5" : "group-hover:text-brand-500 group-hover:translate-x-0.5"
                      )}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-navy-100/50 px-4 py-2.5 flex items-center gap-4 text-[10px] font-semibold text-navy-400">
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-navy-50 border border-navy-200 rounded px-1.5 py-0.5 text-[9px] shadow-sm">↑↓</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-navy-50 border border-navy-200 rounded px-1.5 py-0.5 text-[9px] shadow-sm">↵</kbd>
              <span>open</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-navy-50 border border-navy-200 rounded px-1.5 py-0.5 text-[9px] shadow-sm">Esc</kbd>
              <span>close</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
