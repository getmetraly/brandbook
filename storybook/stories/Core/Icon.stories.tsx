import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyIcon, metralyIconPaths } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Icon",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Library: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyIcon"
      description="Inline SVG icon primitive. All icons from metralyIconPaths displayed at sm/md/lg sizes."
      status="stable"
      fullWidth
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>All icons (md)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 16 }}>
          {(Object.keys(metralyIconPaths) as Array<keyof typeof metralyIconPaths>).map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "10px 4px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 6,
              }}
            >
              <MetralyIcon name={name} size="md" />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textAlign: "center", wordBreak: "break-all" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sizes</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <MetralyIcon name="home" size="xs" />
          <MetralyIcon name="home" size="sm" />
          <MetralyIcon name="home" size="md" />
          <MetralyIcon name="home" size="lg" />
          <MetralyIcon name="home" size="xl" />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
