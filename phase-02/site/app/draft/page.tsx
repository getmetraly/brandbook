import RechartsTelemetryCardDraft from "../components/draft/RechartsTelemetryCardDraft";
import TelemetryActionMenuDraft from "../components/draft/TelemetryActionMenuDraft";
import TelemetryCheckboxDraft from "../components/draft/TelemetryCheckboxDraft";
import TelemetryCommandPaletteDraft from "../components/draft/TelemetryCommandPaletteDraft";
import TelemetryContextMenuDraft from "../components/draft/TelemetryContextMenuDraft";
import TelemetryDragOverlayDraft from "../components/draft/TelemetryDragOverlayDraft";
import TelemetryDrawerDraft from "../components/draft/TelemetryDrawerDraft";
import TelemetryDropdownDraft from "../components/draft/TelemetryDropdownDraft";
import TelemetryEmptyStateDraft from "../components/draft/TelemetryEmptyStateDraft";
import TelemetryGridItemDraft from "../components/draft/TelemetryGridItemDraft";
import TelemetryModalDraft from "../components/draft/TelemetryModalDraft";
import TelemetryNotificationCenterDraft from "../components/draft/TelemetryNotificationCenterDraft";
import TelemetryPopoverDraft from "../components/draft/TelemetryPopoverDraft";
import TelemetryRadioDraft from "../components/draft/TelemetryRadioDraft";
import TelemetrySearchDraft from "../components/draft/TelemetrySearchDraft";
import TelemetrySegmentedControlDraft from "../components/draft/TelemetrySegmentedControlDraft";
import TelemetrySelectDraft from "../components/draft/TelemetrySelectDraft";
import TelemetrySidebarDraft from "../components/draft/TelemetrySidebarDraft";
import TelemetrySkeletonDraft from "../components/draft/TelemetrySkeletonDraft";
import TelemetryStateBadgeDraft from "../components/draft/TelemetryStateBadgeDraft";
import TelemetrySwitchDraft from "../components/draft/TelemetrySwitchDraft";
import TelemetryTableRowDraft from "../components/draft/TelemetryTableRowDraft";
import TelemetryTabsDraft from "../components/draft/TelemetryTabsDraft";
import TelemetryTimelineDraft from "../components/draft/TelemetryTimelineDraft";
import TelemetryToastDraft from "../components/draft/TelemetryToastDraft";
import TelemetryToolbarDraft from "../components/draft/TelemetryToolbarDraft";
import TelemetryTooltipDraft from "../components/draft/TelemetryTooltipDraft";
import TelemetryTopbarDraft from "../components/draft/TelemetryTopbarDraft";
import TelemetryWidgetShellDraft from "../components/draft/TelemetryWidgetShellDraft";
import WidgetPickerCardDraft from "../components/draft/WidgetPickerCardDraft";

const engineeringMetrics = [
  { label: "Flow efficiency", value: "81%", delta: "+6.4%", state: "live" as const },
  { label: "Review latency", value: "4.2h", delta: "-18m", state: "delayed" as const },
  { label: "Deploy success", value: "99.2%", delta: "+0.4%", state: "live" as const },
  { label: "Incident MTTR", value: "23m", delta: "-7m", state: "stale" as const },
];

const repositories = [
  { repository: "metraly/app", health: "live" as const, selected: true },
  { repository: "metraly/ingestion", health: "delayed" as const, selected: false },
  { repository: "metraly/website", health: "live" as const, selected: true },
  { repository: "metraly/legacy", health: "no-data" as const, selected: false },
];

function DraftSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section draft-section">
      <div className="section-head">
        <div>
          <span className="draft-kicker">draft hardening</span>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function MetricPreviewCard({
  label,
  value,
  delta,
  state,
}: {
  label: string;
  value: string;
  delta: string;
  state: "live" | "stale" | "delayed" | "disconnected" | "no-data";
}) {
  const stateLabel = state === "no-data" ? "No data" : state[0].toUpperCase() + state.slice(1);

  return (
    <article className="draft-metric-preview">
      <header>
        <span>{label}</span>
        <TelemetryStateBadgeDraft state={state} label={stateLabel} />
      </header>
      <strong>{value}</strong>
      <p>{delta} vs previous 7d</p>
    </article>
  );
}

export default function DraftPage() {
  return (
    <main>
      <section className="shell hero component-hero draft-hero">
        <div>
          <div className="eyebrow">
            <span className="metraly-pulse-marker" />
            Draft page hardening
          </div>
          <h1>Draft components inside a real analytics board.</h1>
          <p className="lead">
            The draft page now validates components in realistic dashboard contexts: board shell, toolbar,
            widget grid, table rows, charts, overlays and feedback states. The goal is to reveal API,
            visual and accessibility gaps before promotion to canonical components.
          </p>
        </div>
        <aside className="panel draft-health-card" aria-label="Draft page status">
          <span className="brand-badge brand-badge-primary">synthetic data</span>
          <strong>Engineering Pulse Board</strong>
          <p>Snapshot generated from synthetic repository, CI, incident and review metrics.</p>
          <div className="draft-health-grid">
            <span>12 widgets</span>
            <span>4 sources</span>
            <span>3 states</span>
            <span>0 layout shift</span>
          </div>
        </aside>
      </section>

      <div className="shell">
        <DraftSection
          title="Analytics dashboard composition"
          description="A product-like board composition that forces draft components to work together instead of only in isolated cards."
        >
          <div className="draft-dashboard-shell panel">
            <TelemetrySidebarDraft />
            <div className="draft-dashboard-main">
              <TelemetryTopbarDraft />
              <TelemetryToolbarDraft />

              <div className="draft-metrics-grid">
                {engineeringMetrics.map((metric) => (
                  <MetricPreviewCard key={metric.label} {...metric} />
                ))}
              </div>

              <div className="draft-board-grid">
                <div className="draft-board-main-card">
                  <RechartsTelemetryCardDraft />
                </div>
                <TelemetryWidgetShellDraft />
                <TelemetryGridItemDraft />
                <WidgetPickerCardDraft title="PR velocity" description="Track opened, reviewed and merged pull requests." />
              </div>
            </div>
          </div>
        </DraftSection>

        <DraftSection
          title="Board edit mode"
          description="The edit-mode scenario checks drag handles, selected widgets, resize affordances, drop zones and action menus without adding noisy animation."
        >
          <div className="board-edit-shell panel">
            <div className="board-edit-toolbar">
              <div>
                <strong>Board editor</strong>
                <span>Selected widget, drag overlay and empty slot preview.</span>
              </div>
              <div className="draft-inline-actions">
                <TelemetrySegmentedControlDraft />
                <button className="btn btn-primary" type="button">Save layout</button>
              </div>
            </div>
            <div className="board-grid-edit">
              <div className="edit-widget is-selected">
                <div className="widget-edit-topbar">
                  <span className="drag-handle" aria-hidden="true">⋮⋮</span>
                  <strong>Flow efficiency</strong>
                  <span className="brand-badge brand-badge-primary">selected</span>
                </div>
                <p>Selected widget uses cyan outline and telemetry corners.</p>
                <span className="resize-handle resize-handle-se" aria-hidden="true" />
                <span className="resize-handle resize-handle-e" aria-hidden="true" />
              </div>
              <div className="edit-widget is-dragging">
                <div className="widget-edit-topbar">
                  <span className="drag-handle" aria-hidden="true">⋮⋮</span>
                  <strong>Review latency</strong>
                  <span className="brand-badge brand-badge-warning">dragging</span>
                </div>
                <p>Purple edge glow confirms drag state while preserving layout readability.</p>
              </div>
              <div className="drop-zone">
                <span className="metraly-pulse-marker" aria-hidden="true" />
                <strong>Drop widget here</strong>
                <p>Explicit drop target with calm cyan treatment.</p>
              </div>
              <div className="edit-widget is-full-width">
                <div className="widget-edit-topbar">
                  <strong>Deployment health timeline</strong>
                  <span className="brand-badge brand-badge-success">full width</span>
                </div>
                <p>Full-width state is visible and uses success tint without changing layout rhythm.</p>
              </div>
              <div className="ghost-widget">
                <TelemetryDragOverlayDraft />
              </div>
              <div className="edit-widget">
                <TelemetryActionMenuDraft />
              </div>
            </div>
          </div>
        </DraftSection>

        <DraftSection
          title="Data table, filters and selection"
          description="This scenario checks checkbox language, selected rows, health badges and compact filter controls inside dense analytical UI."
        >
          <div className="draft-table-panel panel">
            <header className="draft-table-head">
              <div>
                <strong>Repository health</strong>
                <p>Selection, stale data and source filtering states.</p>
              </div>
              <div className="draft-inline-actions">
                <TelemetrySearchDraft />
                <TelemetrySelectDraft label="Source" value="github" />
                <TelemetrySwitchDraft label="Live" />
              </div>
            </header>
            <div className="draft-table-rows">
              {repositories.map((row) => (
                <TelemetryTableRowDraft key={row.repository} {...row} />
              ))}
            </div>
          </div>
        </DraftSection>

        <DraftSection
          title="Configuration and feedback surfaces"
          description="Drawer, modal, toast, popover, command palette and skeleton states are tested as supporting surfaces around the same board workflow."
        >
          <div className="draft-surface-grid">
            <TelemetryDrawerDraft />
            <div className="draft-surface-stack">
              <TelemetryToastDraft />
              <TelemetryNotificationCenterDraft />
              <TelemetryTimelineDraft />
            </div>
            <div className="draft-surface-stack">
              <TelemetryModalDraft />
              <TelemetryPopoverDraft />
              <TelemetryTooltipDraft />
            </div>
            <div className="draft-surface-stack">
              <TelemetryCommandPaletteDraft />
              <TelemetryContextMenuDraft />
              <TelemetryDropdownDraft />
            </div>
          </div>
        </DraftSection>

        <DraftSection
          title="Primitive inventory"
          description="A compact inventory keeps individual component states visible, while the scenarios above remain the primary validation surface."
        >
          <div className="component-grid draft-inventory-grid">
            <div className="component-card"><h3>Checkbox / Radio</h3><div className="component-row"><TelemetryCheckboxDraft checked label="Selected" /><TelemetryRadioDraft checked label="Primary" /></div></div>
            <div className="component-card"><h3>Select / Switch / Tabs</h3><div className="component-row"><TelemetrySelectDraft /><TelemetrySwitchDraft /><TelemetryTabsDraft /></div></div>
            <div className="component-card"><h3>State badges</h3><div className="component-row"><TelemetryStateBadgeDraft state="live" label="Live" /><TelemetryStateBadgeDraft state="delayed" label="Delayed" /><TelemetryStateBadgeDraft state="no-data" label="No data" /></div></div>
            <div className="component-card"><h3>Empty / Loading</h3><TelemetryEmptyStateDraft /><TelemetrySkeletonDraft /></div>
          </div>
        </DraftSection>
      </div>
    </main>
  );
}
