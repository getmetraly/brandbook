export default function TelemetrySkeleton() {
  return (
    <div className="telemetry-skeleton-grid">
      <div className="telemetry-skeleton-card">
        <div className="telemetry-skeleton-line telemetry-skeleton-line-lg" />
        <div className="telemetry-skeleton-line" />
        <div className="telemetry-skeleton-pulse" />
      </div>

      <div className="telemetry-skeleton-card">
        <div className="telemetry-skeleton-chart">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="telemetry-skeleton-card">
        <div className="telemetry-skeleton-table-row" />
        <div className="telemetry-skeleton-table-row" />
        <div className="telemetry-skeleton-table-row" />
      </div>
    </div>
  );
}
