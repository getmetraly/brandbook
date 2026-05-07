const tabs = ["Overview", "Boards", "Signals", "Incidents", "Settings"];

export default function TelemetryTabsDraft() {
  return (
    <div className="telemetry-tabs-draft" aria-label="Draft tabs">
      <div className="telemetry-tabs-row">
        {tabs.map((tab) => (
          <button key={tab} className={tab === "Boards" ? "telemetry-tab is-active" : "telemetry-tab"} type="button">
            {tab}
            {tab === "Boards" ? <span className="telemetry-tab-pulse" aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
      <span className="brand-badge brand-badge-warning">draft</span>
    </div>
  );
}
