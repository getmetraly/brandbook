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

function LoadingSkeleton() {
  const bar = (w: string) => (
    <div
      style={{
        height: 10,
        width: w,
        background: "linear-gradient(90deg, var(--m-bg-3) 0%, var(--m-bg-4) 50%, var(--m-bg-3) 100%)",
        backgroundSize: "200% 100%",
        animation: "m-shimmer 1.4s linear infinite",
        borderRadius: 4,
      }}
    />
  );

  return (
    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
      {bar("60%")}
      {bar("85%")}
      {bar("45%")}
      <div style={{ flex: 1 }} />
      {bar("70%")}
    </div>
  );
}

function ErrorBody() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--m-err-bg)", color: "var(--m-err)", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--m-err)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 4 L10 10 M10 4 L4 10" /></svg>
      </div>
      <div style={{ fontSize: "var(--m-fs-12)", color: "var(--m-fg-1)" }}>Source disconnected</div>
      <div style={{ fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>last sync 12m ago · retrying...</div>
      <button className="metraly-focus-ring" type="button" style={{ marginTop: 4, background: "transparent", color: "var(--m-cyan-500)", border: "1px solid var(--m-cyan-500)", padding: "4px 10px", borderRadius: "var(--m-r-2)", fontSize: "var(--m-fs-11)", fontFamily: "var(--m-font-ui)", cursor: "pointer" }}>
        Reconnect
      </button>
    </div>
  );
}

function EmptyBody() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 16, color: "var(--m-fg-3)" }}>
      <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 11 V8 M6 11 V5 M9 11 V7 M12 11 V3" strokeLinecap="round" /></svg>
      <div style={{ fontSize: "var(--m-fs-11)" }}>No telemetry in this range</div>
      <div style={{ fontSize: "var(--m-fs-10)", fontFamily: "var(--m-font-mono)" }}>0 events · widen the time window</div>
    </div>
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
          {loading && !children ? (
            <LoadingSkeleton />
          ) : (state === "error" || state === "disconnected") && !children ? (
            <ErrorBody />
          ) : state === "noData" && !children ? (
            <EmptyBody />
          ) : (
            <div className="metraly-dashboard-widget-content">{children}</div>
          )}
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
