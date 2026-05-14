import * as React from "react";

export type MetralyTopbarDensity = "compact" | "comfortable" | "spacious";

export interface MetralyTopbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  density?: MetralyTopbarDensity;
}

export function MetralyTopbar({
  actions,
  breadcrumb,
  children,
  className,
  density = "comfortable",
  subtitle,
  title,
  ...rest
}: MetralyTopbarProps) {
  const classes = [
    "metraly-topbar",
    `metraly-topbar--${density}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header {...rest} className={classes} data-density={density}>
      <div className="metraly-topbar__copy">
        {breadcrumb ? <div className="metraly-topbar__breadcrumb">{breadcrumb}</div> : null}
        <div className="metraly-topbar__title">{title}</div>
        {subtitle ? <div className="metraly-topbar__subtitle">{subtitle}</div> : null}
      </div>
      {children ? <div className="metraly-topbar__content">{children}</div> : null}
      {actions ? <div className="metraly-topbar__actions">{actions}</div> : null}
    </header>
  );
}

export default MetralyTopbar;
