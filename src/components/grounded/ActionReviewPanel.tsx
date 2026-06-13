import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/foundation/Button";
import { DisclaimerBox } from "./DisclaimerBox";
import { cn } from "@/lib/utils";

interface ActionReviewPanelProps {
  title: string;
  description?: string;
  disclaimer?: string;
  actions: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger" | "outline";
    isLoading?: boolean;
    disabled?: boolean;
  }[];
  className?: string;
}

export function ActionReviewPanel({
  title,
  description,
  disclaimer,
  actions,
  className,
}: ActionReviewPanelProps) {
  return (
    <div className={cn("rounded-xl border border-navy-200 bg-white p-5", className)}>
      <div className="flex items-start gap-3 mb-4">
        <div className="mt-0.5 rounded-lg bg-brand-50 p-2 shrink-0">
          <ShieldCheck size={16} className="text-brand-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-navy-900">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-navy-500">{description}</p>
          )}
        </div>
      </div>

      {disclaimer && (
        <DisclaimerBox text={disclaimer} compact className="mb-4" />
      )}

      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action, i) => (
          <Button
            key={i}
            variant={action.variant ?? "secondary"}
            size="sm"
            onClick={action.onClick}
            isLoading={action.isLoading}
            disabled={action.disabled}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
