export default function TelemetryTimelineDraft() {
  return (
    <div className="telemetry-timeline-draft">
      <div className="telemetry-timeline-event">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        <div>
          <strong>Deployment completed</strong>
          <p>Production deploy succeeded · 2m ago</p>
        </div>
      </div>

      <div className="telemetry-timeline-event">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        <div>
          <strong>Latency spike detected</strong>
          <p>API p95 crossed threshold · 14m ago</p>
        </div>
      </div>

      <div className="telemetry-timeline-event">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        <div>
          <strong>Board synced</strong>
          <p>Layout changes persisted · 21m ago</p>
        </div>
      </div>

      <span className="brand-badge brand-badge-warning">draft</span>
    </div>
  );
}
