import TelemetryNotificationCenter from "../../components/previews/TelemetryNotificationCenter";
import TelemetryTimeline from "../../components/previews/TelemetryTimeline";
import TelemetryToast from "../../components/previews/TelemetryToast";
import TelemetryTooltip from "../../components/previews/TelemetryTooltip";
import TelemetryPopover from "../../components/previews/TelemetryPopover";
import TelemetryActionMenu from "../../components/previews/TelemetryActionMenu";
import TelemetryContextMenu from "../../components/previews/TelemetryContextMenu";
import TelemetryModal from "../../components/previews/TelemetryModal";
import TelemetryDragOverlay from "../../components/previews/TelemetryDragOverlay";
import TelemetryDrawer from "../../components/previews/TelemetryDrawer";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function FeedbackPage() {
  return (
    <DocsShell currentPath="/components/feedback" title="Feedback" description="Toast, notification and timeline surfaces for dashboard workflows." status="planned" related={getRelatedLinks(["/components/primitives", "/components/forms", "/patterns/loading-states", "/components/navigation"])}>
      <DocsSection id="planned" title="Planned extraction">
        <LegacyNotice>These surfaces are now previewed here while the best draft blocks are promoted into grouped pages and future package exports.</LegacyNotice>
      </DocsSection>
      <DocsSection id="notifications" title="Notifications and timelines" description="Use these surfaces for runtime events, sync results and status history.">
        <ComponentPreview title="TelemetryNotificationCenter" description="Compact notification center with unread, warning and read states." states={["unread", "warning", "read"]}>
          <TelemetryNotificationCenter />
        </ComponentPreview>
        <ComponentPreview title="TelemetryTimeline" description="Event timeline for deployments, syncs and telemetry changes." states={["live", "warning"]}>
          <TelemetryTimeline />
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="toasts" title="Transient feedback" description="Use these surfaces for ephemeral actions and confirmations.">
        <ComponentStateGrid>
          <TelemetryToast />
          <TelemetryToast title="Sync delayed" description="Board updates are queued while the source reconnects." state="delayed" />
          <TelemetryToast title="Source disconnected" description="Telemetry is temporarily offline." state="disconnected" />
        </ComponentStateGrid>
      </DocsSection>
      <DocsSection id="overlays" title="Overlay helpers" description="These are supporting surfaces for compact feedback and tooltips.">
        <ComponentPreview title="TelemetryTooltip / TelemetryPopover" description="Small helper surfaces for contextual feedback and actions." states={["compact", "contextual", "action"]}>
          <ComponentStateGrid>
            <TelemetryTooltip />
            <TelemetryPopover />
          </ComponentStateGrid>
        </ComponentPreview>
        <ComponentPreview title="TelemetryActionMenu / TelemetryContextMenu" description="Compact menu actions for widgets and board items." states={["default", "destructive", "compact"]}>
          <ComponentStateGrid>
            <TelemetryActionMenu />
            <TelemetryContextMenu />
          </ComponentStateGrid>
        </ComponentPreview>
        <ComponentPreview title="TelemetryModal / TelemetryDragOverlay" description="Modal confirmation and drag overlay shells for board workflows." states={["dialog", "dragging", "destructive"]}>
          <ComponentStateGrid>
            <TelemetryModal />
            <TelemetryDragOverlay />
          </ComponentStateGrid>
        </ComponentPreview>
        <ComponentPreview title="TelemetryDrawer" description="Side panel shell for source and widget configuration." states={["open", "close", "config"]}>
          <TelemetryDrawer />
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Feedback surfaces are shared by forms, dashboards and async states.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Base cards and status surfaces." }} />
          <DocsRouteCard item={{ title: "Forms", href: "/components/forms", description: "Validation and control feedback." }} />
          <DocsRouteCard item={{ title: "Loading States", href: "/patterns/loading-states", description: "Async and skeleton feedback patterns." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
