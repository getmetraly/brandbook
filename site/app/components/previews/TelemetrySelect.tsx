import { MetralySelect } from "@metraly/ui";

type TelemetrySelectProps = {
  label?: string;
  value?: string;
  options?: Array<{ value: string; label: string }>;
};

const defaultOptions = [
  { value: "github", label: "GitHub" },
  { value: "ci", label: "CI/CD" },
  { value: "incidents", label: "Incidents" },
];

export default function TelemetrySelect({
  label = "Metric source",
  value = "github",
  options = defaultOptions,
}: TelemetrySelectProps) {
  return <MetralySelect label={label} defaultValue={value} options={options} />;
}
