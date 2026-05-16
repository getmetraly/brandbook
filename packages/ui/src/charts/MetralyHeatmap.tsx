/**
 * MetralyHeatmap — first-class chart primitive
 * ------------------------------------------------------------------
 * x/y grid with intensity-coloured cells. Source-agnostic data shape:
 * a flat array of {x,y,value,status?} cells + ordered axis labels.
 *
 * Use cases (see stories): deploys/hour, incidents/service, PR aging
 * by team/week, flaky tests, sync gaps.
 *
 * Accessibility:
 *   - root is role="grid" with explicit aria-rowcount/colcount
 *   - rows are role="row"; cells are role="gridcell"
 *   - each cell has a meaningful aria-label
 *   - cells are focusable via roving tabindex (arrow / home / end)
 *   - a hidden text summary describes the heatmap as a whole
 *
 * NOT a widget. Wrap in DashboardWidget to use on a dashboard.
 */
import * as React from "react";
import { StateBlock } from "../components/StateBlock";
import { StatusBadge } from "../components/StatusBadge";
import { useRovingSelection } from "../components/useRovingSelection";
import "../styles/metraly-heatmap.css";

export type MetralyHeatmapState =
  | "ready"
  | "loading"
  | "empty"
  | "error"
  | "stale"
  | "partial"
  | "auth_failed"
  | "rate_limited"
  | "source_disconnected"
  | "schema_mismatch"
  | "permission_denied"
  | "formula_invalid";

export type MetralyHeatmapCellStatus = "ok" | "warning" | "danger" | "neutral";

export interface MetralyHeatmapCell {
  x: string;
  y: string;
  value: number | null;
  label?: string;
  href?: string;
  status?: MetralyHeatmapCellStatus;
  description?: string;
}

export interface MetralyHeatmapProps {
  xLabels: string[];
  yLabels: string[];
  cells: MetralyHeatmapCell[];
  /** Suffix appended to cell values in aria + tooltips (e.g. "deploys"). */
  unit?: string;
  state?: MetralyHeatmapState;
  /** Compact widget-shell variant: smaller cells, no legend, single row of x labels. */
  compact?: boolean;
  /** Show legend strip. Defaults to true (false when compact). */
  showLegend?: boolean;
  /** Format the displayed cell value (in tooltip/aria). */
  formatter?: (value: number) => string;
  emptyLabel?: string;
  /** Optional click handler — invoked with the cell on Enter / Space / click. */
  onCellActivate?: (cell: MetralyHeatmapCell) => void;
  className?: string;
  id?: string;
  /** Heading rendered above the grid (rendered only when supplied). */
  title?: string;
  description?: string;
}

// ────────────────────────────────────────────────────────────────────────────

const STATE_TO_STATUS: Record<MetralyHeatmapState, {
  status: React.ComponentProps<typeof StatusBadge>["status"];
  label: string;
}> = {
  ready: { status: "Live", label: "Live" },
  loading: { status: "Preview", label: "Loading" },
  empty: { status: "Preview", label: "No data" },
  error: { status: "Error", label: "Error" },
  stale: { status: "Delayed", label: "Delayed" },
  partial: { status: "Delayed", label: "Partial data" },
  auth_failed: { status: "Error", label: "Auth failed" },
  rate_limited: { status: "Delayed", label: "Rate limited" },
  source_disconnected: { status: "Error", label: "Source disconnected" },
  schema_mismatch: { status: "Error", label: "Schema mismatch" },
  permission_denied: { status: "Error", label: "Permission denied" },
  formula_invalid: { status: "Error", label: "Formula invalid" },
};

function defaultFormatter(v: number): string {
  if (!Number.isFinite(v)) return "—";
  const abs = Math.abs(v);
  if (abs >= 1000) return `${(v / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  const d = abs >= 10 ? 0 : 1;
  return v.toFixed(d).replace(/\.0$/, "");
}

function intensity(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  if (max <= min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export const MetralyHeatmap: React.FC<MetralyHeatmapProps> = ({
  xLabels,
  yLabels,
  cells,
  unit,
  state = "ready",
  compact = false,
  showLegend,
  formatter,
  emptyLabel = "No activity recorded yet",
  onCellActivate,
  className,
  id,
  title,
  description,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const summaryId = `${rootId}-sum`;

  // Build a (y,x) lookup and value range
  const { lookup, minVal, maxVal, total } = React.useMemo(() => {
    const lookup = new Map<string, MetralyHeatmapCell>();
    let mn = Infinity;
    let mx = -Infinity;
    let total = 0;
    for (const c of cells) {
      lookup.set(`${c.y}\u0000${c.x}`, c);
      if (typeof c.value === "number" && Number.isFinite(c.value)) {
        if (c.value < mn) mn = c.value;
        if (c.value > mx) mx = c.value;
        total += c.value;
      }
    }
    if (!Number.isFinite(mn)) mn = 0;
    if (!Number.isFinite(mx)) mx = 0;
    return { lookup, minVal: mn, maxVal: mx, total };
  }, [cells]);

  const fmt = formatter ?? defaultFormatter;
  const isReady = state === "ready" || state === "partial" || state === "stale";

  // Roving focus is adapted to the existing brandbook hook API.
  // The hook is one-dimensional, so each heatmap cell becomes an item
  // with a stable value of "row:col" encoded as a flat index string.
  const colCount = xLabels.length;
  const rowCount = yLabels.length;
  const totalCells = rowCount * colCount;
  const rovingItems = React.useMemo(
    () => Array.from({ length: totalCells }, (_, index) => ({ value: String(index) })),
    [totalCells],
  );
  const activateByIndex = React.useCallback((index: number) => {
    if (!onCellActivate || colCount <= 0) return;
    const r = Math.floor(index / colCount);
    const c = index % colCount;
    const cell = lookup.get(`${yLabels[r]}\u0000${xLabels[c]}`);
    if (cell) onCellActivate(cell);
  }, [colCount, lookup, onCellActivate, xLabels, yLabels]);
  const { selectedValue, getItemProps, selectValue } = useRovingSelection({
    items: rovingItems,
    defaultValue: rovingItems[0]?.value,
    mode: "focus-only",
    onValueChange: (nextValue) => activateByIndex(Number(nextValue)),
  });
  const activeCellIndex = selectedValue ? Number(selectedValue) : 0;

  const stateMeta = STATE_TO_STATUS[state];

  // Non-ready states replace the grid wholesale with a StateBlock.
  if (!isReady) {
    return (
      <div
        id={rootId}
        className={`m-heatmap m-heatmap--state-${state} ${className ?? ""}`.trim()}
        aria-busy={state === "loading" || undefined}
      >
        {title ? <HeatmapHeader title={title} description={description} badge={stateMeta} /> : null}
        <StateBlock
          variant={state === "loading" ? "loading" : state === "empty" ? "empty" : state === "source_disconnected" ? "disconnected" : "error"}
          title={titleForState(state, emptyLabel)}
          description={hintForState(state)}
        />
      </div>
    );
  }

  const showLegendResolved = showLegend ?? !compact;

  return (
    <div
      id={rootId}
      className={[
        "m-heatmap",
        compact ? "m-heatmap--compact" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--m-heatmap-cols": colCount } as React.CSSProperties}
    >
      {title || description ? (
        <HeatmapHeader title={title} description={description} badge={state !== "ready" ? stateMeta : undefined} />
      ) : null}

      <div className="m-heatmap__scroll">
        <div
          role="grid"
          aria-rowcount={rowCount}
          aria-colcount={colCount}
          aria-describedby={summaryId}
          className="m-heatmap__grid"
          style={{ "--m-heatmap-cols": colCount } as React.CSSProperties}
        >
          {/* header row */}
          <div role="row" className="m-heatmap__row m-heatmap__row--head">
            <div role="columnheader" className="m-heatmap__corner" aria-hidden="true" />
            {xLabels.map((x) => (
              <div
                key={`xh-${x}`}
                role="columnheader"
                className="m-heatmap__xlabel"
                title={x}
              >
                {x}
              </div>
            ))}
          </div>

          {/* body */}
          {yLabels.map((y, rIdx) => (
            <div key={`r-${y}`} role="row" className="m-heatmap__row">
              <div role="rowheader" className="m-heatmap__ylabel" title={y}>
                {y}
              </div>
              {xLabels.map((x, cIdx) => {
                const cell = lookup.get(`${y}\u0000${x}`);
                const v = cell?.value ?? null;
                const i = v === null ? 0 : intensity(v, minVal, maxVal);
                const status = cell?.status ?? "neutral";
                const labelText = cell?.label ?? (v === null ? "no data" : `${fmt(v)}${unit ? ` ${unit}` : ""}`);
                const ariaLabel = `${y} on ${x}: ${labelText}${cell?.description ? `, ${cell.description}` : ""}`;

                const flatIdx = rIdx * colCount + cIdx;
                const props = getItemProps(flatIdx, { selectOnArrow: false });
                const isFocused = flatIdx === activeCellIndex;

                return (
                  <button
                    {...props}
                    key={`c-${y}-${x}`}
                    type="button"
                    role="gridcell"
                    aria-label={ariaLabel}
                    className={[
                      "m-heatmap__cell",
                      v === null ? "m-heatmap__cell--null" : "",
                      `m-heatmap__cell--${status}`,
                      isFocused ? "m-heatmap__cell--focus" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      "--m-cell-intensity": i.toFixed(3),
                    } as React.CSSProperties}
                    onClick={() => selectValue(String(flatIdx))}
                  >
                    {!compact && v !== null ? (
                      <span className="m-heatmap__cell-value">{fmt(v)}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showLegendResolved ? (
        <HeatmapLegend minVal={minVal} maxVal={maxVal} unit={unit} formatter={fmt} />
      ) : null}

      <p id={summaryId} className="m-heatmap__sr">
        {rowCount} rows by {colCount} columns. {totalCells} cells total.
        Values range from {fmt(minVal)} to {fmt(maxVal)}
        {unit ? ` ${unit}` : ""}. Total {fmt(total)}
        {unit ? ` ${unit}` : ""}. Use arrow keys to navigate cells.
      </p>
    </div>
  );
};

MetralyHeatmap.displayName = "MetralyHeatmap";

// ────────────────────────────────────────────────────────────────────────────

const HeatmapHeader: React.FC<{
  title?: string;
  description?: string;
  badge?: { status: React.ComponentProps<typeof StatusBadge>["status"]; label: string };
}> = ({ title, description, badge }) => {
  return (
    <header className="m-heatmap__head">
      <div className="m-heatmap__head-text">
        {title ? <span className="m-heatmap__title">{title}</span> : null}
        {description ? <span className="m-heatmap__desc">{description}</span> : null}
      </div>
      {badge ? <StatusBadge status={badge.status} label={badge.label} /> : null}
    </header>
  );
};

const HeatmapLegend: React.FC<{
  minVal: number;
  maxVal: number;
  unit?: string;
  formatter: (n: number) => string;
}> = ({ minVal, maxVal, unit, formatter }) => {
  return (
    <div className="m-heatmap__legend" aria-hidden="true">
      <span className="m-heatmap__legend-end">{formatter(minVal)}</span>
      <span className="m-heatmap__legend-bar" />
      <span className="m-heatmap__legend-end">{formatter(maxVal)}{unit ? ` ${unit}` : ""}</span>
    </div>
  );
};

function titleForState(state: MetralyHeatmapState, emptyLabel: string): string {
  switch (state) {
    case "loading": return "Loading";
    case "empty": return emptyLabel;
    case "auth_failed": return "Authentication failed";
    case "rate_limited": return "Rate limited";
    case "source_disconnected": return "Source disconnected";
    case "schema_mismatch": return "Schema mismatch";
    case "permission_denied": return "Permission denied";
    case "formula_invalid": return "Formula invalid";
    case "error": return "Could not load";
    case "stale": return "Last update is stale";
    case "partial": return "Partial data";
    default: return "";
  }
}

function hintForState(state: MetralyHeatmapState): string | undefined {
  switch (state) {
    case "loading": return undefined;
    case "empty": return "Once activity is recorded the heatmap will populate.";
    case "stale": return "Showing the last successful sync window. Trigger a refresh to update.";
    case "partial": return "Backfill is still in progress. Cells may shift as data arrives.";
    case "auth_failed": return "Re-authorize the connector to resume cell calculation.";
    case "rate_limited": return "Upstream provider returned 429. Retrying with backoff.";
    case "source_disconnected": return "The underlying source is unreachable. Check the connector status.";
    case "schema_mismatch": return "Underlying schema changed. Re-validate the metric mapping.";
    case "permission_denied": return "Current scopes are too narrow. Expand scopes in source settings.";
    case "formula_invalid": return "Cell formula did not compile.";
    case "error": return "An unexpected error occurred. Retry or open the error log.";
    default: return undefined;
  }
}

export default MetralyHeatmap;
