import * as React from "react";
import StateBadge, { type StateBadgeState } from "../components/StateBadge";
import { DashboardResizeHandle } from "./DashboardResizeHandle";

export interface DashboardWidgetProps {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  state?: StateBadgeState;
  stateLabel?: string;
  selected?: boolean;
  dragging?: boolean;
  resizable?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
}

function defaultStateLabel(state: StateBadgeState): string {
  const spaced = state.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
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
  fullWidth = false,
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
      <div
        className={[
          "metraly-widget-shell",
          selected && "is-selected",
          dragging && "is-dragging",
          fullWidth && "is-fullwidth",
          resizable && "is-resizable",
        ]
          .filter(Boolean)
          .join(" ")}
        data-testid="widget-shell"
      >
        <header className="metraly-widget-shell-head">
          <div className="metraly-widget-shell-heading">
            <div className="metraly-widget-shell-title">{title}</div>
            {subtitle && <div className="metraly-widget-shell-subtitle">{subtitle}</div>}
          </div>
          {state && (
            <StateBadge
              state={state}
              label={stateLabel ?? defaultStateLabel(state)}
              className="metraly-widget-shell-badge"
            />
          )}
        </header>
        <div className="metraly-widget-shell-body">
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
        </div>
        <footer className="metraly-widget-shell-foot">
          <span
            className="metraly-widget-shell-drag-handle metraly-focus-ring"
            role="button"
            tabIndex={0}
            aria-label="Drag to move"
          >
            <span className="metraly-widget-shell-grip-dots" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
          </span>
        </footer>
        {resizable && (
          <DashboardResizeHandle
            className="metraly-widget-shell-resize-handle"
            label="Resize widget"
            direction="southeast"
            active={selected}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardWidget;
