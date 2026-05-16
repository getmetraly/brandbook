import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AppSidebar, type AppSidebarNavSection, type AppSidebarUser } from "../../packages/ui/src/app-kit/AppSidebar";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppSidebar> = {
  title: "AppKit/AppSidebar",
  component: AppSidebar,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof AppSidebar>;

const DEFAULT_SECTIONS: AppSidebarNavSection[] = [
  {
    label: "Dashboards",
    items: [
      { id: "dashboard",   icon: "home",       label: "Overview" },
      { id: "dash-vp",     icon: "trendingUp", label: "VP Engineering" },
      { id: "dash-tl",     icon: "gitPR",      label: "Tech Lead" },
      { id: "dash-devops", icon: "cpu",        label: "DevOps / SRE" },
      { id: "dash-wizard", icon: "plus",       label: "New dashboard", variant: "accent" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { id: "metrics", icon: "bar2",  label: "Metrics Explorer" },
      { id: "ai",      icon: "brain", label: "AI Workspace", badge: "preview" },
    ],
  },
  {
    label: "Configure",
    items: [
      { id: "plugins",    icon: "puzzle", label: "Plugins",    badge: "gated" },
      { id: "connectors", icon: "link",   label: "Connectors" },
    ],
  },
  {
    label: "System",
    items: [{ id: "settings", icon: "settings", label: "Settings" }],
  },
];

const DEFAULT_USER: AppSidebarUser = { initials: "JD", name: "Jamie Dev", role: "Admin" };

export const Default: Story = {
  render: () => (
    <div style={{ width: 240, height: 600 }}>
      <AppSidebar sections={DEFAULT_SECTIONS} activeId="dashboard" user={DEFAULT_USER} brandName="Metraly" healthLabel="All systems nominal" />
    </div>
  ),
};

export const ActiveAnalytics: Story = {
  render: () => (
    <div style={{ width: 240, height: 600 }}>
      <AppSidebar sections={DEFAULT_SECTIONS} activeId="ai" user={DEFAULT_USER} brandName="Metraly" healthLabel="All systems nominal" />
    </div>
  ),
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppSidebar"
      description="Full product sidebar with brand header, grouped navigation sections, status badges, and user footer. Supports active state, accent variant, preview and gated badges."
      status="Ready"
      tags={["sidebar", "navigation", "shell", "app-kit"]}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 240, height: 520, overflow: 'hidden', borderRadius: 'var(--m-r-3)', border: '1px solid var(--m-line)' }}>
          <AppSidebar sections={DEFAULT_SECTIONS} activeId="dashboard" user={DEFAULT_USER} brandName="Metraly" healthLabel="All systems nominal" />
        </div>
        <div style={{ width: 240, height: 520, overflow: 'hidden', borderRadius: 'var(--m-r-3)', border: '1px solid var(--m-line)' }}>
          <AppSidebar sections={DEFAULT_SECTIONS} activeId="ai" user={DEFAULT_USER} brandName="Metraly" healthLabel="All systems nominal" />
        </div>
      </div>
    </MetralyStoryFrame>
  ),
};
