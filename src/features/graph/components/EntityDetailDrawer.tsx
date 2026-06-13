"use client";

import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { InsightSection } from "@/components/grounded/InsightSection";
import { RiskBadge } from "@/components/grounded/RiskBadge";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";
import type { CanvasNode } from "@/components/graph/NetworkCanvas";

interface EntityDetailDrawerProps {
  node: CanvasNode | null;
  onClose: () => void;
}

export function EntityDetailDrawer({ node, onClose }: EntityDetailDrawerProps) {
  return (
    <DetailDrawer
      isOpen={!!node}
      onClose={onClose}
      title={node?.label ?? ""}
      description={`Entity type: ${node?.type ?? ""}`}
      width="sm"
    >
      {node && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-navy-200 bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700">
              {node.type.replace("_", " ")}
            </span>
            {node.risk_level && <RiskBadge riskLevel={node.risk_level} />}
          </div>

          {node.metadata && Object.keys(node.metadata).length > 0 && (
            <InsightSection title="Details">
              <EvidencePanel evidence={node.metadata} />
            </InsightSection>
          )}

          <DisclaimerBox
            text="Graph relationships are derived from analytical signals only. They are not evidentiary connections and require investigator verification."
            compact
          />
        </div>
      )}
    </DetailDrawer>
  );
}
