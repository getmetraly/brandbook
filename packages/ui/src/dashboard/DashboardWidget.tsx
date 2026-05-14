import * as React from "react";
import StateBadge, { type StateBadgeState } from "../components/StateBadge";
import { DashboardResizeHandle, dashboardResizeHandleDirections } from "./DashboardResizeHandle";

export interface DashboardWidgetProps {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  state?: StateBadgeState;
  stateLabel?: string;
  selected?: boolean;
  dragging?: boolean;
  resizing?: boolean;
  resizable?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  onDragStart?: (id: string) => void;
}

function defaultStateLabel(state: StateBadgeState): string {
  const spaced = state.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function DragHandle({ canDrag, id, onDragStart }: { canDrag: boolean; id?: string; onDragStart?: (id: string) => void }) {
  return (
    <span
      className="metraly-widget-shell-drag-handle metraly-focus-ring"
      data-drag-handle="grip-dots"
      {...(canDrag
        ? {
            role: "button" as const,
            tabIndex: 0,
            "aria-label": "Drag to move",
            onKeyDown: (e: React.KeyboardEvent) => {
              if ((e.key === " " || e.key === "Enter") && id) {
                e.preventDefault();
                onDragStart?.(id);
              }
            },
          }
        : {
            role: "presentation" as const,
            "aria-hidden": true,
          })}
      >
      <span className="metraly-widget-shell-grip-dots" aria-hidden="true"><span /><span /><span /><span /><span /><span /></span>
    </span>
  );
}

export function DashboardWidget({
  id,
  title,
  subtitle,
  state = "live",
  stateLabel,
  selected = false,
  dragging = false,
  resizing = false,
  resizable = true,
  loading = false,
  fullWidth = false,
  children,
  footer,
  className,
  onSelect,
  onRemove,
  onDragStart,
}: DashboardWidgetProps) {
  const canSelect = Boolean(id && onSelect);
  const canRemove = Boolean(id && onRemove);
  const canDrag = Boolean(id && onDragStart);
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
          resizing && "is-resizing",
          loading && "is-loading",
          (state === "error" || state === "disconnected") && "is-error",
          (state === "stale" || state === "delayed") && "is-stale",
          state === "noData" && "is-empty",
          fullWidth && "is-fullwidth",
          resizable && "is-resizable",
        ]
          .filter(Boolean)
          .join(" ")}
        data-state={state}
        data-testid="widget-shell"
      >
        <header className="metraly-widget-shell-head">
          <DragHandle canDrag={canDrag} id={id} onDragStart={onDragStart} />
          <div className="metraly-widget-shell-heading">
            <div className="metraly-widget-shell-title">{title}</div>
            {subtitle && <div className="metraly-widget-shell-subtitle">{subtitle}</div>}
          </div>
          {state && (
            <StateBadge
              state={state}
              label={stateLabel ?? defaultStateLabel(state)}
              size="sm"
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
        {resizable && (selected || resizing) ? (
          <div className="metraly-widget-shell-resize-handles" aria-hidden={false}>
            {dashboardResizeHandleDirections.map((direction) => (
              <DashboardResizeHandle
                key={direction}
                className="metraly-widget-shell-resize-handle"
                direction={direction}
                active={selected || resizing}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DashboardWidget;
