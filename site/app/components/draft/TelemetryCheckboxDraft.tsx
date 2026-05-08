import { MetralyCheckbox } from "@metraly/ui";

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
