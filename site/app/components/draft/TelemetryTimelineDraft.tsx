const events = [
  {
    title: "Deployment completed",
    body: "Production deploy succeeded",
    time: "2m ago",
    state: "live",
  },
  {
    title: "Latency spike detected",
    body: "API p95 crossed threshold",
    time: "14m ago",
    state: "warning",
  },
  {
    title: "Board synced",
    body: "Layout changes persisted",
    time: "21m ago",
    state: "live",
  },
];

export default function TelemetryTimelineDraft() {
  return (
    <div className="telemetry-timeline-draft">
      {events.map((event) => (
        <article className={`telemetry-timeline-event is-${event.state}`} key={event.title}>
          <span className="telemetry-state-pulse" aria-hidden="true" />
          <div className="telemetry-timeline-copy">
            <strong>{event.title}</strong>
            <p>{event.body}</p>
            <span className="telemetry-timeline-meta">
              <span className="telemetry-mini-pulse" aria-hidden="true" />
              {event.time}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
