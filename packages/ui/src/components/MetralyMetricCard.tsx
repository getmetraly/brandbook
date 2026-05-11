import * as React from "react";
import { MetralyPanel } from "./MetralyPanel";

/**
 * A card used to display a single metric or statistic.
 */
export type MetralyMetricCardVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type MetralyMetricCardDensity = "comfortable" | "compact";

export interface MetralyMetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title describing the metric, e.g. "Active users". */
  title: React.ReactNode;
  /** The metric value; can include units or secondary text. */
  value: React.ReactNode;
  /** Optional description displayed under the value for engineering context. */
  description?: React.ReactNode;
  /** Optional icon or graphic displayed on the left of the content. */
  icon?: React.ReactNode;
  /** Semantic colour variant used for the value. */
  variant?: MetralyMetricCardVariant;
  /** Spacing density for regular cards or dense dashboard rows. */
  density?: MetralyMetricCardDensity;
  /** Optional footer content such as percentage changes or links. */
  footer?: React.ReactNode;
  /** Optional badge or state element displayed in the header. */
  badge?: React.ReactNode;
  /** Additional classes to apply to the outer container. */
  className?: string;
}

export function MetralyMetricCard({
  title,
  value,
  description,
  icon,
  variant = "primary",
  density = "comfortable",
  footer,
  badge,
  className,
  ...rest
}: MetralyMetricCardProps) {
  const classes = [
    "metraly-metric-card",
    `is-${variant}`,
    density !== "comfortable" ? `metraly-metric-card--${density}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <MetralyPanel
      {...rest}
      className={classes}
      data-variant={variant}
      data-density={density}
    >
      <div className="metraly-metric-card-header">
        {icon ? <span className="metraly-metric-card-icon" aria-hidden="true">{icon}</span> : null}
        <div className="metraly-metric-card-copy">
          <div className="metraly-metric-card-title">{title}</div>
          <div className="metraly-metric-card-value">{value}</div>
          {description ? <div className="metraly-metric-card-description">{description}</div> : null}
        </div>
        {badge ? <div className="metraly-metric-card-badge">{badge}</div> : null}
      </div>
      {footer ? <div className="metraly-metric-card-footer">{footer}</div> : null}
    </MetralyPanel>
  );
}

export default MetralyMetricCard;
