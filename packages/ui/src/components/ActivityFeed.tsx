/**
 * ActivityFeed — engineering event stream surface
 * ------------------------------------------------------------------
 * Renders a chronological list of events for dashboards, source detail
 * pages, plugin pages, and AI provider audit rows. Source-agnostic.
 *
 * Composes:
 *   - CardShell (when frame={true})
 *   - StatusBadge / StateBadge for event severity
 *   - StateBlock / MetralySkeleton for non-ready states
 *
 * Modes:
 *   - "feed"   : full-page chronological feed
 *   - "widget" : compact, fits inside a DashboardWidget
 *
 * Grouping:
 *   - "none"    : flat list
 *   - "day"     : grouped by calendar day header
 *   - "kind"    : grouped by event kind
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StateBlock } from "../components/StateBlock";
import { StatusBadge } from "../components/StatusBadge";
import { MetralySkeleton } from "../components/MetralySkeleton";
import "../styles/metraly-activity-feed.css";

export type ActivityFeedState =
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

export type ActivityKind =
  | "deploy"
  | "pull_request"
  | "incident"
  | "sync"
  | "alert"
  | "plugin"
  | "ai"
  | "connector"
  | "audit"
  | "info";

export type ActivitySeverity = "neutral" | "ok" | "warning" | "danger" | "info";

export interface ActivityItem {
  id: string;
  /** ISO8601. Rendered in mono. */
  timestamp: string;
  kind: ActivityKind;
  title: string;
  /** Short body — sentence case, no terminal period unless multi-sentence. */
  description?: string;
  severity?: ActivitySeverity;
  /** Optional structured fields rendered mono as `key:value` chips. */
  meta?: Array<{ key: string; value: string }>;
  /** Optional internal href. External URLs must be opened by caller via onActivate. */
  href?: string;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  state?: ActivityFeedState;
  /** "feed" (full-page) or "widget" (compact card body). */
  mode?: "feed" | "widget";
  groupBy?: "none" | "day" | "kind";
  /** Wrap in a CardShell. Defaults to true in feed mode, false in widget mode. */
  frame?: boolean;
  title?: string;
  description?: string;
  emptyLabel?: string;
  onItemActivate?: (item: ActivityItem) => void;
  className?: string;
  id?: string;
}

const KIND_LABEL: Record<ActivityKind, string> = {
  deploy: "Deploy",
  pull_request: "PR",
  incident: "Incident",
  sync: "Sync",
  alert: "Alert",
  plugin: "Plugin",
  ai: "AI",
  connector: "Connector",
  audit: "Audit",
  info: "Info",
};

const SEVERITY_TO_BADGE: Record<ActivitySeverity, React.ComponentProps<typeof StatusBadge>["status"]> = {
  neutral: "Preview",
  ok: "Live",
  warning: "Delayed",
  danger: "Error",
  info: "Preview",
};

function formatTime(iso: string): string {
  // Render as YYYY-MM-DD HH:mm in mono. Caller can override by passing pre-formatted.
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

function dayBucket(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0, 10);
  } catch {
    return iso;
  }
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  state = "ready",
  mode = "feed",
  groupBy = "none",
  frame,
  title,
  description,
  emptyLabel = "No activity in this range",
  onItemActivate,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;

  const useFrame = frame ?? mode === "feed";
  const isReady = state === "ready" || state === "partial" || state === "stale";
  const empty = isReady && items.length === 0;

  const body = (
    <div
      id={rootId}
      className={[
        "m-feed",
        `m-feed--${mode}`,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title || description ? (
        <header className="m-feed__head">
          {title ? <span className="m-feed__title">{title}</span> : null}
          {description ? <span className="m-feed__desc">{description}</span> : null}
        </header>
      ) : null}

      {!isReady ? (
        <NonReadyBody state={state} emptyLabel={emptyLabel} />
      ) : empty ? (
        <StateBlock variant="empty" title={emptyLabel} description="Events from connected sources will appear here." density={mode === "widget" ? "compact" : "comfortable"} />
      ) : (
        <GroupedList
          items={items}
          groupBy={groupBy}
          mode={mode}
          onItemActivate={onItemActivate}
        />
      )}

      {state === "stale" || state === "partial" ? (
        <footer className="m-feed__footer">
          <StatusBadge status="Delayed" label={state === "stale" ? "Delayed" : "Partial"} />
          <span className="m-feed__footer-note">
            {state === "stale"
              ? "Showing last successful sync window."
              : "Backfill in progress. New events may appear soon."}
          </span>
        </footer>
      ) : null}
    </div>
  );

  return useFrame ? <CardShell>{body}</CardShell> : body;
};

ActivityFeed.displayName = "ActivityFeed";

// ────────────────────────────────────────────────────────────────────────────

const NonReadyBody: React.FC<{ state: ActivityFeedState; emptyLabel: string }> = ({
  state,
  emptyLabel,
}) => {
  if (state === "loading") {
    return (
      <ul className="m-feed__list m-feed__list--loading" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="m-feed__item m-feed__item--skeleton">
            <MetralySkeleton height="12px" style={{ width: "64px" }} />
            <MetralySkeleton height="14px" style={{ width: "70%" }} />
            <MetralySkeleton height="10px" style={{ width: "40%" }} />
          </li>
        ))}
      </ul>
    );
  }

  const title =
    state === "empty" ? emptyLabel :
    state === "auth_failed" ? "Authentication failed" :
    state === "rate_limited" ? "Rate limited" :
    state === "source_disconnected" ? "Source disconnected" :
    state === "schema_mismatch" ? "Schema mismatch" :
    state === "permission_denied" ? "Permission denied" :
    state === "formula_invalid" ? "Formula invalid" :
    "Could not load activity";

  const tone =
    state === "empty" ? "empty" :
    state === "rate_limited" ? "warning" :
    "error";

  return <StateBlock variant={tone === "empty" ? "empty" : "error"} title={title} />;
};

const GroupedList: React.FC<{
  items: ActivityItem[];
  groupBy: "none" | "day" | "kind";
  mode: "feed" | "widget";
  onItemActivate?: (item: ActivityItem) => void;
}> = ({ items, groupBy, mode, onItemActivate }) => {
  if (groupBy === "none") {
    return (
      <ul className="m-feed__list">
        {items.map((it) => (
          <ActivityRow key={it.id} item={it} mode={mode} onActivate={onItemActivate} />
        ))}
      </ul>
    );
  }

  // group
  const buckets = new Map<string, ActivityItem[]>();
  for (const it of items) {
    const key = groupBy === "day" ? dayBucket(it.timestamp) : KIND_LABEL[it.kind];
    const arr = buckets.get(key) ?? [];
    arr.push(it);
    buckets.set(key, arr);
  }

  return (
    <>
      {[...buckets.entries()].map(([groupLabel, groupItems]) => (
        <section key={groupLabel} className="m-feed__group">
          <header className="m-feed__group-head">
            <span className="m-feed__group-label">{groupLabel}</span>
            <span className="m-feed__group-count">{groupItems.length}</span>
          </header>
          <ul className="m-feed__list">
            {groupItems.map((it) => (
              <ActivityRow key={it.id} item={it} mode={mode} onActivate={onItemActivate} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

const ActivityRow: React.FC<{
  item: ActivityItem;
  mode: "feed" | "widget";
  onActivate?: (item: ActivityItem) => void;
}> = ({ item, mode, onActivate }) => {
  const severity = item.severity ?? "neutral";
  const interactive = !!onActivate || !!item.href;

  const inner = (
    <>
      <div className="m-feed__row-meta">
        <span className="m-feed__time">{formatTime(item.timestamp)}</span>
        <span className="m-feed__kind">{KIND_LABEL[item.kind]}</span>
      </div>
      <div className="m-feed__row-body">
        <div className="m-feed__row-title">
          <span className="m-feed__row-title-text">{item.title}</span>
          {severity !== "neutral" ? (
            <StatusBadge status={SEVERITY_TO_BADGE[severity]} label={severityLabel(severity)} />
          ) : null}
        </div>
        {item.description && mode === "feed" ? (
          <p className="m-feed__row-desc">{item.description}</p>
        ) : null}
        {item.meta && item.meta.length > 0 ? (
          <ul className="m-feed__row-meta-chips" aria-label="event metadata">
            {item.meta.slice(0, mode === "widget" ? 2 : 6).map((m, i) => (
              <li key={i} className="m-feed__chip">
                <span className="m-feed__chip-key">{m.key}</span>
                <span className="m-feed__chip-sep">:</span>
                <span className="m-feed__chip-val">{m.value}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  if (interactive) {
    return (
      <li className="m-feed__item">
        <button
          type="button"
          className="m-feed__row m-feed__row--interactive"
          onClick={() => onActivate?.(item)}
          aria-label={`${KIND_LABEL[item.kind]}: ${item.title}`}
        >
          {inner}
        </button>
      </li>
    );
  }

  return (
    <li className="m-feed__item">
      <div className="m-feed__row">{inner}</div>
    </li>
  );
};

function severityLabel(s: ActivitySeverity): string {
  switch (s) {
    case "ok": return "OK";
    case "warning": return "Warning";
    case "danger": return "Critical";
    case "info": return "Info";
    default: return "";
  }
}

export default ActivityFeed;
