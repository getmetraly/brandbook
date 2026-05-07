const swatches = [
  ["Cyan", "#00e5cc", "Primary action / telemetry"],
  ["Purple", "#a855f7", "Secondary highlight"],
  ["Green", "#22c55e", "Healthy state"],
  ["Orange", "#f59e0b", "Warning state"],
  ["Base", "#0b0f14", "Product canvas"],
  ["Surface", "#111722", "Panels / nav"],
  ["Card", "#151d28", "Metric cards"],
  ["Text", "#f0f4f8", "Primary copy"],
];

const principles = [
  {
    title: "Privacy-first",
    text: "Metraly should always communicate data ownership, self-hosting and customer-controlled infrastructure.",
  },
  {
    title: "Telemetry-native",
    text: "The visual system uses pulse lines, metric surfaces and graph accents without becoming noisy.",
  },
  {
    title: "Engineering calm",
    text: "Dense dashboards should feel precise and stable. Motion should support feedback, not distract.",
  },
];

function Mark({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`mark-gradient-${size}`} x1="18" y1="64" x2="112" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00E5CC" />
          <stop offset="0.56" stopColor="#00E5CC" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="112" height="112" rx="28" fill="#0B0F14" />
      <rect x="8.5" y="8.5" width="111" height="111" rx="27.5" stroke="rgba(255,255,255,0.12)" />
      <path d="M18 68H34L41 42L53 92L67 28L80 68H110" stroke={`url(#mark-gradient-${size})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main>
      <header className="nav">
        <div className="shell nav-inner">
          <a href="#top" className="logo" aria-label="Metraly Brandbook home">
            <span className="logo-mark"><Mark size={26} /></span>
            <span>Metraly Brandbook</span>
          </a>
          <nav className="nav-links" aria-label="Brandbook sections">
            <a href="#principles">Principles</a>
            <a href="#colors">Colors</a>
            <a href="#logo">Logo</a>
            <a href="#implementation">Implementation</a>
          </nav>
        </div>
      </header>

      <section id="top" className="shell hero">
        <div>
          <div className="eyebrow">Self-hosted engineering intelligence</div>
          <h1>One brand system for product, website and docs.</h1>
          <p className="lead">
            A local-first Next.js viewer for the Metraly brandbook: visual identity, tokens, logo assets,
            implementation primitives and adoption guidance in one place.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#implementation">Start implementing</a>
            <a className="btn btn-secondary" href="#logo">View assets</a>
          </div>
        </div>

        <div className="panel preview-card" aria-label="Dashboard style preview">
          <div className="preview-header">
            <span>Metraly / live system preview</span>
            <span style={{ color: "var(--cyan)" }}>● healthy</span>
          </div>
          <div className="dashboard-grid">
            <div className="metric">
              <div className="metric-label">PR cycle time</div>
              <div className="metric-value">2.4d</div>
              <div className="metric-delta">-18% faster</div>
            </div>
            <div className="metric">
              <div className="metric-label">Deployment health</div>
              <div className="metric-value">99.2%</div>
              <div className="metric-delta">+3.1%</div>
            </div>
            <div className="metric">
              <div className="metric-label">Review latency</div>
              <div className="metric-value">4h</div>
              <div className="metric-delta">within target</div>
            </div>
            <div className="metric">
              <div className="metric-label">Flow efficiency</div>
              <div className="metric-value">81%</div>
              <div className="metric-delta">stable</div>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="shell section">
        <div className="section-head">
          <h2>Brand principles</h2>
          <p>Metraly should feel technical, trusted and transparent. The product is for engineering leaders and teams who need control over their own data.</p>
        </div>
        <div className="card-grid">
          {principles.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="colors" className="shell section">
        <div className="section-head">
          <h2>Color system</h2>
          <p>Dark surfaces are the product default. Cyan is the primary signal color; purple supports brand depth; semantic colors communicate system health.</p>
        </div>
        <div className="swatches">
          {swatches.map(([name, value, usage]) => (
            <div className="swatch" key={name}>
              <div className="swatch-color" style={{ background: value }} />
              <div className="swatch-meta">
                <strong>{name}</strong>
                <span>{value}</span>
                <span>{usage}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="logo" className="shell section">
        <div className="section-head">
          <h2>Logo system</h2>
          <p>The mark is an angular M shaped as a telemetry pulse. It should work from favicon scale to sidebar and marketing usage.</p>
        </div>
        <div className="logo-showcase">
          <div className="logo-tile">
            <div className="logo" style={{ fontSize: 36 }}>
              <Mark size={72} />
              <span>Metraly</span>
            </div>
          </div>
          <div className="logo-tile">
            <Mark size={112} />
          </div>
        </div>
      </section>

      <section id="implementation" className="shell section">
        <div className="section-head">
          <h2>Run locally</h2>
          <p>The site is intentionally isolated in `site/`, so the brandbook repository can keep documentation and implementation assets separate.</p>
        </div>
        <pre className="code"><code>{`cd site
npm install
npm run dev

# production check
npm run build
npm run start`}</code></pre>
      </section>

      <footer className="footer">
        <div className="shell">Metraly Brandbook · tokens, assets, components and migration plan.</div>
      </footer>
    </main>
  );
}
