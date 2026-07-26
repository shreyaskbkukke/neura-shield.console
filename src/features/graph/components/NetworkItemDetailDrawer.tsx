"use client";

import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { EvidencePanel } from "@/components/grounded/EvidencePanel";
import { InsightSection } from "@/components/grounded/InsightSection";
import { ConfidenceScore } from "@/components/intelligence/ConfidenceScore";
import { DisclaimerBox } from "@/components/grounded/DisclaimerBox";

export interface NetworkDrawerItem {
  title: string;
  subtitle?: string;
  confidence_score: number;
  evidence: Record<string, unknown>;
  disclaimer: string;
}

interface NetworkItemDetailDrawerProps {
  item: NetworkDrawerItem | null;
  onClose: () => void;
}

export function NetworkItemDetailDrawer({ item, onClose }: NetworkItemDetailDrawerProps) {
  return (
    <DetailDrawer
      isOpen={!!item}
      onClose={onClose}
      title={item?.title ?? ""}
      description={item?.subtitle}
      width="md"
    >
      {item && (
        <div className="space-y-4">
          <ConfidenceScore score={item.confidence_score} />

          {Object.keys(item.evidence).length > 0 && (
            <InsightSection title="Evidence">
              <EvidencePanel evidence={item.evidence} />
            </InsightSection>
          )}

          <DisclaimerBox text={item.disclaimer} compact />
        </div>
      )}
    </DetailDrawer>
  );
}
