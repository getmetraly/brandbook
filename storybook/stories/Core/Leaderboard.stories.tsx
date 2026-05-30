import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Leaderboard } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Leaderboard",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const AUTHORS = [
  { name: "alex.chen", value: 34 },
  { name: "priya.nair", value: 27 },
  { name: "sam.okafor", value: 19 },
  { name: "lee.tanaka", value: 12 },
  { name: "robin.silva", value: 7 },
];

const PIPELINES = [
  { name: "monorepo-full-build", value: 712 },
  { name: "deploy-staging", value: 445 },
  { name: "e2e-suite", value: 398 },
  { name: "unit-tests", value: 184 },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="Leaderboard"
      description="Ranked horizontal bar list. Compact ranking for top authors, slowest pipelines, busiest repos. Leading row is accented; trailing rows fade."
      status="stable"
      tags={["data", "ranking"]}
    >
      {/* Default — cyan accent */}
      <section>
        <div className="msf__section-title">Default (cyan accent)</div>
        <div className="msf__constrained-lg">
          <Leaderboard
            title="Top contributors"
            items={AUTHORS}
            unit=" PRs"
            precision={0}
          />
        </div>
      </section>

      {/* Custom color */}
      <section>
        <div className="msf__section-title">Custom accent color</div>
        <div className="msf__grid msf__grid--two">
          <Leaderboard
            title="Slowest pipelines (s)"
            items={PIPELINES}
            color="var(--m-warn)"
            unit="s"
            precision={0}
          />
          <Leaderboard
            title="Top contributors"
            items={AUTHORS}
            color="var(--m-purple-400)"
            unit=" PRs"
            precision={0}
          />
        </div>
      </section>

      {/* No title */}
      <section>
        <div className="msf__section-title">Without title</div>
        <div className="msf__constrained-lg">
          <Leaderboard items={AUTHORS} unit=" PRs" precision={0} />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
