export default function TelemetryDragOverlay() {
  return (
    <div className="telemetry-drag-overlay-draft">
      <div className="telemetry-drag-overlay-head">
        <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
        <strong>Review latency</strong>
      </div>
      <p>dnd-kit drag overlay shell. Grip is neutral; pulse is not used for drag affordance.</p>
    </div>
  );
}
