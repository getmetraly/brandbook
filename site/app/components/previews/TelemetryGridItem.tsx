import { DashboardWidget } from "@metraly/ui";

export default function TelemetryGridItem() {
  return (
    <DashboardWidget
      id="preview-deployment-health"
      title="Deployment health"
      subtitle="react-grid-layout compatible widget frame with resize affordances."
      state="live"
      stateLabel="Live"
      resizable
    >
      <div className="metric-value">99.98%</div>
      <p>react-grid-layout compatible widget frame with resize affordances.</p>
    </DashboardWidget>
  );
}
