import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { WidgetPickerList, WidgetPickerCard } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Dashboard/WidgetPicker",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const WIDGET_CATALOG = [
  { kind: "dora/deploy-frequency",  title: "Deploy frequency",     description: "Deployments per day / week." },
  { kind: "dora/change-failure",    title: "Change failure rate",   description: "% of deployments that cause incident." },
  { kind: "dora/mttr",              title: "MTTR",                  description: "Mean time to restore service." },
  { kind: "dora/lead-time",         title: "Lead time for changes", description: "Commit to production elapsed time." },
  { kind: "flow/pr-throughput",     title: "PR throughput",         description: "Merged PRs by team / sprint.", selected: true },
  { kind: "flow/cycle-time",        title: "Cycle time",            description: "Time from first commit to merge." },
  { kind: "ai/insight-card",        title: "AI Insight",            description: "LLM-generated engineering insights." },
  { kind: "system/activity-feed",   title: "Activity feed",         description: "Real-time deployment & incident events." },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Dashboard"
      title="WidgetPicker"
      description="Widget catalog list for the dashboard builder. Keyboard-navigable, multi-select."
      status="stable"
      tags={["dashboard", "interactive", "a11y"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Widget catalog</div>
        <ProductPreview>
          <div style={{ padding: 16 }}>
            <WidgetPickerList ariaLabel="Widget catalog">
              {WIDGET_CATALOG.map((w) => (
                <WidgetPickerCard
                  key={w.kind}
                  title={w.title}
                  description={w.description}
                  kind={w.kind}
                  selected={w.selected ?? false}
                  onSelect={() => undefined}
                />
              ))}
            </WidgetPickerList>
          </div>
        </ProductPreview>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>States</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          <WidgetPickerCard title="Default" description="No selection" kind="dora/deploy-frequency" />
          <WidgetPickerCard title="Selected" description="Added to dashboard" kind="dora/lead-time" selected />
          <WidgetPickerCard title="Loading" description="Fetching preview" kind="ai/insight-card" loading />
          <WidgetPickerCard title="Disabled" description="Requires Pro plan" kind="system/activity-feed" disabled />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
