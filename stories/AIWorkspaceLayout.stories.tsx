import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { CardShell, StateBlock } from '@metraly/ui';

// ---------------------------------------------------------------------------
// Placeholder component — real implementation ships in Phase 9
// ---------------------------------------------------------------------------

const CHAT_PLACEHOLDER_MESSAGES = [
  { role: 'assistant' as const, text: 'Hi! Ask me about your engineering metrics, build trends, team health, or deployment patterns.' },
  { role: 'user' as const, text: 'What is the current CI pass rate?' },
  { role: 'assistant' as const, text: 'CI success rate is 92.4% over the last 7 days — 2.1% above the rolling average.' },
];

interface PlaceholderMessage {
  role: 'user' | 'assistant';
  text: string;
}

function AIWorkspaceLayoutPlaceholder({
  messages = CHAT_PLACEHOLDER_MESSAGES,
  loading = false,
  empty = false,
}: {
  messages?: PlaceholderMessage[];
  loading?: boolean;
  empty?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 560,
        background: 'var(--m-bg-0)',
        borderRadius: 'var(--m-radius-md)',
        border: '1px solid var(--m-line)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--m-line-faint)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'color-mix(in oklab, var(--m-bg-1) 80%, var(--m-bg-0))',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'color-mix(in oklab, var(--m-cyan-500) 15%, var(--m-bg-2))',
            border: '1px solid color-mix(in oklab, var(--m-cyan-500) 30%, var(--m-line))',
            display: 'grid',
            placeItems: 'center',
            fontSize: 14,
          }}
        >
          ✦
        </div>
        <span style={{ fontSize: 'var(--m-fs-13)', fontWeight: 600, color: 'var(--m-fg-0)' }}>AI Workspace</span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 'var(--m-fs-10)',
            color: 'var(--m-fg-3)',
            fontFamily: 'var(--m-font-mono)',
            background: 'var(--m-bg-2)',
            padding: '2px 8px',
            borderRadius: 999,
            border: '1px solid var(--m-line-faint)',
          }}
        >
          Phase 9 · AIWorkspaceLayout
        </span>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {empty ? (
          <StateBlock
            variant="empty"
            title="No messages yet"
            description="Ask a question about your engineering metrics to get started."
          />
        ) : loading ? (
          <StateBlock variant="loading" title="AI is thinking…" />
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  flexShrink: 0,
                  background:
                    m.role === 'assistant'
                      ? 'color-mix(in oklab, var(--m-cyan-500) 12%, var(--m-bg-2))'
                      : 'var(--m-bg-3)',
                  border: '1px solid var(--m-line)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 11,
                  color: m.role === 'assistant' ? 'var(--m-cyan-500)' : 'var(--m-fg-2)',
                }}
              >
                {m.role === 'assistant' ? '✦' : 'JD'}
              </div>
              <div
                style={{
                  maxWidth: '72%',
                  background: m.role === 'assistant' ? 'var(--m-bg-1)' : 'color-mix(in oklab, var(--m-cyan-500) 8%, var(--m-bg-2))',
                  border: '1px solid var(--m-line-faint)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 'var(--m-fs-12)',
                  color: 'var(--m-fg-1)',
                  lineHeight: 1.6,
                }}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--m-line-faint)',
          background: 'color-mix(in oklab, var(--m-bg-1) 80%, var(--m-bg-0))',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            background: 'var(--m-bg-2)',
            border: '1px solid var(--m-line)',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 'var(--m-fs-12)',
            color: 'var(--m-fg-3)',
          }}
        >
          Ask about your engineering metrics…
        </div>
        <div
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            background: 'var(--m-cyan-500)',
            color: 'var(--m-bg-0)',
            fontSize: 'var(--m-fs-11)',
            fontWeight: 600,
          }}
        >
          Send
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Scenarios/AIWorkspaceLayout',
  parameters: { layout: 'padded' },
};

export default meta;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default: populated conversation thread. */
export const Default: StoryObj = {
  render: () => <AIWorkspaceLayoutPlaceholder />,
};

/** Loading: AI is computing a response. */
export const Loading: StoryObj = {
  render: () => <AIWorkspaceLayoutPlaceholder loading />,
};

/** Empty: session start, no messages yet. */
export const Empty: StoryObj = {
  render: () => <AIWorkspaceLayoutPlaceholder empty />,
};
