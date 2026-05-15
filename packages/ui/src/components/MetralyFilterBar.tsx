import * as React from "react";
import { FieldShell } from "./FieldShell";

export interface MetralyFilterBarItem {
  id: string;
  label: React.ReactNode;
  control?: React.ReactNode;
  meta?: React.ReactNode;
}

export interface MetralyFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: MetralyFilterBarItem[];
  onReset?: () => void;
  collapsed?: boolean;
  actions?: React.ReactNode;
}

export function MetralyFilterBar({
  filters,
  onReset,
  collapsed = false,
  actions,
  className,
  ...rest
}: MetralyFilterBarProps) {
  const classes = [
    "metraly-filter-bar",
    collapsed ? "is-collapsed" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...rest} className={classes} data-collapsed={collapsed ? "true" : "false"}>
      <div className="metraly-filter-bar__items">
        {filters.map((filter) => (
          <FieldShell
            key={filter.id}
            as="div"
            layout="filter-chip"
            label={filter.label}
            className="metraly-filter-bar__item"
          >
            <span className="metraly-filter-bar__label">{filter.label}</span>
            {filter.control ? <div className="metraly-filter-bar__control">{filter.control}</div> : null}
            {filter.meta ? <span className="metraly-filter-bar__meta">{filter.meta}</span> : null}
          </FieldShell>
        ))}
      </div>
      <div className="metraly-filter-bar__actions">
        {onReset ? (
          <button type="button" className="metraly-filter-bar__reset" onClick={onReset}>
            Reset
          </button>
        ) : null}
        {actions}
      </div>
    </div>
  );
}

export default MetralyFilterBar;
