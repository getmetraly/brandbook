import type { Meta, StoryObj } from "@storybook/react";
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";

const navItems = ["Overview", "Boards", "Signals", "Incidents", "Settings"];

const pickerItems = [
  { title: "Flow efficiency", kind: "metric/scalar", description: "Single KPI with delta and sparkline.", iconLabel: "metric", state: "live" as const, selected: true },
  { title: "Time-series chart", kind: "chart/line", description: "Multi-series line, p50/p99 overlay.", iconLabel: "chart", state: "live" as const },
  { title: "Flaky builds · 7d", kind: "ci/flaky", description: "Tests retried-then-passed.", iconLabel: "lightning", state: "new" as const },
  { title: "WIP per engineer", kind: "flow/wip", description: "Source not connected.", iconLabel: "user", state: "disabled" as const, disabled: true },
];

const widgets = [
  { id: "deploy", title: "Deployment frequency", kind: "dora/deploy-freq", value: "24 / day", delta: "▲ 18% vs −14d", spark: [4, 6, 5, 7, 8, 6, 9, 11, 10, 12, 14, 13, 15, 14, 12, 16, 18, 17, 15, 19, 21, 18, 22, 24], position: { col: 1, row: 1, w: 3, h: 1 } },
  { id: "lead", title: "Lead time for changes", kind: "dora/lead-time", value: "41h", delta: "▼ 6h vs −14d", spark: [62, 60, 58, 56, 55, 54, 52, 50, 49, 48, 47, 46, 45, 44, 44, 43, 43, 42, 42, 42, 41, 41, 41, 41], position: { col: 4, row: 1, w: 3, h: 1 } },
  { id: "cfr", title: "Change failure rate", kind: "dora/cfr", value: "4.2%", delta: "▲ 0.8% vs −14d", deltaTone: "warn" as const, spark: [3.0, 3.1, 3.0, 2.9, 3.2, 3.4, 3.3, 3.5, 3.6, 3.5, 3.7, 3.8, 3.9, 3.8, 4.0, 3.9, 4.1, 4.0, 4.2, 4.1, 4.3, 4.2, 4.2, 4.2], position: { col: 7, row: 1, w: 3, h: 1 } },
  { id: "ci", title: "CI failure rate", kind: "ci/fail", state: "error" as const, position: { col: 10, row: 1, w: 3, h: 1 } },
];

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

function DashboardEditorScenario() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px minmax(0, 1fr)", gap: 12, minHeight: 860, background: "var(--m-bg-0)", color: "var(--m-fg-1)", padding: 16 }}>
      <aside style={{ background: "var(--m-bg-1)", border: "1px solid var(--m-line)", borderRadius: "var(--m-r-3)", padding: 16, display: "grid", gap: 10, alignContent: "start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: "1px solid var(--m-line-faint)" }}>
          <div style={{ width: 36, height: 36, borderRadius: "var(--m-r-2)", display: "grid", placeItems: "center", border: "1px solid var(--m-cyan-500)", color: "var(--m-cyan-500)", background: "var(--m-bg-2)", fontFamily: "var(--m-font-mono)", fontWeight: 600 }}>M</div>
          <div>
            <div style={{ fontSize: "var(--m-fs-11)", color: "var(--m-fg-0)", fontWeight: 600 }}>METRALY</div>
            <div style={{ fontSize: "var(--m-fs-9)", color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>engineering intelligence</div>
          </div>
        </div>
        <nav style={{ display: "grid", gap: 4 }}>
          {navItems.map((item, index) => (
            <div key={item} style={{
              minHeight: 34,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 10px",
              borderRadius: "var(--m-r-2)",
              background: index === 1 ? "var(--m-cyan-bg)" : "transparent",
              color: index === 1 ? "var(--m-fg-0)" : "var(--m-fg-2)",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: index === 1 ? "var(--m-cyan-500)" : "var(--m-fg-3)" }} />
              <span style={{ fontSize: "var(--m-fs-11)" }}>{item}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main style={{ display: "grid", gap: 12, minWidth: 0 }}>
        <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: "var(--m-r-3)", border: "1px solid var(--m-line)", background: "var(--m-bg-1)" }}>
          <div style={{ minWidth: 0, flex: 1, display: "grid", gap: 2 }}>
            <div style={{ fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Workspace / Acme / Dashboards / Delivery</div>
            <div style={{ fontSize: "var(--m-fs-16)", color: "var(--m-fg-0)", fontWeight: 500 }}>Delivery · all teams</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 16, height: 8, borderRadius: 999, background: "var(--m-cyan-500)", boxShadow: "0 0 8px -1px var(--m-cyan-glow)" }} />
            <span style={{ fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-10)", color: "var(--m-fg-2)" }}>14d window · 6 teams</span>
          </div>
        </header>

        <DashboardToolbar
          tabs={[
            { value: "delivery", label: "Delivery", count: 11 },
            { value: "dora", label: "DORA", count: 4 },
            { value: "flow", label: "Flow", count: 6 },
            { value: "reviews", label: "Reviews", count: 5 },
            { value: "ci", label: "CI", count: 3 },
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

        <div style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 38, padding: "0 12px", border: "1px dashed var(--m-cyan-500)", borderRadius: "var(--m-r-2)", background: "var(--m-cyan-bg)", color: "var(--m-cyan-500)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-10)", letterSpacing: "0.03em" }}>
          <span aria-hidden="true" style={{ width: 14, height: 8, borderRadius: 999, background: "currentColor", opacity: 0.9 }} />
          <span>Edit mode</span>
          <span style={{ color: "var(--m-fg-2)", letterSpacing: 0 }}>Drag widgets with grip dots, resize from the corner handles and persist changes with Save.</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 320px) minmax(0, 1fr)", gap: 12, alignItems: "start" }}>
          <section style={{ display: "grid", gap: 10, minWidth: 0, padding: 12, border: "1px solid var(--m-line)", borderRadius: "var(--m-r-3)", background: "var(--m-bg-1)" }}>
            <div style={{ display: "grid", gap: 2 }}>
              <strong style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 600 }}>Widget library</strong>
              <span style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)" }}>Pick a reusable telemetry surface.</span>
            </div>
            <label style={{ display: "grid", gap: 4, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <span>Search</span>
              <input type="search" placeholder="Filter widgets…" value="" readOnly style={{ height: 30, padding: "0 10px", border: "1px solid var(--m-line)", borderRadius: "var(--m-r-2)", background: "var(--m-bg-2)", color: "var(--m-fg-0)", font: "inherit" }} />
            </label>
            <div style={{ display: "grid", gap: 8 }}>
              {pickerItems.map((item) => (
                <WidgetPickerCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  kind={item.kind}
                  iconLabel={item.iconLabel}
                  state={item.state}
                  selected={item.selected}
                  disabled={item.disabled}
                />
              ))}
            </div>
          </section>

          <section style={{ display: "grid", gap: 12, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 38, padding: "0 12px", border: "1px dashed var(--m-cyan-500)", borderRadius: "var(--m-r-2)", background: "var(--m-cyan-bg)", color: "var(--m-cyan-500)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-10)", letterSpacing: "0.03em" }}>
              <span style={{ width: 14, height: 8, borderRadius: 999, background: "currentColor", opacity: 0.9 }} />
              <span>Drag a widget here · or click + Add widget</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: 12, alignItems: "start" }}>
              {widgets.map((widget, index) => (
                <div key={widget.id} style={{ gridColumn: `${widget.position.col} / span ${widget.position.w}`, gridRow: `${widget.position.row} / span ${widget.position.h}` }}>
                  <DashboardWidget
                    id={widget.id}
                    title={widget.title}
                    subtitle={widget.kind}
                    state={widget.state ?? (index === 3 ? "error" : "live")}
                    selected={widget.id === "lead"}
                    dragging={widget.id === "cfr"}
                    resizable={widget.id !== "ci"}
                  >
                    {widget.state === "error" ? (
                      <div style={{ padding: 12, display: "grid", placeItems: "center", minHeight: 72 }}>
                        <StateBadge state="disconnected" label="Source disconnected" />
                      </div>
                    ) : (
                      <MetricBody value={widget.value} delta={widget.delta} deltaTone={widget.deltaTone} spark={widget.spark} />
                    )}
                  </DashboardWidget>
                </div>
              ))}
              <div style={{ gridColumn: "1 / span 12" }}>
                <DashboardDropZone state="active" label="Drag a widget here · or click + Add widget" description="Default drop zones stay pulse-free." />
              </div>
              <div style={{ gridColumn: "1 / span 12", display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <DashboardResizeHandle direction="east" label="Resize width" active />
                <DashboardResizeHandle direction="southeast" label="Resize corner" active />
              </div>
            </div>
          </section>
        </div>
      </main>
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
