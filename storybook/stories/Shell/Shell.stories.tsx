import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  MetralyShell,
  MetralySidebar,
  MetralySidebarSection,
  MetralySidebarItem,
  MetralyTopbar,
  MetralyIcon,
  MetralyButton,
} from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Shell/Shell",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Shell"
      title="MetralyShell"
      description="Application shell layout wrapper. Composes sidebar + main content. stackOnMobile collapses sidebar into a bottom nav on small screens."
      status="stable"
      tags={["shell", "layout"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Shell + Sidebar + Topbar composition</div>
        <ProductPreview>
          <div style={{ height: 520 }}>
            <MetralyShell>
              <MetralySidebar
                header={
                  <div style={{ padding: "16px 20px", fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>
                    Metraly
                  </div>
                }
              >
                <MetralySidebarSection label="Dashboards">
                  <MetralySidebarItem icon={<MetralyIcon name="home" size="sm" />} label="Overview" active />
                  <MetralySidebarItem icon={<MetralyIcon name="trendingUp" size="sm" />} label="VP Engineering" />
                </MetralySidebarSection>
                <MetralySidebarSection label="System">
                  <MetralySidebarItem icon={<MetralyIcon name="settings" size="sm" />} label="Settings" />
                </MetralySidebarSection>
              </MetralySidebar>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <MetralyTopbar
                  title="Overview"
                  subtitle="All teams · Last 14 days"
                  actions={
                    <MetralyButton variant="primary" size="sm" iconLeft={<MetralyIcon name="plus" size="sm" />}>
                      Add widget
                    </MetralyButton>
                  }
                />
                <div style={{ flex: 1, padding: 24, background: "rgba(255,255,255,0.01)", color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
                  Dashboard grid renders here
                </div>
              </div>
            </MetralyShell>
          </div>
        </ProductPreview>
      </section>
    </MetralyStoryFrame>
  ),
};
