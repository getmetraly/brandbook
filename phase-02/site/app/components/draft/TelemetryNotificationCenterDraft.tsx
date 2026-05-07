export default function TelemetryNotificationCenterDraft() {
  return (
    <div className="telemetry-notification-center-draft">
      <div className="telemetry-notification-head">
        <strong>Notifications</strong>
        <span className="brand-badge brand-badge-warning">draft</span>
      </div>

      <div className="telemetry-notification-item">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        <div>
          <strong>Deployment completed</strong>
          <p>Production deployment succeeded.</p>
        </div>
      </div>

      <div className="telemetry-notification-item">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        <div>
          <strong>Latency spike detected</strong>
          <p>Investigate API latency increase.</p>
        </div>
      </div>
    </div>
  );
}
