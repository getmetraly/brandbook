import { WidgetShell } from "@metraly/ui";

/**
 * Preview wrapper around the production WidgetShell. This component shows
 * how a widget shell appears inside the canonical dashboard preview area
 * while delegating rendering to the implementation package.
 */
export default function TelemetryWidgetShell() {
  return (
    <WidgetShell
      title="Flow efficiency"
      subtitle="Unified widget shell contract for dashboards, dnd-kit and react-grid-layout."
      state="live"
      stateLabel="Live"
      resizable
    >
      <div className="metric-value" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
        81%
      </div>
      <p>Widget content lives here: metrics, Recharts wrappers, tables or empty states.</p>
    </WidgetShell>
  );
}
