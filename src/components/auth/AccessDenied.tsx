import { ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessDeniedProps {
  permission?: string;
  className?: string;
}

export function AccessDenied({ permission, className }: AccessDeniedProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-center",
        className,
      )}
    >
      <div className="rounded-full bg-danger-50 p-4">
        <ShieldOff size={24} className="text-danger-500" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-navy-800">Access Denied</p>
        <p className="text-xs text-navy-500 max-w-xs">
          {permission
            ? `Your account does not have the "${permission}" permission required to view this section.`
            : "You do not have permission to view this section."}
        </p>
        <p className="text-xs text-navy-400">
          Contact your system administrator to request access.
        </p>
      </div>
    </div>
  );
}
