import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  MetralyCheckbox,
  MetralyRadio,
  MetralySelect,
  MetralySwitch,
  MetralyTable,
  MetralyTabs,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";

function BoardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{title}</div>
      {children}
    </section>
  );
}

function StateBoardShowcase() {
  return (
    <div style={{ display: "grid", gap: 20, padding: 16, background: "var(--m-bg-0)", color: "var(--m-fg-1)" }}>
      <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Component State Board · Form controls 1-6
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <BoardSection title="1. MetralyCheckbox">
          <div style={{ display: "grid", gap: 8 }}>
            <MetralyCheckbox label="Stream metrics" />
            <MetralyCheckbox checked label="Telemetry on" />
            <MetralyCheckbox indeterminate label="Some sources" />
            <MetralyCheckbox disabled checked label="Locked policy" />
            <MetralyCheckbox loading label="Saving..." />
            <MetralyCheckbox error label="Token expired" hint="Re-authenticate to continue" />
          </div>
        </BoardSection>

        <BoardSection title="2. MetralyRadio">
          <div style={{ display: "grid", gap: 8 }}>
            <MetralyRadio name="sb-r" value="p50" label="p50" />
            <MetralyRadio name="sb-r2" value="p99" checked label="p99" />
            <MetralyRadio name="sb-r3" value="inv" error label="Invalid metric" hint="Choose a supported quantile" />
            <MetralyRadio name="sb-r4" value="med" disabled label="median (locked)" />
          </div>
        </BoardSection>

        <BoardSection title="3. MetralySwitch">
          <div style={{ display: "grid", gap: 8 }}>
            <MetralySwitch label="Live tail" />
            <MetralySwitch checked label="Live tail" />
            <MetralySwitch checked loading label="Applying..." />
            <MetralySwitch disabled label="Read-only" />
            <MetralySwitch checked disabled label="Locked" />
            <MetralySwitch checked accent="purple" label="Beta channel" />
          </div>
        </BoardSection>

        <BoardSection title="4. MetralySelect">
          <div style={{ display: "grid", gap: 8 }}>
            <MetralySelect label="Range" options={[{ value: "1h", label: "Last 1 hour" }, { value: "24h", label: "Last 24 hours" }]} placeholder="Select range..." onChange={() => undefined} />
            <MetralySelect label="Range" options={[{ value: "1h", label: "Last 1 hour" }, { value: "24h", label: "Last 24 hours" }]} value="24h" onChange={() => undefined} />
            <MetralySelect label="Range" options={[{ value: "1h", label: "Last 1 hour" }]} value="1h" loading onChange={() => undefined} />
            <MetralySelect label="Range" options={[{ value: "1h", label: "Last 1 hour" }]} value="1h" disabled onChange={() => undefined} />
          </div>
        </BoardSection>

        <BoardSection title="5. MetralyTabs">
          <div style={{ display: "grid", gap: 12 }}>
            <MetralyTabs
              items={[
                { value: "d", label: "DORA", count: 4 },
                { value: "f", label: "Flow", count: 6 },
                { value: "r", label: "Reviews", count: 5 },
                { value: "c", label: "CI", count: 3 },
                { value: "t", label: "Teams" },
              ]}
              defaultValue="d"
            />
            <MetralyTabs
              items={[
                { value: "d", label: "DORA", count: 4 },
                { value: "f", label: "Flow", count: 6 },
                { value: "r", label: "Reviews", count: 5 },
                { value: "c", label: "CI", count: 3 },
                { value: "t", label: "Teams", disabled: true },
              ]}
              defaultValue="d"
              livePulse
            />
          </div>
        </BoardSection>

        <BoardSection title="6. StateBadge">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <StateBadge state="live" />
            <StateBadge state="ok" />
            <StateBadge state="stale" label="Stale 4m" />
            <StateBadge state="error" />
            <StateBadge state="new" />
            <StateBadge state="info" />
            <StateBadge state="disabled" />
            <StateBadge state="disconnected" />
            <StateBadge state="warning" />
            <StateBadge state="success" />
            <StateBadge state="noData" />
          </div>
        </BoardSection>
      </div>

      <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)", letterSpacing: "0.04em", textTransform: "uppercase", paddingTop: 8 }}>
        Widget surface 7-12
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        <BoardSection title="7. DashboardResizeHandle">
          <div style={{ position: "relative", height: 80, background: "var(--m-bg-1)", borderRadius: "var(--m-r-4)", border: "1px solid var(--m-cyan-500)" }}>
            <DashboardResizeHandle direction="northwest" label="nw" active />
            <DashboardResizeHandle direction="north" label="n" active />
            <DashboardResizeHandle direction="northeast" label="ne" active />
            <DashboardResizeHandle direction="east" label="e" active />
            <DashboardResizeHandle direction="southeast" label="se" active />
            <DashboardResizeHandle direction="south" label="s" active />
            <DashboardResizeHandle direction="southwest" label="sw" active />
            <DashboardResizeHandle direction="west" label="w" active />
          </div>
        </BoardSection>

        <BoardSection title="8. DashboardDropZone">
          <div style={{ display: "grid", gap: 8 }}>
            <DashboardDropZone state="idle" />
            <DashboardDropZone state="active" />
            <DashboardDropZone state="rejected" />
          </div>
        </BoardSection>

        <BoardSection title="9. DashboardToolbar">
          <DashboardToolbar
            tabs={[{ value: "del", label: "Delivery", count: 11 }, { value: "dora", label: "DORA", count: 4 }, { value: "flow", label: "Flow", count: 6 }]}
            activeTab="del"
            searchValue=""
            syncState="live"
            syncLabel="Live · 30s"
            editMode
            onToggleEdit={() => undefined}
            onAddWidget={() => undefined}
          />
        </BoardSection>

        <BoardSection title="10. MetralyTable">
          <MetralyTable
            dense
            stickyHeader
            loading={false}
            selectedRowKeys={["auth-service"]}
            columns={[
              { key: "service", header: "Service" },
              { key: "p99", header: "P99", align: "right" },
              { key: "status", header: "Status" },
            ]}
            data={[
              { service: "api-gateway", p99: "184 ms", status: <StateBadge state="live" label="Live" size="sm" /> },
              { service: "auth-service", p99: "92 ms", status: <StateBadge state="live" label="Live" size="sm" /> },
              { service: "billing", p99: "612 ms", status: <StateBadge state="stale" label="Stale" size="sm" /> },
              { service: "worker-pool", p99: "—", status: <StateBadge state="error" label="Error" size="sm" /> },
            ]}
            rowKey={(r) => r.service}
          />
          <MetralyTable
            dense
            stickyHeader
            loading
            columns={[
              { key: "service", header: "Service" },
              { key: "p99", header: "P99", align: "right" },
            ]}
            data={[]}
          />
          <MetralyTable
            dense
            stickyHeader
            columns={[
              { key: "service", header: "Service" },
              { key: "p99", header: "P99", align: "right" },
            ]}
            data={[]}
            emptyText="No telemetry in this range"
          />
        </BoardSection>

        <BoardSection title="11. WidgetPickerCard">
          <div style={{ display: "grid", gap: 8 }}>
            <WidgetPickerCard title="Metric card" kind="METRIC/SCALAR" description="Single KPI with delta and sparkline." iconLabel="metric" />
            <WidgetPickerCard title="Time-series chart" kind="CHART/LINE" description="Multi-series line, p50/p99 overlay." iconLabel="chart" selected />
            <WidgetPickerCard title="Flaky builds · 7d" kind="CI/FLAKY" description="Tests retried-then-passed." iconLabel="lightning" visualState="new" />
            <WidgetPickerCard title="WIP per engineer" kind="FLOW/WIP" description="Source not connected." iconLabel="user" disabled />
            <WidgetPickerCard title="Time-series chart" kind="CHART/LINE" description="Multi-series line." iconLabel="chart" dragging />
          </div>
        </BoardSection>

        <BoardSection title="12. WidgetShell (DashboardWidget)">
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, 1fr)" }}>
            <DashboardWidget id="w1" title="Deploy frequency" subtitle="DORA/DEPLOY-FREQ" state="live" style={{ height: 120 }} />
            <DashboardWidget id="w2" title="Lead time" subtitle="DORA/LEAD-TIME" state="live" selected style={{ height: 120 }} />
            <DashboardWidget id="w3" title="Change failure ra..." subtitle="DORA/CFR" state="stale" stateLabel="Stale 4m" style={{ height: 120 }} />
            <DashboardWidget id="w4" title="CI failure rate" subtitle="CI/FAIL" state="disconnected" style={{ height: 120 }} />
            <DashboardWidget id="w5" title="MTTR" subtitle="DORA/MTTR" state="live" loading style={{ height: 120 }} />
            <DashboardWidget id="w6" title="CI failure rate" subtitle="CI/FAIL" state="noData" style={{ height: 120 }} />
          </div>
        </BoardSection>
      </div>
    </div>
  );
}

const meta: Meta<typeof StateBoardShowcase> = {
  title: "Scenarios/Component State Board",
  component: StateBoardShowcase,
};

export default meta;
type Story = StoryObj<typeof StateBoardShowcase>;

export const Default: Story = {};
