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

export interface MetralyMetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title describing the metric, e.g. "Active users". */
  title: React.ReactNode;
  /** The metric value; can include units or secondary text. */
  value: React.ReactNode;
  /** Optional icon or graphic displayed on the left of the content. */
  icon?: React.ReactNode;
  /** Semantic colour variant used for the value. */
  variant?: MetralyMetricCardVariant;
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
  icon,
  variant = "primary",
  footer,
  badge,
  className,
  ...rest
}: MetralyMetricCardProps) {
  return (
    <MetralyPanel
      {...rest}
      className={["metraly-metric-card", `is-${variant}`, className].filter(Boolean).join(" ")}
    >
      <div className="metraly-metric-card-header">
        {icon ? <span className="metraly-metric-card-icon" aria-hidden="true">{icon}</span> : null}
        <div className="metraly-metric-card-copy">
          <div className="metraly-metric-card-title">{title}</div>
          <div className="metraly-metric-card-value">{value}</div>
        </div>
        {badge ? <div className="metraly-metric-card-badge">{badge}</div> : null}
      </div>
      {footer ? <div className="metraly-metric-card-footer">{footer}</div> : null}
    </MetralyPanel>
  );
}

export default MetralyMetricCard;
