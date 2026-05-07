type TelemetrySelectDraftProps = {
  label?: string;
  value?: string;
};

export default function TelemetrySelectDraft({
  label = "Metric source",
  value = "github",
}: TelemetrySelectDraftProps) {
  return (
    <label className="telemetry-select-draft">
      <span className="telemetry-field-label">
        {label}
        <span className="brand-badge brand-badge-warning">draft</span>
      </span>
      <span className="telemetry-select-control">
        <select defaultValue={value} aria-label={label}>
          <option value="github">GitHub</option>
          <option value="ci">CI/CD</option>
          <option value="incidents">Incidents</option>
        </select>
        <span className="telemetry-select-indicator" aria-hidden="true" />
      </span>
    </label>
  );
}
