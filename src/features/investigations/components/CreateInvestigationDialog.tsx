"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/foundation/Button";
import { useCreateInvestigation } from "../hooks";
import { INVESTIGATION_PRIORITIES } from "../types";

interface CreateInvestigationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (id: string) => void;
}

export function CreateInvestigationDialog({
  isOpen,
  onClose,
  onCreated,
}: CreateInvestigationDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [districtId, setDistrictId] = useState("");

  const createMutation = useCreateInvestigation();

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !districtId.trim()) return;
    const inv = await createMutation.mutateAsync({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      district_id: districtId.trim(),
    });
    onCreated(inv.id);
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDistrictId("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl border border-navy-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-navy-900">Open New Investigation</h2>
          <button onClick={onClose} className="text-navy-400 hover:text-navy-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-navy-700 mb-1">Title *</label>
            <input
              className="w-full h-8 rounded-lg border border-navy-200 px-3 text-xs text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief investigation title"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-700 mb-1">Description</label>
            <textarea
              className="w-full rounded-lg border border-navy-200 px-3 py-2 text-xs text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">Priority *</label>
              <select
                className="w-full h-8 rounded-lg border border-navy-200 px-2 text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {INVESTIGATION_PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">District ID *</label>
              <input
                className="w-full h-8 rounded-lg border border-navy-200 px-3 text-xs text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                value={districtId}
                onChange={(e) => setDistrictId(e.target.value)}
                placeholder="UUID"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={createMutation.isPending}
              disabled={!title.trim() || !districtId.trim()}
            >
              Open Investigation
            </Button>
          </div>

          {createMutation.isError && (
            <p className="text-xs text-danger-600">
              {createMutation.error?.message ?? "Failed to create investigation"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
