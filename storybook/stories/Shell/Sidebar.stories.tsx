import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  MetralyShell,
  MetralySidebar,
  MetralySidebarSection,
  MetralySidebarItem,
  MetralyIcon,
  MetralyLogo,
} from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Shell/Sidebar",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

function SidebarDemo({ collapsed = false }: { collapsed?: boolean }) {
  const [active, setActive] = useState("dashboard");
  return (
    <MetralySidebar
      collapsed={collapsed}
      header={
        collapsed
          ? <div className="msf__sidebar-header-collapsed"><MetralyIcon name="home" size="md" /></div>
          : <div className="msf__sidebar-header"><MetralyLogo /><span className="msf__brand-name">Metraly</span></div>
      }
    >
      <MetralySidebarSection label="Dashboards">
        <MetralySidebarItem
          icon={<MetralyIcon name="home" size="sm" />}
          label="Overview"
          active={active === "dashboard"}
          onClick={() => setActive("dashboard")}
        />
        <MetralySidebarItem
          icon={<MetralyIcon name="trendingUp" size="sm" />}
          label="VP Engineering"
          active={active === "vp"}
          onClick={() => setActive("vp")}
        />
        <MetralySidebarItem
          icon={<MetralyIcon name="activity" size="sm" />}
          label="My Dashboard"
          active={active === "my"}
          onClick={() => setActive("my")}
        />
      </MetralySidebarSection>
      <MetralySidebarSection label="Analytics">
        <MetralySidebarItem
          icon={<MetralyIcon name="brain" size="sm" />}
          label="AI Workspace"
          meta={<span className="msf__preview-pill">preview</span>}
          active={active === "ai"}
          onClick={() => setActive("ai")}
        />
        <MetralySidebarItem
          icon={<MetralyIcon name="bar2" size="sm" />}
          label="Metrics Explorer"
          active={active === "metrics"}
          onClick={() => setActive("metrics")}
        />
      </MetralySidebarSection>
      <MetralySidebarSection label="Configure">
        <MetralySidebarItem
          icon={<MetralyIcon name="puzzle" size="sm" />}
          label="Plugins"
          active={active === "plugins"}
          onClick={() => setActive("plugins")}
        />
        <MetralySidebarItem
          icon={<MetralyIcon name="link" size="sm" />}
          label="Connectors"
          active={active === "connectors"}
          onClick={() => setActive("connectors")}
        />
        <MetralySidebarItem
          icon={<MetralyIcon name="settings" size="sm" />}
          label="Settings"
          active={active === "settings"}
          onClick={() => setActive("settings")}
        />
      </MetralySidebarSection>
    </MetralySidebar>
  );
}

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Shell"
      title="MetralySidebar"
      description="Application navigation sidebar. Supports expanded/collapsed, section labels, icons, active state, and a leading logo slot."
      status="stable"
      tags={["shell", "navigation", "a11y"]}
    >
      <section>
        <div className="msf__section-title">Expanded</div>
        <ProductPreview>
          <div className="msf__split-demo">
            <SidebarDemo />
            <div className="msf__shell-main">
              Page content area
            </div>
          </div>
        </ProductPreview>
      </section>

      <section>
        <div className="msf__section-title">Collapsed</div>
        <ProductPreview>
          <div className="msf__split-demo">
            <SidebarDemo collapsed />
            <div className="msf__shell-main">
              Page content area
            </div>
          </div>
        </ProductPreview>
      </section>
    </MetralyStoryFrame>
  ),
};
