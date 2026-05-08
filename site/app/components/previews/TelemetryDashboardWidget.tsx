import { DashboardWidget } from "@metraly/ui";

/**
 * Preview wrapper around the production DashboardWidget. This component shows
 * how the canonical dashboard widget frame appears inside the grouped preview
 * area while delegating rendering to the implementation package.
 */
export default function TelemetryDashboardWidget() {
  return (
    <DashboardWidget
      id="preview-flow-efficiency"
      title="Flow efficiency"
      subtitle="Unified widget frame contract for dashboards, dnd-kit and react-grid-layout."
      state="live"
      stateLabel="Live"
      resizable
    >
      <div className="metric-value" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
        81%
      </div>
      <p>Widget content lives here: metrics, Recharts wrappers, tables or empty states.</p>
    </DashboardWidget>
  );
}
