import * as React from "react";
import { AnswerCard } from "./AnswerCard";
import { PulseMarker } from "./PulseMarker";
import { MetralyButton } from "./MetralyButton";
import { MetralyIcon } from "./MetralyIcon";
import type { EvidenceCitation } from "./AnswerCard";

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  evidence?: EvidenceCitation[];
  loading?: boolean;
}

export interface AIWorkspaceLayoutProps {
  messages: ChatMessage[];
  loading?: boolean;
  onSend: (text: string) => void;
  quickPrompts?: string[];
  disclaimer?: React.ReactNode;
  className?: string;
}

export function AIWorkspaceLayout({
  messages,
  loading = false,
  onSend,
  quickPrompts,
  disclaimer,
  className,
}: AIWorkspaceLayoutProps) {
  const [input, setInput] = React.useState("");
  const endRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  React.useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }, [messages, loading, prefersReducedMotion]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={["metraly-ai-workspace", className].filter(Boolean).join(" ")}
    >
      {/* Message log */}
      <div
        className="metraly-ai-workspace__log"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="metraly-ai-workspace__message metraly-ai-workspace__message--user">
              <div className="metraly-ai-workspace__bubble">{m.text}</div>
            </div>
          ) : (
            <div key={i} className="metraly-ai-workspace__message">
              <AnswerCard
                text={m.text}
                evidence={m.evidence}
                loading={m.loading}
              />
            </div>
          ),
        )}
        {loading && (
          <div className="metraly-ai-workspace__message">
            <AnswerCard text="" loading />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="metraly-ai-workspace__composer">
        <div className="metraly-ai-workspace__composer-shell">
          <div className="metraly-ai-workspace__composer-icon">
            <MetralyIcon name="sparkles" size="sm" color="var(--m-purple-500)" />
            <PulseMarker
              tone="live"
              size="sm"
              style={{ position: "absolute", top: -3, right: -3 }}
            />
          </div>
          <input
            className="metraly-ai-workspace__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your engineering metrics…"
            disabled={loading}
            aria-label="Ask AI Workspace"
          />
          <MetralyButton
            variant="primary"
            size="sm"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            Send
          </MetralyButton>
        </div>

        {quickPrompts && quickPrompts.length > 0 && (
          <div className="metraly-ai-workspace__prompt-row" role="list">
            {quickPrompts.map((q) => (
              <button
                key={q}
                type="button"
                role="listitem"
                className="metraly-ai-workspace__prompt"
                onClick={() => setInput(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {disclaimer && (
          <div className="metraly-ai-workspace__disclaimer">{disclaimer}</div>
        )}
      </div>
    </div>
  );
}

export default AIWorkspaceLayout;
