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
        <div className="msf__section-title">Interactive</div>
        <div className="msf__constrained-lg">
          <PickerDemo />
        </div>
      </section>

      <section>
        <div className="msf__section-title">No estimate (unknown confidence)</div>
        <div className="msf__constrained-lg">
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
