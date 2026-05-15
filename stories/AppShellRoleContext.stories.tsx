import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyIcon,
  MetralyInput,
  MetralyLogo,
  MetralyShell,
  MetralySidebar,
  MetralySidebarItem,
  MetralySidebarSection,
  MetralyTopbar,
  StatusBadge,
  ThemeProvider,
} from "@metraly/ui";

const meta: Meta = {
  title: "Scenarios/AppShellRoleContext",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

function AppShellRoleContextPreview() {
  const activeRoute = "dashboard-cto";
  const pageTitle = "CTO Dashboard";
  const pageSubtitle = "Strategic health, DORA trends, and team velocity";

  const header = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 12px 14px", borderBottom: "1px solid var(--m-line-faint)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MetralyLogo variant="mark" />
        <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
          <span style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 600, letterSpacing: "0.04em" }}>METRALY</span>
          <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>engineering intelligence</span>
        </div>
      </div>
      <StatusBadge status="Live" />
    </div>
  );

  return (
    <ThemeProvider>
      <div style={{ minHeight: "100dvh", background: "var(--m-bg-0)" }}>
        <MetralyShell>
          <MetralySidebar header={header}>
            <MetralySidebarSection label="Dashboards">
              <MetralySidebarItem
                active={activeRoute === "dashboard-cto"}
                href="/dashboard/cto"
                icon={<MetralyIcon name="trendingUp" size={14} />}
                label="CTO Dashboard"
              />
              <MetralySidebarItem href="/dashboard/vp" icon={<MetralyIcon name="users" size={14} />} label="VP Engineering" />
              <MetralySidebarItem href="/dashboard/tech-lead" icon={<MetralyIcon name="gitPR" size={14} />} label="Tech Lead" />
            </MetralySidebarSection>
            <MetralySidebarSection label="Analytics">
              <MetralySidebarItem href="/metrics" icon={<MetralyIcon name="bar2" size={14} />} label="Metrics Explorer" />
              <MetralySidebarItem
                href="/ai"
                icon={<MetralyIcon name="brain" size={14} />}
                label="AI Workspace"
                meta={<StatusBadge status="Preview" size="sm" />}
              />
            </MetralySidebarSection>
            <MetralySidebarSection label="Configure">
              <MetralySidebarItem
                href="/plugins"
                icon={<MetralyIcon name="puzzle" size={14} />}
                label="Plugins"
                meta={<StatusBadge status="Gated" size="sm" />}
              />
              <MetralySidebarItem href="/connectors" icon={<MetralyIcon name="link" size={14} />} label="Connectors" />
            </MetralySidebarSection>
          </MetralySidebar>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            <MetralyTopbar
              breadcrumb="Workspace / Dashboards / CTO"
              title={pageTitle}
              subtitle={pageSubtitle}
              actions={(
                <>
                  <div style={{ width: 220 }}>
                    <MetralyInput fullWidth placeholder="Quick search…" iconLeft={<MetralyIcon name="search" size={12} />} />
                  </div>
                  <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="bell" size={12} />}>Notifications</MetralyButton>
                  <MetralyButton variant="secondary">Add widget</MetralyButton>
                </>
              )}
            />

            <main style={{ flex: 1, padding: 16, display: "grid", gap: 12, alignContent: "start" }}>
              <div
                style={{
                  display: "grid",
                  gap: 8,
                  padding: 16,
                  border: "1px solid var(--m-line)",
                  borderRadius: "var(--m-r-4)",
                  background: "var(--m-bg-2)",
                }}
              >
                <strong style={{ color: "var(--m-fg-0)" }}>Context alignment check</strong>
                <span style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>
                  Sidebar active item, breadcrumb, page title, and header copy all point to the same surface: CTO Dashboard.
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <MetralyBadge variant="success">Role context aligned</MetralyBadge>
                  <StatusBadge status="Live" size="sm" />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 8,
                  padding: 16,
                  border: "1px dashed var(--m-line-strong)",
                  borderRadius: "var(--m-r-4)",
                  background: "var(--m-bg-1)",
                }}
              >
                <strong style={{ color: "var(--m-fg-1)" }}>Navigation rule</strong>
                <span style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>
                  Top-level navigation remains links in the sidebar. Tabs are reserved for in-page panel switching only.
                </span>
              </div>
            </main>
          </div>
        </MetralyShell>
      </div>
    </ThemeProvider>
  );
}

export const Default: Story = {
  render: () => <AppShellRoleContextPreview />,
};
