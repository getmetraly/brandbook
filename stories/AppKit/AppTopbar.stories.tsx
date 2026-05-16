import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AppTopbar } from "../../packages/ui/src/app-kit/AppTopbar";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppTopbar> = {
  title: "AppKit/AppTopbar",
  component: AppTopbar,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof AppTopbar>;

export const Default: Story = {
  render: () => (
    <div style={{ background: 'var(--m-bg-0)', padding: 0 }}>
      <AppTopbar title="VP Engineering" subtitle="3 services at risk" searchPlaceholder="Search metrics, dashboards, plugins…" notifCount={2} onRefresh={() => {}} />
    </div>
  ),
};

export const NoSearch: Story = {
  render: () => (
    <AppTopbar title="Settings" />
  ),
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppTopbar"
      description="Page header with title/subtitle, global search, notification bell with badge, and refresh action. Density-aware grid layout."
      status="Ready"
      tags={["topbar", "header", "search", "shell", "app-kit"]}
    >
      <div style={{ display: 'grid', gap: 8 }}>
        <AppTopbar title="VP Engineering" subtitle="Last synced 4 min ago" searchPlaceholder="Search metrics, dashboards, plugins…" notifCount={2} onRefresh={() => {}} />
        <AppTopbar title="Plugins" searchPlaceholder="Search plugins…" />
        <AppTopbar title="Settings" />
      </div>
    </MetralyStoryFrame>
  ),
};
