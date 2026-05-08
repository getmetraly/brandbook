import { MetralyCheckbox } from "@metraly/ui";

type TelemetryCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
};

export default function TelemetryCheckbox({
  checked = false,
  disabled = false,
  error = false,
  label = "Telemetry checkbox",
}: TelemetryCheckboxProps) {
  return (
    <MetralyCheckbox
      checked={checked}
      disabled={disabled}
      error={error}
      label={label}
      className="telemetry-checkbox-draft-row"
    />
  );
}
