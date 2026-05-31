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

// ─── Individual state stories ─────────────────────────────────────────────────
//
// One story per SyncStage so Storybook's Controls panel is usable
// and each state can be visually diffed independently.
//
// Stage order: queued → discovering → backfilling → incremental
//              → paused → rate_limited → completed → failed → cancelled

const PANEL_WRAP: React.CSSProperties = { maxWidth: 680, padding: "32px 24px", background: "var(--m-bg-0)" };

export const Queued: Story = {
  name: "State / Queued",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="queued"
        onCancel={() => undefined}
      />
    </div>
  ),
};

export const Discovering: Story = {
  name: "State / Discovering",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="discovering"
        subStage="Listing repositories"
        eventsIngested={0}
        onCancel={() => undefined}
      />
    </div>
  ),
};

export const BackfillingProgress: Story = {
  name: "State / Backfilling (with progress)",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="backfilling"
        subStage="Fetching pull requests"
        eventsIngested={4_520}
        totalEstimate={8_420}
        onCancel={() => undefined}
        onPause={() => undefined}
      />
    </div>
  ),
};

export const BackfillingIndeterminate: Story = {
  name: "State / Backfilling (indeterminate)",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="Jira · prod"
        sourceId="jira-prod"
        stage="backfilling"
        subStage="Fetching issues"
        indeterminate
        onCancel={() => undefined}
      />
    </div>
  ),
};

export const Incremental: Story = {
  name: "State / Incremental (live)",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="incremental"
        eventsIngested={8_420}
        totalEstimate={8_420}
        lastSyncedAt={new Date(Date.now() - 300_000).toISOString()}
        onPause={() => undefined}
      />
    </div>
  ),
};

export const Paused: Story = {
  name: "State / Paused",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="paused"
        eventsIngested={6_120}
        totalEstimate={8_420}
        lastSyncedAt={new Date(Date.now() - 1_200_000).toISOString()}
        onResume={() => undefined}
      />
    </div>
  ),
};

export const RateLimited: Story = {
  name: "State / Rate limited",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="rate_limited"
        eventsIngested={6_120}
        totalEstimate={8_420}
        rateLimit={{ window: "1h", remaining: 0, resetAt: new Date(Date.now() + 3_600_000).toISOString() }}
        onRetry={() => undefined}
      />
    </div>
  ),
};

export const Completed: Story = {
  name: "State / Completed",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="completed"
        eventsIngested={8_420}
        totalEstimate={8_420}
        lastSyncedAt={new Date(Date.now() - 600_000).toISOString()}
      />
    </div>
  ),
};

export const Failed: Story = {
  name: "State / Failed",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="Jira · prod"
        sourceId="jira-prod"
        stage="failed"
        eventsIngested={1_820}
        totalEstimate={6_400}
        onRetry={() => undefined}
      />
    </div>
  ),
};

/**
 * Cancelled — user-initiated stop before completion.
 * Visual: neutral/stale tone (not error red). Shows "Sync was cancelled" message.
 * Restart sync CTA for secondary action.
 *
 * NOTE: The component renders the `cancelled` stage via the status badge and
 * `STAGE_LABEL["cancelled"]` copy. The `onRetry` prop powers the Restart button.
 */
export const Cancelled: Story = {
  name: "State / Cancelled",
  render: () => (
    <div style={PANEL_WRAP}>
      <SyncProgressPanel
        sourceLabel="GitHub · acme"
        sourceId="github-acme"
        stage="cancelled"
        eventsIngested={3_200}
        totalEstimate={8_420}
        onRetry={() => undefined}
      />
    </div>
  ),
};
