import TelemetryStateBadgeDraft from "./TelemetryStateBadgeDraft";

export default function TelemetryWidgetShellDraft() {
  return (
    <article className="telemetry-widget-shell-draft" data-density="normal">
      <header className="telemetry-widget-shell-head">
        <div>
          <strong>Flow efficiency</strong>
          <p>Unified widget shell contract for dashboards, dnd-kit and react-grid-layout.</p>
        </div>
        <TelemetryStateBadgeDraft state="live" label="Live" />
      </header>

      <div className="telemetry-widget-shell-body">
        <div className="metric-value">81%</div>
        <p>Widget content lives here: metrics, Recharts wrappers, tables or empty states.</p>
      </div>

      <footer className="telemetry-widget-shell-foot">
        <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
      </footer>
    </article>
  );
}
