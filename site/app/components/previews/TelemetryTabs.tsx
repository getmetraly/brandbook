import { MetralyTabs } from "@metraly/ui";

const tabs = ["Overview", "Boards", "Signals", "Incidents", "Settings"];

export default function TelemetryTabs() {
  return (
    <div className="telemetry-tabs-draft" aria-label="Telemetry tabs">
      <MetralyTabs
        ariaLabel="Telemetry tabs"
        defaultValue="Boards"
        items={tabs.map((tab) => ({ value: tab, label: tab }))}
      />
    </div>
  );
}
