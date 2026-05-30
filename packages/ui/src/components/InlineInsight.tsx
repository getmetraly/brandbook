/**
 * InlineInsight — minimal inline AI hint
 * ------------------------------------------------------------------
 * The smallest AI-insight affordance: a single-line, purple-tinted
 * banner with a sparkles glyph, a short text, and an optional inline
 * text action. Used inside widgets, side panels and metric rows where
 * a full AIInsightCard would be too heavy.
 *
 * Stateless + controlled (zustand-friendly); forwards its ref and
 * spreads `...rest` so it composes directly with @dnd-kit and
 * react-grid-layout.
 *
 * Prop shape mirrors the legacy app `InlineInsight` so the brandbook
 * cutover is a one-line import swap.
 */
import * as React from "react";
import { MetralyIcon } from "./MetralyIcon";
import "../styles/metraly-ai-insight.css";

export interface InlineInsightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The insight text. */
  text: string;
  /** Optional inline action label. Omit to hide the action. */
  action?: string;
  /** Invoked when the action is clicked. */
  onAction?: () => void;
}

export const InlineInsight = React.forwardRef<HTMLDivElement, InlineInsightProps>(
  function InlineInsight({ text, action, onAction, className, ...rest }, ref) {
    return (
      <div
        {...rest}
        ref={ref}
        className={["metraly-inline-insight", className].filter(Boolean).join(" ")}
      >
        <span className="metraly-inline-insight__icon" aria-hidden="true">
          <MetralyIcon name="sparkles" size="xs" />
        </span>
        <div className="metraly-inline-insight__body">
          <p className="metraly-inline-insight__text">{text}</p>
          {action ? (
            <button type="button" className="metraly-inline-insight__action" onClick={onAction}>
              {action}
              <MetralyIcon name="arrowRight" size="xs" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>
    );
  },
);

InlineInsight.displayName = "InlineInsight";

export default InlineInsight;
