import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { AppSidebar, type AppSidebarNavSection } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "AppKit/AppSidebar",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const SECTIONS: AppSidebarNavSection[] = [
  {
    label: "Dashboards",
    items: [
      { id: "overview",    icon: "home",       label: "Overview",       active: false },
      { id: "dash-vp",     icon: "trendingUp", label: "VP Engineering" },
      { id: "dash-tl",     icon: "gitPR",      label: "Tech Lead" },
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
      { id: "plugins",    icon: "puzzle", label: "Plugins", badge: "gated" },
      { id: "connectors", icon: "link",   label: "Connectors" },
      { id: "settings",   icon: "settings", label: "Settings" },
    ],
  },
];

function SidebarDemo() {
  const [active, setActive] = useState("overview");
  return (
    <AppSidebar
      brandName="Metraly"
      sections={SECTIONS}
      activeId={active}
      onNav={setActive}
      user={{ initials: "JD", name: "Jamie Dev", role: "Admin" }}
    />
  );
}

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppSidebar"
      description="App-kit navigation sidebar with brand slot, section labels, badge pills, and user footer."
      status="stable"
      tags={["appkit", "navigation", "interactive"]}
    >
      <ProductPreview>
        <div style={{ display: "flex", height: 520 }}>
          <SidebarDemo />
          <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", padding: 24, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            Page content area
          </div>
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
};
