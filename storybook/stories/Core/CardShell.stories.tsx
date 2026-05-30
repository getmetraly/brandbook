import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CardShell, StatusBadge, StateBadge } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/CardShell",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="CardShell"
      description="Base card surface with tone, density, state, leading/trailing/header/footer slots."
      status="stable"
      tags={["layout", "foundation"]}
    >
      {/* Tones — neutral | cyan | purple | success | warning | danger | info */}
      <section>
        <div className="msf__section-title">Tones</div>
        <div className="msf__grid">
          {(["neutral", "cyan", "success", "warning", "danger", "info"] as const).map((tone) => (
            <CardShell
              key={tone}
              tone={tone}
              title={`tone="${tone}"`}
              subtitle="card surface"
            />
          ))}
        </div>
      </section>

      {/* Density */}
      <section>
        <div className="msf__section-title">Density</div>
        <div className="msf__stack msf__stack--sm msf__constrained-md">
          <CardShell density="comfortable" title="density=comfortable" subtitle="More breathing room" />
          <CardShell density="compact"     title="density=compact"     subtitle="Tight dashboard grid" />
        </div>
      </section>

      {/* States */}
      <section>
        <div className="msf__section-title">States</div>
        <div className="msf__grid msf__grid--compact">
          {(["default", "selected", "error", "stale", "loading"] as const).map((state) => (
            <CardShell key={state} state={state} title={`state="${state}"`} />
          ))}
        </div>
      </section>

      {/* Composed example */}
      <section>
        <div className="msf__section-title">Composed — connector card</div>
        <CardShell
          className="msf__constrained-sm"
          leading={<span className="msf__card-emoji">🐙</span>}
          title="GitHub"
          subtitle="github.com/acme-org"
          trailing={<StatusBadge status="Live" />}
          footer={
            <StateBadge state="ok" label="47 repos synced" size="sm" />
          }
        />
      </section>
    </MetralyStoryFrame>
  ),
};
