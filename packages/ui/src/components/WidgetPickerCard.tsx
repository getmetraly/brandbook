import * as React from "react";
import { StateBadge, type StateBadgeState } from "./StateBadge";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WidgetPickerCardVisualState = "default" | "selected" | "new" | "loading" | "dragging" | "disabled";

export interface WidgetPickerCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  /** Prototype-compatible widget kind metadata, for example `dora/overview`. */
  kind?: React.ReactNode;
  iconLabel?: string;
  state?: StateBadgeState;
  stateLabel?: string;
  /** Prototype visual state for widget picker cards. */
  visualState?: WidgetPickerCardVisualState;
  dragging?: boolean;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface WidgetPickerListProps {
  children: React.ReactNode;
  /** Accessible label for the picker group. Defaults to "Widget catalog". */
  ariaLabel?: string;
  multiSelect?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Minimal operational glyphs — stroke-based, 14×14 viewBox.
// Matches the prototype Icon set used in WidgetPicker.
const PICKER_ICONS: Record<string, React.ReactNode> = {
  metric: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"
      d="M1.5 10.5h2V7h2v3.5h2V5h2v5.5h2V2.5h2v8" />
  ),
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"
      d="M1.5 10.5 4.5 7l2.5 2L10 4l3 3" />
  ),
  lightning: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"
      fill="currentColor" fillOpacity={0.15}
      d="M8.5 1.5 5 7h4.5l-3 6 6-7.5H8.5z" />
  ),
  refresh: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"
      d="M11.5 4A5 5 0 1 0 12 7M11.5 1v3h-3" />
  ),
  bell: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"
        d="M4 8a3 3 0 0 1 6 0v3H4V8z" />
      <path strokeLinecap="round" strokeWidth="1.4"
        d="M5.5 11v.5a1.5 1.5 0 0 0 3 0V11" />
    </>
  ),
  user: (
    <>
      <circle cx="7" cy="5" r="2.5" strokeWidth="1.4" />
      <path strokeLinecap="round" strokeWidth="1.4"
        d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </>
  ),
  grid: (
    <>
      <rect x="1.5" y="1.5" width="4" height="4" rx="0.5" strokeWidth="1.4" />
      <rect x="8.5" y="1.5" width="4" height="4" rx="0.5" strokeWidth="1.4" />
      <rect x="1.5" y="8.5" width="4" height="4" rx="0.5" strokeWidth="1.4" />
      <rect x="8.5" y="8.5" width="4" height="4" rx="0.5" strokeWidth="1.4" />
    </>
  ),
  log: (
    <path strokeLinecap="round" strokeWidth="1.4"
      d="M2.5 4.5h9M2.5 7h6M2.5 9.5h8" />
  ),
  table: (
    <>
      <rect x="1.5" y="1.5" width="11" height="11" rx="1" strokeWidth="1.4" />
      <path strokeWidth="1.4" d="M1.5 6h11M6 1.5v11" />
    </>
  ),
  search: (
    <>
      <circle cx="6" cy="6" r="3.5" strokeWidth="1.4" />
      <path strokeLinecap="round" strokeWidth="1.4" d="M9 9 12 12" />
    </>
  ),
  sparkles: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"
      d="M7 1.5 8 5h3.5l-2.8 2 1 3.5L7 8.5 4.3 10.5l1-3.5L2.5 5H6z" />
  ),
};

function WidgetPickerIcon({ label, loading = false }: { label: string; loading?: boolean }) {
  return (
    <span className="metraly-widget-picker-icon" aria-hidden="true" data-loading={loading ? "true" : "false"}>
      {loading ? (
        <span className="metraly-control-spinner" />
      ) : (
        <svg viewBox="0 0 14 14" width={13} height={13} fill="none" stroke="currentColor" aria-hidden="true">
          {PICKER_ICONS[label] ?? PICKER_ICONS.metric}
        </svg>
      )}
    </span>
  );
}

function defaultStateLabel(state: StateBadgeState) {
  const spaced = state.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** States that surface a visible badge — covers every non-live operational state. */
const BADGE_STATES = new Set<StateBadgeState>([
  "disabled",    // planned, gated, coming-soon all map here via StatusBadge
  "delayed",
  "disconnected",
  "noData",
  "error",
  "warning",
  "purple",      // preview / in-progress map here via StatusBadge
  "info",        // policy-defined, designed (informational)
]);

// ─── WidgetPickerCard ─────────────────────────────────────────────────────────

/**
 * A catalog selection card for the widget picker panel.
 *
 * Use inside `WidgetPickerList` to provide a labelled grouping container:
 *
 * ```tsx
 * <WidgetPickerList ariaLabel="Widget catalog">
 *   {widgets.map(w => (
 *     <WidgetPickerCard key={w.id} title={w.title} selected={selected.includes(w.id)} onSelect={() => toggle(w.id)} />
 *   ))}
 * </WidgetPickerList>
 * ```
 */
export function WidgetPickerCard({
  title = "Flow efficiency",
  description = "Track delivery throughput, review health and deployment flow.",
  selected = false,
  kind,
  iconLabel = "metric",
  state = "live",
  stateLabel,
  visualState = "default",
  dragging = false,
  loading = false,
  className,
  disabled = false,
  onSelect,
}: WidgetPickerCardProps) {
  const effectiveVisualState: WidgetPickerCardVisualState = disabled
    ? "disabled"
    : loading
      ? "loading"
      : dragging
        ? "dragging"
        : selected
          ? "selected"
          : visualState;
  const effectiveKind = kind ?? iconLabel;
  const effectiveState: StateBadgeState = effectiveVisualState === "new" ? "new" : disabled ? "disabled" : state;
  const effectiveStateLabel = stateLabel ?? (effectiveVisualState === "new" ? "New" : defaultStateLabel(effectiveState));

  // Show the state badge for:
  // 1. Operational states that block or alter use (disabled, loading)
  // 2. Non-live semantic states that need surfacing (gated, planned, preview, etc.)
  // 3. "new" visual state — handled by a separate badge in the head
  const showStateBadge =
    effectiveVisualState === "disabled" ||
    effectiveVisualState === "loading" ||
    BADGE_STATES.has(effectiveState);

  const classes = [
    "metraly-widget-picker-card",
    selected && "is-selected",
    disabled && "is-disabled",
    loading && "is-loading",
    dragging && "is-dragging",
    effectiveVisualState !== "default" && `is-${effectiveVisualState}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <div className="metraly-widget-picker-head">
        <WidgetPickerIcon label={iconLabel} loading={loading} />

        <div className="metraly-widget-picker-title-copy">
          <strong>{title}</strong>
          <span>{effectiveKind}</span>
        </div>

        {/* "new" badge appears inline in head only. */}
        {effectiveVisualState === "new" && (
          <StateBadge state="new" label="New" size="sm" />
        )}
      </div>

      {showStateBadge ? (
        <div className="metraly-widget-picker-meta">
          <StateBadge
            state={effectiveState}
            label={effectiveStateLabel}
            size="sm"
          />
        </div>
      ) : null}

      <p>{description}</p>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        className={classes}
        aria-pressed={selected}
        aria-disabled={disabled || loading || undefined}
        disabled={disabled || loading}
        data-state={effectiveVisualState}
        data-kind={typeof effectiveKind === "string" ? effectiveKind : undefined}
        onClick={disabled || loading ? undefined : onSelect}
      >
        {content}
      </button>
    );
  }

  return (
    <article
      className={classes}
      data-selected={selected ? "true" : "false"}
      data-state={effectiveVisualState}
      data-kind={typeof effectiveKind === "string" ? effectiveKind : undefined}
    >
      {content}
    </article>
  );
}

// ─── WidgetPickerList ─────────────────────────────────────────────────────────

/**
 * Labelled grouping container for widget picker cards.
 *
 * ```tsx
 * <WidgetPickerList ariaLabel="Available widgets">
 *   {widgets.map(w => <WidgetPickerCard key={w.id} ... />)}
 * </WidgetPickerList>
 * ```
 */
export function WidgetPickerList({
  children,
  ariaLabel = "Widget catalog",
  multiSelect = true,
  className,
  style,
}: WidgetPickerListProps) {
  void multiSelect;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={["metraly-widget-picker-list", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

export default WidgetPickerCard;
