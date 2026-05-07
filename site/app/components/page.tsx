import RechartsShowcase from "./RechartsShowcase";
import TelemetryCheckboxDraft from "./draft/TelemetryCheckboxDraft";
import TelemetrySelectDraft from "./draft/TelemetrySelectDraft";
import TelemetrySwitchDraft from "./draft/TelemetrySwitchDraft";
import TelemetryTabsDraft from "./draft/TelemetryTabsDraft";
import WidgetPickerCardDraft from "./draft/WidgetPickerCardDraft";
import TelemetryTableRowDraft from "./draft/TelemetryTableRowDraft";
import TelemetryToastDraft from "./draft/TelemetryToastDraft";
import TelemetryDrawerDraft from "./draft/TelemetryDrawerDraft";
import TelemetryModalDraft from "./draft/TelemetryModalDraft";
import TelemetrySkeletonDraft from "./draft/TelemetrySkeletonDraft";
import RechartsTelemetryCardDraft from "./draft/RechartsTelemetryCardDraft";

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

        <Section title="Widget cards" description="Metric widgets for board/dashboard surfaces.">
          <div className="dashboard-grid-large">
            <div className="metric metric-wide">
              <div className="metric-label metraly-pulse-inline"><span className="metraly-pulse-marker" />Flow efficiency</div>
              <div className="metric-value">81%</div>
              <div className="metric-delta">+8% vs last sprint</div>
            </div>
            <div className="metric">
              <div className="metric-label">Review latency</div>
              <div className="metric-value">4h</div>
              <div className="metric-delta">within target</div>
            </div>
            <div className="metric">
              <div className="metric-label">Deploy frequency</div>
              <div className="metric-value">12/w</div>
              <div className="metric-delta">healthy</div>
            </div>
          </div>
        </Section>

        <Section title="Board edit mode" description="Visual states for drag-and-drop board configuration: selected, dragging, drop zone, ghost preview and full-width widget.">
          <BoardEditModePreview />
        </Section>

        <Section title="Layout system" description="Dashboard shell with sidebar, toolbar and responsive board area.">
          <div className="dashboard-layout-demo">
            <aside className="sidebar-demo panel">
              <div className="logo" style={{ marginBottom: 28 }}>
                <span className="logo-mark"><span className="metraly-pulse-marker" /></span>
                <span>Metraly</span>
              </div>
              {["Overview", "Boards", "Signals", "Incidents", "Settings"].map((item, index) => (
                <div className={index === 1 ? "sidebar-item active" : "sidebar-item"} key={item}>
                  {index === 1 ? <span className="metraly-pulse-marker" /> : null}
                  {item}
                </div>
              ))}
            </aside>
            <div className="dashboard-main-demo">
              <div className="dashboard-toolbar panel">
                <div>
                  <strong>Engineering board</strong>
                  <span>Last updated 2m ago</span>
                </div>
                <button className="btn btn-primary">Add widget</button>
              </div>
              <div className="layout-placeholder panel">
                <span className="metraly-pulse-marker metraly-pulse-marker--lg" />
                <strong>Board canvas</strong>
                <p>Drop charts, metrics, insight cards and incident widgets here.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Charts" description="Recommended chart primitive: Recharts, wrapped by Metraly chart components and fed by brand tokens.">
          <RechartsShowcase />
        </Section>

        <Section title="Forms and states" description="Inputs, selects and empty states for dashboard creation flows.">
          <div className="component-grid">
            <div className="component-card">
              <h3>Inputs</h3>
              <div className="form-demo">
                <label>Board name<input placeholder="VP Engineering Overview" /></label>
                <label>Metric source<select defaultValue="github"><option value="github">GitHub</option><option value="ci">CI/CD</option><option value="incident">Incidents</option></select></label>
              </div>
            </div>
            <div className="component-card">
              <h3>Empty state</h3>
              <div className="empty-state-demo">
                <span className="metraly-pulse-marker metraly-pulse-marker--lg" />
                <strong>No widgets yet</strong>
                <p>Create your first telemetry widget to start building this board.</p>
                <button className="btn btn-primary">Create widget</button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Telemetry draft primitives" description="New draft components are appended below the original component lab so they can be validated before promotion.">
          <div className="component-grid">
            <div className="component-card"><h3>Checkbox</h3><TelemetryCheckboxDraft checked label="Selected widget" /></div>
            <div className="component-card"><h3>Select</h3><TelemetrySelectDraft /></div>
            <div className="component-card"><h3>Switch</h3><TelemetrySwitchDraft /></div>
            <div className="component-card"><h3>Tabs</h3><TelemetryTabsDraft /></div>
            <div className="component-card"><h3>Widget picker</h3><WidgetPickerCardDraft /></div>
            <div className="component-card"><h3>Table row</h3><TelemetryTableRowDraft /></div>
            <div className="component-card"><h3>Toast</h3><TelemetryToastDraft /></div>
            <div className="component-card"><h3>Drawer</h3><TelemetryDrawerDraft /></div>
            <div className="component-card"><h3>Modal</h3><TelemetryModalDraft /></div>
            <div className="component-card"><h3>Skeleton</h3><TelemetrySkeletonDraft /></div>
            <div className="component-card"><h3>Recharts wrapper</h3><RechartsTelemetryCardDraft /></div>
          </div>
        </Section>
      </div>
    </main>
  );
}
