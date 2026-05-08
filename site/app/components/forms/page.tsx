import { MetralyCheckbox, MetralyRadio, MetralySelect, MetralySwitch, MetralyTabs } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

const sourceOptions = [
  { value: "github", label: "GitHub" },
  { value: "ci", label: "CI/CD" },
  { value: "incidents", label: "Incidents" },
];

export default function FormsPage() {
  return (
    <DocsShell currentPath="/components/forms" title="Forms" description="Inputs and controls for dashboard settings, filters, widget configuration and row selection." status="ready" related={getRelatedLinks(["/patterns/filters", "/components/dashboard", "/components/data-display"])} toc={[{ title: "Selection", href: "#selection" }, { title: "Choice", href: "#choice" }]}> 
      <DocsSection id="selection" title="Selection controls" description="Use these controls for row selection, settings, feature toggles and option lists.">
        <ComponentPreview title="MetralyCheckbox" description="Checkbox pattern used in widget picker, tables and bulk selection." states={["default", "checked", "disabled", "description"]} code={'import { MetralyCheckbox } from "@metraly/ui";'}>
          <ComponentStateGrid>
            <MetralyCheckbox label="Telemetry enabled" description="Include this signal in board calculations." defaultChecked />
            <MetralyCheckbox label="Disabled option" disabled />
          </ComponentStateGrid>
        </ComponentPreview>
        <ComponentPreview title="MetralyRadio / MetralySwitch" description="Radio for single choice, switch for boolean settings." states={["radio", "checked", "switch", "disabled"]}>
          <ComponentStateGrid>
            <MetralyRadio label="Current sprint" name="range-preview" defaultChecked />
            <MetralyRadio label="Last 30 days" name="range-preview" />
            <MetralySwitch label="Auto-refresh" description="Refresh dashboard every 60 seconds." checked />
            <MetralySwitch label="Disabled switch" disabled />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="choice" title="Choice controls" description="Select and tabs should stay calm: no chevrons-heavy styling, no pulse marker before drag handles.">
        <ComponentPreview title="MetralySelect" description="Native select wrapper for source and filter settings." states={["default", "error", "disabled"]}>
          <ComponentStateGrid>
            <MetralySelect label="Metric source" defaultValue="github" options={sourceOptions} />
            <MetralySelect label="Disabled source" defaultValue="ci" options={sourceOptions} disabled />
          </ComponentStateGrid>
        </ComponentPreview>
        <ComponentPreview title="MetralyTabs" description="Segmented navigation for page-level or panel-level state." states={["active", "disabled", "keyboard focus"]}>
          <MetralyTabs ariaLabel="Component preview tabs" defaultValue="overview" items={[{ value: "overview", label: "Overview" }, { value: "signals", label: "Signals" }, { value: "settings", label: "Settings", disabled: true }]} />
        </ComponentPreview>
      </DocsSection>
    </DocsShell>
  );
}
