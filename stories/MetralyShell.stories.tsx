import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyDrawer,
  MetralyIcon,
  MetralyInput,
  MetralyLogo,
  MetralyShell,
  MetralySidebar,
  MetralySidebarItem,
  MetralySidebarSection,
  MetralyTopbar,
  ThemeProvider,
} from "@metraly/ui";

type ShellMode = "desktop" | "tablet" | "mobile";

function ShellPreview({ collapsed = false, mode = "desktop" }: { collapsed?: boolean; mode?: ShellMode }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const showSidebar = mode !== "mobile";
  const showSearch = mode !== "mobile";
  const cardColumns = mode === "mobile" ? "1fr" : "repeat(2, minmax(0, 1fr))";
  const header = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 12px 14px", borderBottom: "1px solid var(--m-line-faint)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MetralyLogo variant="mark" />
        {!collapsed ? (
          <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
            <span style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 600, letterSpacing: "0.04em" }}>METRALY</span>
            <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>engineering intelligence</span>
          </div>
        ) : null}
      </div>
      {!collapsed ? (
        <MetralyBadge variant="ok">All systems nominal</MetralyBadge>
      ) : null}
    </div>
  );

  const footer = (
    <MetralySidebarSection>
      <MetralySidebarItem icon={<MetralyIcon name="settings" size={14} />} label="Settings" />
      <MetralySidebarItem icon={<MetralyIcon name="user" size={14} />} label="ops@metraly" />
    </MetralySidebarSection>
  );

  return (
    <ThemeProvider>
      <div style={{ height: 720, background: "var(--m-bg-0)" }}>
        <MetralyShell>
          {showSidebar ? (
            <MetralySidebar collapsed={collapsed} header={header} footer={footer}>
              <MetralySidebarSection label="Dashboards">
                <MetralySidebarItem active icon={<MetralyIcon name="home" size={14} />} label="Overview" />
                <MetralySidebarItem icon={<MetralyIcon name="bar2" size={14} />} label="Delivery" />
                <MetralySidebarItem icon={<MetralyIcon name="zap" size={14} />} label="DORA" />
                <MetralySidebarItem icon={<MetralyIcon name="copy" size={14} />} label="Code review" meta={<span style={{ fontFamily: "var(--m-font-mono)", fontSize: 8 }}>3</span>} />
              </MetralySidebarSection>
              <MetralySidebarSection label="Configure">
                <MetralySidebarItem icon={<MetralyIcon name="puzzle" size={14} />} label="Marketplace" />
                <MetralySidebarItem variant="accent" icon={<MetralyIcon name="plus" size={14} />} label="New dashboard" />
              </MetralySidebarSection>
            </MetralySidebar>
          ) : null}

          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            <MetralyTopbar
              density={mode === "tablet" ? "compact" : "comfortable"}
              breadcrumb={mode === "mobile" ? "Workspace / Delivery" : "Workspace / Acme / Dashboards / Delivery"}
              title="Delivery overview"
              subtitle={mode === "mobile" ? "Shell recipe in narrow mode." : "Telemetry-first workspace shell built from reusable seams."}
              actions={(
                <>
                  {mode === "mobile" ? (
                    <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="menu" size={12} />} onClick={() => setDrawerOpen(true)}>
                      Sections
                    </MetralyButton>
                  ) : null}
                  {showSearch ? (
                    <div style={{ width: mode === "tablet" ? 180 : 220 }}>
                      <MetralyInput
                        fullWidth
                        placeholder="Quick search…"
                        iconLeft={<MetralyIcon name="search" size={12} />}
                      />
                    </div>
                  ) : null}
                  <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="bell" size={12} />}>{mode === "mobile" ? "Alerts" : "Notifications"}</MetralyButton>
                  <MetralyButton variant="secondary">{mode === "mobile" ? "Add" : "Add widget"}</MetralyButton>
                </>
              )}
            />

            <main style={{ flex: 1, minWidth: 0, overflow: "auto", padding: 16 }}>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: cardColumns }}>
                {["Deployment frequency", "Lead time", "Change failure rate", "CI health"].map((title) => (
                  <div key={title} style={{ minHeight: 140, borderRadius: "var(--m-r-4)", border: "1px solid var(--m-line)", background: "var(--m-bg-2)", padding: 16 }}>
                    <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 500 }}>{title}</div>
                    <div style={{ marginTop: 8, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>Shell recipe placeholder</div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </MetralyShell>
        <MetralyDrawer
          open={mode === "mobile" && drawerOpen}
          onOpenChange={setDrawerOpen}
          title="Workspace sections"
          description="Primary navigation collapses into a full-screen drawer on narrow mobile widths."
        >
          <MetralySidebar
            header={header}
            footer={footer}
            style={{ width: "100%", height: "100%", borderRight: 0 }}
          >
            <MetralySidebarSection label="Dashboards">
              <MetralySidebarItem active icon={<MetralyIcon name="home" size={14} />} label="Overview" />
              <MetralySidebarItem icon={<MetralyIcon name="bar2" size={14} />} label="Delivery" />
              <MetralySidebarItem icon={<MetralyIcon name="zap" size={14} />} label="DORA" />
              <MetralySidebarItem icon={<MetralyIcon name="copy" size={14} />} label="Code review" meta={<span style={{ fontFamily: "var(--m-font-mono)", fontSize: 8 }}>3</span>} />
            </MetralySidebarSection>
            <MetralySidebarSection label="Configure">
              <MetralySidebarItem icon={<MetralyIcon name="puzzle" size={14} />} label="Marketplace" />
              <MetralySidebarItem variant="accent" icon={<MetralyIcon name="plus" size={14} />} label="New dashboard" />
            </MetralySidebarSection>
          </MetralySidebar>
        </MetralyDrawer>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof ShellPreview> = {
  title: "Patterns/MetralyShell",
  component: ShellPreview,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ShellPreview>;

export const Expanded: Story = {
  render: () => <ShellPreview />,
};

export const Collapsed: Story = {
  render: () => <ShellPreview collapsed />,
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => <ShellPreview collapsed mode="tablet" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <ShellPreview mode="mobile" />,
};
