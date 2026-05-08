import * as React from "react";

/**
 * A small status badge that conveys semantic meaning through colour.
 *
 * Badges are used to mark live streams, beta features, sync states and
 * other contextual information. They use Metraly design tokens so colours
 * adapt to dark and light themes.
 */
export type MetralyBadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface MetralyBadgeProps {
  /** The semantic variant of the badge. Defaults to `primary`. */
  variant?: MetralyBadgeVariant;
  /** Additional CSS classes to apply. */
  className?: string;
  /** The contents of the badge, typically a short label. */
  children: React.ReactNode;
}

const stylesForVariant: Record<MetralyBadgeVariant, { bg: string; color: string }> = {
  primary: { bg: "var(--metraly-cyan-dim)", color: "var(--metraly-primary)" },
  secondary: { bg: "var(--metraly-purple-dim)", color: "var(--metraly-secondary)" },
  success: { bg: "var(--metraly-green-dim)", color: "var(--metraly-success)" },
  warning: { bg: "var(--metraly-warning-dim)", color: "var(--metraly-warning)" },
  error: { bg: "var(--metraly-error-dim)", color: "var(--metraly-error)" },
  info: { bg: "var(--metraly-info-dim)", color: "var(--metraly-info)" },
};

export function MetralyBadge({
  variant = "primary",
  className,
  children,
}: MetralyBadgeProps) {
  const { bg, color } = stylesForVariant[variant];

  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "font-medium text-[0.75rem] leading-tight",
        "px-2 py-[0.125rem] rounded-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </span>
  );
}

export default MetralyBadge;
