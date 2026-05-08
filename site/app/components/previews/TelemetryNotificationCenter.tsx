const notifications = [
  {
    title: "Deployment completed",
    body: "Production deployment succeeded.",
    meta: "2m ago",
    state: "unread",
  },
  {
    title: "Latency spike detected",
    body: "API p95 crossed threshold.",
    meta: "14m ago",
    state: "warning",
  },
  {
    title: "Board synced",
    body: "Layout changes persisted.",
    meta: "21m ago",
    state: "read",
  },
];

export default function TelemetryNotificationCenter() {
  return (
    <div className="telemetry-notification-center-draft">
      <div className="telemetry-notification-head">
        <strong>Notifications</strong>
        <span className="brand-badge brand-badge-primary">3 events</span>
      </div>

      {notifications.map((item) => (
        <article className={`telemetry-notification-item is-${item.state}`} key={item.title}>
          <span className="telemetry-state-pulse" aria-hidden="true" />
          <div className="telemetry-notification-copy">
            <strong>{item.title}</strong>
            <p>{item.body}</p>
            <span className="telemetry-notification-meta">
              <span className="telemetry-mini-pulse" aria-hidden="true" />
              {item.meta}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
