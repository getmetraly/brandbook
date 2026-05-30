/**
 * Leaderboard — ranked horizontal bar list
 * ------------------------------------------------------------------
 * Compact ranking used in dashboard widgets and metric breakdowns
 * (top authors, slowest pipelines, busiest repos…). Each row shows a
 * rank, a label, a proportional bar, and a mono-formatted value. The
 * leading row is accented; trailing rows fade slightly.
 *
 * Dynamic per-row geometry (bar fill %, rank opacity) and the accent
 * color are passed to CSS via custom properties — the sanctioned
 * pattern from the style contract — so there are no inline style rules
 * beyond those variables. Any caller-supplied `style` is merged, never
 * dropped.
 *
 * Stateless + controlled (zustand-friendly); forwards its ref and
 * spreads `...rest` so it composes directly with @dnd-kit and
 * react-grid-layout.
 *
 * Prop shape mirrors the legacy app `Leaderboard` so the brandbook
 * cutover is a one-line import swap.
 */
import * as React from "react";
import "../styles/metraly-leaderboard.css";

export interface LeaderboardItem {
  name: string;
  value: number;
}

export interface LeaderboardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  items: LeaderboardItem[];
  /** Accent color for the bars. Any CSS color. Defaults to the cyan token. */
  color?: string;
  /** Unit suffix appended to each value (e.g. "h", "%"). */
  unit?: string;
  /** Optional heading shown above the list. */
  title?: string;
  /** Decimal places for the displayed value. Default 1. */
  precision?: number;
}

export const Leaderboard = React.forwardRef<HTMLDivElement, LeaderboardProps>(
  function Leaderboard(
    { items, color, unit = "", title, precision = 1, className, style, ...rest },
    ref,
  ) {
    const max = items.reduce((acc, item) => Math.max(acc, item.value), 0) || 1;
    const rootStyle = {
      ...(color ? { "--m-lb-accent": color } : null),
      ...style,
    } as React.CSSProperties;

    return (
      <div
        {...rest}
        ref={ref}
        className={["metraly-leaderboard", className].filter(Boolean).join(" ")}
        style={rootStyle}
      >
        {title ? <div className="metraly-leaderboard__title">{title}</div> : null}
        <ol className="metraly-leaderboard__list">
          {items.map((item, i) => {
            const rowStyle = {
              "--m-lb-fill": `${(item.value / max) * 100}%`,
              "--m-lb-opacity": String(0.7 + (1 - i / items.length) * 0.3),
            } as React.CSSProperties;
            return (
              <li
                key={`${item.name}-${i}`}
                className={[
                  "metraly-leaderboard__row",
                  i === 0 ? "metraly-leaderboard__row--lead" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={rowStyle}
              >
                <span className="metraly-leaderboard__rank">{i + 1}</span>
                <span className="metraly-leaderboard__name" title={item.name}>
                  {item.name}
                </span>
                <span className="metraly-leaderboard__track">
                  <span className="metraly-leaderboard__bar" />
                </span>
                <span className="metraly-leaderboard__value">
                  {item.value.toFixed(precision)}
                  {unit}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
);

Leaderboard.displayName = "Leaderboard";

export default Leaderboard;
