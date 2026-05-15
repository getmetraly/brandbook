import * as React from "react";
import { CardShell, type CardShellTone } from "./CardShell";

/**
 * A card used to display a single metric or statistic.
 * It composes the shared CardShell foundation while keeping a metric-specific API.
 */
export type MetralyMetricCardVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type MetralyMetricCardDensity = "comfortable" | "compact";

export interface MetralyMetricCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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

const variantTone: Record<MetralyMetricCardVariant, CardShellTone> = {
  primary: "cyan",
  secondary: "purple",
  success: "success",
  warning: "warning",
  error: "danger",
  info: "info",
};

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
  return (
    <CardShell
      {...rest}
      className={[
        "metraly-metric-card",
        `is-${variant}`,
        density !== "comfortable" ? `metraly-metric-card--${density}` : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-density={density}
      density={density}
      tone={variantTone[variant]}
      headerClassName="metraly-metric-card-header"
      bodyClassName="metraly-metric-card-body"
      footerClassName="metraly-metric-card-footer"
      footer={footer}
      header={(
        <>
          {icon ? <span className="metraly-metric-card-icon" aria-hidden="true">{icon}</span> : null}
          <div className="metraly-metric-card-copy">
            <div className="metraly-metric-card-title">{title}</div>
            <div className="metraly-metric-card-value">{value}</div>
            {description ? <div className="metraly-metric-card-description">{description}</div> : null}
          </div>
          {badge ? <div className="metraly-metric-card-badge">{badge}</div> : null}
        </>
      )}
    />
  );
}

export default MetralyMetricCard;
