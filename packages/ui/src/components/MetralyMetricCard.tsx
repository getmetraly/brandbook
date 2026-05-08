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

export interface MetralyMetricCardProps {
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
  /** Additional classes to apply to the outer container. */
  className?: string;
}

const variantColours: Record<MetralyMetricCardVariant, string> = {
  primary: "var(--metraly-primary)",
  secondary: "var(--metraly-secondary)",
  success: "var(--metraly-success)",
  warning: "var(--metraly-warning)",
  error: "var(--metraly-error)",
  info: "var(--metraly-info)",
};

export function MetralyMetricCard({
  title,
  value,
  icon,
  variant = "primary",
  footer,
  className,
}: MetralyMetricCardProps) {
  const accent = variantColours[variant];

  return (
    <MetralyPanel className={["p-4 flex flex-col gap-2", className].filter(Boolean).join(" ")}> 
      <div className="flex items-start gap-3">
        {icon && <span className="mt-0.5">{icon}</span>}
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-[color:var(--metraly-text-secondary)]">{title}</div>
          <div className="text-2xl font-display font-semibold" style={{ color: accent }}>
            {value}
          </div>
        </div>
      </div>
      {footer && <div className="pt-2 text-xs text-[color:var(--metraly-text-muted)]">{footer}</div>}
    </MetralyPanel>
  );
}

export default MetralyMetricCard;
