import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyTopbar, MetralyButton, MetralyIcon, MetralyInput } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Shell/Topbar",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Shell"
      title="MetralyTopbar"
      description="Page header with title, subtitle, breadcrumb, and actions slot. Density: compact | comfortable | spacious."
      status="stable"
      tags={["shell", "a11y"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Comfortable (default)</div>
        <ProductPreview>
          <MetralyTopbar
            title="VP Engineering Dashboard"
            subtitle="Last updated · just now"
            actions={
              <div style={{ display: "flex", gap: 8 }}>
                <MetralyButton variant="ghost" size="sm" iconLeft={<MetralyIcon name="filter" size="sm" />}>Filter</MetralyButton>
                <MetralyButton variant="primary" size="sm" iconLeft={<MetralyIcon name="plus" size="sm" />}>Add widget</MetralyButton>
              </div>
            }
          />
        </ProductPreview>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>With breadcrumb</div>
        <ProductPreview>
          <MetralyTopbar
            breadcrumb={
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                Settings / Connectors / GitHub
              </span>
            }
            title="GitHub connector"
            subtitle="github.com · 47 repos synced"
            actions={
              <div style={{ display: "flex", gap: 8 }}>
                <MetralyButton variant="ghost" size="sm">Test connection</MetralyButton>
                <MetralyButton variant="danger" size="sm">Disconnect</MetralyButton>
              </div>
            }
          />
        </ProductPreview>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Compact — with inline search</div>
        <ProductPreview>
          <MetralyTopbar
            density="compact"
            title="Metrics Explorer"
            actions={
              <MetralyInput search placeholder="Search metrics…" />
            }
          />
        </ProductPreview>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Spacious</div>
        <ProductPreview>
          <MetralyTopbar
            density="spacious"
            title="AI Workspace"
            subtitle="Powered by Anthropic Claude"
            actions={
              <MetralyButton variant="secondary" size="sm">New conversation</MetralyButton>
            }
          />
        </ProductPreview>
      </section>
    </MetralyStoryFrame>
  ),
};
