import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import {
  BackfillRangePicker,
  type BackfillPresetId,
} from "../../packages/ui/src/source/BackfillRangePicker";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof BackfillRangePicker> = {
  title: "Source/BackfillRangePicker",
  component: BackfillRangePicker,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 560 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof BackfillRangePicker>;

export const Default: Story = {
  render: () => {
    const [preset, setPreset] = React.useState<BackfillPresetId>("30d");
    const [days, setDays] = React.useState<number>(30);
    return (
      <BackfillRangePicker
        preset={preset}
        customDays={days}
        onChange={(p, d) => { setPreset(p); if (typeof d === "number") setDays(d); }}
        estimate={{ events: 8420, duration: "~12 min", confidence: "rough" }}
      />
    );
  },
};

export const SevenDays: Story = {
  render: () => {
    const [preset, setPreset] = React.useState<BackfillPresetId>("7d");
    return (
      <BackfillRangePicker
        preset={preset}
        onChange={setPreset}
        estimate={{ events: 1850, duration: "~3 min", confidence: "rough" }}
      />
    );
  },
};

export const NinetyDaysWithWarning: Story = {
  render: () => {
    const [preset, setPreset] = React.useState<BackfillPresetId>("90d");
    return (
      <BackfillRangePicker
        preset={preset}
        onChange={setPreset}
        estimate={{
          events: 96420,
          duration: "~38 min",
          confidence: "rough",
          warning: "GitHub primary-rate-limit is 5,000 req/h. The job will pace itself; expect 30–45 min.",
        }}
      />
    );
  },
};

export const Custom: Story = {
  render: () => {
    const [preset, setPreset] = React.useState<BackfillPresetId>("custom");
    const [days, setDays] = React.useState<number>(45);
    return (
      <BackfillRangePicker
        preset={preset}
        customDays={days}
        onChange={(p, d) => { setPreset(p); if (typeof d === "number") setDays(d); }}
        estimate={{ events: 12340, confidence: "rough" }}
      />
    );
  },
};

export const UnknownEstimate: Story = {
  render: () => {
    const [preset, setPreset] = React.useState<BackfillPresetId>("30d");
    return (
      <BackfillRangePicker
        preset={preset}
        onChange={setPreset}
        estimate={{ confidence: "unknown" }}
        helper="Estimate unavailable until the connector test completes."
      />
    );
  },
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => {
    const [preset, setPreset] = React.useState<BackfillPresetId>("30d");
    const [days, setDays] = React.useState<number>(30);
    return (
      <MetralyStoryFrame
        category="Source"
        title="BackfillRangePicker"
        description="Lets the user choose how far back to backfill data when connecting a new source. Offers presets and a custom day count with an event-count estimate."
        status="Ready"
        tags={["backfill", "range", "preset", "connector", "source"]}
      >
        <BackfillRangePicker
          preset={preset}
          customDays={days}
          onChange={(p, d) => { setPreset(p); if (typeof d === "number") setDays(d); }}
          estimate={{ events: 8420, duration: "~12 min", confidence: "rough" }}
        />
      </MetralyStoryFrame>
    );
  },
};
