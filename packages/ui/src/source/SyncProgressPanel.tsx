/**
 * SyncProgressPanel — per-source sync state surface
 * ------------------------------------------------------------------
 * Works in two contexts:
 *   1. Connector wizard "Start sync" step (handoff panel).
 *   2. Dashboard toolbar / source detail page (live state).
 *
 * The component is purely presentational. Cancel/retry callbacks are
 * exposed but the parent owns backend behavior. Honest about progress:
 * if `totalEstimate` is unknown, the progress bar renders indeterminate.
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-source.css";

export type SyncStage =
  | "queued"
  | "discovering"
  | "backfilling"
  | "incremental"
  | "paused"
  | "rate_limited"
  | "completed"
  | "failed"
  | "cancelled";

export interface SyncProgressPanelProps {
  /** Display name of the source, e.g. "GitHub · acme". */
  sourceLabel: string;
  /** Short id rendered mono, e.g. "github-acme". */
  sourceId?: string;
  stage: SyncStage;
  /** Optional sub-stage label, e.g. "Fetching pull requests". */
  subStage?: string;
  /** Events ingested so far. */
  eventsIngested?: number;
  /** Total estimated events (may be a rough estimate). */
  totalEstimate?: number;
  /** ISO of last successful sync. */
  lastSyncedAt?: string;
  /** Optional rate-limit notice. */
  rateLimit?: { window: string; remaining: number; resetAt?: string };
  /** When true, the progress bar pulses indefinitely. */
  indeterminate?: boolean;
  /** Action callbacks (UI only; backend is parent's responsibility). */
  onCancel?: () => void;
  onRetry?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  frame?: boolean;
  className?: string;
  id?: string;
}

const STAGE_LABEL: Record<SyncStage, string> = {
  queued: "Queued",
  discovering: "Discovering",
  backfilling: "Backfilling",
  incremental: "Incremental sync",
  paused: "Paused",
  rate_limited: "Rate limited",
  completed: "Up to date",
  failed: "Failed",
  cancelled: "Cancelled",
};

const STAGE_BADGE: Record<SyncStage, { status: React.ComponentProps<typeof StatusBadge>["status"]; label: string }> = {
  queued:       { status: "Preview", label: "Queued" },
  discovering:  { status: "Preview", label: "Working" },
  backfilling:  { status: "Preview", label: "Working" },
  incremental:  { status: "Live",    label: "Live" },
  paused:       { status: "Delayed", label: "Paused" },
  rate_limited: { status: "Delayed", label: "Rate limited" },
  completed:    { status: "Live",    label: "Up to date" },
  failed:       { status: "Error",   label: "Failed" },
  cancelled:    { status: "Preview", label: "Cancelled" },
};

function fmtNum(n?: number): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

function fmtTime(iso?: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

export const SyncProgressPanel: React.FC<SyncProgressPanelProps> = ({
  sourceLabel,
  sourceId,
  stage,
  subStage,
  eventsIngested,
  totalEstimate,
  lastSyncedAt,
  rateLimit,
  indeterminate,
  onCancel,
  onRetry,
  onPause,
  onResume,
  frame = true,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;

  const knownProgress =
    typeof eventsIngested === "number" &&
    typeof totalEstimate === "number" &&
    totalEstimate > 0;

  const pct = knownProgress
    ? Math.max(0, Math.min(1, (eventsIngested as number) / (totalEstimate as number)))
    : 0;

  const showIndeterminate =
    indeterminate ||
    (!knownProgress && (stage === "discovering" || stage === "backfilling" || stage === "queued"));

  const isActive = stage === "discovering" || stage === "backfilling" || stage === "queued";
  const meta = STAGE_BADGE[stage];

  const inner = (
    <section
      id={rootId}
      className={[
        "metraly-sync",
        `metraly-sync--${stage}`,
        showIndeterminate ? "metraly-sync--indeterminate" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={isActive || undefined}
    >
      <header className="metraly-sync__head">
        <div className="metraly-sync__head-text">
          <span className="metraly-sync__source-label">{sourceLabel}</span>
          {sourceId ? <span className="metraly-sync__source-id">{sourceId}</span> : null}
        </div>
        <StatusBadge status={meta.status} label={meta.label} />
      </header>

      <div className="metraly-sync__progress" aria-hidden="true">
        <div
          className={[
            "metraly-sync__bar",
            showIndeterminate ? "metraly-sync__bar--indeterminate" : "",
            stage === "failed" ? "metraly-sync__bar--failed" : "",
            stage === "rate_limited" ? "metraly-sync__bar--rate-limited" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={!showIndeterminate ? { width: `${Math.round(pct * 100)}%` } : undefined}
        />
      </div>

      <div
        className="metraly-sync__progress-sr"
        role="progressbar"
        aria-label={`${sourceLabel} sync progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={showIndeterminate ? undefined : Math.round(pct * 100)}
        aria-valuetext={
          showIndeterminate
            ? `${STAGE_LABEL[stage]} — indeterminate`
            : `${Math.round(pct * 100)}% of estimated ${fmtNum(totalEstimate)} events`
        }
      />

      <ul className="metraly-sync__meta">
        <li className="metraly-sync__meta-row">
          <span className="metraly-sync__meta-key">Stage</span>
          <span className="metraly-sync__meta-val">{STAGE_LABEL[stage]}{subStage ? ` · ${subStage}` : ""}</span>
        </li>
        <li className="metraly-sync__meta-row">
          <span className="metraly-sync__meta-key">Events</span>
          <span className="metraly-sync__meta-val">
            {fmtNum(eventsIngested)}
            {typeof totalEstimate === "number" ? (
              <>
                {" / "}
                <span className="metraly-sync__meta-val-est">~{fmtNum(totalEstimate)}</span>
              </>
            ) : null}
          </span>
        </li>
        <li className="metraly-sync__meta-row">
          <span className="metraly-sync__meta-key">Last sync</span>
          <span className="metraly-sync__meta-val">{fmtTime(lastSyncedAt)}</span>
        </li>
        {rateLimit ? (
          <li className="metraly-sync__meta-row">
            <span className="metraly-sync__meta-key">Rate limit</span>
            <span className="metraly-sync__meta-val">
              {rateLimit.remaining} left / {rateLimit.window}
              {rateLimit.resetAt ? ` · resets ${fmtTime(rateLimit.resetAt)}` : ""}
            </span>
          </li>
        ) : null}
      </ul>

      <footer className="metraly-sync__footer">
        {stage === "incremental" || stage === "backfilling" || stage === "discovering" ? (
          onPause ? (
            <button type="button" className="metraly-sync__btn" onClick={onPause}>Pause</button>
          ) : null
        ) : null}
        {stage === "paused" && onResume ? (
          <button type="button" className="metraly-sync__btn" onClick={onResume}>Resume</button>
        ) : null}
        {(stage === "failed" || stage === "rate_limited") && onRetry ? (
          <button type="button" className="metraly-sync__btn metraly-sync__btn--primary" onClick={onRetry}>
            Retry
          </button>
        ) : null}
        {(stage === "queued" || stage === "discovering" || stage === "backfilling") && onCancel ? (
          <button type="button" className="metraly-sync__btn metraly-sync__btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </footer>
    </section>
  );

  return frame ? <CardShell>{inner}</CardShell> : inner;
};

SyncProgressPanel.displayName = "SyncProgressPanel";

export default SyncProgressPanel;
