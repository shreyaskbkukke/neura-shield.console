import { Bell, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelative } from "@/lib/formatters";
import type { NotificationItem as NotifItem } from "../types";

interface NotificationItemProps {
  notification: NotifItem;
  onMarkRead: (id: string) => void;
}

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const isUnread = !notification.read_at;

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 border-b border-navy-50 last:border-0 transition-colors",
        isUnread ? "bg-brand-50/40" : "bg-white",
      )}
    >
      <div className={cn(
        "rounded-full p-1.5 shrink-0 mt-0.5",
        isUnread ? "bg-brand-100" : "bg-navy-100",
      )}>
        <Bell size={12} className={isUnread ? "text-brand-600" : "text-navy-500"} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn("text-xs", isUnread ? "font-semibold text-navy-900" : "text-navy-700")}>
          {notification.title}
        </p>
        {notification.message && (
          <p className="text-[11px] text-navy-500 mt-0.5 line-clamp-2">{notification.message}</p>
        )}
        <p className="text-[10px] text-navy-400 mt-1">{formatRelative(notification.created_at)}</p>
      </div>

      {isUnread && (
        <button
          onClick={() => onMarkRead(notification.id)}
          title="Mark as read"
          className="text-navy-400 hover:text-success-600 transition-colors shrink-0 mt-0.5"
        >
          <CheckCircle2 size={14} />
        </button>
      )}
    </div>
  );
}
