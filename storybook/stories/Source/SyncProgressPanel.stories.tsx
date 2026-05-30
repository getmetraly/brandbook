import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SyncProgressPanel } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Source/SyncProgressPanel",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Source"
      title="SyncProgressPanel"
      description="Live sync state surface. Stages: queued → discovering → backfilling → incremental → completed / failed."
      status="stable"
      tags={["connector", "live"]}
    >
      <section>
        <div className="msf__section-title">Backfilling</div>
        <div className="msf__constrained-xl">
          <SyncProgressPanel
            sourceLabel="GitHub · acme-org"
            sourceId="github-acme"
            stage="backfilling"
            subStage="Fetching pull requests"
            eventsIngested={42_800}
            totalEstimate={84_500}
            onPause={() => undefined}
            onCancel={() => undefined}
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Incremental (live)</div>
        <div className="msf__constrained-xl">
          <SyncProgressPanel
            sourceLabel="GitHub · acme-org"
            sourceId="github-acme"
            stage="incremental"
            eventsIngested={1_204}
            lastSyncedAt={new Date(Date.now() - 300_000).toISOString()}
            onPause={() => undefined}
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Rate limited</div>
        <div className="msf__constrained-xl">
          <SyncProgressPanel
            sourceLabel="GitHub · acme-org"
            sourceId="github-acme"
            stage="rate_limited"
            eventsIngested={18_000}
            totalEstimate={84_500}
            rateLimit={{ window: "1h", remaining: 0, resetAt: new Date(Date.now() + 1_800_000).toISOString() }}
            onRetry={() => undefined}
            onCancel={() => undefined}
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Completed</div>
        <div className="msf__constrained-xl">
          <SyncProgressPanel
            sourceLabel="Jira · acme"
            sourceId="jira-acme"
            stage="completed"
            eventsIngested={31_020}
            totalEstimate={31_020}
            lastSyncedAt={new Date(Date.now() - 600_000).toISOString()}
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Failed</div>
        <div className="msf__constrained-xl">
          <SyncProgressPanel
            sourceLabel="Linear · acme"
            sourceId="linear-acme"
            stage="failed"
            eventsIngested={2_100}
            onRetry={() => undefined}
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
