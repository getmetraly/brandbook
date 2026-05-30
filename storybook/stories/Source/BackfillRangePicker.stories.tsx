import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BackfillRangePicker, type BackfillPresetId } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Source/BackfillRangePicker",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

function PickerDemo() {
  const [preset, setPreset] = useState<BackfillPresetId>("30d");
  const [customDays, setCustomDays] = useState<number | undefined>(undefined);
  return (
    <BackfillRangePicker
      preset={preset}
      customDays={customDays}
      onChange={(p, days) => { setPreset(p); setCustomDays(days); }}
      estimate={{
        events: 84_500,
        duration: "~8 min",
        confidence: "rough",
        warning: "GitHub API rate limit: 5 000 req/h. Large orgs may take longer.",
      }}
    />
  );
}

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Source"
      title="BackfillRangePicker"
      description="Preset + custom backfill window selector with event estimate and friction warning."
      status="stable"
      tags={["connector", "interactive"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Interactive</div>
        <div style={{ maxWidth: 480 }}>
          <PickerDemo />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>No estimate (unknown confidence)</div>
        <div style={{ maxWidth: 480 }}>
          <BackfillRangePicker
            preset="90d"
            onChange={() => undefined}
            estimate={{ confidence: "unknown" }}
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
