import { MetralySwitch } from "@metraly/ui";

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
  return <MetralySwitch checked={active} disabled={disabled} label={label} />;
}
