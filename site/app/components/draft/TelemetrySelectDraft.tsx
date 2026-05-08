import { MetralySelect } from "@metraly/ui";

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
  return <MetralySelect label={label} defaultValue={value} options={options} />;
}
