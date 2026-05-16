/**
 * StateBoard — group of per-item status tiles
 * ------------------------------------------------------------------
 * Use for: source health board, service status board, repo readiness,
 * plugin/runtime status board, provider connector status board.
 *
 * Two layout variants: "grid" (responsive tile grid) and "list" (one
 * row per item, denser).
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StateBlock } from "../components/StateBlock";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-state-board.css";

export type StateBoardState =
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

export type StateBoardItemStatus =
  | "ok"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "gated"
  | "disabled";

export interface StateBoardItem {
  id: string;
  label: string;
  /** Optional sub-label (sentence case). */
  hint?: string;
  status: StateBoardItemStatus;
  /** Optional status display override. Defaults to humanized status. */
  statusLabel?: string;
  /** Optional small metric/value rendered mono (e.g. "12 / 30"). */
  meter?: string;
  /** Optional timestamp; rendered mono. */
  timestamp?: string;
  /** Optional drilldown handler. */
  onActivate?: () => void;
}

export interface StateBoardProps {
  title?: string;
  description?: string;
  items: StateBoardItem[];
  variant?: "grid" | "list";
  state?: StateBoardState;
  frame?: boolean;
  emptyLabel?: string;
  /** Show summary chip strip above the items. */
  showSummary?: boolean;
  className?: string;
  id?: string;
}

const STATUS_TO_BADGE: Record<StateBoardItemStatus, React.ComponentProps<typeof StatusBadge>["status"]> = {
  ok: "Live",
  warning: "Delayed",
  danger: "Error",
  info: "Preview",
  neutral: "Preview",
  gated: "Gated",
  disabled: "Planned",
};

function humanStatus(s: StateBoardItemStatus): string {
  switch (s) {
    case "ok": return "Healthy";
    case "warning": return "Attention";
    case "danger": return "Failing";
    case "info": return "Info";
    case "neutral": return "Inactive";
    case "gated": return "Gated";
    case "disabled": return "Disabled";
  }
}

export const StateBoard: React.FC<StateBoardProps> = ({
  title,
  description,
  items,
  variant = "grid",
  state = "ready",
  frame = true,
  emptyLabel = "Nothing to report",
  showSummary = true,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const isReady = state === "ready" || state === "partial" || state === "stale";

  const summary = React.useMemo(() => {
    const counts: Record<StateBoardItemStatus, number> = {
      ok: 0, warning: 0, danger: 0, info: 0, neutral: 0, gated: 0, disabled: 0,
    };
    for (const it of items) counts[it.status]++;
    return counts;
  }, [items]);

  const inner = (
    <section
      id={rootId}
      className={[
        "m-board",
        `m-board--${variant}`,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={state === "loading" || undefined}
    >
      {title || description ? (
        <header className="m-board__head">
          <div className="m-board__head-text">
            {title ? <span className="m-board__title">{title}</span> : null}
            {description ? <span className="m-board__desc">{description}</span> : null}
          </div>
          {showSummary && isReady && items.length > 0 ? (
            <ul className="m-board__summary" aria-label="status summary">
              {(["danger", "warning", "ok"] as StateBoardItemStatus[]).map((s) =>
                summary[s] > 0 ? (
                  <li key={s} className={`m-board__summary-chip m-board__summary-chip--${s}`}>
                    <span className="m-board__summary-dot" aria-hidden="true" />
                    <span className="m-board__summary-count">{summary[s]}</span>
                    <span className="m-board__summary-label">{humanStatus(s)}</span>
                  </li>
                ) : null,
              )}
            </ul>
          ) : null}
        </header>
      ) : null}

      {!isReady ? (
        <StateBlock
          variant={state === "loading" ? "loading" : state === "empty" ? "empty" : state === "source_disconnected" ? "disconnected" : "error"}
          title={titleForState(state, emptyLabel)}
          description={hintForState(state)}
        />
      ) : items.length === 0 ? (
        <StateBlock variant="empty" title={emptyLabel} />
      ) : (
        <ul className={`m-board__items m-board__items--${variant}`} role="list">
          {items.map((it) => (
            <li key={it.id} className="m-board__item-wrap">
              <BoardItem item={it} variant={variant} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return frame ? <CardShell className="m-board-frame">{inner}</CardShell> : inner;
};

StateBoard.displayName = "StateBoard";

const BoardItem: React.FC<{ item: StateBoardItem; variant: "grid" | "list" }> = ({ item, variant }) => {
  const Wrap: React.ElementType = item.onActivate ? "button" : "div";
  return (
    <Wrap
      type={item.onActivate ? "button" : undefined}
      onClick={item.onActivate}
      className={[
        "m-board__item",
        `m-board__item--${item.status}`,
        item.onActivate ? "m-board__item--interactive" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="m-board__item-head">
        <span className={`m-board__dot m-board__dot--${item.status}`} aria-hidden="true" />
        <span className="m-board__item-label">{item.label}</span>
        <StatusBadge status={STATUS_TO_BADGE[item.status]} label={item.statusLabel ?? humanStatus(item.status)} />
      </div>
      {item.hint ? <p className="m-board__item-hint">{item.hint}</p> : null}
      <div className="m-board__item-meta">
        {item.meter ? <span className="m-board__item-meter">{item.meter}</span> : null}
        {item.timestamp ? <span className="m-board__item-time">{item.timestamp}</span> : null}
      </div>
    </Wrap>
  );
};

function titleForState(state: StateBoardState, emptyLabel: string): string {
  switch (state) {
    case "loading": return "Loading";
    case "empty": return emptyLabel;
    case "auth_failed": return "Authentication failed";
    case "rate_limited": return "Rate limited";
    case "source_disconnected": return "Source disconnected";
    case "schema_mismatch": return "Schema mismatch";
    case "permission_denied": return "Permission denied";
    case "formula_invalid": return "Formula invalid";
    case "error": return "Could not load";
    case "stale": return "Delayed";
    case "partial": return "Partial data";
    default: return "";
  }
}

function hintForState(state: StateBoardState): string | undefined {
  switch (state) {
    case "empty": return "Items will appear here once they are reporting.";
    case "stale": return "Showing last successful snapshot.";
    case "partial": return "Some items are still being evaluated.";
    case "auth_failed": return "Re-authorize the relevant source.";
    case "rate_limited": return "Upstream throttled. Retrying.";
    case "source_disconnected": return "Source is unreachable.";
    case "schema_mismatch": return "Schema changed. Re-validate the mapping.";
    case "permission_denied": return "Scopes too narrow.";
    case "formula_invalid": return "Formula did not compile.";
    case "error": return "Retry or open the error log.";
    default: return undefined;
  }
}

export default StateBoard;
