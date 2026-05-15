import * as React from "react";
import { StateBadge, type StateBadgeState } from "../components/StateBadge";
import { MetralySkeleton } from "../components/MetralySkeleton";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReviewPanelItem {
  id: string;
  /** Icon node rendered in the icon cell. Use MetralyIcon or a custom svg. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Secondary value text or node shown on the right side of the row. */
  value?: React.ReactNode;
  /** Optional status badge shown alongside the value. */
  badgeState?: StateBadgeState;
  /** Override the badge label; defaults to the `badgeState` string. */
  badgeLabel?: string;
}

export interface ReviewPanelProps {
  /** Section heading. */
  title?: React.ReactNode;
  /** Supporting description shown below the title. */
  description?: React.ReactNode;
  /** Review items to display. */
  items: ReviewPanelItem[];
  /** Text shown when `items` is empty and `loading` is false. */
  emptyText?: string;
  /** When true, renders skeleton placeholder rows. */
  loading?: boolean;
  /** Number of skeleton rows when loading. Defaults to 3. */
  loadingRows?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Displays a list of key/value summary rows in the wizard review step.
 *
 * Compose inside `WizardLayout`'s `review` slot, or use standalone for
 * connector, dashboard, or plugin review surfaces.
 */
export function ReviewPanel({
  title,
  description,
  items,
  emptyText = "Nothing to review",
  loading = false,
  loadingRows = 3,
  className,
  style,
}: ReviewPanelProps) {
  const classes = ["metraly-review-panel", className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style}>
      {(title || description) ? (
        <div className="metraly-review-panel__head">
          {title ? (
            <div className="metraly-review-panel__title">{title}</div>
          ) : null}
          {description ? (
            <div className="metraly-review-panel__description">{description}</div>
          ) : null}
        </div>
      ) : null}

      <div className="metraly-review-panel__list" role="list">
        {loading
          ? Array.from({ length: loadingRows }, (_, i) => (
              <div key={i} className="metraly-review-panel__item metraly-review-panel__item--loading" role="listitem">
                <MetralySkeleton variant="text" height="36px" />
              </div>
            ))
          : items.length === 0
          ? (
            <div className="metraly-review-panel__empty">{emptyText}</div>
          )
          : items.map((item) => (
              <div
                key={item.id}
                className="metraly-review-panel__item"
                role="listitem"
              >
                {item.icon ? (
                  <span className="metraly-review-panel__item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                ) : null}

                <div className="metraly-review-panel__item-copy">
                  <span className="metraly-review-panel__item-label">{item.label}</span>
                  {item.value ? (
                    <span className="metraly-review-panel__item-value">{item.value}</span>
                  ) : null}
                </div>

                {item.badgeState ? (
                  <StateBadge
                    state={item.badgeState}
                    label={item.badgeLabel}
                    size="sm"
                  />
                ) : null}
              </div>
            ))}
      </div>
    </div>
  );
}

export default ReviewPanel;
