import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCard,
  MetralyCodeBlock,
  MetralyIcon,
  ReviewPanel,
  StickyWizardFooter,
  WizardLayout,
} from "@metraly/ui";
import type { WizardLayoutStep } from "@metraly/ui";

type ConnectionStage = "sources" | "preview" | "configure" | "review";
type WizardStoryMode = "desktop" | "tablet" | "mobile";

// ─── Source catalog fixture ───────────────────────────────────────────────────

const sourceCatalog = [
  { id: "github", label: "GitHub", icon: "github" as const, note: "Synthetic repo, PR, and CI preview" },
  { id: "jira", label: "Jira", icon: "jira" as const, note: "Synthetic issues, sprints, and backlog preview" },
  { id: "gitlab", label: "GitLab", icon: "gitlab" as const, note: "Synthetic merge request and pipeline preview" },
  { id: "linear", label: "Linear", icon: "arrowRight" as const, note: "Synthetic projects, cycles, and issue preview" },
  { id: "slack", label: "Slack", icon: "sparkles" as const, note: "Synthetic team communication preview" },
  { id: "pagerduty", label: "PagerDuty", icon: "alertTri" as const, note: "Synthetic incident and on-call preview" },
];

const sideRailSteps: WizardLayoutStep[] = [
  { id: "sources", label: "Choose sources", status: "done", detail: "GitHub selected" },
  { id: "auth", label: "Connect auth", status: "current", detail: "Waiting for provider token" },
  { id: "review", label: "Review setup", status: "next", detail: "Confirm workspace mapping" },
];

function connectionStepsFor(stage: ConnectionStage): WizardLayoutStep[] {
  const order = ["sources", "preview", "configure", "review"] as const;
  const currentIndex = order.indexOf(stage);
  return [
    { id: "sources", label: "Select Sources", detail: "Choose mock providers" },
    { id: "preview", label: "Preview Connection", detail: "Synthetic auth check" },
    { id: "configure", label: "Configure", detail: "Demo settings" },
    { id: "review", label: "Review", detail: "Confirm setup" },
  ].map((step, index) => ({
    ...step,
    status: (index < currentIndex ? "done" : index === currentIndex ? "current" : "next") as WizardLayoutStep["status"],
  }));
}

// ─── Step content helpers ─────────────────────────────────────────────────────

function SetupNotice() {
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: "var(--m-r-3)",
        border: "1px solid var(--m-line)",
        background: "var(--m-bg-2)",
        color: "var(--m-fg-3)",
        fontSize: "var(--m-fs-10)",
        lineHeight: 1.5,
      }}
    >
      <strong style={{ color: "var(--m-fg-2)" }}>Synthetic preview</strong>{" "}
      No real data sources are contacted. This demo uses preloaded synthetic telemetry.
    </div>
  );
}

function SourceSelectionStep({ mode }: { mode: WizardStoryMode }) {
  const cols = mode === "desktop" ? 2 : 1;
  const sources = sourceCatalog.slice(0, cols === 1 ? 3 : 4);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SetupNotice />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 8 }}>
        {sources.map((source, i) => (
          <div
            key={source.id}
            style={{
              padding: 14,
              borderRadius: "var(--m-r-4)",
              border: i === 0 ? "2px solid var(--m-cyan-500)" : "1px solid var(--m-line-faint)",
              background: i === 0
                ? "color-mix(in oklab, var(--m-cyan-500) 9%, var(--m-bg-2))"
                : "var(--m-bg-1)",
              display: "grid",
              gridTemplateColumns: "auto minmax(0, 1fr)",
              alignItems: "center",
              gap: 10,
            }}
          >
            <MetralyIcon name={source.icon} size="sm" />
            <div>
              <strong style={{ display: "block", color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 700 }}>
                {source.label}
              </strong>
              <small style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                {source.note}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewConnectionStep() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SetupNotice />
      <MetralyCodeBlock accent="primary">
        {"$ metraly connect github --org acme-corp\n✓ Synthetic token validated (demo mode)\n✓ Repository list loaded — 12 repos simulated\n  Waiting for webhook configuration..."}
      </MetralyCodeBlock>
    </div>
  );
}

function ConfigureStep() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SetupNotice />
      <div style={{ display: "grid", gap: 6 }}>
        {[
          { label: "Workspace name", value: "acme-core" },
          { label: "Sync frequency", value: "Every 15 minutes" },
          { label: "Backfill period", value: "90 days" },
          { label: "Delivery telemetry", value: "Enabled" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              borderRadius: "var(--m-r-3)",
              border: "1px solid var(--m-line-faint)",
              background: "var(--m-bg-1)",
            }}
          >
            <span style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 600 }}>{label}</span>
            <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-10)" }}>
              {value} <MetralyIcon name="chevronDown" size="xs" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function stageContent(stage: ConnectionStage, mode: WizardStoryMode) {
  if (stage === "preview") return <PreviewConnectionStep />;
  if (stage === "configure") return <ConfigureStep />;
  return <SourceSelectionStep mode={mode} />;
}

function stageReview(stage: ConnectionStage) {
  if (stage !== "review") return undefined;
  return (
    <ReviewPanel
      title="Synthetic preview ready"
      description="No real repositories are indexed in this demo. Synthetic metrics and sample activity are preloaded."
      items={sourceCatalog.slice(0, 2).map((source) => ({
        id: source.id,
        icon: <MetralyIcon name={source.icon} size="sm" />,
        label: source.label,
        value: source.note,
        badgeState: "preview" as const,
        badgeLabel: "Simulated",
      }))}
    />
  );
}

function stageCopy(stage: ConnectionStage) {
  if (stage === "preview") {
    return {
      title: "Preview connection",
      description: "No real authorization is performed. This step only simulates a connector flow.",
      badge: <MetralyBadge variant="info">simulation</MetralyBadge>,
      primary: "Continue →",
    };
  }
  if (stage === "configure") {
    return {
      title: "Configure synthetic demo settings",
      description: "These controls change the preview UI only. They do not configure real sync jobs.",
      badge: <MetralyBadge variant="info">demo settings</MetralyBadge>,
      primary: "Continue →",
    };
  }
  if (stage === "review") {
    return {
      title: "Review synthetic setup",
      description: "Synthetic setup is ready. Demo metrics are already preloaded.",
      badge: <MetralyBadge variant="success">ready</MetralyBadge>,
      primary: "Go to Dashboard",
    };
  }
  return {
    title: "Choose synthetic demo sources",
    description: "Select mock sources for this synthetic preview. No real data source is contacted.",
    badge: <MetralyBadge variant="info">public demo</MetralyBadge>,
    primary: "Continue →",
  };
}

// ─── Composite story component ────────────────────────────────────────────────

function WizardLayoutStory({
  stage = "sources",
  mode = "desktop",
}: {
  stage?: ConnectionStage;
  mode?: WizardStoryMode;
}) {
  const copy = stageCopy(stage);
  return (
    <WizardLayout
      steps={connectionStepsFor(stage)}
      eyebrow="Connector setup preview"
      title={copy.title}
      description={copy.description}
      contentWidth={760}
      currentStepBadge={copy.badge}
      review={stageReview(stage)}
      footer={
        <StickyWizardFooter
          back={
            stage !== "sources" ? (
              <MetralyButton variant="ghost">Back</MetralyButton>
            ) : undefined
          }
          primary={
            <MetralyButton variant={stage === "review" ? "secondary" : "primary"}>
              {copy.primary}
            </MetralyButton>
          }
        />
      }
    >
      {stage !== "review" ? stageContent(stage, mode) : null}
    </WizardLayout>
  );
}

// ─── Side rail reference story ────────────────────────────────────────────────

function SideRailReferenceStory() {
  return (
    <WizardLayout
      steps={sideRailSteps}
      eyebrow="Onboarding"
      title="Connect your delivery sources"
      description="Source selection assembled from current seams with progressPlacement='side'."
      progressPlacement="side"
      contentWidth={960}
      headerActions={
        <MetralyButton variant="secondary" size="sm" iconLeft={<MetralyIcon name="refresh" size="sm" />}>
          Test connection
        </MetralyButton>
      }
      currentStepBadge={<MetralyBadge variant="success">current step</MetralyBadge>}
      review={
        <ReviewPanel
          title="Review snapshot"
          description="GitHub will stream delivery telemetry into acme-core after auth completes."
          items={[
            {
              id: "source",
              icon: <MetralyIcon name="github" size="sm" />,
              label: "GitHub",
              value: "Synthetic repo, PR, and CI preview",
              badgeState: "preview",
              badgeLabel: "next step",
            },
          ]}
        />
      }
      footer={
        <StickyWizardFooter
          back={<MetralyButton variant="ghost">Back</MetralyButton>}
          primary={<MetralyButton variant="primary">Continue</MetralyButton>}
        />
      }
    >
      <div
        style={{
          display: "grid",
          gap: 10,
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          alignItems: "start",
        }}
      >
        {sourceCatalog.slice(0, 3).map((source, i) => (
          <MetralyCard
            key={source.id}
            density="compact"
            title={source.label}
            subtitle={source.note}
            icon={<MetralyIcon name={source.icon} size="md" />}
            state={i === 0 ? "selected" : "default"}
            footer={
              <MetralyButton variant={i === 0 ? "primary" : "ghost"} size="sm">
                {i === 0 ? "Selected" : "Choose"}
              </MetralyButton>
            }
          >
            <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
              Choice-card recipe using MetralyCard — no onboarding-specific primitive needed.
            </div>
          </MetralyCard>
        ))}
      </div>
    </WizardLayout>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof WizardLayout> = {
  title: "Components/WizardLayout",
  component: WizardLayout,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof WizardLayout>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <WizardLayoutStory stage="sources" />,
};

export const PreviewConnection: Story = {
  render: () => <WizardLayoutStory stage="preview" />,
};

export const Configure: Story = {
  render: () => <WizardLayoutStory stage="configure" />,
};

export const Review: Story = {
  render: () => <WizardLayoutStory stage="review" />,
};

export const Tablet: Story = {
  parameters: { viewport: { defaultViewport: "tablet" } },
  render: () => <WizardLayoutStory stage="sources" mode="tablet" />,
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <WizardLayoutStory stage="sources" mode="mobile" />,
};

export const MobileReview: Story = {
  name: "Mobile / Review step",
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <WizardLayoutStory stage="review" mode="mobile" />,
};

export const Narrow320: Story = {
  name: "Narrow / 320px",
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <WizardLayoutStory stage="sources" mode="mobile" />
    </div>
  ),
};

export const SideRailReference: Story = {
  name: "Side rail / progressPlacement='side'",
  render: () => <SideRailReferenceStory />,
};

export const Desktop1024: Story = {
  name: "Desktop / 1024px",
  parameters: { viewport: { defaultViewport: "tablet" } },
  render: () => <WizardLayoutStory stage="configure" />,
};

export const Desktop1280: Story = {
  name: "Desktop / 1280px",
  render: () => <WizardLayoutStory stage="review" />,
};
