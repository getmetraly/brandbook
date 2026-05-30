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
        <div className="msf__section-title">Shell + Sidebar + Topbar composition</div>
        <ProductPreview>
          <div className="msf__fixed-h-lg">
            <MetralyShell>
              <MetralySidebar
                header={
                  <div className="msf__sidebar-header msf__brand-name">
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

              <div className="msf__flex-1 msf__flex-column msf__overflow-hidden">
                <MetralyTopbar
                  title="Overview"
                  subtitle="All teams · Last 14 days"
                  actions={
                    <MetralyButton variant="primary" size="sm" iconLeft={<MetralyIcon name="plus" size="sm" />}>
                      Add widget
                    </MetralyButton>
                  }
                />
                <div className="msf__shell-main">
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
