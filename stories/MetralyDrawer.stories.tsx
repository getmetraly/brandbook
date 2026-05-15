import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyDrawer,
  MetralyIcon,
  MetralyInput,
  MetralySegmentedControl,
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
          description="side context panel"
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
  const [group, setGroup] = React.useState("analytics");

  return (
    <ThemeProvider>
      <div style={{ minHeight: 640, background: "var(--m-bg-0)", padding: 24 }}>
        <MetralyButton variant="primary" iconLeft={<MetralyIcon name="menu" size="sm" />} onClick={() => setOpen(true)}>
          Open navigation
        </MetralyButton>
        <MetralyDrawer
          open={open}
          onOpenChange={setOpen}
          side="left"
          title="Workspace navigation"
          description="full-screen mobile navigation drawer"
          width="100vw"
        >
          <div style={{ padding: 12, display: "grid", gap: 10 }}>
            <MetralyInput search fullWidth placeholder="Find a dashboard or analytics view…" />
            <MetralySegmentedControl
              ariaLabel="View groups"
              size="sm"
              value={group}
              onValueChange={setGroup}
              fullWidth
              options={[
                { value: "pinned", label: "Pinned" },
                { value: "dashboards", label: "Dashboards" },
                { value: "analytics", label: "Analytics" },
                { value: "system", label: "System" },
              ]}
            />
            <div role="listbox" aria-label="Available views" style={{ display: "grid", gap: 8, paddingBottom: 4 }}>
              {viewItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={item.state === "active"}
                  onClick={() => setOpen(false)}
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
                    <MetralyBadge variant={item.id === "ci" ? "warning" : "primary"}>{item.badge}</MetralyBadge>
                  ) : item.state === "active" ? (
                    <MetralyBadge variant="primary">Current</MetralyBadge>
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

function FocusRestorePreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <div style={{ minHeight: 720, background: "var(--m-bg-0)", padding: 24, display: "grid", gap: 12 }}>
        <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)" }}>
          Open the drawer, then close it with the close button or `Escape`. Focus should return to the trigger.
        </div>
        <MetralyButton variant="primary" onClick={() => setOpen(true)}>
          Open drawer focus test
        </MetralyButton>
        <div style={{ height: 1200, border: "1px dashed var(--m-line)", borderRadius: "var(--m-r-2)", padding: 12, color: "var(--m-fg-3)" }}>
          Long page content to expose body scroll lock behavior while the drawer is open.
        </div>
        <MetralyDrawer
          open={open}
          onOpenChange={setOpen}
          title="Focus restore verification"
          description="Drawer should lock body scroll and restore focus to the trigger when dismissed."
        >
          <div style={{ padding: 16, display: "grid", gap: 10 }}>
            <MetralyInput fullWidth placeholder="Focusable input inside drawer" />
            <MetralyButton variant="secondary">Secondary action</MetralyButton>
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

export const FocusRestore: Story = {
  render: () => <FocusRestorePreview />,
};
