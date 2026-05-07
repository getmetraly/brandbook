type TelemetrySwitchDraftProps = {
  active?: boolean;
  disabled?: boolean;
  label?: string;
};

export default function TelemetrySwitchDraft({
  active = true,
  disabled = false,
  label = "Live telemetry",
}: TelemetrySwitchDraftProps) {
  const className = [
    "telemetry-switch-draft",
    active ? "is-active" : "is-off",
    disabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="telemetry-switch-shell">
      <button
        type="button"
        className={className}
        aria-pressed={active}
        disabled={disabled}
      >
        <span className="telemetry-switch-track">
          {active ? <span className="telemetry-switch-pulse" /> : null}
        </span>
        <span className="telemetry-switch-knob" />
      </button>

      <span className="telemetry-field-label">{label}</span>
    </div>
  );
}
