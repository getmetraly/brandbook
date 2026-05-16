import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  BackfillRangePicker,
  type BackfillPresetId,
} from "../../packages/ui/src/source/BackfillRangePicker";

const meta: Meta<typeof BackfillRangePicker> = {
  title: "Source/BackfillRangePicker",
  component: BackfillRangePicker,
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
