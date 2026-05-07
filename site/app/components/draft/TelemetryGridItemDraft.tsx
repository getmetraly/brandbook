import WidgetShell from "../../../../implementation-pack/react/WidgetShell";

/**
 * Legacy draft component for grid items.  This wrapper now delegates to the
 * production-ready WidgetShell component from the implementation pack.  It
 * preserves the basic API and appearance of the original draft while
 * rendering through WidgetShell to ensure consistency with the design system.
 */
export default function TelemetryGridItemDraft() {
  return (
    <WidgetShell
      title="Deployment health"
      subtitle="react-grid-layout compatible widget shell with resize affordances."
      state="live"
      stateLabel="Live"
      resizable
    >
      <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>99.98%</div>
      <p>react-grid-layout compatible widget shell with resize affordances.</p>
    </WidgetShell>
  );
}
