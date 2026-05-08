import { MetralySwitch } from "@metraly/ui";

type TelemetrySwitchProps = {
  active?: boolean;
  disabled?: boolean;
  label?: string;
};

export default function TelemetrySwitch({
  active = true,
  disabled = false,
  label = "Live telemetry",
}: TelemetrySwitchProps) {
  return <MetralySwitch checked={active} disabled={disabled} label={label} />;
}
