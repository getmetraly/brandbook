import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavigationItemFrame, MetralyIcon } from "@metraly/ui";

const meta = {
  component: NavigationItemFrame,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof NavigationItemFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Dashboard" },
};

export const WithIcon: Story = {
  args: {
    label: "Dashboard",
    icon: <MetralyIcon name="grid" size="sm" />,
  },
};

export const Active: Story = {
  args: {
    label: "Analytics",
    icon: <MetralyIcon name="chart" size="sm" />,
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Settings",
    icon: <MetralyIcon name="settings" size="sm" />,
    disabled: true,
  },
};

export const WithMeta: Story = {
  args: {
    label: "Alerts",
    icon: <MetralyIcon name="bell" size="sm" />,
    meta: "3",
  },
};

export const AsAnchor: Story = {
  args: {
    as: "a",
    href: "#",
    label: "External link",
    icon: <MetralyIcon name="link" size="sm" />,
  },
};
