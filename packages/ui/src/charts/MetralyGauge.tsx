/**
 * MetralyGauge — first-class chart primitive
 * ------------------------------------------------------------------
 * Health / risk / saturation / confidence score primitive.
 *
 * Composes:
 *   - CardShell        (when used as a card surface; optional)
 *   - StateBlock       (loading / empty / error / stale / partial / auth_failed
 *                       / rate_limited / source_disconnected / schema_mismatch
 *                       / permission_denied / formula_invalid)
 *   - StatusBadge      (state pill)
 *   - TrendBadge       (optional, when caller passes a delta via summary slot)
 *
 * NOT a widget. Wrap in DashboardWidget to use on a dashboard.
 *
 * Accessibility:
 *   - root carries role="meter"
 *   - aria-valuemin / aria-valuemax / aria-valuenow are always set
 *   - aria-valuetext mirrors the visible mono value + unit
 *   - thresholds are exposed as text in aria-describedby summary
 *
 * Visual rules:
 *   - mono font on the numeric value (JetBrains Mono, tabular-nums)
 *   - cyan = neutral operational tone; semantic tones via --m-ok/warn/err
 *   - no decorative neon ring; thin 2px arc, 1px track
 *   - pulse glyph is not used anywhere in this primitive
 */
import * as React from "react";
import { StateBlock } from "../components/StateBlock";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-gauge.css";

export type MetralyGaugeState =
  | "ready"
  | "loading"
  | "empty"
  | "error"
  | "stale"
  | "partial"
  | "auth_failed"
  | "rate_limited"
  | "source_disconnected"
  | "schema_mismatch"
  | "permission_denied"
  | "formula_invalid";

export type MetralyGaugeTone =
  | "neutral"
  | "cyan"
  | "success"
  | "warning"
  | "danger";

export type MetralyGaugeVariant = "semicircle" | "compact" | "inline";

export interface MetralyGaugeThreshold {
  /** absolute value at which this tone begins applying */
  value: number;
  tone: MetralyGaugeTone;
  label?: string;
}

export interface MetralyGaugeProps {
  /** Current value. If undefined → renders empty state unless overridden. */
  value?: number;
  min?: number;
  max?: number;

  /** Short heading rendered above the dial. Sentence case. */
  label?: string;
  /** Optional helper line, sentence case, no period. */
  description?: string;
  /** Unit suffix rendered mono next to the numeric value, e.g. "%", "ms". */
  unit?: string;

  /**
   * Ordered low→high thresholds. Each threshold's tone applies from its
   * `value` upward until the next threshold's `value` (or `max`).
   * The first applicable threshold also recolors the arc segment.
   */
  thresholds?: MetralyGaugeThreshold[];

  /** Manual tone override; ignored when `thresholds` is supplied. */
  tone?: MetralyGaugeTone;

  /** Widget-state-matrix status. Defaults to "ready". */
  state?: MetralyGaugeState;

  variant?: MetralyGaugeVariant;

  /** Custom formatter for the displayed value. Receives the clamped value. */
  formatter?: (value: number) => string;

  /** Short text fragment appended to the aria summary, e.g. "vs target 99%". */
  summary?: string;

  /** Show numeric thresholds under the dial when space permits. */
  showThresholdTicks?: boolean;

  /** Render without the surrounding card frame. Defaults to true (no frame). */
  bare?: boolean;

  /** Optional retry handler used by error/auth_failed/rate_limited state. */
  onRetry?: () => void;

  className?: string;
  id?: string;
}

// ────────────────────────────────────────────────────────────────────────────

const STATE_TO_STATUS: Record<MetralyGaugeState, {
  status: React.ComponentProps<typeof StatusBadge>["status"];
  label: string;
}> = {
  ready: { status: "Live", label: "Live" },
  loading: { status: "Preview", label: "Loading" },
  empty: { status: "Preview", label: "No data" },
  error: { status: "Error", label: "Error" },
  stale: { status: "Delayed", label: "Delayed" },
  partial: { status: "Delayed", label: "Partial data" },
  auth_failed: { status: "Error", label: "Auth failed" },
  rate_limited: { status: "Delayed", label: "Rate limited" },
  source_disconnected: { status: "Error", label: "Source disconnected" },
  schema_mismatch: { status: "Error", label: "Schema mismatch" },
  permission_denied: { status: "Error", label: "Permission denied" },
  formula_invalid: { status: "Error", label: "Formula invalid" },
};

const TONE_TO_VAR: Record<MetralyGaugeTone, string> = {
  neutral: "var(--m-fg-3)",
  cyan: "var(--m-cyan-500)",
  success: "var(--m-ok)",
  warning: "var(--m-warn)",
  danger: "var(--m-err)",
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function toneForValue(
  value: number,
  thresholds: MetralyGaugeThreshold[] | undefined,
  fallback: MetralyGaugeTone,
): MetralyGaugeTone {
  if (!thresholds || thresholds.length === 0) return fallback;
  // Last matching threshold (largest .value ≤ value) wins.
  const sorted = [...thresholds].sort((a, b) => a.value - b.value);
  let tone: MetralyGaugeTone = fallback;
  for (const t of sorted) {
    if (value >= t.value) tone = t.tone;
  }
  return tone;
}

function defaultFormatter(v: number, unit?: string): string {
  // Avoid `1.0` style output; preserve precision when value < 10.
  const abs = Math.abs(v);
  const digits = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  const text = Number.isFinite(v) ? v.toFixed(digits).replace(/\.?0+$/, "") : "—";
  return unit ? `${text}${unit}` : text;
}

// ────────────────────────────────────────────────────────────────────────────

export const MetralyGauge: React.FC<MetralyGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  label,
  description,
  unit,
  thresholds,
  tone = "cyan",
  state = "ready",
  variant = "semicircle",
  formatter,
  summary,
  showThresholdTicks = true,
  bare = true,
  onRetry,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const descId = `${rootId}-desc`;

  const isReady = state === "ready" || state === "partial" || state === "stale";
  const hasValue = typeof value === "number" && Number.isFinite(value);

  // Non-ready, non-data states render a state block in place of the dial.
  const showStateBlock = !isReady || !hasValue;

  // Numeric work — only meaningful when value present.
  const safeMax = max > min ? max : min + 1;
  const v = hasValue ? clamp(value as number, min, safeMax) : min;
  const pct = (v - min) / (safeMax - min); // 0..1
  const activeTone = toneForValue(v, thresholds, tone);
  const accent = TONE_TO_VAR[activeTone];
  const fmt = formatter ?? ((n: number) => defaultFormatter(n, unit));
  const displayValue = hasValue ? fmt(v) : "—";

  // Arc geometry for semicircle variant (SVG path)
  // viewBox 200x110; arc radius 90; centered at (100,100); spans 180°→360°.
  const arcRadius = 90;
  const cx = 100;
  const cy = 100;
  const startAngle = Math.PI;            // 180°
  const endAngle = 2 * Math.PI;          // 360°
  const arcAngle = startAngle + pct * (endAngle - startAngle);
  const arcLength = Math.PI * arcRadius; // half circumference

  // SVG paths for track + filled arc
  const trackPath = `M ${cx - arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 0 1 ${cx + arcRadius} ${cy}`;
  const filledOffset = arcLength * (1 - pct);

  // Threshold tick placements (semicircle)
  const ticks = (thresholds ?? []).map((t) => {
    const tPct = clamp((t.value - min) / (safeMax - min), 0, 1);
    const angle = startAngle + tPct * (endAngle - startAngle);
    const inner = arcRadius - 6;
    const outer = arcRadius + 2;
    return {
      x1: cx + inner * Math.cos(angle),
      y1: cy + inner * Math.sin(angle),
      x2: cx + outer * Math.cos(angle),
      y2: cy + outer * Math.sin(angle),
      tone: t.tone,
      label: t.label ?? `${t.value}`,
      value: t.value,
    };
  });

  const ariaText = [
    label,
    hasValue ? `${displayValue}${unit && !displayValue.endsWith(unit) ? unit : ""}` : "no data",
    summary,
  ]
    .filter(Boolean)
    .join(", ");

  const stateMeta = STATE_TO_STATUS[state];

  return (
    <div
      id={rootId}
      className={[
        "m-gauge",
        `m-gauge--${variant}`,
        bare ? "m-gauge--bare" : "m-gauge--card",
        `m-gauge--tone-${activeTone}`,
        state !== "ready" ? `m-gauge--state-${state}` : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--m-gauge-accent": accent } as React.CSSProperties}
      role="meter"
      aria-valuemin={min}
      aria-valuemax={safeMax}
      aria-valuenow={hasValue ? v : undefined}
      aria-valuetext={ariaText}
      aria-describedby={description || summary ? descId : undefined}
      aria-busy={state === "loading" || undefined}
    >
      {label ? (
        <header className="m-gauge__head">
          <span className="m-gauge__label">{label}</span>
          {state !== "ready" ? (
            <StatusBadge status={stateMeta.status} label={stateMeta.label} />
          ) : null}
        </header>
      ) : null}

      {description || summary ? (
        <p id={descId} className="m-gauge__desc">
          {[description, summary].filter(Boolean).join(" · ")}
        </p>
      ) : null}

      <div className="m-gauge__body">
        {showStateBlock ? (
          <StateBlock
            variant={state === "loading" ? "loading" : state === "empty" ? "empty" : state === "source_disconnected" ? "disconnected" : "error"}
            title={titleForState(state)}
            description={hintForState(state)}
            action={
              onRetry && (state === "error" || state === "auth_failed" || state === "rate_limited" || state === "source_disconnected")
                ? <button type="button" className="metraly-focus-ring" onClick={onRetry}>Retry</button>
                : undefined
            }
            density={variant !== "semicircle" ? "compact" : "comfortable"}
          />
        ) : variant === "inline" ? (
          <InlineMeter pct={pct} accent={accent} value={displayValue} />
        ) : (
          <SemicircleDial
            pct={pct}
            arcRadius={arcRadius}
            arcLength={arcLength}
            trackPath={trackPath}
            filledOffset={filledOffset}
            displayValue={displayValue}
            unit={unit}
            ticks={variant === "semicircle" && showThresholdTicks ? ticks : []}
            compact={variant === "compact"}
            accent={accent}
          />
        )}
      </div>
    </div>
  );
};

MetralyGauge.displayName = "MetralyGauge";

// ────────────────────────────────────────────────────────────────────────────
// internal sub-renderers

interface SemicircleDialProps {
  pct: number;
  arcRadius: number;
  arcLength: number;
  trackPath: string;
  filledOffset: number;
  displayValue: string;
  unit?: string;
  ticks: Array<{ x1: number; y1: number; x2: number; y2: number; tone: MetralyGaugeTone; label: string; value: number }>;
  compact: boolean;
  accent: string;
}

const SemicircleDial: React.FC<SemicircleDialProps> = ({
  pct,
  arcLength,
  trackPath,
  filledOffset,
  displayValue,
  ticks,
  compact,
  accent,
}) => {
  return (
    <div className={`m-gauge__dial${compact ? " m-gauge__dial--compact" : ""}`}>
      <div className="m-gauge__dial-figure">
        <svg
          className="m-gauge__svg"
          viewBox="0 0 200 110"
          aria-hidden="true"
          focusable="false"
        >
          {/* track */}
          <path
            className="m-gauge__track"
            d={trackPath}
            fill="none"
            strokeWidth={compact ? 6 : 8}
            strokeLinecap="round"
          />
          {/* filled arc */}
          <path
            className="m-gauge__arc"
            d={trackPath}
            fill="none"
            stroke={accent}
            strokeWidth={compact ? 6 : 8}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={filledOffset}
          />
          {/* threshold ticks */}
          {ticks.map((t, i) => (
            <line
              key={`tk-${i}`}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              className={`m-gauge__tick m-gauge__tick--${t.tone}`}
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="m-gauge__readout">
          <span className="m-gauge__value">{displayValue}</span>
        </div>
      </div>
      {ticks.length > 0 && !compact ? (
        <ul className="m-gauge__legend" aria-hidden="true">
          {ticks.map((t, i) => (
            <li key={`lg-${i}`} className={`m-gauge__legend-item m-gauge__legend-item--${t.tone}`}>
              <span className="m-gauge__legend-dot" />
              <span className="m-gauge__legend-label">{t.label}</span>
              <span className="m-gauge__legend-value">{t.value}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

const InlineMeter: React.FC<{ pct: number; accent: string; value: string }> = ({
  pct,
  accent,
  value,
}) => {
  return (
    <div className="m-gauge__inline">
      <span className="m-gauge__inline-value">{value}</span>
      <span
        className="m-gauge__inline-track"
        aria-hidden="true"
      >
        <span
          className="m-gauge__inline-fill"
          style={{ width: `${Math.round(pct * 100)}%`, background: accent }}
        />
      </span>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// state copy

function titleForState(state: MetralyGaugeState): string {
  switch (state) {
    case "loading": return "Loading";
    case "empty": return "No data yet";
    case "stale": return "Last update is stale";
    case "partial": return "Partial data";
    case "auth_failed": return "Authentication failed";
    case "rate_limited": return "Rate limited";
    case "source_disconnected": return "Source disconnected";
    case "schema_mismatch": return "Schema mismatch";
    case "permission_denied": return "Permission denied";
    case "formula_invalid": return "Formula invalid";
    case "error": return "Could not load";
    default: return "";
  }
}

function hintForState(state: MetralyGaugeState): string | undefined {
  switch (state) {
    case "loading": return undefined;
    case "empty": return "Once the source begins reporting, the score will appear here.";
    case "stale": return "Last sync exceeded the freshness window. Trigger a manual sync to refresh.";
    case "partial": return "Some sources are still backfilling. The score will firm up as data arrives.";
    case "auth_failed": return "Re-authorize the connector to resume scoring.";
    case "rate_limited": return "Upstream provider returned 429. Retrying with backoff.";
    case "source_disconnected": return "The underlying source is unreachable. Check the connector status.";
    case "schema_mismatch": return "Underlying metric schema changed. Re-validate the formula.";
    case "permission_denied": return "Current scopes do not include the metric source. Expand scopes in source settings.";
    case "formula_invalid": return "Formula did not compile. Open the metric to fix it.";
    case "error": return "An unexpected error occurred. Retry or open the error log.";
    default: return undefined;
  }
}

export default MetralyGauge;
