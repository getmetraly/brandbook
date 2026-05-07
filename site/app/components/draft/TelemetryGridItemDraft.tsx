import WidgetShell from "../../../../implementation-pack/react/WidgetShell";

export default function TelemetryGridItemDraft() {
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
