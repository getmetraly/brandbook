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
          ? <div style={{ padding: "12px 0", display: "flex", justifyContent: "center" }}><MetralyIcon name="home" size="md" /></div>
          : <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 8 }}><MetralyLogo /><span style={{ fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>Metraly</span></div>
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
          meta={<span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "rgba(139,92,246,0.2)", color: "#a78bfa" }}>preview</span>}
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
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Expanded</div>
        <ProductPreview>
          <div style={{ height: 480, display: "flex" }}>
            <SidebarDemo />
            <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", padding: 24, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              Page content area
            </div>
          </div>
        </ProductPreview>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Collapsed</div>
        <ProductPreview>
          <div style={{ height: 480, display: "flex" }}>
            <SidebarDemo collapsed />
            <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", padding: 24, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              Page content area
            </div>
          </div>
        </ProductPreview>
      </section>
    </MetralyStoryFrame>
  ),
};
