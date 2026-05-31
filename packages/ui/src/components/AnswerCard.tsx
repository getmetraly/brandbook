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

export function AnswerCard({
  text,
  evidence,
  loading = false,
  onShowTrace,
  className,
}: AnswerCardProps) {
  return (
    <CardShell className={className}>
      {loading ? (
        <div
          className="metraly-answer-card__loading"
          role="status"
          aria-label="Loading response"
          aria-busy="true"
        >
          <PulseMarker tone="info" />
          <PulseMarker tone="info" />
          <PulseMarker tone="info" />
        </div>
      ) : (
        <>
          <p className="metraly-answer-card__text">{text}</p>

          {evidence && evidence.length > 0 && (
            <div className="metraly-answer-card__evidence">
              {evidence.map((c) => (
                <span key={c.metricId} className="metraly-answer-card__chip">
                  <span className="metraly-answer-card__chip-label">
                    {c.label}
                  </span>
                  <span className="metraly-answer-card__chip-value">
                    {c.value}
                  </span>
                  {c.trend && c.trend !== "neutral" && (
                    <TrendBadge
                      direction={c.trend as TrendBadgeDirection}
                      value=""
                      sentiment="neutral"
                    />
                  )}
                </span>
              ))}
            </div>
          )}

          {onShowTrace && (
            <button
              type="button"
              className="metraly-answer-card__trace-btn"
              onClick={onShowTrace}
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
