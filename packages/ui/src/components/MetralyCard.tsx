import * as React from "react";
import { CardShell } from "./CardShell";

/**
 * A universal card component with slots for title, subtitle, body and footer.
 * It supports semantic states (selected, error, loading, empty) and applies
 * consistent styling via CardShell. Use it for generic content cards; use
 * MetralyMetricCard for KPI summaries and DashboardWidget for editable canvas widgets.
 */
export type MetralyCardState = "default" | "selected" | "error" | "loading" | "empty";
export type MetralyCardDensity = "comfortable" | "compact";

export interface MetralyCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
  ...rest
}: MetralyCardProps) {
  const isLoading = state === "loading";
  const isEmpty = state === "empty";

  return (
    <CardShell
      {...rest}
      className={["metraly-card", className].filter(Boolean).join(" ")}
      state={state}
      density={density}
      leading={icon}
      title={title}
      subtitle={subtitle}
      leadingClassName="metraly-card-icon"
      headingClassName="metraly-card-heading"
      titleClassName="metraly-card-title"
      subtitleClassName="metraly-card-subtitle"
      headerClassName="metraly-card-header"
      bodyClassName="metraly-card-body"
      footerClassName="metraly-card-footer"
      footer={footer}
      aria-busy={isLoading ? true : undefined}
    >
      {isLoading ? (
        <div className="metraly-card-skeleton" role="status" aria-label="Loading card content">
          <div className="skeleton-bar skeleton-bar--short" />
          <div className="skeleton-bar skeleton-bar--medium" />
          <div className="skeleton-bar skeleton-bar--long" />
        </div>
      ) : null}
      {isEmpty ? <div className="metraly-card-empty">{emptyLabel}</div> : null}
      {!isLoading && !isEmpty ? children : null}
    </CardShell>
  );
}

export default MetralyCard;
