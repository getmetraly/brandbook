import type { Meta, StoryObj } from "@storybook/react-vite";
import { Leaderboard } from "./Leaderboard";

const contributors = [
  { name: "Payments API", value: 42 },
  { name: "Growth Web", value: 36 },
  { name: "AI Workspace", value: 29 },
  { name: "Sync Engine", value: 18 },
];

const pipelines = [
  { name: "nightly-backfill", value: 981 },
  { name: "reliability-suite", value: 742 },
  { name: "storybook-build", value: 438 },
  { name: "db-migrate", value: 211 },
];

const meta = {
  component: Leaderboard,
  tags: ["ai-generated"],
} satisfies Meta<typeof Leaderboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contributors: Story = {
  args: {
    items: contributors,
    title: "Top contributors",
    unit: " PRs",
  },
};

export const WarningTone: Story = {
  args: {
    color: "var(--m-warn)",
    items: pipelines,
    precision: 0,
    title: "Slowest pipelines",
    unit: " s",
  },
};

export const PurpleAccent: Story = {
  args: {
    color: "var(--m-purple-400)",
    items: contributors,
    precision: 0,
    title: "Top contributors",
    unit: " PRs",
  },
};
