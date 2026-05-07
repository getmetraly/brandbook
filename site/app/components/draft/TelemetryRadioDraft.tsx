type TelemetryRadioDraftProps = {
  checked?: boolean;
  label?: string;
};

export default function TelemetryRadioDraft({ checked = true, label = "Primary source" }: TelemetryRadioDraftProps) {
  return (
    <label className="telemetry-checkbox-draft-row">
      <span className={checked ? "telemetry-checkbox-draft is-checked" : "telemetry-checkbox-draft"} aria-hidden="true">
        {checked ? <span className="telemetry-checkbox-pulse" /> : null}
      </span>
      <span className="telemetry-checkbox-label">
        {label}
        <span className="brand-badge brand-badge-warning">draft</span>
      </span>
    </label>
  );
}
