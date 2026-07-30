import { ShieldAlert } from "lucide-react";

export function AssistantDisclaimer() {
  return (
    <div className="rounded-xl border border-warning-200 bg-warning-50 px-4 py-3 flex items-start gap-3">
      <ShieldAlert size={14} className="text-warning-600 mt-0.5 shrink-0" />
      <p className="text-xs text-warning-700 leading-relaxed">
        Crime Lens AI generates responses based on recorded data. All findings are
        decision-support only — they must be verified by a qualified investigator before
        any official action is taken. AI output does not constitute legal evidence.
      </p>
    </div>
  );
}
