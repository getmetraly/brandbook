import * as React from "react";
import { MetralyPanel } from "./MetralyPanel";

/**
 * A universal card component with slots for title, subtitle, body and footer.
 * It supports semantic states (selected, error, loading, empty) and applies
 * consistent styling via CSS classes. Use this component as a building block
 * for dashboard widgets, metric summaries and list items.
 */
export type MetralyCardState = "default" | "selected" | "error" | "loading" | "empty";

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
  className,
}: MetralyCardProps) {
  // Build a list of classes based on the state
  const classes = [
    "metraly-card",
    state !== "default" ? `is-${state}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <MetralyPanel className={classes}>
      <div className="metraly-card-header">
        {icon && <span className="metraly-card-icon">{icon}</span>}
        <div className="metraly-card-heading">
          <div className="metraly-card-title">{title}</div>
          {subtitle && <div className="metraly-card-subtitle">{subtitle}</div>}
        </div>
      </div>
      <div className="metraly-card-body">
        {state === "loading" && (
          <div className="metraly-card-skeleton">
            <div className="skeleton-bar skeleton-bar--short" />
            <div className="skeleton-bar skeleton-bar--medium" />
            <div className="skeleton-bar skeleton-bar--long" />
          </div>
        )}
        {state === "empty" && <div className="metraly-card-empty">No data</div>}
        {state !== "loading" && state !== "empty" && children}
      </div>
      {footer && <div className="metraly-card-footer">{footer}</div>}
    </MetralyPanel>
  );
}

export default MetralyCard;