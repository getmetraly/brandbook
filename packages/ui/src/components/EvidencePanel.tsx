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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
          {citations.map((c) => (
            <div
              key={c.metricId}
              style={{ display: "flex", flexDirection: "column", gap: 2, padding: 10, borderRadius: 8, background: "var(--m-bg-1, var(--glass))", border: "1px solid var(--m-line, var(--border))" }}
            >
              <span style={{ fontSize: "var(--m-fs-11, 11px)", color: "var(--m-fg-2, var(--muted))" }}>{c.label}</span>
              <span style={{ fontSize: "var(--m-fs-15, 15px)", fontWeight: 600, color: "var(--m-fg-0, var(--text))", fontFamily: "var(--m-font-mono, var(--font-mono))" }}>{c.value}</span>
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
