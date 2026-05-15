import * as React from "react";

/**
 * A small semantic badge for compact product surfaces.
 *
 * Badges follow the Claude Design reference style: mono, uppercase, compact
 * and pill-shaped. Use StateBadge when the badge represents live telemetry
 * freshness/health with a visual indicator dot.
 */
export type MetralyBadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface MetralyBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The semantic variant of the badge. Defaults to `primary`. */
  variant?: MetralyBadgeVariant;
  /** The contents of the badge, typically a short label. */
  children: React.ReactNode;
}

export function MetralyBadge({
  variant = "primary",
  className,
  children,
  ...rest
}: MetralyBadgeProps) {
  return (
    <span
      {...rest}
      className={["metraly-badge", `is-${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
    >
      <span className="metraly-badge__label">{children}</span>
    </span>
  );
}

export default MetralyBadge;
