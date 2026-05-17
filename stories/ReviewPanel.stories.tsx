import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { MetralyIcon, ReviewPanel } from "@metraly/ui";

const stageStyle: React.CSSProperties = {
  padding: 32,
  background: "var(--m-bg-0)",
  color: "var(--m-fg-0)",
};

const cardStyle: React.CSSProperties = {
  width: "min(560px, 100%)",
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ReviewPanel> = {
  title: "Components/ReviewPanel",
  component: ReviewPanel,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ReviewPanel>;

// ─── Connector review ─────────────────────────────────────────────────────────

export const ConnectorReview: Story = {
  name: "Connector / Review configured sources",
  render: () => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <ReviewPanel
          title="Review your connection"
          description="Confirm the selected source and configuration before syncing."
          items={[
            {
              id: "github",
              icon: <MetralyIcon name="gitPullRequest" size="sm" />,
              label: "GitHub",
              value: "github.com/acme-corp",
              badgeState: "live",
            },
            {
              id: "scope",
              icon: <MetralyIcon name="settings" size="sm" />,
              label: "Scope",
              value: "pull_requests, commits, deployments",
            },
            {
              id: "sync",
              icon: <MetralyIcon name="activity" size="sm" />,
              label: "Sync frequency",
              value: "Every 15 minutes",
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ─── Dashboard review ─────────────────────────────────────────────────────────

export const DashboardReview: Story = {
  name: "Dashboard / Review widget bundle",
  render: () => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <ReviewPanel
          title="Widget bundle — CTO"
          description="These widgets will be pre-populated with synthetic data until you connect a source."
          items={[
            {
              id: "dora",
              icon: <MetralyIcon name="zap" size="sm" />,
              label: "DORA Overview",
              value: "4 key metrics, composite score",
              badgeState: "preview",
              badgeLabel: "preview",
            },
            {
              id: "deploy",
              icon: <MetralyIcon name="zap" size="sm" />,
              label: "Deploy Frequency",
              value: "Trend chart + current value",
              badgeState: "preview",
              badgeLabel: "preview",
            },
            {
              id: "mttr",
              icon: <MetralyIcon name="activity" size="sm" />,
              label: "MTTR Trend",
              value: "30d rolling average",
              badgeState: "gated",
              badgeLabel: "gated",
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ─── Loading state ────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: "Loading / Skeleton rows",
  render: () => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <ReviewPanel
          title="Review your connection"
          items={[]}
          loading
          loadingRows={4}
        />
      </div>
    </div>
  ),
};

// ─── Empty state ──────────────────────────────────────────────────────────────

export const Empty: Story = {
  name: "Empty / No items",
  render: () => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <ReviewPanel
          title="Review"
          items={[]}
          emptyText="No configuration items to display."
        />
      </div>
    </div>
  ),
};

// ─── Long text ────────────────────────────────────────────────────────────────

export const LongText: Story = {
  name: "Long text / Truncation check",
  render: () => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <ReviewPanel
          title="Long label and value overflow test"
          description="Labels and values should truncate with ellipsis rather than overflowing."
          items={[
            {
              id: "long",
              icon: <MetralyIcon name="settings" size="sm" />,
              label: "Very long configuration key name that should truncate gracefully",
              value: "https://extremely-long-hostname.internal.acme-corp.example.com/api/v3/webhooks/events",
              badgeState: "live",
            },
            {
              id: "short",
              icon: <MetralyIcon name="check" size="sm" />,
              label: "Short label",
              value: "OK",
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ─── No header ────────────────────────────────────────────────────────────────

export const NoHeader: Story = {
  name: "No header / Items only",
  render: () => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <ReviewPanel
          items={[
            {
              id: "team",
              icon: <MetralyIcon name="users" size="sm" />,
              label: "Team size",
              value: "12 engineers",
            },
            {
              id: "branch",
              icon: <MetralyIcon name="gitPullRequest" size="sm" />,
              label: "Default branch",
              value: "main",
            },
          ]}
        />
      </div>
    </div>
  ),
};
