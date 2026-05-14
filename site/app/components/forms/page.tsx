import { MetralyCheckbox, MetralyRadio, MetralySelect, MetralySwitch, MetralyTabs } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

const sourceOptions = [
  { value: "github", label: "GitHub" },
  { value: "ci", label: "CI/CD" },
  { value: "incidents", label: "Incidents" },
];

const dashboardTabs = [
  { value: "delivery", label: "Delivery", count: 11 },
  { value: "dora", label: "DORA", count: 4 },
  { value: "flow", label: "Flow", count: 6 },
  { value: "reviews", label: "Reviews", count: 5 },
  { value: "ci", label: "CI", count: 3 },
];

export default function FormsPage() {
  return (
    <DocsShell currentPath="/components/forms" title="Forms" description="Inputs and controls for dashboard settings, filters, widget configuration and row selection." status="ready" related={getRelatedLinks(["/patterns/filters", "/components/dashboard", "/components/data-display"])} toc={[{ title: "Selection", href: "#selection" }, { title: "Choice", href: "#choice" }]}>
      <DocsSection id="selection" title="Selection controls" description="Use these controls for row selection, settings, feature toggles and option lists.">
        <ComponentPreview title="MetralyCheckbox" description="Checkbox pattern used in widget picker, tables and bulk selection." states={["default", "checked", "disabled", "description"]} code={'import { MetralyCheckbox } from "@metraly/ui";'}>
          <div className="component-state-grid component-state-grid--forms">
            <MetralyCheckbox label="Telemetry enabled" description="Include this signal in board calculations." defaultChecked />
            <MetralyCheckbox label="Disabled option" disabled />
          </div>
        </ComponentPreview>
        <ComponentPreview title="MetralyRadio / MetralySwitch" description="Radio for single choice, switch for boolean settings." states={["radio", "checked", "switch", "disabled"]}>
          <div className="component-state-grid component-state-grid--forms">
            <MetralyRadio label="Current sprint" name="range-preview" defaultChecked />
            <MetralyRadio label="Last 30 days" name="range-preview" />
            <MetralySwitch label="Auto-refresh" description="Refresh dashboard every 60 seconds." checked />
            <MetralySwitch label="Disabled switch" disabled />
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="choice" title="Choice controls" description="Select and tabs should stay calm: compact, flat and pulse-free.">
        <ComponentPreview title="MetralySelect" description="Popover select wrapper for source and filter settings." states={["default", "error", "disabled"]}>
          <div className="component-state-grid component-state-grid--forms">
            <MetralySelect label="Metric source" defaultValue="github" options={sourceOptions} />
            <MetralySelect label="Disabled source" defaultValue="ci" options={sourceOptions} disabled />
          </div>
        </ComponentPreview>
        <ComponentPreview title="MetralyTabs" description="Flat dashboard navigation with count badges and an active cyan underline." states={["active", "counts", "keyboard focus"]}>
          <MetralyTabs ariaLabel="Dashboard signal tabs" defaultValue="ci" items={dashboardTabs} />
        </ComponentPreview>
      </DocsSection>
    </DocsShell>
  );
}
