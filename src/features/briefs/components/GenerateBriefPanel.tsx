"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";
import { Button } from "@/components/foundation/Button";
import { FilterSelect } from "@/components/grounded/FilterBar";
import { useGenerateBrief } from "../hooks";
import { BRIEF_TYPES, SUBJECT_TYPES } from "../types";

const BRIEF_TYPE_OPTIONS = BRIEF_TYPES.map((t) => ({ label: t.replace("_BRIEF", " Brief"), value: t }));
const SUBJECT_TYPE_OPTIONS = SUBJECT_TYPES.map((t) => ({ label: t, value: t }));

export function GenerateBriefPanel() {
  const [briefType, setBriefType] = useState(BRIEF_TYPES[0]);
  const [subjectType, setSubjectType] = useState(SUBJECT_TYPES[0]);
  const [subjectId, setSubjectId] = useState("");

  const mutation = useGenerateBrief();

  function handleGenerate() {
    if (!subjectId.trim()) return;
    mutation.mutate({ brief_type: briefType, subject_type: subjectType, subject_id: subjectId.trim(), force: false });
  }

  return (
    <Card>
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <Wand2 size={14} className="text-purple-600" />
        <p className="text-sm font-semibold text-navy-900">Generate Brief</p>
      </div>
      <CardContent className="pt-1 pb-4 space-y-3">
        <div className="flex flex-wrap gap-3">
          <FilterSelect
            label="Type"
            value={briefType}
            options={BRIEF_TYPE_OPTIONS}
            onChange={(v) => setBriefType(v as typeof briefType)}
          />
          <FilterSelect
            label="Subject"
            value={subjectType}
            options={SUBJECT_TYPE_OPTIONS}
            onChange={(v) => setSubjectType(v as typeof subjectType)}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-navy-500 block mb-1">Subject UUID</label>
          <input
            className="w-full h-8 rounded-lg border border-navy-200 px-3 text-xs font-mono text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          />
        </div>
        {mutation.isError && (
          <p className="text-xs text-danger-600">{(mutation.error as Error)?.message ?? "Generation failed"}</p>
        )}
        {mutation.isSuccess && (
          <p className="text-xs text-success-600">Brief queued — refresh the list to see it</p>
        )}
        <Button
          size="sm"
          onClick={handleGenerate}
          disabled={!subjectId.trim() || mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? "Generating…" : "Generate Intelligence Brief"}
        </Button>
      </CardContent>
    </Card>
  );
}
