"use client";

import { useEffect } from "react";
import { X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveEventToastProps {
  title: string;
  message?: string;
  visible: boolean;
  onDismiss: () => void;
  variant?: "alert" | "notification";
  autoDismissMs?: number;
}

export function LiveEventToast({
  title,
  message,
  visible,
  onDismiss,
  variant = "notification",
  autoDismissMs = 5000,
}: LiveEventToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(timer);
  }, [visible, autoDismissMs, onDismiss]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-[100] w-80 rounded-xl border shadow-xl transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
        variant === "alert"
          ? "border-danger-200 bg-white"
          : "border-brand-200 bg-white",
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={cn(
            "mt-0.5 rounded-lg p-1.5 shrink-0",
            variant === "alert" ? "bg-danger-50" : "bg-brand-50",
          )}
        >
          <Bell size={13} className={variant === "alert" ? "text-danger-600" : "text-brand-600"} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-navy-900">{title}</p>
          {message && <p className="text-[11px] text-navy-500 mt-0.5">{message}</p>}
        </div>
        <button
          onClick={onDismiss}
          className="text-navy-400 hover:text-navy-700 transition-colors shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
