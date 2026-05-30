import * as React from "react";
import { CardShell } from "./CardShell";
import { TrendBadge } from "./TrendBadge";
import { StateBlock } from "./StateBlock";
import type { TrendBadgeDirection } from "./TrendBadge";
import type { EvidenceCitation } from "./AnswerCard";

export interface EvidencePanelProps {
  citations: EvidenceCitation[];
  title?: string;
  className?: string;
}

export function EvidencePanel({ citations, title = "Evidence", className }: EvidencePanelProps) {
  return (
    <CardShell title={title} className={className}>
      {citations.length === 0 ? (
        <StateBlock variant="empty" description="No evidence attached" />
      ) : (
        <div className="metraly-evidence-grid">
          {citations.map((c) => (
            <div key={c.metricId} className="metraly-evidence-cell">
              <span className="metraly-evidence-cell__label">{c.label}</span>
              <span className="metraly-evidence-cell__value">{c.value}</span>
              {c.trend && c.trend !== "neutral" && (
                <TrendBadge direction={c.trend as TrendBadgeDirection} value="" sentiment="neutral" />
              )}
            </div>
          ))}
        </div>
      )}
    </CardShell>
  );
}
export default EvidencePanel;
