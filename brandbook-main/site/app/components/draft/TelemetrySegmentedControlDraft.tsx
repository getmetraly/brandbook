export default function TelemetrySegmentedControlDraft() {
  return (
    <div className="telemetry-segmented-control-draft">
      <button type="button" className="is-active">
        Overview
      </button>
      <button type="button">Signals</button>
      <button type="button">Incidents</button>
      <button type="button">Deploys</button>
    </div>
  );
}
