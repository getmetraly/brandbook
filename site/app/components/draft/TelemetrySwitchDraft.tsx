type TelemetrySwitchDraftProps = {
  active?: boolean;
  label?: string;
};

export default function TelemetrySwitchDraft({
  active = true,
  label = "Live telemetry",
}: TelemetrySwitchDraftProps) {
  return (
    <div className="telemetry-switch-shell">
      <button
        type="button"
        className={active ? "telemetry-switch-draft is-active" : "telemetry-switch-draft"}
        aria-pressed={active}
      >
        <span className="telemetry-switch-track">
          {active ? <span className="telemetry-switch-pulse" /> : null}
        </span>
        <span className="telemetry-switch-knob" />
      </button>

      <span className="telemetry-field-label">
        {label}
        <span className="brand-badge brand-badge-warning">draft</span>
      </span>
    </div>
  );
}
