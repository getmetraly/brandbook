import { MetralyTabs } from "@metraly/ui";

const tabs = ["Overview", "Boards", "Signals", "Incidents", "Settings"];

export default function TelemetryTabsDraft() {
  return (
    <div className="telemetry-tabs-draft" aria-label="Draft tabs">
      <MetralyTabs
        ariaLabel="Draft tabs"
        defaultValue="Boards"
        items={tabs.map((tab) => ({ value: tab, label: tab }))}
      />
    </div>
  );
}
