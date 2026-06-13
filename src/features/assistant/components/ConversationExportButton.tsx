"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/foundation/Button";
import { useExportThread, useThreadExports } from "../hooks";
import { getExportDownloadUrl } from "../api";
import { formatDateTime } from "@/lib/formatters";

interface ConversationExportButtonProps {
  threadId: string | null;
}

export function ConversationExportButton({ threadId }: ConversationExportButtonProps) {
  const [showList, setShowList] = useState(false);
  const exportMutation = useExportThread(threadId);
  const exportsQuery = useThreadExports(threadId);

  if (!threadId) return null;

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowList((v) => !v)}
          disabled={!exportsQuery.data?.length}
        >
          <Download size={12} className="mr-1" />
          {exportsQuery.data?.length ?? 0} export{(exportsQuery.data?.length ?? 0) !== 1 ? "s" : ""}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => exportMutation.mutate()}
          isLoading={exportMutation.isPending}
        >
          <FileText size={12} className="mr-1" />
          Export PDF
        </Button>
      </div>

      {showList && exportsQuery.data && exportsQuery.data.length > 0 && (
        <div className="absolute right-0 top-full mt-1 z-50 w-72 rounded-xl border border-navy-200 bg-white shadow-lg overflow-hidden">
          {exportsQuery.data.map((exp) => (
            <a
              key={exp.export_id}
              href={getExportDownloadUrl(exp.export_id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-navy-50 transition-colors"
              onClick={() => setShowList(false)}
            >
              <div>
                <p className="text-xs font-medium text-navy-800">{exp.file_name ?? "Export"}</p>
                <p className="text-[11px] text-navy-400">{formatDateTime(exp.created_at)}</p>
              </div>
              <span className="text-[11px] text-navy-500">
                {exp.message_count} msgs
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
