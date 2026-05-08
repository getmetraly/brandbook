import * as React from "react";
import { StateBadge, type StateBadgeState } from "./StateBadge";

export interface WidgetPickerCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  iconLabel?: string;
  tags?: string[];
  state?: StateBadgeState;
  stateLabel?: string;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

function WidgetPickerIcon({ label }: { label: string }) {
  return (
    <span className="metraly-widget-picker-icon" aria-hidden="true">
      <span className="metraly-widget-picker-icon-pulse" />
      <small>{label.slice(0, 2).toUpperCase()}</small>
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
  iconLabel = "pulse",
  tags = ["github", "telemetry"],
  state = "live",
  stateLabel,
  className,
  disabled = false,
  onSelect,
}: WidgetPickerCardProps) {
  const classes = [
    "metraly-widget-picker-card",
    selected && "is-selected",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <div className="metraly-widget-picker-head">
        <WidgetPickerIcon label={iconLabel} />

        <div className="metraly-widget-picker-title-copy">
          <strong>{title}</strong>
          <span>{iconLabel}</span>
        </div>

        <span
          className={selected ? "metraly-widget-picker-select-control is-selected" : "metraly-widget-picker-select-control"}
          aria-hidden="true"
        >
          <span className="metraly-widget-picker-select-pulse" />
        </span>
      </div>

      <div className="metraly-widget-picker-meta">
        <StateBadge state={state} label={stateLabel ?? defaultStateLabel(state)} />
      </div>

      <p>{description}</p>

      {tags.length > 0 ? (
        <div className="metraly-widget-picker-tags" aria-label="Widget tags">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className={index === 0 ? "brand-badge brand-badge-primary" : "brand-badge brand-badge-success"}
            >
              {tag}
            </span>
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
        disabled={disabled}
        onClick={onSelect}
      >
        {content}
      </button>
    );
  }

  return (
    <article className={classes} role="option" aria-selected={selected}>
      {content}
    </article>
  );
}

export default WidgetPickerCard;
