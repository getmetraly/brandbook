/**
 * InsightCard — product-level insight surface
 * ------------------------------------------------------------------
 * Distinct from AnswerCard (AI-conversational). InsightCard is used
 * on dashboards, source health pages, anomaly detail rows, and
 * provider-connector pages. AI-grounded mode shows evidence and
 * confidence; non-AI mode is plain.
 *
 * Composes:
 *   - CardShell           (frame)
 *   - StatusBadge         (state)
 *   - StateBlock          (non-ready render)
 *
 * Honest defaults:
 *   - Confidence is shown as a tone-tagged label, not a wand-waving %.
 *   - Freshness is rendered mono.
 *   - "AI generated" tag appears only when source === "ai".
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StateBlock } from "../components/StateBlock";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-insight-card.css";

export type InsightState =
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

export type InsightTone = "neutral" | "info" | "ok" | "warning" | "danger";

export type InsightSource = "rules" | "anomaly" | "trend" | "policy" | "ai";

export type InsightConfidence = "low" | "medium" | "high";

export interface InsightEvidence {
  id: string;
  label: string;
  /** "metric" | "log" | "PR" | "deployment" | "source" — free text. */
  kind?: string;
  /** Optional caption (mono if numeric). */
  caption?: string;
}

export interface InsightAction {
  label: string;
  onClick: () => void;
  tone?: "primary" | "ghost";
}

export interface InsightCardProps {
  title: string;
  summary: string;
  tone?: InsightTone;
  state?: InsightState;
  /** Source of the insight. Drives the "AI generated" tag visibility. */
  source?: InsightSource;
  confidence?: InsightConfidence;
  /** ISO timestamp of evidence freshness. Rendered mono. */
  freshness?: string;
  evidence?: InsightEvidence[];
  /** Up to 6 metadata key/value chips. */
  meta?: Array<{ key: string; value: string }>;
  /** Primary call to action (e.g. "Open metric"). */
  primaryAction?: InsightAction;
  /** Optional ghost-style secondary action. */
  secondaryAction?: InsightAction;
  /** When false, render without a CardShell frame (for nested usage). */
  frame?: boolean;
  /** Compact variant for dashboard widgets. */
  compact?: boolean;
  className?: string;
  id?: string;
}

const TONE_BADGE: Record<InsightTone, React.ComponentProps<typeof StatusBadge>["status"]> = {
  neutral: "Preview",
  info: "Preview",
  ok: "Live",
  warning: "Delayed",
  danger: "Error",
};

const CONFIDENCE_TONE: Record<InsightConfidence, React.ComponentProps<typeof StatusBadge>["status"]> = {
  low: "Delayed",
  medium: "Preview",
  high: "Live",
};

export const InsightCard: React.FC<InsightCardProps> = ({
  title = "Insight",
  summary = "No insight summary provided",
  tone = "info",
  state = "ready",
  source = "rules",
  confidence,
  freshness,
  evidence,
  meta,
  primaryAction,
  secondaryAction,
  frame = true,
  compact = false,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const isReady = state === "ready" || state === "partial" || state === "stale";

  const inner = (
    <article
      id={rootId}
      className={[
        "metraly-insight",
        compact ? "metraly-insight--compact" : "",
        `metraly-insight--tone-${tone}`,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={state === "loading" || undefined}
    >
      <header className="metraly-insight__head">
        <div className="metraly-insight__head-text">
          <span className="metraly-insight__title">{title}</span>
          {freshness ? (
            <span className="metraly-insight__fresh" title={`Last evidence ${freshness}`}>
              <span className="metraly-insight__fresh-label">updated</span>
              <span className="metraly-insight__fresh-time">{formatTime(freshness)}</span>
            </span>
          ) : null}
        </div>
        <div className="metraly-insight__badges">
          {source === "ai" ? (
            <span className="metraly-insight__ai-tag" title="AI generated">
              <span className="metraly-insight__ai-dot" aria-hidden="true" />
              AI generated
            </span>
          ) : null}
          {state !== "ready" ? (
            <StatusBadge status={badgeForState(state)} label={labelForState(state)} />
          ) : tone !== "neutral" && tone !== "info" ? (
            <StatusBadge status={TONE_BADGE[tone]} label={toneLabel(tone)} />
          ) : null}
        </div>
      </header>

      {!isReady ? (
        <StateBlock
          variant={state === "loading" ? "loading" : state === "empty" ? "empty" : state === "source_disconnected" ? "disconnected" : "error"}
          title={labelForState(state)}
          description={hintForState(state)}
          density={compact ? "compact" : "comfortable"}
        />
      ) : (
        <>
          <p className="metraly-insight__summary">{summary}</p>

          {confidence ? (
            <div className="metraly-insight__confidence">
              <span className="metraly-insight__confidence-label">Confidence</span>
              <StatusBadge status={CONFIDENCE_TONE[confidence]} label={confidence === "low" ? "Low" : confidence === "medium" ? "Medium" : "High"} />
            </div>
          ) : null}

          {evidence && evidence.length > 0 ? (
            <div className="metraly-insight__evidence">
              <span className="metraly-insight__evidence-head">
                Evidence
                <span className="metraly-insight__evidence-count">{evidence.length}</span>
              </span>
              <ul className="metraly-insight__evidence-list">
                {evidence.slice(0, compact ? 3 : 8).map((e) => (
                  <li key={e.id} className="metraly-insight__evidence-item">
                    {e.kind ? <span className="metraly-insight__evidence-kind">{e.kind}</span> : null}
                    <span className="metraly-insight__evidence-label">{e.label}</span>
                    {e.caption ? <span className="metraly-insight__evidence-caption">{e.caption}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {meta && meta.length > 0 ? (
            <ul className="metraly-insight__meta" aria-label="metadata">
              {meta.slice(0, 6).map((m, i) => (
                <li key={i} className="metraly-insight__meta-item">
                  <span className="metraly-insight__meta-key">{m.key}</span>
                  <span className="metraly-insight__meta-val">{m.value}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {primaryAction || secondaryAction ? (
            <footer className="metraly-insight__actions">
              {secondaryAction ? (
                <button
                  type="button"
                  className="metraly-insight__btn metraly-insight__btn--ghost"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </button>
              ) : null}
              {primaryAction ? (
                <button
                  type="button"
                  className="metraly-insight__btn metraly-insight__btn--primary"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </button>
              ) : null}
            </footer>
          ) : null}
        </>
      )}
    </article>
  );

  return frame ? <CardShell className="metraly-insight-frame">{inner}</CardShell> : inner;
};

InsightCard.displayName = "InsightCard";

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

function badgeForState(state: InsightState): React.ComponentProps<typeof StatusBadge>["status"] {
  switch (state) {
    case "loading": return "Preview";
    case "empty": return "No data";
    case "stale": return "Delayed";
    case "partial": return "Delayed";
    case "rate_limited": return "Delayed";
    default: return "Error";
  }
}

function labelForState(state: InsightState): string {
  switch (state) {
    case "ready": return "";
    case "loading": return "Loading";
    case "empty": return "No insight yet";
    case "error": return "Could not load insight";
    case "stale": return "Delayed";
    case "partial": return "Partial data";
    case "auth_failed": return "Auth failed";
    case "rate_limited": return "Rate limited";
    case "source_disconnected": return "Source disconnected";
    case "schema_mismatch": return "Schema mismatch";
    case "permission_denied": return "Permission denied";
    case "formula_invalid": return "Formula invalid";
  }
}

function hintForState(state: InsightState): string | undefined {
  switch (state) {
    case "empty": return "Once enough signal accumulates, an insight will appear here.";
    case "stale": return "Showing the last reliable evaluation. Trigger refresh to update.";
    case "partial": return "Backfill is still in progress.";
    case "auth_failed": return "Re-authorize the source to resume scoring.";
    case "rate_limited": return "Upstream throttled. Retrying with backoff.";
    case "source_disconnected": return "The underlying source is unreachable.";
    case "schema_mismatch": return "Source schema changed. Re-validate the metric.";
    case "permission_denied": return "Scopes too narrow for this metric.";
    case "formula_invalid": return "Formula did not compile.";
    case "error": return "Retry or open the error log.";
    default: return undefined;
  }
}

function toneLabel(t: InsightTone): string {
  switch (t) {
    case "ok": return "Healthy";
    case "warning": return "Attention";
    case "danger": return "Critical";
    case "info": return "Info";
    default: return "";
  }
}

export default InsightCard;
