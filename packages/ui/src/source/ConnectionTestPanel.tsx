/**
 * ConnectionTestPanel — connector / provider reachability panel
 * ------------------------------------------------------------------
 * Shows the result of a test connection. Source-agnostic — caller
 * supplies the structured result.
 *
 * Statuses:
 *   not_tested | testing | ready | auth_failed | permission_denied
 *   rate_limited | source_unavailable | degraded
 *
 * Honest behavior:
 *   - Never displays secrets.
 *   - Provides a single clear "retry" action.
 *   - When the result is "degraded", lists which checks passed and
 *     which checks did not.
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-source.css";

export type ConnectionTestStatus =
  | "not_tested"
  | "testing"
  | "ready"
  | "auth_failed"
  | "permission_denied"
  | "rate_limited"
  | "source_unavailable"
  | "degraded";

export interface ConnectionCheck {
  id: string;
  label: string;
  result: "ok" | "fail" | "skip";
  /** Short reason; sentence case, no terminal period. */
  detail?: string;
}

export interface ConnectionTestPanelProps {
  status: ConnectionTestStatus;
  /** Per-check breakdown. Optional; used in "ready" and "degraded". */
  checks?: ConnectionCheck[];
  /** ISO timestamp of last test. Rendered mono. */
  lastTestedAt?: string;
  /** Latency observed during last successful probe. Rendered mono. */
  latencyMs?: number;
  /** Hint about what to do next. Optional. */
  nextStep?: string;
  /** Retry handler — required for any non-"not_tested" state to be useful. */
  onRetry?: () => void;
  frame?: boolean;
  className?: string;
  id?: string;
}

const STATUS_TO_BADGE: Record<ConnectionTestStatus, { status: React.ComponentProps<typeof StatusBadge>["status"]; label: string }> = {
  not_tested:         { status: "Preview", label: "Not tested" },
  testing:            { status: "Preview", label: "Testing" },
  ready:              { status: "Live",    label: "Ready" },
  auth_failed:        { status: "Error",   label: "Auth failed" },
  permission_denied:  { status: "Error",   label: "Permission denied" },
  rate_limited:       { status: "Delayed", label: "Rate limited" },
  source_unavailable: { status: "Error",   label: "Source unavailable" },
  degraded:           { status: "Delayed", label: "Degraded" },
};

const STATUS_TITLE: Record<ConnectionTestStatus, string> = {
  not_tested: "Connection has not been tested yet",
  testing: "Testing connection",
  ready: "Connection is ready",
  auth_failed: "Authentication failed",
  permission_denied: "Permission denied",
  rate_limited: "Rate limited by the provider",
  source_unavailable: "Source is unreachable",
  degraded: "Connection works, but some checks failed",
};

const STATUS_HELP: Record<ConnectionTestStatus, string> = {
  not_tested: "Run a test to verify the token and required scopes.",
  testing: "Probing the source. This usually takes a few seconds.",
  ready: "All required checks passed. You can continue.",
  auth_failed: "Token was rejected. Check that it has not expired and that the right kind of token is in use.",
  permission_denied: "The token authenticated, but lacks one or more required scopes.",
  rate_limited: "The provider returned 429. Retrying will resume once the quota window resets.",
  source_unavailable: "The source did not respond. Check the host or your egress allowlist.",
  degraded: "Core checks passed but optional checks did not. Backfill and metrics may be limited.",
};

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

export const ConnectionTestPanel: React.FC<ConnectionTestPanelProps> = ({
  status,
  checks,
  lastTestedAt,
  latencyMs,
  nextStep,
  onRetry,
  frame = true,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;

  const meta = STATUS_TO_BADGE[status];

  const inner = (
    <section
      id={rootId}
      className={[
        "m-conntest",
        `m-conntest--${status}`,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={status === "testing" || undefined}
    >
      <header className="m-conntest__head">
        <div className="m-conntest__head-text">
          <span className="m-conntest__title">{STATUS_TITLE[status]}</span>
          <span className="m-conntest__help">{nextStep ?? STATUS_HELP[status]}</span>
        </div>
        <StatusBadge status={meta.status} label={meta.label} />
      </header>

      <ul className="m-conntest__meta" aria-label="Test metadata">
        <li className="m-conntest__meta-row">
          <span className="m-conntest__meta-key">Last tested</span>
          <span className="m-conntest__meta-val">{fmtTime(lastTestedAt)}</span>
        </li>
        <li className="m-conntest__meta-row">
          <span className="m-conntest__meta-key">Latency</span>
          <span className="m-conntest__meta-val">
            {typeof latencyMs === "number" ? `${latencyMs} ms` : "—"}
          </span>
        </li>
      </ul>

      {checks && checks.length > 0 ? (
        <ul className="m-conntest__checks" aria-label="Connection checks">
          {checks.map((c) => (
            <li key={c.id} className={`m-conntest__check m-conntest__check--${c.result}`}>
              <span className={`m-conntest__check-dot m-conntest__check-dot--${c.result}`} aria-hidden="true" />
              <span className="m-conntest__check-label">{c.label}</span>
              {c.detail ? <span className="m-conntest__check-detail">{c.detail}</span> : null}
              <span className="m-conntest__check-result">
                {c.result === "ok" ? "passed" : c.result === "fail" ? "failed" : "skipped"}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {onRetry ? (
        <footer className="m-conntest__footer">
          <button
            type="button"
            className="m-conntest__btn"
            onClick={onRetry}
            disabled={status === "testing"}
          >
            {status === "testing" ? "Testing…" : "Test again"}
          </button>
        </footer>
      ) : null}
    </section>
  );

  return frame ? <CardShell>{inner}</CardShell> : inner;
};

ConnectionTestPanel.displayName = "ConnectionTestPanel";

export default ConnectionTestPanel;
