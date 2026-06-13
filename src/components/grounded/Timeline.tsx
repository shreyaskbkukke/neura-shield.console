import { formatDateTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  label: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  accent?: "default" | "success" | "warning" | "danger" | "brand";
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const accentMap = {
  default: "bg-navy-200 border-navy-300",
  success: "bg-success-400 border-success-500",
  warning: "bg-warning-400 border-warning-500",
  danger: "bg-danger-400 border-danger-500",
  brand: "bg-brand-400 border-brand-500",
} as const;

export function Timeline({ events, className }: TimelineProps) {
  return (
    <ol className={cn("relative space-y-4", className)}>
      {events.map((event, i) => (
        <li key={event.id} className="relative flex gap-3 pl-5">
          {/* Connector line */}
          {i < events.length - 1 && (
            <span className="absolute left-[9px] top-5 bottom-0 w-px bg-navy-100" />
          )}
          {/* Dot */}
          <span
            className={cn(
              "absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center shrink-0",
              accentMap[event.accent ?? "default"],
            )}
          >
            {event.icon}
          </span>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-800">{event.label}</p>
            {event.description && (
              <p className="mt-0.5 text-xs text-navy-500">{event.description}</p>
            )}
            <time className="mt-0.5 text-[10px] text-navy-400 block">
              {formatDateTime(event.timestamp)}
            </time>
          </div>
        </li>
      ))}
    </ol>
  );
}
