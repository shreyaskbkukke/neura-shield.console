import { StickyNote } from "lucide-react";
import { InsightSection } from "@/components/grounded/InsightSection";
import { Skeleton } from "@/components/foundation/Skeleton";
import { EmptyState } from "@/components/foundation/EmptyState";
import { AddNoteComposer } from "./AddNoteComposer";
import { useInvestigationNotes } from "../../hooks";
import { formatDateTime } from "@/lib/formatters";

interface InvestigationNotesPanelProps {
  investigationId: string;
  canWrite: boolean;
}

const noteTypeColors: Record<string, string> = {
  OBSERVATION: "bg-brand-50 text-brand-700 border-brand-100",
  EVIDENCE: "bg-success-50 text-success-700 border-success-100",
  ACTION: "bg-warning-50 text-warning-700 border-warning-100",
  DECISION: "bg-intelligence-50 text-intelligence-700 border-intelligence-100",
};

export function InvestigationNotesPanel({
  investigationId,
  canWrite,
}: InvestigationNotesPanelProps) {
  const notesQuery = useInvestigationNotes(investigationId);

  return (
    <InsightSection title="Notes" icon={StickyNote}>
      <div className="space-y-3">
        {notesQuery.isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))
        ) : !notesQuery.data?.length ? (
          <EmptyState icon={StickyNote} title="No notes yet" />
        ) : (
          notesQuery.data.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-navy-100 bg-white px-3 py-2.5 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${
                    noteTypeColors[note.note_type] ?? "bg-navy-50 text-navy-600 border-navy-100"
                  }`}
                >
                  {note.note_type}
                </span>
                <span className="text-[10px] text-navy-400">
                  {formatDateTime(note.created_at)}
                </span>
              </div>
              <p className="text-xs text-navy-700 leading-relaxed">{note.content}</p>
            </div>
          ))
        )}
        {canWrite && <AddNoteComposer investigationId={investigationId} />}
      </div>
    </InsightSection>
  );
}
