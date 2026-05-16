import React, { useState } from "react";
import "../styles/metraly-app-kit.css";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { MetralyButton } from "../components/MetralyButton";
import { StatusBadge, type StatusBadgeStatus } from "../components/StatusBadge";

export interface PluginsScreenPlugin {
  id: string;
  name: string;
  category: string;
  initials: string;
  /** Must be a --m-* token value string like 'var(--m-cyan-500)' */
  iconColor: string;
  description: string;
  installed?: boolean;
  status: "Live" | "Preview" | "Gated" | "Designed";
}

export interface AppPluginsScreenProps {
  /** Override the default plugin list */
  plugins?: PluginsScreenPlugin[];
  brandName?: string;
  className?: string;
}

const DEFAULT_PLUGINS: PluginsScreenPlugin[] = [
  { id: "github",    name: "GitHub",     category: "Sources",   initials: "GH", iconColor: "var(--m-fg-3)",       description: "Pull repository, PR, and review data.",              installed: true,  status: "Live" },
  { id: "gitlab",    name: "GitLab",     category: "Sources",   initials: "GL", iconColor: "var(--m-err)",        description: "Pull project, MR, and pipeline data.",              installed: false, status: "Live" },
  { id: "jira",      name: "Jira",       category: "Sources",   initials: "JI", iconColor: "var(--m-cyan-500)",   description: "Sync issues, sprints, and cycle time.",             installed: false, status: "Live" },
  { id: "linear",    name: "Linear",     category: "Sources",   initials: "LR", iconColor: "var(--m-purple-500)", description: "Sync issues and cycle metrics.",                     installed: false, status: "Preview" },
  { id: "pagerduty", name: "PagerDuty",  category: "Alerts",    initials: "PD", iconColor: "var(--m-ok)",         description: "Stream incidents into MTTR & risk widgets.",        installed: true,  status: "Live" },
  { id: "slack",     name: "Slack",      category: "Exporters", initials: "SL", iconColor: "var(--m-purple-700)", description: "Send alerts, weekly digests, AI summaries.",        installed: false, status: "Live" },
  { id: "claude",    name: "Claude BYO", category: "AI",        initials: "CL", iconColor: "var(--m-purple-500)", description: "Bring your own Anthropic key for AI Workspace.",   installed: false, status: "Designed" },
  { id: "ollama",    name: "Ollama",     category: "AI",        initials: "OL", iconColor: "var(--m-cyan-500)",   description: "Run inference fully on-host. BYO model.",          installed: false, status: "Gated" },
];

const CATEGORIES = ["All", "Sources", "AI", "Alerts", "Exporters"] as const;

const STATUS_BADGE_MAP: Record<PluginsScreenPlugin["status"], StatusBadgeStatus> = {
  Live: "Live",
  Preview: "Preview",
  Gated: "Gated",
  Designed: "Preview",
};

export function AppPluginsScreen({
  plugins = DEFAULT_PLUGINS,
  brandName,
  className,
}: AppPluginsScreenProps): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const visible = activeCategory === "All"
    ? plugins
    : plugins.filter((p) => p.category === activeCategory);

  return (
    <div className={["metraly-app-shell", className].filter(Boolean).join(" ")}>
      <div className="metraly-app-shell__sidebar">
        <AppSidebar activeId="plugins" brandName={brandName} />
      </div>
      <div className="metraly-app-shell__topbar">
        <AppTopbar title="Plugins" />
      </div>
      <main className="metraly-app-shell__main">
        <div className="metraly-app-filter-bar">
          <div className="metraly-app-seg" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={["metraly-app-seg__btn", activeCategory === cat ? "is-active" : ""].filter(Boolean).join(" ")}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="metraly-app-plugin-grid">
          {visible.map((plugin) => (
            <article key={plugin.id} className="metraly-app-plugin-card">
              <div className="metraly-app-plugin-head">
                <div
                  className="metraly-app-plugin-icon"
                  style={{ background: plugin.iconColor, color: "var(--m-bg-0)" }}
                  aria-hidden="true"
                >
                  {plugin.initials}
                </div>
                <div>
                  <div className="metraly-app-plugin-meta__name">{plugin.name}</div>
                  <div className="metraly-app-plugin-meta__cat">{plugin.category}</div>
                </div>
              </div>
              <p className="metraly-app-plugin-desc">{plugin.description}</p>
              <div className="metraly-app-plugin-foot">
                <StatusBadge status={STATUS_BADGE_MAP[plugin.status]} />
                {plugin.installed ? (
                  <MetralyButton variant="secondary" size="sm">Manage</MetralyButton>
                ) : (
                  <MetralyButton variant="primary" size="sm">Install</MetralyButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AppPluginsScreen;
