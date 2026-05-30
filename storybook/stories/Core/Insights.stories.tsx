import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AIInsightCard, InlineInsight, InsightCard } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Insights",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="AI Insight Surfaces"
      description="AIInsightCard, InlineInsight, and InsightCard — three tiers of AI and rule-based insight communication."
      status="stable"
      tags={["ai", "insight"]}
    >
      {/* AIInsightCard */}
      <section>
        <div className="msf__section-title">AIInsightCard</div>
        <div className="msf__stack msf__constrained-3xl">
          <AIInsightCard
            title="Deployment frequency dropped 40%"
            body="Your team shipped 3 times last week, down from 5 the week before. The slowdown correlates with the new review policy added on May 12."
            action="Explore trend"
            onAction={() => {}}
          />
          <AIInsightCard
            title="Build time regression detected"
            body="Average CI duration increased from 4 min 20 s to 6 min 45 s since the monorepo cache was disabled on May 28."
            action="View builds"
            onAction={() => {}}
          />
          <AIInsightCard
            title="No blocking issues found"
            body="All connectors are healthy and the last 48 syncs completed without errors."
            pulse={false}
          />
        </div>
      </section>

      {/* InlineInsight */}
      <section>
        <div className="msf__section-title">InlineInsight</div>
        <div className="msf__stack msf__constrained-3xl">
          <InlineInsight
            text="PR cycle time increased 18% this sprint — reviewers are waiting longer for first commits."
            action="Details"
            onAction={() => {}}
          />
          <InlineInsight
            text="This connector last synced 6 hours ago. Backfill may be needed."
          />
        </div>
      </section>

      {/* InsightCard — rules / anomaly / trend surface */}
      <section>
        <div className="msf__section-title">InsightCard</div>
        <div className="msf__stack msf__constrained-3xl">
          <InsightCard
            id="ic-1"
            title="Spike in error rate"
            state="open"
            tone="danger"
            source="anomaly"
            confidence="high"
            summary="The error rate on the payments service spiked 3× above baseline between 14:00 and 15:30 UTC."
            evidence={[
              { id: "e1", label: "Error rate p99", value: "12.4 %", kind: "metric" },
              { id: "e2", label: "Baseline (7d avg)", value: "3.9 %", kind: "metric" },
            ]}
          />
          <InsightCard
            id="ic-2"
            title="Lead time below target"
            state="open"
            tone="ok"
            source="rules"
            confidence="medium"
            summary="Lead time for changes has been consistently under 2 days this quarter — meeting the DORA elite threshold."
          />
          <InsightCard
            id="ic-3"
            title="Missing CODEOWNERS for /infra"
            state="open"
            tone="warning"
            source="policy"
            confidence="high"
            summary="The /infra directory has no CODEOWNERS entry. Changes merged without required review."
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
