import TelemetrySidebar from "../../components/previews/TelemetrySidebar";
import TelemetryCommandPalette from "../../components/previews/TelemetryCommandPalette";
import TelemetryTopbar from "../../components/previews/TelemetryTopbar";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function NavigationPage() {
  return (
    <DocsShell currentPath="/components/navigation" title="Navigation" description="Sidebar, topbar and page-level wayfinding patterns for the docs portal." status="planned" related={getRelatedLinks(["/components/primitives", "/components/forms", "/patterns/dashboard-layout", "/editor"])}>
      <DocsSection id="planned" title="Planned extraction">
        <LegacyNotice>The key navigation pieces are previewed here while the best draft blocks are promoted into grouped pages and future package exports.</LegacyNotice>
      </DocsSection>
      <DocsSection id="layout" title="Sidebar and topbar" description="The navigation shell should stay compact and task-focused.">
        <ComponentPreview title="TelemetrySidebar" description="Dashboard sidebar with active state and compact metadata." states={["active", "idle", "local preview"]}>
          <TelemetrySidebar />
        </ComponentPreview>
        <ComponentPreview title="TelemetryTopbar" description="Topbar shell for search, actions and live dashboard context." states={["search", "actions", "live"]}>
          <TelemetryTopbar />
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="wayfinding" title="Wayfinding helpers" description="These smaller surfaces support the primary navigation shell.">
        <ComponentStateGrid>
          <div className="panel" style={{ padding: 16 }}>
            <strong>Breadcrumbs</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Handled by the shared docs shell and the portal route registry.</p>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <strong>Command surfaces</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Command palette and overlay surfaces belong in the feedback and overlays pages.</p>
          </div>
        </ComponentStateGrid>
      </DocsSection>
      <DocsSection id="palette" title="Command palette" description="Keyboard-first navigation and action launcher for the board workspace.">
        <ComponentPreview title="TelemetryCommandPalette" description="Search commands, widgets or boards without leaving the current route." states={["search", "navigation", "actions"]}>
          <TelemetryCommandPalette />
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Navigation should stay compact and support page-level wayfinding.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Surface styling for compact navigation." }} />
          <DocsRouteCard item={{ title: "Forms", href: "/components/forms", description: "Controls used in filter bars and toolbars." }} />
          <DocsRouteCard item={{ title: "Dashboard Layout", href: "/patterns/dashboard-layout", description: "Sidebar and topbar composition." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
