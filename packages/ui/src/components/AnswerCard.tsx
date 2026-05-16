import * as React from "react";
import { CardShell } from "./CardShell";
import { TrendBadge } from "./TrendBadge";
import { PulseMarker } from "./PulseMarker";
import type { TrendBadgeDirection } from "./TrendBadge";

export interface EvidenceCitation {
  metricId: string;
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

export interface AnswerCardProps {
  text: string;
  evidence?: EvidenceCitation[];
  loading?: boolean;
  onShowTrace?: () => void;
  className?: string;
}

export function AnswerCard({ text, evidence, loading = false, onShowTrace, className }: AnswerCardProps) {
  return (
    <CardShell className={className}>
      {loading ? (
        <div style={{ display: "flex", gap: 4, padding: "4px 0" }} aria-label="Loading response" aria-busy="true">
          <PulseMarker tone="info" />
          <PulseMarker tone="info" />
          <PulseMarker tone="info" />
        </div>
      ) : (
        <>
          <p style={{ margin: 0, fontSize: "var(--m-fs-13, 13px)", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{text}</p>
          {evidence && evidence.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              {evidence.map((c) => (
                <span
                  key={c.metricId}
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "var(--m-fs-11, 11px)", background: "var(--m-bg-1, var(--glass))", border: "1px solid var(--m-line, var(--border))", borderRadius: 6, padding: "2px 8px" }}
                >
                  <span style={{ color: "var(--m-fg-2, var(--muted))" }}>{c.label}</span>
                  <span style={{ fontFamily: "var(--m-font-mono, var(--font-mono))", color: "var(--m-fg-0, var(--text))" }}>{c.value}</span>
                  {c.trend && c.trend !== "neutral" && (
                    <TrendBadge direction={c.trend as TrendBadgeDirection} value="" sentiment="neutral" />
                  )}
                </span>
              ))}
            </div>
          )}
          {onShowTrace && (
            <button
              type="button"
              onClick={onShowTrace}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "var(--m-fs-11, 11px)", color: "var(--m-cyan-500, var(--cyan))", marginTop: 8, padding: 0, display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              Show reasoning →
            </button>
          )}
        </>
      )}
    </CardShell>
  );
}
export default AnswerCard;
