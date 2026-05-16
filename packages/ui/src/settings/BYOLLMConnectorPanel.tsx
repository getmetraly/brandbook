/**
 * BYOLLMConnectorPanel — Settings → AI Provider Connectors panel
 * ------------------------------------------------------------------
 * Composite panel that lists the workspace's BYO LLM provider cards.
 *
 * Product rule (enforced visually + structurally here):
 *   - BYO LLM lives under Settings → AI Provider Connectors ONLY.
 *   - AI-type plugins register provider cards into this same panel
 *     via `pluginContributedProviders`. They are listed together with
 *     first-party providers but tagged "via Plugin".
 *   - This panel never doubles as a marketplace.
 *
 * Composes: SettingsSection + AIProviderConnectorCard.
 */
import * as React from "react";
import { SettingsSection } from "./SettingsSection";
import {
  AIProviderConnectorCard,
  type AIProviderConnectorCardProps,
} from "./AIProviderConnectorCard";
import { StateBlock } from "../components/StateBlock";
import "../styles/metraly-settings.css";

export interface BYOLLMProviderEntry extends AIProviderConnectorCardProps {
  /** Stable id; used as React key. */
  providerId: string;
}

export interface BYOLLMConnectorPanelProps {
  /** First-party providers configured by the workspace. */
  providers: BYOLLMProviderEntry[];
  /** Provider cards contributed by installed AI-type plugins. */
  pluginContributedProviders?: BYOLLMProviderEntry[];
  /** Routing/policy summary string (e.g. "Routes Claude → primary"). */
  routingSummary?: string;
  /** Data boundary summary string (e.g. "Workspace VPC, region eu-west-1"). */
  privacySummary?: string;
  /** Empty-state primary action label, e.g. "Add a provider". */
  onAddProvider?: () => void;
  className?: string;
  id?: string;
}

export const BYOLLMConnectorPanel: React.FC<BYOLLMConnectorPanelProps> = ({
  providers,
  pluginContributedProviders,
  routingSummary,
  privacySummary,
  onAddProvider,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;

  const total = providers.length + (pluginContributedProviders?.length ?? 0);
  const isEmpty = total === 0;
  const ready = providers.filter((p) => p.state === "ready").length;

  return (
    <div
      id={rootId}
      className={["metraly-byo", className ?? ""].filter(Boolean).join(" ")}
    >
      <SettingsSection
        title="AI Provider Connectors"
        description="Bring your own LLM. Providers configured here power AI Workspace and AI-grounded insights. AI-type plugins may register additional providers; they will appear in this section, tagged via Plugin."
        badge={
          isEmpty
            ? { status: "Preview", label: "Not configured" }
            : ready > 0
              ? { status: "Live", label: `${ready} ready` }
              : { status: "Delayed", label: "Needs attention" }
        }
        actions={
          onAddProvider ? (
            <button
              type="button"
              className="metraly-byo__add"
              onClick={onAddProvider}
            >
              Add provider
            </button>
          ) : undefined
        }
      >
        {routingSummary || privacySummary ? (
          <ul className="metraly-byo__summary">
            {routingSummary ? (
              <li className="metraly-byo__summary-row">
                <span className="metraly-byo__summary-key">Routing</span>
                <span className="metraly-byo__summary-val">{routingSummary}</span>
              </li>
            ) : null}
            {privacySummary ? (
              <li className="metraly-byo__summary-row">
                <span className="metraly-byo__summary-key">Privacy</span>
                <span className="metraly-byo__summary-val">{privacySummary}</span>
              </li>
            ) : null}
          </ul>
        ) : null}

        {isEmpty ? (
          <StateBlock
            variant="empty"
            title="No AI providers configured"
            description="Add an OpenAI-compatible, Anthropic-compatible, local, or custom-endpoint provider. AI Workspace features will activate once a provider is set as default."
            action={onAddProvider ? <button type="button" className="metraly-focus-ring" onClick={onAddProvider}>Add provider</button> : undefined}
          />
        ) : (
          <>
            {providers.length > 0 ? (
              <div className="metraly-byo__group">
                <span className="metraly-byo__group-label">Workspace providers</span>
                <ul className="metraly-byo__list">
                  {providers.map((p) => (
                    <li key={p.providerId} className="metraly-byo__list-item">
                      <AIProviderConnectorCard {...p} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {pluginContributedProviders && pluginContributedProviders.length > 0 ? (
              <div className="metraly-byo__group">
                <span className="metraly-byo__group-label">Plugin-contributed</span>
                <ul className="metraly-byo__list">
                  {pluginContributedProviders.map((p) => (
                    <li key={p.providerId} className="metraly-byo__list-item">
                      <AIProviderConnectorCard {...p} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </SettingsSection>
    </div>
  );
};

BYOLLMConnectorPanel.displayName = "BYOLLMConnectorPanel";

export default BYOLLMConnectorPanel;
