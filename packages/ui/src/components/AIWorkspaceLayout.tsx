import * as React from "react";
import { AnswerCard } from "./AnswerCard";
import { PulseMarker } from "./PulseMarker";
import { MetralyInput } from "./MetralyInput";
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
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "instant" : "smooth" });
  }, [messages, loading, prefersReducedMotion]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={["metraly-ai-workspace", className].filter(Boolean).join(" ")}
      style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}
    >
      <div
        style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 14 }}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ maxWidth: "70%", background: "var(--m-bg-1, var(--glass))", border: "1px solid var(--m-line, var(--border))", borderRadius: "12px 12px 3px 12px", padding: "10px 14px", fontSize: "var(--m-fs-13, 13px)", color: "var(--m-fg-0, var(--text))", lineHeight: 1.55 }}>
                {m.text}
              </div>
            </div>
          ) : (
            <AnswerCard key={i} text={m.text} evidence={m.evidence} loading={m.loading} />
          )
        )}
        {loading && <AnswerCard text="" loading />}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "14px 28px", borderTop: "1px solid var(--m-line, var(--border))", background: "var(--m-bg-0, transparent)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", background: "var(--m-bg-1, var(--glass))", border: "1px solid var(--m-line, var(--border))", borderRadius: 12, padding: "6px 14px" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <MetralyIcon name="sparkles" size="sm" color="var(--m-purple, var(--purple))" />
            <PulseMarker tone="live" size="sm" style={{ position: "absolute", top: -3, right: -3 }} />
          </div>
          <MetralyInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown as React.KeyboardEventHandler<HTMLInputElement>}
            placeholder="Ask about your engineering metrics…"
            disabled={loading}
            style={{ flex: 1, background: "none", border: "none", outline: "none", boxShadow: "none", padding: "8px 0", fontSize: "var(--m-fs-13, 13px)" }}
          />
          <MetralyButton variant="primary" size="sm" onClick={handleSend} disabled={loading || !input.trim()}>
            Send
          </MetralyButton>
        </div>
        {quickPrompts && quickPrompts.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {quickPrompts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setInput(q)}
                style={{ background: "var(--m-bg-1, rgba(255,255,255,0.05))", border: "1px solid var(--m-line, var(--border))", borderRadius: 14, padding: "4px 12px", fontSize: "var(--m-fs-11, 11px)", color: "var(--m-fg-2, var(--muted2))", cursor: "pointer" }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {disclaimer && (
          <div style={{ textAlign: "center", marginTop: 8, fontSize: "var(--m-fs-11, 11px)", color: "var(--m-fg-3, var(--muted))" }}>
            {disclaimer}
          </div>
        )}
      </div>
    </div>
  );
}
export default AIWorkspaceLayout;
