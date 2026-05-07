type TelemetrySelectDraftProps = {
  label?: string;
  value?: string;
  options?: Array<{ value: string; label: string }>;
};

const defaultOptions = [
  { value: "github", label: "GitHub" },
  { value: "ci", label: "CI/CD" },
  { value: "incidents", label: "Incidents" },
];

export default function TelemetrySelectDraft({
  label = "Metric source",
  value = "github",
  options = defaultOptions,
}: TelemetrySelectDraftProps) {
  return (
    <label className="telemetry-select-draft">
      <span className="telemetry-field-label">
        {label}
      </span>
      <span className="telemetry-select-control">
        <select defaultValue={value} aria-label={label}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="telemetry-select-indicator" aria-hidden="true" />
      </span>
    </label>
  );
}
