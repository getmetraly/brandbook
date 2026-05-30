import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { MetralySegmentedControl, MetralyTabs } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Segmented",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

function SegmentedDemo() {
  const [view, setView] = useState("week");
  return (
    <MetralySegmentedControl
      value={view}
      onChange={setView}
      options={[
        { value: "day",   label: "Day" },
        { value: "week",  label: "Week" },
        { value: "month", label: "Month" },
        { value: "quarter", label: "Quarter" },
      ]}
    />
  );
}

function TabsDemo() {
  const [tab, setTab] = useState("overview");
  return (
    <MetralyTabs
      value={tab}
      onChange={setTab}
      items={[
        { value: "overview",  label: "Overview" },
        { value: "metrics",   label: "Metrics" },
        { value: "incidents", label: "Incidents" },
        { value: "settings",  label: "Settings", disabled: true },
      ]}
    />
  );
}

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="Segmented & Tabs"
      description="MetralySegmentedControl for compact option switching; MetralyTabs for page-level navigation."
      status="stable"
      tags={["interactive", "a11y"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Segmented control</div>
        <SegmentedDemo />
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Tabs</div>
        <TabsDemo />
      </section>
    </MetralyStoryFrame>
  ),
};
