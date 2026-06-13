import { CheckCircle2 } from "lucide-react";

interface ReviewPointListProps {
  points: string[];
  title?: string;
}

export function ReviewPointList({ points, title = "Review Points" }: ReviewPointListProps) {
  if (!points.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-navy-700">{title}</p>
      <ul className="space-y-1.5">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 size={13} className="text-brand-500 mt-0.5 shrink-0" />
            <span className="text-xs text-navy-700">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
