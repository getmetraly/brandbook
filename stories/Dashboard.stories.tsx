import type { Meta, StoryObj } from "@storybook/react";
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";
import * as React from "react";

// ─── Minimal inline SVG icon — scenario shell only ───────────────
// These glyphs are used in the sidebar/topbar app chrome which has no
// counterpart component in @metraly/ui. Widget picker card icons live
// inside WidgetPickerCard itself.
function Icon({ name, size = 13 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="1.5" y="1.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
        <rect x="8.5" y="1.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
        <rect x="1.5" y="8.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
        <rect x="8.5" y="8.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
      </>
    ),
    metric: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35"
        d="M1.5 10.5h2V7h2v3.5h2V5h2v5.5h2V2.5h2v8" />
    ),
    lightning: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35"
        fill="currentColor" fillOpacity={0.2}
        d="M8.5 1.5 5 7h4.5l-3 6 6-7.5H8.5z" />
    ),
    chart: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35"
        d="M1.5 10.5 4.5 7l2.5 2L10 4l3 3" />
    ),
    log: (
      <path strokeLinecap="round" strokeWidth="1.35"
        d="M2.5 4.5h9M2.5 7h6M2.5 9.5h8" />
    ),
    refresh: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35"
        d="M11.5 4A5 5 0 1 0 12 7M11.5 1v3h-3" />
    ),
    bell: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35"
          d="M4 8a3 3 0 0 1 6 0v3H4V8z" />
        <path strokeLinecap="round" strokeWidth="1.35"
          d="M5.5 11v.5a1.5 1.5 0 0 0 3 0V11" />
      </>
    ),
    user: (
      <>
        <circle cx="7" cy="5" r="2.5" strokeWidth="1.35" />
        <path strokeLinecap="round" strokeWidth="1.35"
          d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      </>
    ),
    settings: (
      <>
        <circle cx="7" cy="7" r="2" strokeWidth="1.35" />
        <path strokeLinecap="round" strokeWidth="1.35"
          d="M7 2v1.5M7 11.5V13M2 7h1.5M11.5 7H13" />
      </>
    ),
    check: (
      <path strokeLinecap="round" strokeWidth="1.35" d="M2.5 7l3 3 6-6" />
    ),
  };

  return (
    <svg
      viewBox="0 0 14 14"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {paths[name] ?? null}
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────
const sidebarNav = [
  { id: "overview",  label: "Overview",    icon: "grid" },
  { id: "delivery",  label: "Delivery",    icon: "metric",  active: true },
  { id: "dora",      label: "DORA",        icon: "lightning" },
  { id: "flow",      label: "Flow & WIP",  icon: "chart" },
  { id: "reviews",   label: "Code review", icon: "log",     badge: 3 },
  { id: "ci",        label: "CI health",   icon: "refresh" },
  { id: "incidents", label: "Incidents",   icon: "bell" },
  { id: "teams",     label: "Teams",       icon: "user" },
];

const sidebarFooter = [
  { id: "settings", label: "Settings",    icon: "settings" },
  { id: "user",     label: "ops@metraly", icon: "user" },
];

const pickerItems = [
  { id: "deploy-freq", iconLabel: "lightning", title: "Deployment frequency",  kind: "dora/deploy-freq",   description: "Deploys per day, by service & team." },
  { id: "lead-time",   iconLabel: "metric",    title: "Lead time for changes", kind: "dora/lead-time",     description: "PR opened → prod, p50 / p90.", selected: true },
  { id: "cfr",         iconLabel: "chart",     title: "Change failure rate",   kind: "dora/cfr",           description: "% of deploys that triggered a rollback." },
  { id: "mttr",        iconLabel: "refresh",   title: "MTTR",                  kind: "dora/mttr",          description: "Time from incident open → resolved." },
  { id: "cycle-time",  iconLabel: "chart",     title: "Cycle time breakdown",  kind: "flow/cycle",         description: "Coding · review · merge · deploy." },
  { id: "review-lat",  iconLabel: "metric",    title: "PR review latency",     kind: "review/latency",     description: "First review response, by team." },
  { id: "ci-fail",     iconLabel: "log",       title: "CI failure rate",       kind: "ci/fail",            description: "Failed pipelines / total pipelines." },
  { id: "flaky",       iconLabel: "lightning", title: "Flaky builds",          kind: "ci/flaky",           description: "Tests retried-then-passed in last 7d.", visualState: "new" as const },
  { id: "blocked",     iconLabel: "bell",      title: "Blocked work",          kind: "flow/blocked",       description: "Issues stalled > 3 days, by stage." },
  { id: "team-health", iconLabel: "user",      title: "Team delivery health",  kind: "team/health",        description: "Composite score per squad." },
  { id: "dora",        iconLabel: "grid",      title: "DORA overview",         kind: "dora/overview",      description: "All four DORA metrics on one card.", visualState: "new" as const },
  { id: "wip",         iconLabel: "log",       title: "WIP per engineer",      kind: "flow/wip",           description: "Source not connected.", disabled: true },
];

const widgets = [
  { id: "deploy", title: "Deployment frequency", kind: "dora/deploy-freq", value: "24 / day", delta: "▲ 18% vs −14d",    deltaTone: "ok"   as const, spark: [4, 6, 5, 7, 8, 6, 9, 11, 10, 12, 14, 13, 15, 14, 12, 16, 18, 17, 15, 19, 21, 18, 22, 24], position: { col: 1, row: 1, w: 3, h: 1 } },
  { id: "lead",   title: "Lead time for changes", kind: "dora/lead-time",  value: "41h",      delta: "▼ 6h vs −14d",     deltaTone: "ok"   as const, spark: [62, 60, 58, 56, 55, 54, 52, 50, 49, 48, 47, 46, 45, 44, 44, 43, 43, 42, 42, 42, 41, 41, 41, 41], position: { col: 4, row: 1, w: 3, h: 1 }, selected: true },
  { id: "cfr",    title: "Change failure rate",   kind: "dora/cfr",        value: "4.2%",     delta: "▲ 0.8% vs −14d",   deltaTone: "warn" as const, spark: [3.0, 3.1, 3.0, 2.9, 3.2, 3.4, 3.3, 3.5, 3.6, 3.5, 3.7, 3.8, 3.9, 3.8, 4.0, 3.9, 4.1, 4.0, 4.2, 4.1, 4.3, 4.2, 4.2, 4.2], position: { col: 7, row: 1, w: 3, h: 1 }, dragging: true },
  { id: "ci",     title: "CI failure rate",        kind: "ci/fail",         state: "error"    as const, position: { col: 10, row: 1, w: 3, h: 1 } },
];

// ─── Helpers ──────────────────────────────────────────────────────
function MetricBody({
  value,
  delta,
  deltaTone = "ok",
  spark,
}: {
  value: string;
  delta: string;
  deltaTone?: "ok" | "warn" | "err";
  spark?: number[];
}) {
  return (
    <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 0 }}>
      <div>
        <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 24, color: "var(--m-fg-0)", lineHeight: 1, fontWeight: 500 }}>{value}</div>
        <div style={{ fontSize: 11, color: deltaTone === "warn" ? "var(--m-warn)" : deltaTone === "err" ? "var(--m-err)" : "var(--m-ok)", fontFamily: "var(--m-font-mono)", marginTop: 4 }}>{delta}</div>
      </div>
      {spark ? (
        <div style={{ display: "flex", alignItems: "end", gap: 3, height: 36 }}>
          {spark.slice(-12).map((point, index) => (
            <span key={index} style={{ width: 6, height: `${Math.max(8, Math.min(34, point / 1.1))}px`, background: index > 7 ? "var(--m-purple-500)" : "var(--m-cyan-500)", borderRadius: 999, opacity: 0.78 }} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

const ghostBtn: React.CSSProperties = {
  height: 30,
  padding: "0 10px",
  background: "var(--m-bg-2)",
  border: "1px solid var(--m-line)",
  color: "var(--m-fg-1)",
  borderRadius: "var(--m-r-2)",
  fontSize: 11,
  fontFamily: "var(--m-font-ui)",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

// ─── Scenario ─────────────────────────────────────────────────────
function DashboardEditorScenario() {
  return (
    // Outer shell: prototype 3-column layout — sidebar | canvas | right rail.
    // All three are app chrome (no rounded card shells).
    <div style={{
      display: "flex",
      width: "100%",
      height: 900,
      background: "var(--m-bg-0)",
      color: "var(--m-fg-1)",
      overflow: "hidden",
    }}>

      {/* ── Sidebar — app chrome, 196px ─────────────────────────── */}
      <aside style={{
        width: 196,
        flexShrink: 0,
        background: "var(--m-bg-1)",
        borderRight: "1px solid var(--m-line)",
        display: "flex",
        flexDirection: "column",
        padding: "16px 8px",
      }}>
        {/* Logo mark */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          padding: "8px 0 16px",
          borderBottom: "1px solid var(--m-line-faint)",
          marginBottom: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "var(--m-bg-2)",
            border: "1px solid var(--m-cyan-500)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--m-font-mono)", fontSize: 16, fontWeight: 600,
            color: "var(--m-cyan-500)",
          }}>M</div>
          <div style={{ fontSize: 11, color: "var(--m-fg-1)", fontWeight: 500, letterSpacing: "0.04em" }}>METRALY</div>
          <div style={{ fontSize: 9, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>engineering intelligence</div>
        </div>

        {/* Nav rows */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {sidebarNav.map((item) => (
            <div key={item.id} style={{
              position: "relative",
              display: "flex", alignItems: "center", gap: 10,
              padding: "7px 10px",
              borderRadius: "var(--m-r-2)",
              background: item.active ? "var(--m-cyan-bg)" : "transparent",
              color: item.active ? "var(--m-cyan-500)" : "var(--m-fg-2)",
              fontSize: "var(--m-fs-12)",
              cursor: "pointer",
            }}>
              {item.active && (
                <span style={{
                  position: "absolute", left: 0, top: 6, bottom: 6,
                  width: 2, background: "var(--m-cyan-500)", borderRadius: 2,
                }} />
              )}
              <Icon name={item.icon} size={13} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge != null && (
                <span style={{
                  fontFamily: "var(--m-font-mono)", fontSize: 9,
                  color: "var(--m-cyan-500)", background: "var(--m-cyan-bg)",
                  padding: "1px 5px", borderRadius: 999,
                  border: "1px solid var(--m-cyan-500)",
                }}>{item.badge}</span>
              )}
            </div>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Footer rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1, paddingTop: 12, borderTop: "1px solid var(--m-line-faint)" }}>
          {sidebarFooter.map((item) => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "7px 10px",
              color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)",
              borderRadius: "var(--m-r-2)", cursor: "pointer",
            }}>
              <Icon name={item.icon} size={13} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Center: topbar + scrollable canvas ──────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Topbar — app chrome, border-bottom, no card radius */}
        <header style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 18px",
          borderBottom: "1px solid var(--m-line)",
          background: "var(--m-bg-1)",
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 10, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Workspace / Acme / Dashboards / Delivery
            </div>
            <div style={{ fontSize: "var(--m-fs-16)", color: "var(--m-fg-0)", fontWeight: 500, display: "flex", alignItems: "center", gap: 10 }}>
              Delivery · all teams
              <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)", letterSpacing: "0.04em" }}>· 14d window · 6 teams</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <select style={{ height: 30, padding: "0 8px", border: "1px solid var(--m-line)", borderRadius: "var(--m-r-2)", background: "var(--m-bg-2)", color: "var(--m-fg-1)", fontFamily: "var(--m-font-ui)", fontSize: 11 }}>
              <option>Last 14 days</option>
            </select>
            <button style={ghostBtn}><Icon name="refresh" size={12} /> Refresh</button>
            <button style={ghostBtn}><Icon name="settings" size={12} /></button>
          </div>
        </header>

        {/* Scrollable main content */}
        <main style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>

          <DashboardToolbar
            tabs={[
              { value: "delivery", label: "Delivery", count: 11 },
              { value: "dora",     label: "DORA",     count: 4 },
              { value: "flow",     label: "Flow",     count: 6 },
              { value: "reviews",  label: "Reviews",  count: 5 },
              { value: "ci",       label: "CI",       count: 3 },
            ]}
            activeTab="delivery"
            searchValue=""
            syncState="live"
            syncLabel="Live · 30s"
            editMode
            onToggleEdit={() => undefined}
            onAddWidget={() => undefined}
            addWidgetLabel="Add widget"
          />

          {/* Edit mode banner — dashed cyan border, no decorative pill or pulse */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 12px",
            background: "var(--m-cyan-bg)",
            border: "1px dashed var(--m-cyan-500)",
            borderRadius: "var(--m-r-3)",
            fontFamily: "var(--m-font-mono)", fontSize: 11,
            color: "var(--m-cyan-500)", letterSpacing: "0.04em",
          }}>
            <span style={{ textTransform: "uppercase" }}>Edit mode</span>
            <span style={{ color: "var(--m-fg-2)", textTransform: "none", letterSpacing: 0 }}>· Drag widgets with grip dots · Resize from corner handles · Drag from library to add</span>
            <span style={{ flex: 1 }} />
            <button style={{ ...ghostBtn, height: 24, padding: "0 8px", fontSize: 11, color: "var(--m-cyan-500)", borderColor: "var(--m-cyan-500)", background: "transparent" }}>
              <Icon name="check" size={11} /> Done
            </button>
          </div>

          {/* 12-column dashboard grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "minmax(150px, auto)",
            gap: 12,
          }}>
            {widgets.map((widget) => (
              <div key={widget.id} style={{
                gridColumn: `${widget.position.col} / span ${widget.position.w}`,
                gridRow: `${widget.position.row} / span ${widget.position.h}`,
              }}>
                <DashboardWidget
                  id={widget.id}
                  title={widget.title}
                  subtitle={widget.kind}
                  state={widget.state ?? "live"}
                  selected={widget.selected}
                  dragging={widget.dragging}
                  resizable={widget.id !== "ci"}
                >
                  {widget.state === "error" ? (
                    <div style={{ padding: 12, display: "grid", placeItems: "center", minHeight: 72 }}>
                      <StateBadge state="disconnected" label="Source disconnected" />
                    </div>
                  ) : (
                    <MetricBody
                      value={widget.value ?? "—"}
                      delta={widget.delta ?? ""}
                      deltaTone={widget.deltaTone}
                      spark={widget.spark}
                    />
                  )}
                </DashboardWidget>
              </div>
            ))}

            {/* Drop zone — idle, pulse-free */}
            <div style={{ gridColumn: "1 / span 12" }}>
              <DashboardDropZone state="idle" label="Drag a widget here · or click + Add widget" />
            </div>

            {/* Resize handle specimen */}
            <div style={{ gridColumn: "1 / span 12", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <DashboardResizeHandle direction="east" label="Resize width" active />
              <DashboardResizeHandle direction="southeast" label="Resize corner" active />
            </div>
          </div>
        </main>
      </div>

      {/* ── Right rail — Widget library, 320px ──────────────────── */}
      <aside style={{
        width: 320,
        flexShrink: 0,
        background: "var(--m-bg-1)",
        borderLeft: "1px solid var(--m-line)",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Rail header */}
        <div style={{
          padding: "12px 14px 8px",
          display: "flex", alignItems: "center", gap: 8,
          borderBottom: "1px solid var(--m-line-faint)",
          flexShrink: 0,
        }}>
          <Icon name="grid" size={13} />
          <span style={{ flex: 1, fontSize: "var(--m-fs-12)", color: "var(--m-fg-0)", fontWeight: 500 }}>Widget library</span>
          <button style={{ background: "transparent", border: "none", color: "var(--m-fg-3)", cursor: "pointer", padding: 4, borderRadius: 4, lineHeight: 1 }}>✕</button>
        </div>

        {/* Search row */}
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--m-line-faint)", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--m-bg-2)", border: "1px solid var(--m-line)",
            borderRadius: "var(--m-r-2)", padding: "0 10px",
            height: "var(--m-control-h)",
          }}>
            <Icon name="metric" size={12} />
            <input
              placeholder="Filter widgets…"
              readOnly
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "var(--m-fg-1)", fontFamily: "var(--m-font-ui)",
                fontSize: "var(--m-fs-12)",
              }}
            />
          </div>
        </div>

        {/* Scrollable widget list */}
        <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {pickerItems.map((item) => (
            <WidgetPickerCard
              key={item.id}
              title={item.title}
              description={item.description}
              kind={item.kind}
              iconLabel={item.iconLabel}
              selected={item.selected}
              disabled={item.disabled}
              visualState={item.visualState}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

const meta: Meta<typeof DashboardEditorScenario> = {
  title: "Scenarios/Dashboard Editor",
  component: DashboardEditorScenario,
};

export default meta;
type Story = StoryObj<typeof DashboardEditorScenario>;

export const Default: Story = {};
