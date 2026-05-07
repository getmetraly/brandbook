import TelemetryCheckboxDraft from "./TelemetryCheckboxDraft";
import TelemetryStateBadgeDraft from "./TelemetryStateBadgeDraft";

type WidgetPickerCardDraftProps = {
  title?: string;
  description?: string;
  selected?: boolean;
};

export default function WidgetPickerCardDraft({
  title = "Flow efficiency",
  description = "Track delivery throughput, review health and deployment flow.",
  selected = true,
}: WidgetPickerCardDraftProps) {
  return (
    <div className={selected ? "widget-picker-card-draft is-selected" : "widget-picker-card-draft"}>
      <div className="widget-picker-card-head">
        <TelemetryCheckboxDraft checked={selected} label="" />
        <TelemetryStateBadgeDraft state="live" label="Live" />
      </div>

      <div className="widget-picker-icon" aria-hidden="true">
        <span className="telemetry-select-indicator" />
      </div>

      <strong>{title}</strong>
      <p>{description}</p>

      <div className="widget-picker-tags">
        <span className="brand-badge brand-badge-primary">github</span>
        <span className="brand-badge brand-badge-success">telemetry</span>
        <span className="brand-badge brand-badge-warning">draft</span>
      </div>
    </div>
  );
}
