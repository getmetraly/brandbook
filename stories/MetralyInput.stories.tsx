import type { Meta, StoryObj } from "@storybook/react";
import { MetralyInput } from "@metraly/ui";
import { MetralyIcon } from "@metraly/ui";
import { ThemeProvider } from "@metraly/ui";
import React from "react";

const meta: Meta<typeof MetralyInput> = {
  title: "Primitives/MetralyInput",
  component: MetralyInput,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24, background: "var(--m-bg-0)", minHeight: 60, display: "flex", flexDirection: "column", gap: 12 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetralyInput>;

export const Default: Story = {
  args: { label: "Name", placeholder: "Enter a value…", fullWidth: true },
};

export const SearchInput: Story = {
  name: "Search input",
  args: {
    search: true,
    label: "Search",
    placeholder: "Filter…",
    fullWidth: true,
  },
};

export const WithIconSlots: Story = {
  name: "Icon slots",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", flexDirection: "column", gap: 10 }}>
        <MetralyInput
          placeholder="Search metrics…"
          label="Metric search"
          fullWidth
        />
        <MetralyInput
          type="email"
          label="Email"
          placeholder="admin@metraly.local"
          iconLeft={<MetralyIcon name="user" size="sm" />}
          fullWidth
        />
        <MetralyInput
          type="password"
          label="Password"
          placeholder="Password"
          iconLeft={<MetralyIcon name="lock" size="sm" />}
          fullWidth
        />
      </div>
    </ThemeProvider>
  ),
};

export const ErrorState: Story = {
  name: "Error state",
  args: {
    id: "email-error-example",
    label: "Email",
    placeholder: "admin@metraly.local",
    defaultValue: "not-an-email",
    error: "Invalid email address",
    fullWidth: true,
  },
};

export const DisabledState: Story = {
  name: "Disabled",
  args: { label: "Workspace", placeholder: "Cannot edit…", disabled: true, fullWidth: true },
};
