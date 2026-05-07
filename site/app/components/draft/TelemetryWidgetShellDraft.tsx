import WidgetShell from "../../../../implementation-pack/react/WidgetShell";

/**
 * Draft wrapper around the production WidgetShell.  This component shows
 * how a widget shell will appear inside the draft preview area while
 * delegating rendering to the new implementation.  It supplies
 * placeholder content and a static title/description used in the demo.
 */
export default function TelemetryWidgetShellDraft() {
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
