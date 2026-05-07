import TelemetryStateBadgeDraft from "./TelemetryStateBadgeDraft";

type WidgetPickerCardDraftProps = {
  title?: string;
  description?: string;
  selected?: boolean;
  iconLabel?: string;
  tags?: string[];
  state?: "live" | "stale" | "delayed" | "disconnected" | "no-data";
};

function WidgetPickerIcon({ label }: { label: string }) {
  return (
    <div className="widget-picker-icon" aria-hidden="true">
      <span className="widget-picker-icon-pulse" />
      <small>{label.slice(0, 2).toUpperCase()}</small>
    </div>
  );
}

export default function WidgetPickerCardDraft({
  title = "Flow efficiency",
  description = "Track delivery throughput, review health and deployment flow.",
  selected = true,
  iconLabel = "pulse",
  tags = ["github", "telemetry"],
  state = "live",
}: WidgetPickerCardDraftProps) {
  const stateLabel = state === "no-data" ? "No data" : state[0].toUpperCase() + state.slice(1);

  return (
    <div className={selected ? "widget-picker-card-draft is-selected" : "widget-picker-card-draft"}>
      <div className="widget-picker-card-head">
        <WidgetPickerIcon label={iconLabel} />

        <div className="widget-picker-title-copy">
          <strong>{title}</strong>
          <span>{iconLabel}</span>
        </div>

        <div
          className={selected ? "widget-picker-select-control is-selected" : "widget-picker-select-control"}
          aria-hidden="true"
        >
          {selected ? <span className="widget-picker-select-pulse" /> : null}
        </div>
      </div>

      <div className="widget-picker-card-meta">
        <TelemetryStateBadgeDraft state={state} label={stateLabel} />
      </div>

      <p>{description}</p>

      <div className="widget-picker-tags">
        {tags.map((tag, index) => (
          <span
            key={tag}
            className={index === 0 ? "brand-badge brand-badge-primary" : "brand-badge brand-badge-success"}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
