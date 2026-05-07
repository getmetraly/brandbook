export default function TelemetryGridItemDraft() {
  return (
    <div className="telemetry-grid-item-draft">
      <div className="telemetry-grid-item-toolbar">
        <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
        <strong>Deployment health</strong>
        <span className="brand-badge brand-badge-success">lg</span>
      </div>

      <div className="telemetry-grid-item-body">
        <div className="metric-value">99.98%</div>
        <p>react-grid-layout compatible widget shell with resize affordances.</p>
      </div>

      <span className="telemetry-grid-resize telemetry-grid-resize-se" />
      <span className="telemetry-grid-resize telemetry-grid-resize-e" />
    </div>
  );
}
