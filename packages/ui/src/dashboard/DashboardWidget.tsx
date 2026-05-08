import * as React from "react";
import { WidgetShell } from "../components/WidgetShell";
import type { StateBadgeState } from "../components/StateBadge";

export interface DashboardWidgetProps {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  state?: StateBadgeState;
  stateLabel?: string;
  selected?: boolean;
  dragging?: boolean;
  resizable?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function DashboardWidget({
  id,
  title,
  subtitle,
  state = "live",
  stateLabel,
  selected = false,
  dragging = false,
  resizable = true,
  children,
  footer,
  className,
  onSelect,
  onRemove,
}: DashboardWidgetProps) {
  const canSelect = Boolean(id && onSelect);
  const canRemove = Boolean(id && onRemove);
  const rootProps = canSelect
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: () => onSelect?.(id!),
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect?.(id!);
          }
        },
      }
    : {};

  return (
    <div
      className={["metraly-dashboard-widget", selected && "is-selected", className]
        .filter(Boolean)
        .join(" ")}
      data-widget-id={id}
      {...rootProps}
    >
      <WidgetShell
        title={title}
        subtitle={subtitle}
        state={state}
        stateLabel={stateLabel}
        selected={selected}
        dragging={dragging}
        resizable={resizable}
      >
        <div className="metraly-dashboard-widget-content">{children}</div>
        {(footer || canRemove) ? (
          <div className="metraly-dashboard-widget-footer">
            {footer}
            {canRemove ? (
              <button
                type="button"
                className="metraly-dashboard-widget-remove metraly-focus-ring"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove?.(id!);
                }}
              >
                Remove
              </button>
            ) : null}
          </div>
        ) : null}
      </WidgetShell>
    </div>
  );
}

export default DashboardWidget;
