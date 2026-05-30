import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyEmptyState, MetralyButton } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/EmptyState",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyEmptyState"
      description='Zero-data surface. Variants: default, error, gated, no-results.'
      status="stable"
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Default — no data</div>
        <MetralyEmptyState
          title="No dashboards yet"
          description="Create your first dashboard to start tracking your engineering metrics."
          action={<MetralyButton variant="primary">New dashboard</MetralyButton>}
        />
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Error</div>
        <MetralyEmptyState
          variant="error"
          title="Failed to load data"
          description="The connector returned an error. Check your token and try again."
          action={<MetralyButton variant="neutral">Retry</MetralyButton>}
        />
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>No results</div>
        <MetralyEmptyState
          variant="no-results"
          title='No results for "deploy"'
          description="Try a different search term or clear filters."
        />
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Gated</div>
        <MetralyEmptyState
          variant="gated"
          title="Feature not available"
          description="Upgrade your plan to access AI Workspace."
          action={<MetralyButton variant="primary">View plans</MetralyButton>}
        />
      </section>
    </MetralyStoryFrame>
  ),
};
