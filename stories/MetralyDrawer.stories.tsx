import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyDrawer,
  MetralyIcon,
  MetralyInput,
  MetralySidebar,
  MetralySidebarItem,
  MetralySidebarSection,
  ThemeProvider,
} from "@metraly/ui";

const viewItems = [
  { id: "delivery", label: "Delivery overview", meta: "dashboard", state: "active" as const },
  { id: "dora", label: "DORA metrics", meta: "analytics", badge: "Live" },
  { id: "flow", label: "Flow and review", meta: "analytics" },
  { id: "ci", label: "CI health", meta: "telemetry", badge: "3 alerts" },
];

function DrawerPreview({ side = "left" }: { side?: "left" | "right" }) {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <div style={{ minHeight: 640, background: "var(--m-bg-0)", padding: 24 }}>
        <MetralyButton variant="primary" iconLeft={<MetralyIcon name="menu" size="sm" />} onClick={() => setOpen(true)}>
          Open drawer
        </MetralyButton>
        <MetralyDrawer
          open={open}
          onOpenChange={setOpen}
          side={side}
          title="Widget library"
          description="utility panel"
          width={324}
        >
          <MetralySidebar style={{ width: "100%", height: "100%", borderRight: 0 }}>
            <MetralySidebarSection label="Quick actions">
              <div style={{ padding: "4px 6px 10px" }}>
                <MetralyInput search fullWidth placeholder="Filter widgets…" />
              </div>
            </MetralySidebarSection>
            <MetralySidebarSection label="Recommended">
              <MetralySidebarItem active icon={<MetralyIcon name="boxes" size="sm" />} label="Deployment frequency" />
              <MetralySidebarItem icon={<MetralyIcon name="chart" size="sm" />} label="Cycle time breakdown" />
              <MetralySidebarItem icon={<MetralyIcon name="refresh" size="sm" />} label="MTTR" />
            </MetralySidebarSection>
          </MetralySidebar>
        </MetralyDrawer>
      </div>
    </ThemeProvider>
  );
}

function MobileDrawerPreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <div style={{ minHeight: 640, background: "var(--m-bg-0)", padding: 24 }}>
        <style>{`
          @media (max-width: 767px) {
            .metraly-drawer-story-sheet {
              top: auto;
              bottom: 0;
              width: 100vw;
              max-width: 100vw;
              max-height: 78dvh;
              border-left: 0;
              border-right: 0;
              border-top: 1px solid var(--m-line);
              border-radius: var(--m-r-3) var(--m-r-3) 0 0;
              box-shadow: var(--m-shadow-3);
            }

            .metraly-drawer-story-sheet::before {
              content: "";
              width: 36px;
              height: 4px;
              border-radius: 999px;
              background: var(--m-line-strong);
              opacity: 0.72;
              position: absolute;
              top: 8px;
              left: 50%;
              transform: translateX(-50%);
            }

            .metraly-drawer-story-sheet .metraly-drawer__header {
              min-height: 40px;
              padding-top: 18px;
            }
          }
        `}</style>
        <MetralyButton variant="primary" iconLeft={<MetralyIcon name="menu" size="sm" />} onClick={() => setOpen(true)}>
          Switch view
        </MetralyButton>
        <MetralyDrawer
          open={open}
          onOpenChange={setOpen}
          side="left"
          title="Switch view"
          description="quick telemetry jump"
          width="100vw"
          className="metraly-drawer-story-sheet"
        >
          <div style={{ padding: 12, display: "grid", gap: 10 }}>
            <MetralyInput search fullWidth placeholder="Find a dashboard or analytics view…" />
            <div
              aria-label="View groups"
              style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}
            >
              {["Pinned", "Dashboards", "Analytics", "System"].map((label, index) => (
                <button
                  key={label}
                  type="button"
                  style={{
                    border: "1px solid var(--m-line-faint)",
                    background: index === 2 ? "var(--m-cyan-bg)" : "var(--m-bg-2)",
                    color: index === 2 ? "var(--m-cyan-400)" : "var(--m-fg-2)",
                    borderRadius: "999px",
                    padding: "6px 10px",
                    fontFamily: "var(--m-font-mono)",
                    fontSize: "var(--m-fs-9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div role="listbox" aria-label="Available views" style={{ display: "grid", gap: 8, paddingBottom: 4 }}>
              {viewItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    minHeight: 52,
                    padding: "10px 12px",
                    borderRadius: "var(--m-r-3)",
                    border: item.state === "active" ? "1px solid var(--m-cyan-500)" : "1px solid var(--m-line)",
                    background: item.state === "active" ? "var(--m-cyan-bg)" : "var(--m-bg-2)",
                    color: "var(--m-fg-1)",
                    textAlign: "left",
                  }}
                >
                  <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
                    <span style={{ color: item.state === "active" ? "var(--m-fg-0)" : "var(--m-fg-1)", fontSize: "var(--m-fs-11)", fontWeight: 500 }}>
                      {item.label}
                    </span>
                    <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
                      {item.meta}
                    </span>
                  </div>
                  {item.badge ? (
                    <MetralyBadge variant={item.id === "ci" ? "warn" : "cyan"}>{item.badge}</MetralyBadge>
                  ) : item.state === "active" ? (
                    <MetralyBadge variant="cyan">Current</MetralyBadge>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </MetralyDrawer>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof DrawerPreview> = {
  title: "Patterns/MetralyDrawer",
  component: DrawerPreview,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DrawerPreview>;

export const Left: Story = {
  render: () => <DrawerPreview side="left" />,
};

export const Right: Story = {
  render: () => <DrawerPreview side="right" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  render: () => <MobileDrawerPreview />,
};
