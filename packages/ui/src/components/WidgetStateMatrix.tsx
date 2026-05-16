/**
 * WidgetStateMatrix — utility component for documenting / verifying that
 * a widget-capable component renders every canonical state.
 *
 * Use it in stories and audit dashboards. NOT meant for production
 * dashboards.
 *
 * Renders a 12-up grid of the same widget under each WidgetStateStatus.
 */
import * as React from "react";
import "../styles/metraly-state-matrix.css";

export type WidgetStateStatus =
  | "ready"
  | "loading"
  | "empty"
  | "partial"
  | "stale"
  | "auth_failed"
  | "rate_limited"
  | "source_disconnected"
  | "schema_mismatch"
  | "permission_denied"
  | "formula_invalid"
  | "error";

export const WIDGET_STATE_ORDER: WidgetStateStatus[] = [
  "ready",
  "loading",
  "empty",
  "partial",
  "stale",
  "rate_limited",
  "auth_failed",
  "source_disconnected",
  "permission_denied",
  "schema_mismatch",
  "formula_invalid",
  "error",
];

export interface WidgetStateMatrixProps<S extends string = WidgetStateStatus> {
  /** Human title above the grid. */
  title?: string;
  description?: string;
  /** Render function — receives a state and returns the widget. */
  render: (state: S) => React.ReactNode;
  /** Override the state order / subset. */
  states?: S[];
  /** Columns at desktop width. Defaults to 4. */
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

export function WidgetStateMatrix<S extends string = WidgetStateStatus>({
  title,
  description,
  render,
  states,
  columns = 4,
  className,
}: WidgetStateMatrixProps<S>) {
  const order = (states ?? (WIDGET_STATE_ORDER as unknown as S[]));
  return (
    <section
      className={[
        "m-statematrix",
        `m-statematrix--cols-${columns}`,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title || description ? (
        <header className="m-statematrix__head">
          {title ? <h2 className="m-statematrix__title">{title}</h2> : null}
          {description ? <p className="m-statematrix__desc">{description}</p> : null}
        </header>
      ) : null}
      <ul className="m-statematrix__grid">
        {order.map((s) => (
          <li key={s} className="m-statematrix__cell">
            <header className="m-statematrix__cell-head">
              <span className="m-statematrix__cell-label">{s as string}</span>
            </header>
            <div className="m-statematrix__cell-body">{render(s)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

WidgetStateMatrix.displayName = "WidgetStateMatrix";

export default WidgetStateMatrix;
