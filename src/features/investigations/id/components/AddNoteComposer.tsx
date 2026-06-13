"use client";

import { useState } from "react";
import { Button } from "@/components/foundation/Button";
import { useAddNote } from "../../hooks";
import { NOTE_TYPES } from "../../types";

interface AddNoteComposerProps {
  investigationId: string;
}

export function AddNoteComposer({ investigationId }: AddNoteComposerProps) {
  const [content, setContent] = useState("");
  const [noteType, setNoteType] = useState("OBSERVATION");
  const [open, setOpen] = useState(false);

  const addMutation = useAddNote(investigationId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    await addMutation.mutateAsync({ content: content.trim(), noteType });
    setContent("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-dashed border-navy-200 py-2 text-xs text-navy-400 hover:border-brand-400 hover:text-brand-600 transition-colors"
      >
        + Add note
      </button>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="rounded-xl border border-navy-200 bg-white p-3 space-y-3">
      <div className="flex items-center gap-2">
        <select
          value={noteType}
          onChange={(e) => setNoteType(e.target.value)}
          className="h-7 rounded-md border border-navy-200 px-2 text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {NOTE_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <span className="text-xs text-navy-400">note type</span>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note…"
        rows={3}
        className="w-full rounded-lg border border-navy-200 px-3 py-2 text-xs text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
        required
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => { setOpen(false); setContent(""); }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isLoading={addMutation.isPending}
          disabled={!content.trim()}
        >
          Save note
        </Button>
      </div>
      {addMutation.isError && (
        <p className="text-xs text-danger-600">{addMutation.error?.message}</p>
      )}
    </form>
  );
}
