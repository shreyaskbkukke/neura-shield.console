import { Lightbulb } from "lucide-react";

interface SuggestedActionListProps {
  actions: string[];
  title?: string;
}

export function SuggestedActionList({
  actions,
  title = "Suggested Actions",
}: SuggestedActionListProps) {
  if (!actions.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-navy-700">{title}</p>
      <ul className="space-y-1.5">
        {actions.map((action, i) => (
          <li key={i} className="flex items-start gap-2">
            <Lightbulb size={13} className="text-warning-500 mt-0.5 shrink-0" />
            <span className="text-xs text-navy-700">{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
