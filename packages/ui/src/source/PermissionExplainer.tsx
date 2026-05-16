/**
 * PermissionExplainer — connector scope explainer
 * ------------------------------------------------------------------
 * Renders the scopes a connector needs, why it needs each one, and any
 * scope-state issues (missing, extra, deprecated). Used inside the
 * connector wizard's "Permissions" step and inside source / provider
 * settings audit views.
 *
 * Source-agnostic: callers pass a list of scopes. This component does
 * not embed any GitHub/Jira/Linear-specific scope catalog.
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-source.css";

export type ScopeRequirement = "required" | "optional";
export type ScopeState = "granted" | "missing" | "extra" | "deprecated" | "unknown";

export interface PermissionScope {
  /** Provider-specific scope id, e.g. "repo", "read:org". Rendered mono. */
  id: string;
  requirement: ScopeRequirement;
  state: ScopeState;
  /** Why we need this scope — sentence case, no period. */
  reason: string;
  /** Optional list of metric ids this scope unlocks. */
  unlocksMetrics?: string[];
}

export interface PermissionExplainerProps {
  scopes: PermissionScope[];
  /** Render with surrounding CardShell. Defaults to true. */
  frame?: boolean;
  /** Optional title / description above the list. */
  title?: string;
  description?: string;
  /** Compact mode shrinks rows and hides metric mapping. */
  compact?: boolean;
  className?: string;
  id?: string;
}

const STATE_BADGE: Record<ScopeState, { status: React.ComponentProps<typeof StatusBadge>["status"]; label: string }> = {
  granted:    { status: "Live",    label: "Granted" },
  missing:    { status: "Error",   label: "Missing" },
  extra:      { status: "Delayed", label: "Extra" },
  deprecated: { status: "Delayed", label: "Deprecated" },
  unknown:    { status: "Preview", label: "Unknown" },
};

export const PermissionExplainer: React.FC<PermissionExplainerProps> = ({
  scopes,
  frame = true,
  title,
  description,
  compact = false,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;

  // Sort: required missing first, then required granted, then optional.
  const sorted = React.useMemo(() => {
    const order = (s: PermissionScope) => {
      if (s.requirement === "required" && s.state === "missing") return 0;
      if (s.requirement === "required") return 1;
      if (s.requirement === "optional" && s.state === "missing") return 2;
      return 3;
    };
    return [...scopes].sort((a, b) => order(a) - order(b));
  }, [scopes]);

  const summary = React.useMemo(() => {
    const granted = scopes.filter((s) => s.state === "granted").length;
    const missingReq = scopes.filter((s) => s.requirement === "required" && s.state === "missing").length;
    return { granted, total: scopes.length, missingReq };
  }, [scopes]);

  const inner = (
    <section
      id={rootId}
      className={[
        "metraly-perm",
        compact ? "metraly-perm--compact" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={title ?? "Required permissions"}
    >
      <header className="metraly-perm__head">
        <div className="metraly-perm__head-text">
          {title ? <span className="metraly-perm__title">{title}</span> : null}
          {description ? <span className="metraly-perm__desc">{description}</span> : null}
        </div>
        <div className="metraly-perm__summary">
          <span className="metraly-perm__summary-counts">
            <span className="metraly-perm__summary-num">{summary.granted}</span>
            <span className="metraly-perm__summary-sep">/</span>
            <span className="metraly-perm__summary-total">{summary.total}</span>
            <span className="metraly-perm__summary-label">granted</span>
          </span>
          {summary.missingReq > 0 ? (
            <StatusBadge status="Error" label={`${summary.missingReq} required missing`} />
          ) : null}
        </div>
      </header>

      <ul className="metraly-perm__list">
        {sorted.map((s) => (
          <li
            key={s.id}
            className={[
              "metraly-perm__item",
              `metraly-perm__item--${s.state}`,
              s.requirement === "required" ? "metraly-perm__item--required" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="metraly-perm__item-head">
              <code className="metraly-perm__scope">{s.id}</code>
              <span className={`metraly-perm__req metraly-perm__req--${s.requirement}`}>
                {s.requirement === "required" ? "Required" : "Optional"}
              </span>
              <StatusBadge status={STATE_BADGE[s.state].status} label={STATE_BADGE[s.state].label} />
            </div>
            <p className="metraly-perm__reason">{s.reason}</p>
            {!compact && s.unlocksMetrics && s.unlocksMetrics.length > 0 ? (
              <div className="metraly-perm__metrics">
                <span className="metraly-perm__metrics-label">Unlocks</span>
                <ul className="metraly-perm__metrics-list">
                  {s.unlocksMetrics.map((m) => (
                    <li key={m} className="metraly-perm__metrics-chip">{m}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );

  return frame ? <CardShell>{inner}</CardShell> : inner;
};

PermissionExplainer.displayName = "PermissionExplainer";
export default PermissionExplainer;
