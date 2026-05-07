export default function TelemetryDragOverlayDraft() {
  return (
    <div className="telemetry-drag-overlay-draft">
      <div className="telemetry-drag-overlay-head">
        <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
        <strong>Review latency</strong>
        <span className="brand-badge brand-badge-warning">draft</span>
      </div>
      <p>dnd-kit drag overlay shell. Grip is neutral; pulse is not used for drag affordance.</p>
    </div>
  );
}
