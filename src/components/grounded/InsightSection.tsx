import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightSectionProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
}

export function InsightSection({
  title,
  icon: Icon,
  iconColor = "text-intelligence-600",
  children,
  className,
}: InsightSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className={iconColor} />}
        <h2 className="text-xs font-semibold text-navy-600 uppercase tracking-wider">
          {title}
        </h2>
        <div className="flex-1 border-t border-navy-100" />
      </div>
      {children}
    </section>
  );
}
