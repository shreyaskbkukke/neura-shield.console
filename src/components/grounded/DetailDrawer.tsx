"use client";

import { X } from "lucide-react";
import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/utils";

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg";
}

const widthMap = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
} as const;

export function DetailDrawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = "md",
}: DetailDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-navy-950/40"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 flex flex-col bg-white border-l border-navy-200 shadow-xl w-full",
          widthMap[width],
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-navy-100">
          <div>
            <h2 className="text-sm font-semibold text-navy-900">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs text-navy-500">{description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X size={15} />
          </Button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>
  );
}
