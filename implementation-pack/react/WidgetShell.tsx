import * as React from "react";
import StateBadge, { StateBadgeState } from "./StateBadge";

/**
 * Props for the `WidgetShell` component.  A widget shell provides a
 * standardized surface for dashboard widgets including a title bar,
 * optional subtitle, state badge and affordances for drag and resize
 * interactions.  It composes lower‑level Metraly primitives (panel,
 * card and badge) but exposes only the necessary API for widgets.
 */
export interface WidgetShellProps {
  /** Title displayed in the widget header. */
  title: React.ReactNode;
  /** Optional subtitle below the title. */
  subtitle?: React.ReactNode;
  /** Telemetry state communicated via a coloured badge. */
  state?: StateBadgeState;
  /** Optional custom label for the state badge.  If omitted the
   * default capitalised state will be used (e.g. "Live", "Stale"). */
  stateLabel?: string;
  /** When true the widget will render in a selected state using
   * accent border and glow. */
  selected?: boolean;
  /** When true the widget will render in a dragging state using
   * reduced opacity and altered shadow. */
  dragging?: boolean;
  /** When true resize handles are visible. */
  resizable?: boolean;
  /** When true the widget spans the full width of its grid cell. */
  fullWidth?: boolean;
  /** Primary content rendered inside the widget body. */
  children?: React.ReactNode;
  /** Additional class names appended to the container. */
  className?: string;
}

/**
 * Utility to capitalise the first letter of a state label.  Converts
 * camelCase (e.g. `noData`) into space‑separated words ("No data").
 */
function defaultStateLabel(state: StateBadgeState): string {
  // Split camelCase: insert space before capital letters
  const spaced = state.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * A universal widget container used in the Metraly dashboard.  It
 * provides a consistent header with title, subtitle and state badge,
 * a body area for content and a footer containing a drag handle.
 * Additional classes reflect editing states like selection and dragging.
 */
export function WidgetShell({
  title,
  subtitle,
  state,
  stateLabel,
  selected = false,
  dragging = false,
  resizable = false,
  fullWidth = false,
  children,
  className,
}: WidgetShellProps) {
  const classes = [
    "metraly-widget-shell",
    selected && "is-selected",
    dragging && "is-dragging",
    fullWidth && "is-fullwidth",
    resizable && "is-resizable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Determine the label for the badge if provided state
  const badgeLabel = state ? stateLabel ?? defaultStateLabel(state) : undefined;

  return (
    <div className={classes} data-testid="widget-shell">
      <header className="metraly-widget-shell-head">
        <div className="metraly-widget-shell-heading">
          <div className="metraly-widget-shell-title">{title}</div>
          {subtitle && <div className="metraly-widget-shell-subtitle">{subtitle}</div>}
        </div>
        {state && (
          <StateBadge state={state} label={badgeLabel!} className="metraly-widget-shell-badge" />
        )}
      </header>
      <div className="metraly-widget-shell-body">{children}</div>
      <footer className="metraly-widget-shell-foot">
        <span
          className="metraly-widget-shell-drag-handle metraly-focus-ring"
          role="button"
          tabIndex={0}
          aria-label="Drag widget"
        >
          <span aria-hidden="true">⋮⋮</span>
        </span>
      </footer>
      {resizable && (
        <div
          className="metraly-widget-shell-resize-handle"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default WidgetShell;