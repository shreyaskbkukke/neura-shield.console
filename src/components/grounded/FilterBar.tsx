"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 flex-wrap p-2 rounded-2xl bg-navy-100/40 border border-navy-200/50 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
}

export function FilterSelect({ label, value, options, onChange, className }: FilterSelectProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 bg-white border border-navy-200 rounded-full px-3.5 py-1.5",
        "hover:border-brand-300 hover:bg-brand-50/10 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500",
        "transition-all duration-200 shadow-sm cursor-pointer relative",
        className
      )}
    >
      <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wider select-none">
        {label}
      </span>
      
      <div className="flex items-center gap-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent text-xs font-semibold text-navy-800 pr-4 focus:outline-none cursor-pointer leading-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-navy-800">
              {opt.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3.5 pointer-events-none text-navy-500 flex items-center">
          <ChevronDown size={11} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
