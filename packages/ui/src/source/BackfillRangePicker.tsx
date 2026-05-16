/**
 * BackfillRangePicker — pick backfill window
 * ------------------------------------------------------------------
 * Compact picker with quick-presets (7d / 30d / 90d / custom) and an
 * estimated-events / friction warning summary.
 *
 * Honest behavior:
 *   - When `estimatedEvents` is undefined or estimateConfidence === "rough",
 *     the displayed count is prefixed with "~" and described as estimated.
 *   - Does not pretend exact ETA. If no ETA is provided, none is shown.
 */
import * as React from "react";
import { FieldShell } from "../components/FieldShell";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-source.css";

export type BackfillPresetId = "7d" | "30d" | "90d" | "custom";

export type EstimateConfidence = "exact" | "rough" | "unknown";

export interface BackfillEstimate {
  /** Estimated number of events that will be ingested. */
  events?: number;
  /** Hint of estimated duration, e.g. "~12 min". Rendered as-is. */
  duration?: string;
  confidence?: EstimateConfidence;
  /** Optional friction warning ("API quota: 60 req/min"). */
  warning?: string;
}

export interface BackfillRangePickerProps {
  /** Active preset / custom selection. */
  preset: BackfillPresetId;
  onChange: (preset: BackfillPresetId, customDays?: number) => void;
  /** Custom day count when preset === "custom". */
  customDays?: number;
  /** Min and max days for custom mode. */
  minDays?: number;
  maxDays?: number;
  estimate?: BackfillEstimate;
  /** Label override. */
  label?: string;
  helper?: string;
  errorText?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const PRESETS: Array<{ id: Exclude<BackfillPresetId, "custom">; label: string; days: number }> = [
  { id: "7d", label: "7 days", days: 7 },
  { id: "30d", label: "30 days", days: 30 },
  { id: "90d", label: "90 days", days: 90 },
];

function formatEvents(n?: number, conf?: EstimateConfidence): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "—";
  const prefix = conf === "exact" ? "" : "~";
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${prefix}${n}`;
}

export const BackfillRangePicker: React.FC<BackfillRangePickerProps> = ({
  preset,
  onChange,
  customDays,
  minDays = 1,
  maxDays = 365,
  estimate,
  label = "Backfill range",
  helper = "Choose how far back to ingest historical data. Longer ranges take more time and quota.",
  errorText,
  disabled,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const customId = `${rootId}-custom`;

  return (
    <FieldShell
      inputId={rootId}
      label={label}
      description={errorText ? undefined : helper}
      error={errorText}
      className={["m-backfill", className ?? ""].filter(Boolean).join(" ")}
    >
      <div className="m-backfill__row">
        <div role="radiogroup" aria-label="Quick range" className="m-backfill__presets">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={preset === p.id}
              className={[
                "m-backfill__preset",
                preset === p.id ? "m-backfill__preset--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onChange(p.id)}
              disabled={disabled}
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            role="radio"
            aria-checked={preset === "custom"}
            className={[
              "m-backfill__preset",
              preset === "custom" ? "m-backfill__preset--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onChange("custom", customDays ?? 30)}
            disabled={disabled}
          >
            Custom
          </button>
        </div>

        {preset === "custom" ? (
          <label className="m-backfill__custom" htmlFor={customId}>
            <input
              id={customId}
              type="number"
              min={minDays}
              max={maxDays}
              step={1}
              className="m-backfill__custom-input"
              value={customDays ?? 30}
              onChange={(e) => {
                const v = Math.max(minDays, Math.min(maxDays, Number(e.target.value)));
                onChange("custom", v);
              }}
              disabled={disabled}
              aria-label="Custom days"
            />
            <span className="m-backfill__custom-unit">days</span>
          </label>
        ) : null}
      </div>

      <div className="m-backfill__estimate" aria-live="polite">
        <div className="m-backfill__estimate-row">
          <span className="m-backfill__estimate-label">Estimated events</span>
          <span className="m-backfill__estimate-value">
            {formatEvents(estimate?.events, estimate?.confidence)}
          </span>
          {estimate?.confidence && estimate.confidence !== "exact" ? (
            <span className="m-backfill__estimate-note">
              {estimate.confidence === "rough" ? "rough estimate" : "unknown"}
            </span>
          ) : null}
        </div>
        {estimate?.duration ? (
          <div className="m-backfill__estimate-row">
            <span className="m-backfill__estimate-label">Likely duration</span>
            <span className="m-backfill__estimate-value">{estimate.duration}</span>
          </div>
        ) : null}
        {estimate?.warning ? (
          <div className="m-backfill__warning">
            <StatusBadge status="Delayed" label="Heads up" />
            <span className="m-backfill__warning-text">{estimate.warning}</span>
          </div>
        ) : null}
      </div>
    </FieldShell>
  );
};

BackfillRangePicker.displayName = "BackfillRangePicker";

export default BackfillRangePicker;
