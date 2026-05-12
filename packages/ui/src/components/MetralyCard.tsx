import * as React from "react";
import { MetralyPanel } from "./MetralyPanel";

/**
 * A universal card component with slots for title, subtitle, body and footer.
 * It supports semantic states (selected, error, loading, empty) and applies
 * consistent styling via CSS classes. Use this component as a building block
 * for dashboard widgets, metric summaries and list items.
 */
export type MetralyCardState = "default" | "selected" | "error" | "loading" | "empty";
export type MetralyCardDensity = "comfortable" | "compact";

export interface MetralyCardProps {
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Title displayed at the top of the card. */
  title: React.ReactNode;
  /** Optional subtitle displayed below the title. */
  subtitle?: React.ReactNode;
  /** Body content (children) displayed in the main area of the card. */
  children?: React.ReactNode;
  /** Optional footer displayed at the bottom of the card. */
  footer?: React.ReactNode;
  /** Card state controlling visual appearance. */
  state?: MetralyCardState;
  /** Spacing density for regular cards or dense dashboard rows. */
  density?: MetralyCardDensity;
  /** Empty-state text used when state is empty. */
  emptyLabel?: React.ReactNode;
  /** Additional class names to append to the outer container. */
  className?: string;
}

export function MetralyCard({
  icon,
  title,
  subtitle,
  children,
  footer,
  state = "default",
  density = "comfortable",
  emptyLabel = "No data",
  className,
}: MetralyCardProps) {
  const classes = [
    "metraly-card",
    state !== "default" ? `is-${state}` : null,
    density !== "comfortable" ? `metraly-card--${density}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isLoading = state === "loading";
  const isEmpty = state === "empty";

  return (
    <MetralyPanel
      className={classes}
      data-state={state}
      data-density={density}
      aria-busy={isLoading ? true : undefined}
    >
      <div className="metraly-card-header">
        {icon && <span className="metraly-card-icon">{icon}</span>}
        <div className="metraly-card-heading">
          <div className="metraly-card-title">{title}</div>
          {subtitle && <div className="metraly-card-subtitle">{subtitle}</div>}
        </div>
      </div>
      <div className="metraly-card-body">
        {isLoading && (
          <div className="metraly-card-skeleton" role="status" aria-label="Loading card content">
            <div className="skeleton-bar skeleton-bar--short" />
            <div className="skeleton-bar skeleton-bar--medium" />
            <div className="skeleton-bar skeleton-bar--long" />
          </div>
        )}
        {isEmpty && <div className="metraly-card-empty">{emptyLabel}</div>}
        {!isLoading && !isEmpty && children}
      </div>
      {footer && <div className="metraly-card-footer">{footer}</div>}
    </MetralyPanel>
  );
}

export default MetralyCard;