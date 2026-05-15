import * as React from "react";

export type MetralyEmptyStateVariant = "default" | "gated" | "error" | "no-results";

export interface MetralyEmptyStateProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: MetralyEmptyStateVariant;
}

export function MetralyEmptyState({
  title,
  description,
  action,
  icon,
  variant = "default",
  className,
  ...rest
}: MetralyEmptyStateProps) {
  const classes = [
    "metraly-empty-state",
    `is-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      {...rest}
      className={classes}
      data-variant={variant}
      aria-label={typeof title === "string" ? title : "Empty state"}
    >
      {icon ? <div className="metraly-empty-state__icon" aria-hidden="true">{icon}</div> : null}
      <div className="metraly-empty-state__copy">
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="metraly-empty-state__action">{action}</div> : null}
    </section>
  );
}

export default MetralyEmptyState;
