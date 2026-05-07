export default function TelemetrySidebarDraft() {
  const items = ["Overview", "Boards", "Signals", "Deploys", "Incidents", "Settings"];

  return (
    <aside className="telemetry-sidebar-draft">
      <div className="logo">
        <span className="logo-mark"><span className="metraly-pulse-marker" /></span>
        <span>Metraly</span>
      </div>

      <nav>
        {items.map((item, index) => (
          <button type="button" key={item} className={index === 1 ? "is-active" : ""}>
            {index === 1 ? <span className="telemetry-state-pulse" aria-hidden="true" /> : null}
            {item}
          </button>
        ))}
      </nav>

      <span className="brand-badge brand-badge-warning">draft</span>
    </aside>
  );
}
