type TelemetryCheckboxDraftProps = {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
};

export default function TelemetryCheckboxDraft({
  checked = false,
  disabled = false,
  error = false,
  label = "Draft checkbox",
}: TelemetryCheckboxDraftProps) {
  const stateClass = [
    "telemetry-checkbox-draft",
    checked ? "is-checked" : "",
    disabled ? "is-disabled" : "",
    error ? "is-error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className="telemetry-checkbox-draft-row">
      <span className={stateClass} aria-hidden="true">
        {checked ? <span className="telemetry-checkbox-pulse" /> : null}
      </span>
      <span className="telemetry-checkbox-label">
        {label}
        <span className="brand-badge brand-badge-warning">draft</span>
      </span>
    </label>
  );
}
