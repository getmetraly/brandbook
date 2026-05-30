import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyFilterBar, MetralySelect, MetralyButton } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/FilterBar",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

// MetralyFilterBar: filters: MetralyFilterBarItem[], onReset?, collapsed?, actions?
// Each item: { id, label, control?, meta? }

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="FilterBar"
      description="Horizontal filter chip strip. Each filter exposes a label, an optional control, and optional metadata."
      status="stable"
      tags={["interactive", "form"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Connector filter bar</div>
        <MetralyFilterBar
          filters={[
            { id: "state",    label: "State",    control: <MetralySelect options={[{ value: "all", label: "All" }, { value: "active", label: "Active" }, { value: "paused", label: "Paused" }]} defaultValue="all" /> },
            { id: "source",   label: "Source",   control: <MetralySelect options={[{ value: "all", label: "All" }, { value: "github", label: "GitHub" }, { value: "jira", label: "Jira" }]} defaultValue="all" /> },
            { id: "synced",   label: "Last sync", meta: "Today" },
          ]}
          onReset={() => undefined}
          actions={<MetralyButton variant="ghost" size="sm">Export</MetralyButton>}
        />
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Collapsed</div>
        <MetralyFilterBar
          collapsed
          filters={[
            { id: "status", label: "Status",   meta: "Active" },
            { id: "team",   label: "Team",     meta: "Payments" },
            { id: "date",   label: "Date",     meta: "Last 30d" },
          ]}
          onReset={() => undefined}
        />
      </section>
    </MetralyStoryFrame>
  ),
};
