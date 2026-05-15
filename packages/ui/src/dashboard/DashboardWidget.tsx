import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StateBlock } from "../components/StateBlock";
import StateBadge, { type StateBadgeState } from "../components/StateBadge";
import { DashboardResizeHandle, dashboardResizeHandleDirections } from "./DashboardResizeHandle";
import { HandlePrimitive } from "./HandlePrimitive";

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
  /** Copy used by built-in empty/error states when custom children are not provided. */
  stateTitle?: React.ReactNode;
  stateDescription?: React.ReactNode;
  /** Optional action for built-in empty/error states. Keep product-specific copy outside the primitive. */
  stateAction?: React.ReactNode;
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
    <HandlePrimitive
      kind="drag"
      label="Drag to move"
      active={canDrag}
      focusable={canDrag}
      className="metraly-widget-shell-drag-handle"
      data-drag-handle="grip-dots"
      onKeyDown={(e) => {
        if (canDrag && (e.key === " " || e.key === "Enter") && id) {
          e.preventDefault();
          onDragStart?.(id);
        }
      }}
    />
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

function ErrorBody({
  title = "Unable to load widget",
  description = "Check the source or retry this widget.",
  action,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <StateBlock
      className="metraly-widget-shell-state metraly-widget-shell-state--error"
      variant="error"
      title={title}
      description={description}
      action={action}
      icon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 4 L10 10 M10 4 L4 10" /></svg>}
      density="compact"
    />
  );
}

function EmptyBody({
  title = "No telemetry in this range",
  description = "0 events · widen the time window",
  action,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <StateBlock
      className="metraly-widget-shell-state metraly-widget-shell-state--empty"
      variant="empty"
      title={title}
      description={description}
      action={action}
      icon={<svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M3 11 V8 M6 11 V5 M9 11 V7 M12 11 V3" strokeLinecap="round" /></svg>}
      density="compact"
    />
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
  stateTitle,
  stateDescription,
  stateAction,
  className,
  onSelect,
  onRemove,
  onDragStart,
}: DashboardWidgetProps) {
  const canSelect = Boolean(id && onSelect);
  const canRemove = Boolean(id && onRemove);
  const canDrag = Boolean(id && onDragStart);
  const widgetState = state === "noData" ? "empty" : (state === "error" || state === "disconnected") ? "error" : (state === "stale" || state === "delayed") ? "stale" : selected ? "selected" : "default";
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
  const footerSlot = (footer || canRemove) ? (
    <div className="metraly-dashboard-widget-footer-content">
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
  ) : null;

  const resizeHandles = resizable && (selected || resizing) ? (
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
  ) : null;

  return (
    <div
      className={["metraly-dashboard-widget", selected && "is-selected", className]
        .filter(Boolean)
        .join(" ")}
      data-widget-id={id}
      {...rootProps}
    >
      <CardShell
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
        state={resizing ? "resizing" : dragging ? "dragging" : widgetState}
        data-state={state}
        data-testid="widget-shell"
        headerClassName="metraly-widget-shell-head"
        bodyClassName="metraly-widget-shell-body"
        footerClassName="metraly-dashboard-widget-footer"
        footer={footerSlot}
        overlay={resizeHandles}
        header={(
          <>
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
          </>
        )}
      >
        {loading && !children ? (
          <LoadingSkeleton />
        ) : (state === "error" || state === "disconnected") && !children ? (
          <ErrorBody title={stateTitle} description={stateDescription} action={stateAction} />
        ) : state === "noData" && !children ? (
          <EmptyBody title={stateTitle} description={stateDescription} action={stateAction} />
        ) : (
          <div className="metraly-dashboard-widget-content">{children}</div>
        )}
      </CardShell>
    </div>
  );
}

export default DashboardWidget;
