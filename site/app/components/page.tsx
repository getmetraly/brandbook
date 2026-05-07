const chartData = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 56 },
  { label: "Wed", value: 68 },
  { label: "Thu", value: 74 },
  { label: "Fri", value: 88 },
];

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

export default function ComponentsPage() {
  return (
    <main>
      <section className="shell hero component-hero">
        <div>
          <div className="eyebrow"><span className="metraly-pulse-marker" />Component system draft</div>
          <h1>Visual React component lab for Metraly.</h1>
          <p className="lead">
            Buttons, badges, cards, widgets, charts, forms and layout patterns in one page before they move into the product and website.
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

        <Section title="Charts" description="CSS/SVG chart drafts using Metraly graph colors. These can later be replaced with Recharts primitives.">
          <div className="chart-grid">
            <div className="component-card chart-card">
              <h3>Bar chart</h3>
              <div className="bar-chart-demo">
                {chartData.map((item) => (
                  <div className="bar-item" key={item.label}>
                    <div className="bar-track"><span style={{ height: `${item.value}%` }} /></div>
                    <small>{item.label}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="component-card chart-card">
              <h3>Line chart</h3>
              <svg className="line-chart-demo" viewBox="0 0 420 180" role="img" aria-label="Line chart demo">
                <path d="M20 140 L115 108 L210 82 L305 64 L400 32" fill="none" stroke="#00e5cc" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 140 L115 108 L210 82 L305 64 L400 32 L400 170 L20 170 Z" fill="rgba(0,229,204,0.12)" />
              </svg>
            </div>
            <div className="component-card chart-card chart-wide">
              <h3>Telemetry pulse chart</h3>
              <div className="metraly-divider" />
              <p>Use the pulse marker for dividers, live status breaks and observability-flavored section rhythm.</p>
            </div>
          </div>
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
      </div>
    </main>
  );
}
