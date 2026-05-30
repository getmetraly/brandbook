/**
 * AIInsightCard — AI-authored insight surface
 * ------------------------------------------------------------------
 * A compact, attention-drawing card used inline on dashboards and
 * metric pages to surface a single AI-generated observation with an
 * optional follow-up action.
 *
 * Distinct from:
 *   - InsightCard  — the rules/anomaly/trend product insight surface
 *                    with evidence + confidence (honest, framed).
 *   - AnswerCard   — the conversational AI-workspace answer block.
 *
 * AIInsightCard is intentionally light: a sparkles avatar with a live
 * pulse dot, a title + "AI" tag, a body line, and one ghost action.
 *
 * Composition / library support:
 *   - Stateless and fully controlled → drives cleanly from zustand.
 *   - Forwards its ref and spreads `...rest` onto the root <article>,
 *     so it can be used directly as a @dnd-kit sortable node
 *     (`ref={setNodeRef} {...attributes} {...listeners}`) or a
 *     react-grid-layout grid item without an extra wrapper.
 *
 * Prop shape stays compatible with the legacy app `AIInsightCard`
 * so the brandbook cutover is a one-line import swap.
 */
import * as React from "react";
import { MetralyIcon } from "./MetralyIcon";
import "../styles/metraly-ai-insight.css";

export interface AIInsightCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Insight headline. */
  title: string;
  /** One- or two-sentence body of the insight. */
  body: string;
  /** Optional action button label. Omit to hide the button. */
  action?: string;
  /** Invoked when the action button is clicked. */
  onAction?: () => void;
  /** Animate the live dot. Honors `[data-pulse="off"]`. Default true. */
  pulse?: boolean;
}

export const AIInsightCard = React.forwardRef<HTMLElement, AIInsightCardProps>(
  function AIInsightCard({ title, body, action, onAction, pulse = true, className, ...rest }, ref) {
    return (
      <article
        {...rest}
        ref={ref}
        className={["metraly-ai-insight", className].filter(Boolean).join(" ")}
      >
        <span className="metraly-ai-insight__avatar" aria-hidden="true">
          <MetralyIcon name="sparkles" size="sm" className="metraly-ai-insight__avatar-icon" />
          <span
            className={["metraly-ai-insight__dot", pulse ? "metraly-pulse-dot" : ""]
              .filter(Boolean)
              .join(" ")}
          />
        </span>
        <div className="metraly-ai-insight__body">
          <div className="metraly-ai-insight__head">
            <span className="metraly-ai-insight__title">{title}</span>
            <span className="metraly-ai-insight__tag">AI</span>
          </div>
          <p className="metraly-ai-insight__text">{body}</p>
          {action ? (
            <button type="button" className="metraly-ai-insight__action" onClick={onAction}>
              {action}
              <MetralyIcon name="arrowRight" size="xs" aria-hidden />
            </button>
          ) : null}
        </div>
      </article>
    );
  },
);

AIInsightCard.displayName = "AIInsightCard";

export default AIInsightCard;
