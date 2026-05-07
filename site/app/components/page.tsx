import RechartsShowcase from "./RechartsShowcase";
import TelemetryCheckboxDraft from "./draft/TelemetryCheckboxDraft";
import TelemetrySelectDraft from "./draft/TelemetrySelectDraft";
import TelemetrySwitchDraft from "./draft/TelemetrySwitchDraft";
import TelemetryTabsDraft from "./draft/TelemetryTabsDraft";

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function BoardEditModePreview() {
  return (
    <div className="board-edit-shell panel">
      <div className="board-edit-toolbar">
        <div>
          <strong>Edit board layout</strong>
          <span>Drag widgets, resize from corners, or toggle full-width mode.</span>
        </div>
        <div className="component-row" style={{ marginTop: 0 }}>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save layout</button>
        </div>
      </div>

      <div className="board-grid-edit">
        <div className="edit-widget is-selected">
          <div className="widget-edit-topbar">
            <span className="drag-handle" aria-label="Drag handle">⋮⋮</span>
            <strong>Flow efficiency</strong>
            <span className="brand-badge brand-badge-primary">selected</span>
          </div>
          <div className="metric-value">81%</div>
          <p>Selected widget: show border, toolbar and resize handles.</p>
          <span className="resize-handle resize-handle-se" />
          <span className="resize-handle resize-handle-e" />
        </div>

        <div className="edit-widget is-dragging">
          <div className="widget-edit-topbar">
            <span className="drag-handle">⋮⋮</span>
            <strong>Review latency</strong>
          </div>
          <div className="metric-value">4h</div>
          <p>Dragging state: elevated, slightly transparent and cyan outline.</p>
        </div>

        <div className="drop-zone">
          <span className="metraly-pulse-marker metraly-pulse-marker--lg" />
          <strong>Drop widget here</strong>
          <p>Dashed area makes available slots obvious.</p>
        </div>

        <div className="edit-widget is-full-width">
          <div className="widget-edit-topbar">
            <span className="drag-handle">⋮⋮</span>
            <strong>Deployment health</strong>
            <span className="brand-badge brand-badge-success">full width</span>
          </div>
          <div className="metraly-divider" />
          <p>Full-width widgets should span the board and use a visible state badge.</p>
          <span className="resize-handle resize-handle-se" />
        </div>

        <div className="ghost-widget">
          <strong>Ghost preview</strong>
          <p>Shows where the widget will land before drop.</p>
        </div>
      </div>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <main>
      <section className="shell hero component-hero">
        <div>
          <div className="eyebrow"><span className="metraly-pulse-marker" />Component system draft</div>
          <h1>Visual React component lab for Metraly.</h1>
          <p className="lead">
            Buttons, badges, cards, widgets, charts, forms, board edit mode and layout patterns before they move into the product and website.
          </p>
        </div>
        <div className="panel preview-card">
          <div className="preview-header">
            <span>Component readiness</span>
            <span style={{ color: "var(--cyan)" }}>draft</span>
          </div>
          <div className="metraly-divider" />
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            This page is the visual sandbox for the future shared Metraly UI framework.
          </p>
        </div>
      </section>

      <div className="shell">
        <Section title="Telemetry draft primitives" description="Foundation telemetry-native primitives for dnd-kit, react-grid-layout, Zustand and Recharts-based flows.">
          <div className="component-grid">
            <div className="component-card">
              <h3>Checkbox</h3>
              <TelemetryCheckboxDraft checked label="Selected widget" />
            </div>

            <div className="component-card">
              <h3>Select</h3>
              <TelemetrySelectDraft />
            </div>

            <div className="component-card">
              <h3>Switch</h3>
              <TelemetrySwitchDraft />
            </div>

            <div className="component-card">
              <h3>Tabs</h3>
              <TelemetryTabsDraft />
            </div>
          </div>
        </Section>

        <Section title="Buttons and badges" description="Core controls and semantic labels. Hover states are stable and must not jump.">
          <div className="component-grid">
            <div className="component-card">
              <h3>Buttons</h3>
              <div className="component-row">
                <button className="btn btn-primary">Create dashboard</button>
                <button className="btn btn-secondary">View docs</button>
                <button className="brand-btn brand-btn-ghost">Ghost action</button>
              </div>
            </div>
            <div className="component-card">
              <h3>Badges</h3>
              <div className="component-row">
                <span className="brand-badge brand-badge-primary">Telemetry</span>
                <span className="brand-badge brand-badge-success">Healthy</span>
                <span className="brand-badge brand-badge-warning">Review</span>
                <span className="brand-badge brand-badge-danger">Blocked</span>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
