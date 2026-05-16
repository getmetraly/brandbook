import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SyncProgressPanel } from "../../packages/ui/src/source/SyncProgressPanel";

const meta: Meta<typeof SyncProgressPanel> = {
  title: "Source/SyncProgressPanel",
  component: SyncProgressPanel,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 680 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof SyncProgressPanel>;

export const Queued: Story = {
  args: {
    sourceLabel: "GitHub · acme",
    sourceId: "github-acme",
    stage: "queued",
    onCancel: () => {},
  },
};

export const Discovering: Story = {
  args: {
    sourceLabel: "GitHub · acme",
    sourceId: "github-acme",
    stage: "discovering",
    subStage: "Listing repositories",
    eventsIngested: 0,
    onCancel: () => {},
  },
};

export const Backfilling: Story = {
  args: {
    sourceLabel: "GitHub · acme",
    sourceId: "github-acme",
    stage: "backfilling",
    subStage: "Fetching pull requests",
    eventsIngested: 4520,
    totalEstimate: 8420,
    onCancel: () => {},
    onPause: () => {},
  },
};

export const BackfillingIndeterminate: Story = {
  args: {
    sourceLabel: "Jira · prod",
    sourceId: "jira-prod",
    stage: "backfilling",
    subStage: "Fetching issues",
    indeterminate: true,
    onCancel: () => {},
  },
};

export const Incremental: Story = {
  args: {
    sourceLabel: "GitHub · acme",
    sourceId: "github-acme",
    stage: "incremental",
    eventsIngested: 8420,
    totalEstimate: 8420,
    lastSyncedAt: "2026-05-15T10:42:00Z",
    onPause: () => {},
  },
};

export const Paused: Story = {
  args: {
    sourceLabel: "GitHub · acme",
    sourceId: "github-acme",
    stage: "paused",
    eventsIngested: 6120,
    totalEstimate: 8420,
    lastSyncedAt: "2026-05-15T10:32:00Z",
    onResume: () => {},
  },
};

export const RateLimited: Story = {
  args: {
    sourceLabel: "GitHub · acme",
    sourceId: "github-acme",
    stage: "rate_limited",
    eventsIngested: 6120,
    totalEstimate: 8420,
    rateLimit: { window: "1 h", remaining: 0, resetAt: "2026-05-15T11:12:00Z" },
    onRetry: () => {},
  },
};

export const Failed: Story = {
  args: {
    sourceLabel: "Jira · prod",
    sourceId: "jira-prod",
    stage: "failed",
    eventsIngested: 1820,
    totalEstimate: 6400,
    onRetry: () => {},
  },
};

export const Completed: Story = {
  args: {
    sourceLabel: "GitHub · acme",
    sourceId: "github-acme",
    stage: "completed",
    eventsIngested: 8420,
    totalEstimate: 8420,
    lastSyncedAt: "2026-05-15T10:42:00Z",
  },
};
