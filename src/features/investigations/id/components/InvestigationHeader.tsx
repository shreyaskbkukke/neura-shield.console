import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/grounded/StatusBadge";
import { SeverityBadge } from "@/components/grounded/SeverityBadge";
import type { Investigation } from "../../types";

interface InvestigationHeaderProps {
  investigation: Investigation;
}

export function InvestigationHeader({ investigation }: InvestigationHeaderProps) {
  return (
    <div className="space-y-3">
      <Link
        href="/investigations"
        className="inline-flex items-center gap-1.5 text-xs text-navy-500 hover:text-navy-800 transition-colors"
      >
        <ArrowLeft size={12} />
        Back to investigations
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold text-brand-600">
              {investigation.case_ref}
            </span>
          </div>
          <h1 className="text-lg font-bold text-navy-900">{investigation.title}</h1>
          {investigation.description && (
            <p className="mt-1 text-sm text-navy-500">{investigation.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={investigation.status} />
          <SeverityBadge severity={investigation.priority} />
        </div>
      </div>
    </div>
  );
}
