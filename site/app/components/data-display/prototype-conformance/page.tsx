"use client";
import {
  DashboardDropZone,
  DashboardEmptyState,
  DashboardWidget,
  MetralyTable,
  StateBadge,
  type MetralyTableColumn,
  type MetralyTableRowMarker,
} from "@metraly/ui";

type ReviewRow = {
  team: string;
  open: string;
  response: string;
  status: React.ReactNode;
};

const columns: MetralyTableColumn<ReviewRow>[] = [
  { key: "team", header: "Team" },
  { key: "open", header: "Open PRs", align: "right" },
  { key: "response", header: "First response", align: "right" },
  { key: "status", header: "Status", align: "right" },
];

const rows: ReviewRow[] = [
  { team: "Platform", open: "8", response: "2.4h", status: <StateBadge state="live" /> },
  { team: "Growth", open: "14", response: "9.1h", status: <StateBadge state="stale" /> },
  { team: "Data", open: "12", response: "14.6h", status: <StateBadge state="error" /> },
  { team: "Infra", open: "3", response: "1.1h", status: <StateBadge state="ok" /> },
];

function StateGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="claude-state-group" aria-label={title}>
      <header className="claude-state-group-head">
        <strong>{title}</strong>
        <span className="claude-readiness">Phase 3</span>
      </header>
      <div className="claude-state-grid">{children}</div>
    </section>
  );
}

function StateCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="claude-state-cell">
      <span className="claude-state-cell-label">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function MetricPreview({ value, detail }: { value: string; detail: string }) {
  return (
    <div className="claude-widget-metric">
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

function markerForRow(row: ReviewRow): MetralyTableRowMarker | undefined {
  if (row.team === "Growth") return "stale";
  if (row.team === "Data") return "error";
  return undefined;
}

export default function DataDisplayPrototypeConformancePage() {
  return (
    <main className="claude-state-board" aria-label="Phase 3 table and board-edit composition examples">
      <header className="claude-preview-section-head">
        <span className="draft-kicker">Prototype conformance · Phase 3</span>
        <h1>Tables, dense data and board-edit composition</h1>
        <p>
          Visual examples for display-first table states, telemetry row markers, sticky header contracts and
          board-edit composition states.
        </p>
      </header>

      <StateGroup title="MetralyTable row markers">
        <StateCell label="live + unread + selected">
          <MetralyTable
            ariaLabel="Review latency table"
            columns={columns}
            data={rows}
            rowKey={(row) => row.team}
            liveRowKeys={["Platform"]}
            unreadRowKeys={["Data"]}
            selectedRowKeys={["Growth"]}
          />
        </StateCell>
        <StateCell label="custom stale/error markers">
          <MetralyTable
            ariaLabel="Source health table"
            columns={columns}
            data={rows}
            rowKey={(row) => row.team}
            rowMarker={markerForRow}
          />
        </StateCell>
      </StateGroup>

      <StateGroup title="MetralyTable density and empty states">
        <StateCell label="sticky + dense">
          <MetralyTable
            ariaLabel="Dense dashboard table"
            columns={columns}
            data={rows}
            stickyHeader
            dense
            rowKey={(row) => row.team}
            liveRowKeys={["Platform"]}
          />
        </StateCell>
        <StateCell label="loading">
          <MetralyTable ariaLabel="Loading review table" columns={columns} data={[]} loading />
        </StateCell>
        <StateCell label="empty">
          <MetralyTable ariaLabel="Empty review table" columns={columns} data={[]} emptyText="No review data in this window." />
        </StateCell>
      </StateGroup>

      <StateGroup title="Board-edit composition states">
        <StateCell label="selected widget + active drop target">
          <div className="claude-board-edit-composition">
            <DashboardWidget id="review" title="PR review latency" subtitle="By team" state="live" selected onDragStart={() => undefined}>
              <MetricPreview value="5.4h" detail="median first response" />
            </DashboardWidget>
            <DashboardDropZone state="active" />
          </div>
        </StateCell>
        <StateCell label="dragging widget + rejected drop target">
          <div className="claude-board-edit-composition">
            <DashboardWidget id="blocked" title="Blocked work" subtitle="Stalled > 3 days" state="delayed" dragging onDragStart={() => undefined}>
              <MetricPreview value="9" detail="+3 blocked items" />
            </DashboardWidget>
            <DashboardDropZone state="rejected" />
          </div>
        </StateCell>
        <StateCell label="full-width widget">
          <DashboardWidget id="overview" title="Engineering overview" subtitle="Full-width board section" state="live" selected fullWidth onDragStart={() => undefined}>
            <MetricPreview value="82%" detail="Flow efficiency" />
          </DashboardWidget>
        </StateCell>
        <StateCell label="empty dashboard">
          <DashboardEmptyState title="No widgets yet" description="Add the first delivery widget to start composing this board." action={<button type="button" className="btn btn-primary">Add delivery widget</button>} />
        </StateCell>
      </StateGroup>
    </main>
  );
}
