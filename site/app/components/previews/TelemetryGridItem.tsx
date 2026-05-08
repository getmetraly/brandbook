import { WidgetShell } from "@metraly/ui";

export default function TelemetryGridItem() {
  return (
    <WidgetShell
      title="Deployment health"
      subtitle="react-grid-layout compatible widget shell with resize affordances."
      state="live"
      stateLabel="Live"
      resizable
    >
      <div className="metric-value">99.98%</div>
      <p>react-grid-layout compatible widget shell with resize affordances.</p>
    </WidgetShell>
  );
}
