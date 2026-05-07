const items = [
  { label: "Overview", meta: "Board home", short: "OV" },
  { label: "Boards", meta: "Layouts", short: "BD" },
  { label: "Signals", meta: "Telemetry", short: "SG" },
  { label: "Deploys", meta: "Release flow", short: "DP" },
  { label: "Incidents", meta: "Operational risk", short: "IN" },
  { label: "Settings", meta: "Workspace", short: "ST" },
];

export default function TelemetrySidebarDraft() {
  return (
    <aside className="telemetry-sidebar-draft" aria-label="Dashboard navigation preview">
      <div className="telemetry-sidebar-logo">
        <span className="telemetry-sidebar-mark" aria-hidden="true">
          <span className="metraly-pulse-marker" />
        </span>
        <div>
          <strong>Metraly</strong>
          <span>Engineering board</span>
        </div>
      </div>

      <nav>
        {items.map((item, index) => (
          <button type="button" key={item.label} className={index === 1 ? "is-active" : ""}>
            <span className="telemetry-sidebar-item-icon" aria-hidden="true">
              {index === 1 ? <span className="telemetry-state-pulse" /> : <small>{item.short}</small>}
            </span>
            <span className="telemetry-sidebar-item-copy">
              <strong>{item.label}</strong>
              <small>{item.meta}</small>
            </span>
          </button>
        ))}
      </nav>

      <div className="telemetry-sidebar-footer">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        <span>Local preview</span>
      </div>
    </aside>
  );
}
