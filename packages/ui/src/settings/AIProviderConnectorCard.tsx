/**
 * AIProviderConnectorCard — single provider connector tile
 * ------------------------------------------------------------------
 * One card per AI provider (OpenAI-compatible, Anthropic-compatible,
 * local/self-hosted, custom endpoint). Sits inside
 * `Settings → AI Provider Connectors`.
 *
 * Honest provider state:
 *   not_configured | configured | testing | ready | auth_failed
 *   rate_limited   | disabled   | gated
 *
 * AI-type plugins MAY register additional cards by passing
 * `pluginAttribution`. Such cards are visually marked "via Plugin"
 * but use the same component.
 *
 * The card is presentational — caller wires up callbacks.
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StatusBadge } from "../components/StatusBadge";
import { TokenInput } from "../source/TokenInput";
import "../styles/metraly-settings.css";

export type AIProviderKind =
  | "openai-compatible"
  | "anthropic-compatible"
  | "local"
  | "custom";

export type AIProviderState =
  | "not_configured"
  | "configured"
  | "testing"
  | "ready"
  | "auth_failed"
  | "rate_limited"
  | "disabled"
  | "gated";

export interface AIProviderModel {
  id: string;
  /** Human label, e.g. "claude-sonnet-4.5". Mono. */
  label: string;
  /** Used to indicate latency / cost class. Free text. */
  meta?: string;
}

export interface AIProviderPluginAttribution {
  /** Plugin id rendered mono. */
  pluginId: string;
  pluginName: string;
}

export interface AIProviderConnectorCardProps {
  name: string;
  kind: AIProviderKind;
  state: AIProviderState;
  /** Optional short description. */
  description?: string;
  /** Endpoint URL — rendered mono, partially truncated for length. */
  endpoint?: string;
  /** Token state (delegated to TokenInput). */
  token?: {
    committed: boolean;
    maskedPreview?: string;
    onReplace?: () => void;
    onClear?: () => void;
    onChange?: (v: string) => void;
    validation?: React.ComponentProps<typeof TokenInput>["validation"];
    draftValue?: string;
  };
  /** Available models on this provider. */
  models?: AIProviderModel[];
  /** Currently routed-to model id. */
  defaultModelId?: string;

  /** Privacy boundary line, e.g. "Data stays in VPC". Optional. */
  privacy?: string;

  /** Plugin attribution for AI-type plugins. */
  pluginAttribution?: AIProviderPluginAttribution;

  /** Last test/audit timestamp. ISO. */
  lastTestedAt?: string;

  /** Action callbacks. */
  onTest?: () => void;
  onSetDefault?: () => void;
  onDisable?: () => void;
  onEnable?: () => void;

  /** Show inline token entry directly inside the card. Defaults to true. */
  showTokenEntry?: boolean;

  className?: string;
  id?: string;
}

const STATE_BADGE: Record<AIProviderState, { status: React.ComponentProps<typeof StatusBadge>["status"]; label: string }> = {
  not_configured: { status: "Preview", label: "Not configured" },
  configured:     { status: "Preview", label: "Configured" },
  testing:        { status: "Preview", label: "Testing" },
  ready:          { status: "Live",    label: "Ready" },
  auth_failed:    { status: "Error",   label: "Auth failed" },
  rate_limited:   { status: "Delayed", label: "Rate limited" },
  disabled:       { status: "Preview", label: "Disabled" },
  gated:          { status: "Preview", label: "Gated" },
};

const KIND_LABEL: Record<AIProviderKind, string> = {
  "openai-compatible": "OpenAI-compatible",
  "anthropic-compatible": "Anthropic-compatible",
  "local": "Local / self-hosted",
  "custom": "Custom endpoint",
};

function fmtTime(iso?: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

export const AIProviderConnectorCard: React.FC<AIProviderConnectorCardProps> = ({
  name,
  kind,
  state,
  description,
  endpoint,
  token,
  models,
  defaultModelId,
  privacy,
  pluginAttribution,
  lastTestedAt,
  onTest,
  onSetDefault,
  onDisable,
  onEnable,
  showTokenEntry = true,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const meta = STATE_BADGE[state];

  return (
    <CardShell>
      <article
        id={rootId}
        className={[
          "metraly-ai-provider",
          `metraly-ai-provider--${state}`,
          pluginAttribution ? "metraly-ai-provider--from-plugin" : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <header className="metraly-ai-provider__head">
          <div className="metraly-ai-provider__head-text">
            <div className="metraly-ai-provider__name-row">
              <span className="metraly-ai-provider__name">{name}</span>
              <span className="metraly-ai-provider__kind">{KIND_LABEL[kind]}</span>
              {pluginAttribution ? (
                <span className="metraly-ai-provider__plugin" title={pluginAttribution.pluginId}>
                  via Plugin · {pluginAttribution.pluginName}
                </span>
              ) : null}
            </div>
            {description ? <p className="metraly-ai-provider__desc">{description}</p> : null}
            {endpoint ? (
              <code className="metraly-ai-provider__endpoint" title={endpoint}>{endpoint}</code>
            ) : null}
          </div>
          <StatusBadge status={meta.status} label={meta.label} />
        </header>

        {showTokenEntry && token ? (
          <div className="metraly-ai-provider__token">
            <TokenInput
              label="API token"
              kind={kind === "anthropic-compatible" ? "provider-token" : kind === "openai-compatible" ? "provider-token" : "api-key"}
              committed={token.committed}
              maskedPreview={token.maskedPreview}
              value={token.draftValue}
              onChange={token.onChange}
              onClear={token.onClear}
              onReplace={token.onReplace}
              validation={token.validation}
            />
          </div>
        ) : null}

        {models && models.length > 0 ? (
          <div className="metraly-ai-provider__models" aria-label="available models">
            <span className="metraly-ai-provider__models-label">Models</span>
            <ul className="metraly-ai-provider__models-list">
              {models.map((m) => {
                const isDefault = m.id === defaultModelId;
                return (
                  <li
                    key={m.id}
                    className={[
                      "metraly-ai-provider__model",
                      isDefault ? "metraly-ai-provider__model--default" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="metraly-ai-provider__model-label">{m.label}</span>
                    {m.meta ? <span className="metraly-ai-provider__model-meta">{m.meta}</span> : null}
                    {isDefault ? (
                      <span className="metraly-ai-provider__model-default-tag">default</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {privacy ? (
          <p className="metraly-ai-provider__privacy">
            <span className="metraly-ai-provider__privacy-label">Privacy</span>
            <span className="metraly-ai-provider__privacy-text">{privacy}</span>
          </p>
        ) : null}

        <footer className="metraly-ai-provider__footer">
          <span className="metraly-ai-provider__audit">
            <span className="metraly-ai-provider__audit-label">Last tested</span>
            <span className="metraly-ai-provider__audit-time">{fmtTime(lastTestedAt)}</span>
          </span>
          <div className="metraly-ai-provider__actions">
            {state === "disabled" && onEnable ? (
              <button type="button" className="metraly-ai-provider__btn" onClick={onEnable}>
                Enable
              </button>
            ) : null}
            {state !== "disabled" && state !== "gated" && onDisable ? (
              <button type="button" className="metraly-ai-provider__btn metraly-ai-provider__btn--ghost" onClick={onDisable}>
                Disable
              </button>
            ) : null}
            {state === "ready" && onSetDefault ? (
              <button type="button" className="metraly-ai-provider__btn" onClick={onSetDefault}>
                Set as default
              </button>
            ) : null}
            {state !== "gated" && state !== "disabled" && onTest ? (
              <button
                type="button"
                className="metraly-ai-provider__btn metraly-ai-provider__btn--primary"
                onClick={onTest}
                disabled={state === "testing"}
              >
                {state === "testing" ? "Testing…" : "Test"}
              </button>
            ) : null}
          </div>
        </footer>
      </article>
    </CardShell>
  );
};

AIProviderConnectorCard.displayName = "AIProviderConnectorCard";
export default AIProviderConnectorCard;
