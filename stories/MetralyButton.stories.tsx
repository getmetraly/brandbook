import type { Meta, StoryObj } from "@storybook/nextjs";
import { MetralyButton, MetralyButtonVariant, MetralyIcon } from "@metraly/ui";
import { ThemeProvider } from "@metraly/ui";
import React from "react";

const meta: Meta<typeof MetralyButton> = {
  title: "Primitives/MetralyButton",
  component: MetralyButton,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24, background: "var(--m-bg-0)", minHeight: 60, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof MetralyButton>;

const variants: MetralyButtonVariant[] = ["primary", "secondary", "ghost", "neutral", "danger", "dashed"];

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", flexWrap: "wrap", gap: 10 }}>
        {variants.map((v) => (
          <MetralyButton key={v} variant={v}>{v}</MetralyButton>
        ))}
      </div>
    </ThemeProvider>
  ),
};

export const AllSizes: Story = {
  name: "All sizes",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", gap: 10, alignItems: "center" }}>
        <MetralyButton variant="ghost" size="sm">Small</MetralyButton>
        <MetralyButton variant="ghost" size="md">Medium</MetralyButton>
        <MetralyButton variant="ghost" size="lg">Large</MetralyButton>
      </div>
    </ThemeProvider>
  ),
};

export const WithIcons: Story = {
  name: "With icons",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <MetralyButton variant="primary" iconLeft={<MetralyIcon name="check" size="sm" />}>Save</MetralyButton>
        <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="refresh" size="sm" />}>Refresh</MetralyButton>
        <MetralyButton variant="neutral" aria-label="Notifications" iconLeft={<MetralyIcon name="bell" size="sm" />} />
      </div>
    </ThemeProvider>
  ),
};

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", flexWrap: "wrap", gap: 10 }}>
        {variants.map((v) => (
          <MetralyButton key={v} variant={v} disabled>{v}</MetralyButton>
        ))}
      </div>
    </ThemeProvider>
  ),
};

export const LoadingState: Story = {
  name: "Loading",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", flexWrap: "wrap", gap: 10 }}>
        {variants.map((v) => (
          <MetralyButton key={v} variant={v} loading>{v}</MetralyButton>
        ))}
      </div>
    </ThemeProvider>
  ),
};

export const Primary: Story = { args: { variant: "primary", children: "Save dashboard" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Add widget" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Refresh" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete" } };
export const Dashed: Story = { args: { variant: "dashed", children: "+ New dashboard" } };
