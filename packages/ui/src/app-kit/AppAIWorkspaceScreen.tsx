import React, { useState } from "react";
import "../styles/metraly-app-kit.css";
import {
  AIWorkspaceLayout,
  type ChatMessage,
} from "../components/AIWorkspaceLayout";
import { AppSidebar, type AppSidebarNavSection } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_SECTIONS: AppSidebarNavSection[] = [
  {
    label: "Dashboards",
    items: [
      { id: "dashboard",   icon: "home",       label: "Overview" },
      { id: "dash-vp",     icon: "trendingUp", label: "VP Engineering" },
      { id: "dash-tl",     icon: "gitPR",      label: "Tech Lead" },
      { id: "dash-devops", icon: "cpu",        label: "DevOps / SRE" },
      { id: "dash-ic",     icon: "activity",   label: "My Dashboard" },
      { id: "dash-wizard", icon: "plus",       label: "New dashboard", variant: "accent" as const },
    ],
  },
  {
    label: "Analytics",
    items: [
      { id: "metrics", icon: "bar2",  label: "Metrics Explorer" },
      { id: "ai",      icon: "brain", label: "AI Workspace", active: true, badge: "preview" as const },
    ],
  },
  {
    label: "Configure",
    items: [
      { id: "plugins",    icon: "puzzle", label: "Plugins",    badge: "gated" as const },
      { id: "connectors", icon: "link",   label: "Connectors" },
    ],
  },
  {
    label: "System",
    items: [{ id: "settings", icon: "settings", label: "Settings" }],
  },
];

const DEFAULT_USER = { initials: "JD", name: "Jamie Dev", role: "Admin" };

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    role: "user",
    text: "Why did our PR throughput drop this sprint?",
  },
  {
    role: "assistant",
    text: "Review queue time increased this sprint. The likely bottleneck is two reviewers on Payments-team carrying ~64% of the review load. Cycle-time p50 grew from 14h to 22h while open PRs stayed flat.",
    evidence: [
      { metricId: "queue-p50", label: "Review queue p50",   value: "22h",               trend: "up" },
      { metricId: "load",      label: "Reviewer load",      value: "64% on 2 reviewers", trend: "up" },
      { metricId: "open-prs",  label: "Open PRs",           value: "31",                trend: "neutral" },
      { metricId: "cycle-p50", label: "Cycle time p50",     value: "2h 14m",            trend: "up" },
    ],
  },
];

const DEFAULT_QUICK_PROMPTS = [
  "What changed in MTTR this week?",
  "Who reviews most PRs on Payments?",
  "Show flaky tests blocking merges.",
];

// ─── AppAIWorkspaceScreen ─────────────────────────────────────────────────────

export interface AppAIWorkspaceScreenProps {
  /** Initial messages. Defaults to a demo conversation. */
  initialMessages?: ChatMessage[];
  /** Quick prompts. Defaults to 3 demo prompts. */
  quickPrompts?: string[];
  /** Brand name in sidebar */
  brandName?: string;
  className?: string;
}

export function AppAIWorkspaceScreen({
  initialMessages,
  quickPrompts = DEFAULT_QUICK_PROMPTS,
  brandName = "Metraly",
  className,
}: AppAIWorkspaceScreenProps): React.ReactElement {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages ?? DEFAULT_MESSAGES,
  );

  function handleSend(text: string): void {
    const userMsg: ChatMessage = { role: "user", text };
    const assistantMsg: ChatMessage = {
      role: "assistant",
      text: "Synthetic answer — connect a live data source for real insights.",
      evidence: [],
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  }

  return (
    <div className={["metraly-app-shell", className].filter(Boolean).join(" ")}>
      <div className="metraly-app-shell__sidebar">
        <AppSidebar
          brandName={brandName}
          sections={DEFAULT_SECTIONS}
          activeId="ai"
          user={DEFAULT_USER}
        />
      </div>
      <div className="metraly-app-shell__topbar">
        <AppTopbar
          title="AI Workspace"
          subtitle="Ask questions about your engineering metrics"
          searchPlaceholder="Search metrics, dashboards, plugins…"
          notifCount={2}
          onRefresh={() => {}}
        />
      </div>
      <main className="metraly-app-shell__main">
        <AIWorkspaceLayout
          messages={messages}
          onSend={handleSend}
          quickPrompts={quickPrompts}
        />
      </main>
    </div>
  );
}

export default AppAIWorkspaceScreen;
