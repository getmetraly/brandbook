/**
 * Scenarios/ConnectorWizard
 *
 * Static multi-story reference for the connector setup wizard.
 * Each story is a frozen visual snapshot of one stage — no internal navigation.
 * Use these as compositional reference for WizardLayout + StepRail + ReviewPanel.
 *
 * Stage order: Select Sources → Grant Permissions → Configure → Review → Success / Error
 */
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCodeBlock,
  MetralyIcon,
  ReviewPanel,
  StickyWizardFooter,
  StateBadge,
  WizardLayout,
} from "@metraly/ui";
import type { WizardLayoutStep } from "@metraly/ui";

// ─── Step definitions ─────────────────────────────────────────────────────────

type Stage = "sources" | "permissions" | "configure" | "review";

const STAGE_LABELS: Record<Stage, string> = {
  sources: "Select Sources",
  permissions: "Grant Permissions",
  configure: "Configure",
  review: "Review & Connect",
};

function stepsFor(active: Stage): WizardLayoutStep[] {
  const order: Stage[] = ["sources", "permissions", "configure", "review"];
  const idx = order.indexOf(active);
  return order.map((id, i) => ({
    id,
    label: STAGE_LABELS[id],
    status: i < idx ? "done" : i === idx ? "current" : "next",
  }));
}

// ─── Source tiles ─────────────────────────────────────────────────────────────

const SOURCES = [
  { id: "github", label: "GitHub", icon: "github" as const, note: "Repos, PRs, CI pipelines" },
  { id: "jira", label: "Jira", icon: "jira" as const, note: "Issues, sprints, backlogs" },
  { id: "gitlab", label: "GitLab", icon: "gitlab" as const, note: "MRs, pipelines, milestones" },
  { id: "linear", label: "Linear", icon: "arrowRight" as const, note: "Projects, cycles, issues" },
  { id: "slack", label: "Slack", icon: "sparkles" as const, note: "Channels, standups, alerts" },
  { id: "pagerduty", label: "PagerDuty", icon: "alertTri" as const, note: "Incidents, on-call rota" },
];

function SourceTile({ source, selected }: { source: typeof SOURCES[number]; selected: boolean }) {
  return (
    <div
      role="option"
      aria-selected={selected}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "18px 16px",
        borderRadius: 12,
        border: selected ? "2px solid var(--m-cyan-500)" : "1px solid var(--m-line)",
        background: selected
          ? "color-mix(in oklab, var(--m-cyan-500) 6%, var(--m-bg-1))"
          : "var(--m-bg-1)",
        boxShadow: selected ? "0 0 0 1px var(--m-cyan-500)" : "none",
      }}
    >
      <MetralyIcon name={source.icon} size="lg" />
      <span style={{ fontSize: "var(--m-fs-12)", fontWeight: 700, color: "var(--m-fg-0)" }}>
        {source.label}
      </span>
      <span style={{ fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)", lineHeight: 1.4 }}>
        {source.note}
      </span>
    </div>
  );
}

// ─── Stage body helpers ───────────────────────────────────────────────────────

const SELECTED_SOURCES: Record<string, true> = { github: true };

function SourcesBody({ narrow = false }: { narrow?: boolean }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <p style={{ margin: 0, fontSize: "var(--m-fs-12)", color: "var(--m-fg-2)" }}>
        Select the data sources to connect to your Metraly workspace. You can add more later.
      </p>
      <div
        role="listbox"
        aria-label="Data source selection"
        style={{
          display: "grid",
          gridTemplateColumns: narrow ? "1fr" : "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {SOURCES.map((s) => (
          <SourceTile key={s.id} source={s} selected={SELECTED_SOURCES[s.id] === true} />
        ))}
      </div>
    </div>
  );
}

function PermissionsBody() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <p style={{ margin: 0, fontSize: "var(--m-fs-12)", color: "var(--m-fg-2)" }}>
        Metraly needs read access to the GitHub repositories you selected. Review and approve the
        permissions below before continuing.
      </p>
      <div style={{ display: "grid", gap: 8 }}>
        {[
          { scope: "repo:read", desc: "List repositories and read metadata" },
          { scope: "pull_request:read", desc: "Access PR reviews, comments, and merge state" },
          { scope: "check_runs:read", desc: "Read CI check results and status" },
          { scope: "deployments:read", desc: "Track deployment events and environments" },
        ].map(({ scope, desc }) => (
          <div
            key={scope}
            style={{
              display: "grid",
              gridTemplateColumns: "auto minmax(0, 1fr)",
              alignItems: "start",
              gap: 12,
              padding: "12px 14px",
              borderRadius: "var(--m-r-3)",
              border: "1px solid var(--m-line)",
              background: "var(--m-bg-1)",
            }}
          >
            <MetralyIcon name="check" size="sm" style={{ marginTop: 1, color: "var(--m-cyan-500)" }} />
            <div>
              <code style={{ fontSize: "var(--m-fs-10)", color: "var(--m-fg-0)", fontFamily: "var(--m-font-mono)" }}>
                {scope}
              </code>
              <p style={{ margin: "2px 0 0", fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <MetralyCodeBlock accent="primary">
        {"$ metraly auth github --org acme-corp\n  Redirecting to GitHub OAuth…"}
      </MetralyCodeBlock>
    </div>
  );
}

function ConfigureBody() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ margin: 0, fontSize: "var(--m-fs-12)", color: "var(--m-fg-2)" }}>
        Configure sync settings for the connected sources.
      </p>
      <div style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: "var(--m-fs-11)", fontWeight: 600, color: "var(--m-fg-1)" }}>
            Repository filter
          </label>
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--m-line)",
              background: "var(--m-bg-2)",
              color: "var(--m-fg-0)",
              fontSize: "var(--m-fs-12)",
              fontFamily: "var(--m-font-mono)",
            }}
          >
            metraly/*
          </div>
          <span style={{ fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)" }}>
            Glob pattern — e.g. metraly/* or org/repo-name
          </span>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: "var(--m-fs-11)", fontWeight: 600, color: "var(--m-fg-1)" }}>
            Sync interval
          </label>
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--m-line)",
              background: "var(--m-bg-2)",
              color: "var(--m-fg-0)",
              fontSize: "var(--m-fs-12)",
            }}
          >
            5 min
          </div>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: "var(--m-fs-11)", fontWeight: 600, color: "var(--m-fg-1)" }}>
            Backfill window
          </label>
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--m-line)",
              background: "var(--m-bg-2)",
              color: "var(--m-fg-0)",
              fontSize: "var(--m-fs-12)",
            }}
          >
            90 days
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewBody() {
  return (
    <ReviewPanel
      title="Review connection setup"
      description="Confirm before connecting. You can change settings later in Connectors."
      items={[
        {
          id: "sources",
          icon: <MetralyIcon name="github" size="sm" />,
          label: "Sources",
          value: "GitHub (acme-corp)",
          badgeState: "live",
        },
        {
          id: "auth",
          icon: <MetralyIcon name="lock" size="sm" />,
          label: "Auth method",
          value: "OAuth 2.0",
        },
        {
          id: "filter",
          icon: <MetralyIcon name="filter" size="sm" />,
          label: "Repo filter",
          value: "metraly/*",
        },
        {
          id: "interval",
          icon: <MetralyIcon name="clock" size="sm" />,
          label: "Sync interval",
          value: "Every 5 minutes",
        },
        {
          id: "backfill",
          icon: <MetralyIcon name="refresh" size="sm" />,
          label: "Backfill window",
          value: "90 days",
        },
      ]}
    />
  );
}

// ─── Wizard stage wrapper ─────────────────────────────────────────────────────

function WizardStage({ stage, narrow = false }: { stage: Stage; narrow?: boolean }) {
  const isFirst = stage === "sources";
  const isLast = stage === "review";

  const titles: Record<Stage, string> = {
    sources: "Select data sources",
    permissions: "Grant permissions",
    configure: "Configure sync",
    review: "Review & connect",
  };

  const descriptions: Record<Stage, string> = {
    sources: "Choose which integrations to connect to your Metraly workspace.",
    permissions: "Approve read-only access so Metraly can ingest delivery telemetry.",
    configure: "Set your repository filter, sync interval, and backfill window.",
    review: "Confirm your setup before Metraly starts syncing your repositories.",
  };

  const bodies: Record<Stage, React.ReactNode> = {
    sources: <SourcesBody narrow={narrow} />,
    permissions: <PermissionsBody />,
    configure: <ConfigureBody />,
    review: <ReviewBody />,
  };

  return (
    <WizardLayout
      steps={stepsFor(stage)}
      eyebrow="Connector setup"
      title={titles[stage]}
      description={descriptions[stage]}
      contentWidth={760}
      footer={
        <StickyWizardFooter
          back={!isFirst ? <MetralyButton variant="ghost">Back</MetralyButton> : undefined}
          primary={
            <MetralyButton variant="primary">
              {isLast ? "Connect sources" : "Continue"}
            </MetralyButton>
          }
        />
      }
    >
      {bodies[stage]}
    </WizardLayout>
  );
}

// ─── Post-wizard states ───────────────────────────────────────────────────────

function SuccessState() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--m-bg-0)",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "min(520px, 100%)",
          display: "grid",
          gap: 20,
          padding: 32,
          borderRadius: "var(--m-r-5)",
          border: "1px solid var(--m-line)",
          background: "var(--m-bg-1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1px solid color-mix(in oklab, var(--m-ok) 30%, var(--m-line))",
            background: "color-mix(in oklab, var(--m-ok) 10%, var(--m-bg-2))",
            display: "grid",
            placeItems: "center",
            margin: "0 auto",
            color: "var(--m-ok)",
          }}
        >
          <MetralyIcon name="check" size="lg" />
        </div>
        <div>
          <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-18)", fontWeight: 700, marginBottom: 8 }}>
            Connection established
          </div>
          <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)", lineHeight: 1.5 }}>
            GitHub has been connected to your workspace. Metraly is now syncing your repositories
            and building the first delivery telemetry snapshot.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <StateBadge state="live" label="Sync running" />
          <MetralyBadge variant="success">GitHub connected</MetralyBadge>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <MetralyButton variant="secondary">View connector</MetralyButton>
          <MetralyButton variant="primary">Go to dashboard</MetralyButton>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--m-bg-0)",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "min(520px, 100%)",
          display: "grid",
          gap: 20,
          padding: 32,
          borderRadius: "var(--m-r-5)",
          border: "1px solid color-mix(in oklab, var(--m-err) 30%, var(--m-line))",
          background: "var(--m-bg-1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1px solid color-mix(in oklab, var(--m-err) 30%, var(--m-line))",
            background: "color-mix(in oklab, var(--m-err) 10%, var(--m-bg-2))",
            display: "grid",
            placeItems: "center",
            margin: "0 auto",
            color: "var(--m-err)",
          }}
        >
          <MetralyIcon name="alertTri" size="lg" />
        </div>
        <div>
          <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-18)", fontWeight: 700, marginBottom: 8 }}>
            Connection failed
          </div>
          <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)", lineHeight: 1.5 }}>
            Metraly could not connect to GitHub. The OAuth token may have expired or the required
            permissions were not granted. Check your GitHub app settings and try again.
          </div>
        </div>
        <MetralyCodeBlock accent="error">
          {"Error: OAuth token validation failed\nScope required: repo:read\nContact: github.com/settings/apps"}
        </MetralyCodeBlock>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <MetralyButton variant="ghost">Cancel</MetralyButton>
          <MetralyButton variant="primary">Retry connection</MetralyButton>
        </div>
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Scenarios/ConnectorWizard",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Step 1: Choose which data sources to connect. GitHub pre-selected. */
export const SelectSources: Story = {
  name: "Step 1 / Select Sources",
  render: () => <WizardStage stage="sources" />,
};

/** Step 2: Review and approve read-only OAuth scopes. */
export const GrantPermissions: Story = {
  name: "Step 2 / Grant Permissions",
  render: () => <WizardStage stage="permissions" />,
};

/** Step 3: Set repository filter, sync interval, and backfill window. */
export const Configure: Story = {
  name: "Step 3 / Configure",
  render: () => <WizardStage stage="configure" />,
};

/** Step 4: ReviewPanel summary before confirming the connection. */
export const Review: Story = {
  name: "Step 4 / Review & Connect",
  render: () => <WizardStage stage="review" />,
};

/** Post-wizard: connection established successfully. */
export const Success: Story = {
  name: "Post-wizard / Success",
  render: () => <SuccessState />,
};

/** Post-wizard: connection failed — retry prompt. */
export const Error: Story = {
  name: "Post-wizard / Error",
  render: () => <ErrorState />,
};

/** Mobile 390px — Step 1: source grid collapses to single column. */
export const Mobile390: Story = {
  name: "Mobile / 390px — Select Sources",
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <WizardStage stage="sources" narrow />,
};

/** Tablet 768px — Step 4: ReviewPanel on tablet canvas. */
export const Tablet768: Story = {
  name: "Tablet / 768px — Review step",
  parameters: { viewport: { defaultViewport: "tablet" } },
  render: () => <WizardStage stage="review" />,
};
