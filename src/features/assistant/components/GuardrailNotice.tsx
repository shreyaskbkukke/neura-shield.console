import { AlertTriangle } from "lucide-react";

interface GuardrailNoticeProps {
  guardrails: string[];
}

export function GuardrailNotice({ guardrails }: GuardrailNoticeProps) {
  if (!guardrails.length) return null;

  return (
    <div className="rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 flex items-start gap-2 mt-2">
      <AlertTriangle size={12} className="text-danger-600 mt-0.5 shrink-0" />
      <div>
        <p className="text-[11px] font-semibold text-danger-700">Guardrail triggered</p>
        {guardrails.map((g, i) => (
          <p key={i} className="text-[11px] text-danger-600">{g}</p>
        ))}
      </div>
    </div>
  );
}
