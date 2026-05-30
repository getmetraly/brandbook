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
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Tones</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
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
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Density</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
          <CardShell density="comfortable" title="density=comfortable" subtitle="More breathing room" />
          <CardShell density="compact"     title="density=compact"     subtitle="Tight dashboard grid" />
        </div>
      </section>

      {/* States */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>States</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {(["default", "selected", "error", "stale", "loading"] as const).map((state) => (
            <CardShell key={state} state={state} title={`state="${state}"`} />
          ))}
        </div>
      </section>

      {/* Composed example */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Composed — connector card</div>
        <CardShell
          style={{ maxWidth: 320 }}
          leading={<span style={{ fontSize: 20 }}>🐙</span>}
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
