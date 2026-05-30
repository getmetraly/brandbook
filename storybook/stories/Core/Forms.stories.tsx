import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  MetralyCheckbox,
  MetralyRadio,
  MetralySwitch,
  MetralySelect,
  MetralyInput,
} from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Forms",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Checkboxes: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyCheckbox"
      description="Accessible checkbox with checked, indeterminate, error, loading, and disabled states."
      status="stable"
      tags={["forms", "a11y"]}
    >
      <section>
        <div className="msf__section-title">States</div>
        <div className="msf__stack msf__constrained-lg">
          <MetralyCheckbox label="Default unchecked" />
          <MetralyCheckbox label="Checked" checked onChange={() => {}} />
          <MetralyCheckbox label="Indeterminate" indeterminate />
          <MetralyCheckbox label="Disabled" disabled />
          <MetralyCheckbox label="Disabled checked" checked disabled onChange={() => {}} />
          <MetralyCheckbox label="Error state" error description="This field is required." />
          <MetralyCheckbox label="Loading" loading />
          <MetralyCheckbox
            label="With description"
            description="Opt in to receive weekly engineering digests."
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Mobile — 375px</div>
        <div className="msf__vp-375">
          <div className="msf__stack">
            <MetralyCheckbox label="Default unchecked" />
            <MetralyCheckbox label="Checked with long label that wraps on narrow screens" checked onChange={() => {}} />
            <MetralyCheckbox label="Error state" error description="This field is required." />
          </div>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};

export const Radios: Story = {
  render: () => {
    function RadioGroup() {
      const [selected, setSelected] = useState("daily");
      return (
        <div className="msf__stack msf__constrained-lg">
          <MetralyRadio
            name="sync-freq"
            value="realtime"
            label="Real-time"
            description="Sync immediately on every event."
            checked={selected === "realtime"}
            onChange={() => setSelected("realtime")}
          />
          <MetralyRadio
            name="sync-freq"
            value="hourly"
            label="Hourly"
            description="Batch sync once per hour."
            checked={selected === "hourly"}
            onChange={() => setSelected("hourly")}
          />
          <MetralyRadio
            name="sync-freq"
            value="daily"
            label="Daily"
            description="Full sync at midnight UTC."
            checked={selected === "daily"}
            onChange={() => setSelected("daily")}
          />
          <MetralyRadio
            name="sync-freq"
            value="manual"
            label="Manual"
            description="Trigger sync from the dashboard."
            checked={selected === "manual"}
            onChange={() => setSelected("manual")}
          />
        </div>
      );
    }
    return (
      <MetralyStoryFrame
        category="Core"
        title="MetralyRadio"
        description="Keyboard-navigable radio group. Single selection within a named group."
        status="stable"
        tags={["forms", "a11y"]}
      >
        <section>
          <div className="msf__section-title">Radio group</div>
          <RadioGroup />
        </section>

        <section>
          <div className="msf__section-title">States</div>
          <div className="msf__stack msf__constrained-lg">
            <MetralyRadio name="radio-states" value="disabled" label="Disabled" disabled />
            <MetralyRadio name="radio-states" value="error" label="Error" error description="Please select an option." />
            <MetralyRadio name="radio-states" value="loading" label="Loading" loading />
          </div>
        </section>
      </MetralyStoryFrame>
    );
  },
};

export const Switches: Story = {
  render: () => {
    function SwitchDemo() {
      const [states, setStates] = useState({ notifications: true, digest: false, beta: true });
      return (
        <div className="msf__stack msf__constrained-xl">
          <MetralySwitch
            label="Email notifications"
            description="Send deploy and incident alerts to your inbox."
            checked={states.notifications}
            onChange={(e) => setStates((s) => ({ ...s, notifications: e.target.checked }))}
          />
          <MetralySwitch
            label="Weekly digest"
            description="Summary of engineering metrics every Monday."
            checked={states.digest}
            onChange={(e) => setStates((s) => ({ ...s, digest: e.target.checked }))}
          />
          <MetralySwitch
            label="Beta features"
            description="Access unreleased functionality."
            accent="purple"
            checked={states.beta}
            onChange={(e) => setStates((s) => ({ ...s, beta: e.target.checked }))}
          />
        </div>
      );
    }
    return (
      <MetralyStoryFrame
        category="Core"
        title="MetralySwitch"
        description="Toggle switch for binary settings. Cyan (default) and purple accent variants."
        status="stable"
        tags={["forms", "a11y"]}
      >
        <section>
          <div className="msf__section-title">Interactive switches</div>
          <SwitchDemo />
        </section>

        <section>
          <div className="msf__section-title">States</div>
          <div className="msf__stack msf__constrained-xl">
            <MetralySwitch label="Default off" />
            <MetralySwitch label="On" checked onChange={() => {}} />
            <MetralySwitch label="Disabled off" disabled />
            <MetralySwitch label="Disabled on" checked disabled onChange={() => {}} />
            <MetralySwitch label="Loading" loading />
          </div>
        </section>

        <section>
          <div className="msf__section-title">Mobile — 375px</div>
          <div className="msf__vp-375">
            <div className="msf__stack">
              <MetralySwitch label="Email notifications" description="Send alerts to your inbox." checked onChange={() => {}} />
              <MetralySwitch label="Beta features" description="Access unreleased functionality." accent="purple" />
            </div>
          </div>
        </section>
      </MetralyStoryFrame>
    );
  },
};

export const Selects: Story = {
  render: () => {
    function SelectDemo() {
      const [region, setRegion] = useState("");
      const [interval, setInterval] = useState("1h");
      return (
        <div className="msf__stack msf__constrained-xl">
          <MetralySelect
            label="Region"
            placeholder="Select a region"
            value={region}
            onChange={setRegion}
            options={[
              { value: "us-east-1", label: "US East (N. Virginia)" },
              { value: "us-west-2", label: "US West (Oregon)" },
              { value: "eu-west-1", label: "Europe (Ireland)" },
              { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
            ]}
          />
          <MetralySelect
            label="Sync interval"
            value={interval}
            onChange={setInterval}
            options={[
              { value: "5m",  label: "Every 5 minutes" },
              { value: "15m", label: "Every 15 minutes" },
              { value: "1h",  label: "Every hour" },
              { value: "6h",  label: "Every 6 hours" },
              { value: "24h", label: "Daily" },
            ]}
          />
          <MetralySelect
            label="Environment"
            placeholder="Choose environment"
            error
            options={[
              { value: "prod",    label: "Production" },
              { value: "staging", label: "Staging" },
              { value: "dev",     label: "Development" },
            ]}
          />
          <MetralySelect
            label="Disabled"
            value="prod"
            disabled
            options={[{ value: "prod", label: "Production" }]}
          />
        </div>
      );
    }
    return (
      <MetralyStoryFrame
        category="Core"
        title="MetralySelect"
        description="Accessible custom select. Full-width trigger, viewport-safe popover, keyboard navigation."
        status="stable"
        tags={["forms", "a11y"]}
      >
        <section>
          <div className="msf__section-title">Select field</div>
          <SelectDemo />
        </section>

        <section>
          <div className="msf__section-title">Mobile — 375px</div>
          <div className="msf__vp-375">
            <div className="msf__stack">
              <MetralySelect
                label="Sync interval"
                placeholder="Choose interval"
                options={[
                  { value: "1h",  label: "Every hour" },
                  { value: "6h",  label: "Every 6 hours" },
                  { value: "24h", label: "Daily" },
                ]}
              />
              <MetralyInput label="Token" placeholder="paste_your_token_here" type="password" />
            </div>
          </div>
        </section>
      </MetralyStoryFrame>
    );
  },
};
