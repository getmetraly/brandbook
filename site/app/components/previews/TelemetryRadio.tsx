import { MetralyRadio } from "@metraly/ui";

type TelemetryRadioProps = {
  checked?: boolean;
  label?: string;
};

export default function TelemetryRadio({ checked = true, label = "Primary source" }: TelemetryRadioProps) {
  return <MetralyRadio checked={checked} label={label} className="telemetry-checkbox-draft-row" />;
}
