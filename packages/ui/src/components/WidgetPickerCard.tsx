import * as React from "react";
import { MetralyBadge } from "./MetralyBadge";
import { StateBadge, type StateBadgeState } from "./StateBadge";

export type WidgetPickerCardVisualState = "default" | "selected" | "new" | "loading" | "dragging" | "disabled";

export interface WidgetPickerCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  /** Prototype-compatible widget kind metadata, for example `dora/overview`. */
  kind?: React.ReactNode;
  iconLabel?: string;
  tags?: string[];
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

function WidgetPickerIcon({ label, loading = false }: { label: string; loading?: boolean }) {
  return (
    <span className="metraly-widget-picker-icon" aria-hidden="true" data-loading={loading ? "true" : "false"}>
      <span className="metraly-widget-picker-icon-pulse" />
      <small>{loading ? "…" : label.slice(0, 2).toUpperCase()}</small>
    </span>
  );
}

function defaultStateLabel(state: StateBadgeState) {
  const spaced = state.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function WidgetPickerCard({
  title = "Flow efficiency",
  description = "Track delivery throughput, review health and deployment flow.",
  selected = false,
  kind,
  iconLabel = "pulse",
  tags = ["github", "telemetry"],
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

        <span
          className={selected ? "metraly-widget-picker-select-control is-selected" : "metraly-widget-picker-select-control"}
          aria-hidden="true"
        >
          <span className="metraly-widget-picker-select-pulse" />
        </span>
      </div>

      <div className="metraly-widget-picker-meta">
        <StateBadge state={effectiveState} label={effectiveStateLabel} pulse={effectiveVisualState === "new" ? true : undefined} />
      </div>

      <p>{description}</p>

      {tags.length > 0 ? (
        <div className="metraly-widget-picker-tags" aria-label="Widget tags">
          {tags.map((tag, index) => (
            <MetralyBadge key={tag} variant={index === 0 ? "primary" : "success"}>
              {tag}
            </MetralyBadge>
          ))}
        </div>
      ) : null}
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        className={classes}
        role="option"
        aria-selected={selected}
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
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-state={effectiveVisualState}
      data-kind={typeof effectiveKind === "string" ? effectiveKind : undefined}
    >
      {content}
    </article>
  );
}

export default WidgetPickerCard;
