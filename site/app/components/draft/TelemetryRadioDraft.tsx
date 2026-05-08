import { MetralyRadio } from "@metraly/ui";

type TelemetryRadioDraftProps = {
  checked?: boolean;
  label?: string;
};

export default function TelemetryRadioDraft({ checked = true, label = "Primary source" }: TelemetryRadioDraftProps) {
  return <MetralyRadio checked={checked} label={label} className="telemetry-checkbox-draft-row" />;
}
