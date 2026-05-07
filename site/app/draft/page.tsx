import TelemetryCheckboxDraft from "../components/draft/TelemetryCheckboxDraft";
import TelemetrySelectDraft from "../components/draft/TelemetrySelectDraft";
import TelemetrySwitchDraft from "../components/draft/TelemetrySwitchDraft";
import TelemetryTabsDraft from "../components/draft/TelemetryTabsDraft";
import WidgetPickerCardDraft from "../components/draft/WidgetPickerCardDraft";
import TelemetryTableRowDraft from "../components/draft/TelemetryTableRowDraft";
import TelemetryToastDraft from "../components/draft/TelemetryToastDraft";
import TelemetryDrawerDraft from "../components/draft/TelemetryDrawerDraft";
import TelemetryModalDraft from "../components/draft/TelemetryModalDraft";
import TelemetrySkeletonDraft from "../components/draft/TelemetrySkeletonDraft";
import RechartsTelemetryCardDraft from "../components/draft/RechartsTelemetryCardDraft";
import TelemetryDragOverlayDraft from "../components/draft/TelemetryDragOverlayDraft";
import TelemetryGridItemDraft from "../components/draft/TelemetryGridItemDraft";
import TelemetryEmptyStateDraft from "../components/draft/TelemetryEmptyStateDraft";
import TelemetryToolbarDraft from "../components/draft/TelemetryToolbarDraft";
import TelemetryActionMenuDraft from "../components/draft/TelemetryActionMenuDraft";
import TelemetryWidgetShellDraft from "../components/draft/TelemetryWidgetShellDraft";

function DraftSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <p>Draft telemetry-native primitives for future Metraly UI framework evolution.</p>
      </div>
      {children}
    </section>
  );
}

export default function DraftPage() {
  return (
    <main>
      <section className="shell hero component-hero">
        <div>
          <div className="eyebrow"><span className="metraly-pulse-marker" />Draft component sandbox</div>
          <h1>Experimental Metraly UI primitives.</h1>
          <p className="lead">
            Append-only draft area for validating telemetry-native components before promotion into canonical components.
          </p>
        </div>
      </section>

      <div className="shell">
        <DraftSection title="Telemetry primitives">
          <div className="component-grid">
            <div className="component-card"><h3>Checkbox</h3><TelemetryCheckboxDraft checked label="Selected widget" /></div>
            <div className="component-card"><h3>Select</h3><TelemetrySelectDraft /></div>
            <div className="component-card"><h3>Switch</h3><TelemetrySwitchDraft /></div>
            <div className="component-card"><h3>Tabs</h3><TelemetryTabsDraft /></div>
          </div>
        </DraftSection>

        <DraftSection title="Board and dashboard">
          <div className="component-grid">
            <div className="component-card"><h3>Toolbar</h3><TelemetryToolbarDraft /></div>
            <div className="component-card"><h3>Widget shell</h3><TelemetryWidgetShellDraft /></div>
            <div className="component-card"><h3>Widget picker</h3><WidgetPickerCardDraft /></div>
            <div className="component-card"><h3>Table row</h3><TelemetryTableRowDraft /></div>
            <div className="component-card"><h3>Grid item</h3><TelemetryGridItemDraft /></div>
            <div className="component-card"><h3>Drag overlay</h3><TelemetryDragOverlayDraft /></div>
            <div className="component-card"><h3>Action menu</h3><TelemetryActionMenuDraft /></div>
          </div>
        </DraftSection>

        <DraftSection title="Feedback and states">
          <div className="component-grid">
            <div className="component-card"><h3>Toast</h3><TelemetryToastDraft /></div>
            <div className="component-card"><h3>Modal</h3><TelemetryModalDraft /></div>
            <div className="component-card"><h3>Empty state</h3><TelemetryEmptyStateDraft /></div>
            <div className="component-card"><h3>Skeleton</h3><TelemetrySkeletonDraft /></div>
          </div>
        </DraftSection>

        <DraftSection title="Drawers and charts">
          <div className="component-grid">
            <div className="component-card"><h3>Drawer</h3><TelemetryDrawerDraft /></div>
            <div className="component-card"><h3>Recharts wrapper</h3><RechartsTelemetryCardDraft /></div>
          </div>
        </DraftSection>
      </div>
    </main>
  );
}
