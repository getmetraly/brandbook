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

const GROUP_META = {
  required: {
    label: "Required",
    description: "Minimum scopes needed for metrics and workflow mapping.",
  },
  attention: {
    label: "Needs attention",
    description: "Missing or deprecated scopes that can block attribution.",
  },
  optional: {
    label: "Optional / extra",
    description: "Additional access that should stay intentional.",
  },
} as const;

function scopeNeedsAttention(scope: PermissionScope): boolean {
  return (
    scope.state === "missing" ||
    scope.state === "deprecated" ||
    (scope.requirement === "required" && scope.state === "unknown")
  );
}

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
      if (s.state === "extra" || s.state === "deprecated") return 3;
      return 4;
    };
    return [...scopes].sort((a, b) => order(a) - order(b));
  }, [scopes]);

  const summary = React.useMemo(() => {
    const granted = scopes.filter((s) => s.state === "granted").length;
    const missingReq = scopes.filter((s) => s.requirement === "required" && s.state === "missing").length;
    return { granted, total: scopes.length, missingReq };
  }, [scopes]);

  const groups = React.useMemo(() => {
    const required = sorted.filter((s) => s.requirement === "required" && !scopeNeedsAttention(s));
    const attention = sorted.filter(scopeNeedsAttention);
    const optional = sorted.filter((s) => s.requirement === "optional" && !scopeNeedsAttention(s));

    return [
      { key: "required", ...GROUP_META.required, scopes: required },
      { key: "attention", ...GROUP_META.attention, scopes: attention },
      { key: "optional", ...GROUP_META.optional, scopes: optional },
    ].filter((group) => group.scopes.length > 0);
  }, [sorted]);

  const inner = (
    <section
      id={rootId}
      className={[
        "metraly-perm",
        compact ? "metraly-perm--compact" : "",
        summary.missingReq > 0 ? "metraly-perm--has-missing" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={title ? `${rootId}-title` : undefined}
      aria-label={title ? undefined : "Required permissions"}
    >
      <header className="metraly-perm__head">
        <div className="metraly-perm__head-text">
          {title ? <span id={`${rootId}-title`} className="metraly-perm__title">{title}</span> : null}
          {description ? <span className="metraly-perm__desc">{description}</span> : null}
        </div>
        <div className="metraly-perm__summary">
          <span className="metraly-perm__summary-counts" aria-label={`${summary.granted} of ${summary.total} scopes granted`}>
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

      <div className="metraly-perm__groups">
        {groups.map((group) => (
          <section
            key={group.key}
            className={`metraly-perm__group metraly-perm__group--${group.key}`}
            aria-labelledby={`${rootId}-${group.key}`}
          >
            <div className="metraly-perm__group-head">
              <div className="metraly-perm__group-copy">
                <span id={`${rootId}-${group.key}`} className="metraly-perm__group-label">
                  {group.label}
                </span>
                {!compact ? <span className="metraly-perm__group-desc">{group.description}</span> : null}
              </div>
              <span className="metraly-perm__group-count">{group.scopes.length}</span>
            </div>

            <ul className="metraly-perm__list">
              {group.scopes.map((s) => {
                const stateMeta = STATE_BADGE[s.state];
                const hasMetrics = !compact && s.unlocksMetrics && s.unlocksMetrics.length > 0;

                return (
                  <li
                    key={s.id}
                    className={[
                      "metraly-perm__item",
                      `metraly-perm__item--${s.state}`,
                      s.requirement === "required" ? "metraly-perm__item--required" : "metraly-perm__item--optional",
                      scopeNeedsAttention(s) ? "metraly-perm__item--attention" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="metraly-perm__identity">
                      <code className="metraly-perm__scope">{s.id}</code>
                      <span className={`metraly-perm__req metraly-perm__req--${s.requirement}`}>
                        {s.requirement === "required" ? "Required" : "Optional"}
                      </span>
                    </div>

                    <p className="metraly-perm__reason">{s.reason}</p>

                    <div className="metraly-perm__state">
                      <StatusBadge status={stateMeta.status} label={stateMeta.label} />
                    </div>

                    {hasMetrics ? (
                      <div className="metraly-perm__metrics">
                        <span className="metraly-perm__metrics-label">Unlocks</span>
                        <ul className="metraly-perm__metrics-list">
                          {s.unlocksMetrics?.map((m) => (
                            <li key={m} className="metraly-perm__metrics-chip">{m}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );

  return frame ? <CardShell className="metraly-perm-card">{inner}</CardShell> : inner;
};

PermissionExplainer.displayName = "PermissionExplainer";
export default PermissionExplainer;
