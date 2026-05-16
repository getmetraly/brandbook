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
export type MetralyHeatmapDensity = "comfortable" | "compact" | "dashboard";
export type MetralyHeatmapLegend = "horizontal" | "inline" | "none";
export type MetralyHeatmapRamp =
  | "cyan"
  | "purple"
  | "success"
  | "warning"
  | "danger"
  | "cyan-purple-diverging"
  | "semantic";
export type MetralyHeatmapValueVisibility = boolean | "auto";
export type MetralyHeatmapTooltipMode = boolean | "hover" | "focus" | "none";

export interface MetralyHeatmapColorScale {
  /** Explicit visual minimum. When omitted, derived from finite cell values. */
  min?: number;
  /** Explicit visual maximum. When omitted, derived from finite cell values. */
  max?: number;
  /** Optional midpoint for diverging scales. */
  mid?: number;
  /** Token-backed visual ramp. Defaults to cyan. */
  ramp?: MetralyHeatmapRamp;
  /** Clamp values into the visual min/max range. Defaults to true. */
  clamp?: boolean;
}

export interface MetralyHeatmapCell {
  x: string;
  y: string;
  value: number | null;
  label?: string;
  href?: string;
  status?: MetralyHeatmapCellStatus;
  description?: string;
  /** Key/value metadata shown in the cell tooltip and drilldown contexts. */
  labels?: Record<string, string | number | boolean | null | undefined>;
}
export interface MetralyHeatmapTooltipContext {
  cell: MetralyHeatmapCell | null;
  x: string;
  y: string;
  value: number | null;
  valueText: string;
  unit?: string;
  status: MetralyHeatmapCellStatus;
  statusLabel: string;
  intensity: number;
  intensityLevel: number;
  ramp: MetralyHeatmapRamp;
  description?: string;
  labels?: Record<string, string | number | boolean | null | undefined>;
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
  /** Density controls cell sizing without changing the data contract. */
  density?: MetralyHeatmapDensity;
  /** Show legend strip. Defaults to true (false when compact). */
  showLegend?: boolean;
  /** More explicit legend placement. `showLegend={false}` maps to `none`. */
  legend?: MetralyHeatmapLegend;
  /** Optional explicit visual scale for sparse or domain-known data. */
  colorScale?: MetralyHeatmapColorScale;
  /** Controls visible numeric labels inside cells. Defaults to false; values remain available via aria/title. */
  showCellValues?: MetralyHeatmapValueVisibility;
  /** Accessible label for the grid. Defaults to title or a generic label. */
  ariaLabel?: string;
  /** Cell tooltip behavior. Defaults to true: visible on hover, focus, and touch/click. */
  tooltip?: MetralyHeatmapTooltipMode;
  /** Optional custom tooltip renderer. Default uses Metraly chart tooltip chrome. */
  renderTooltip?: (context: MetralyHeatmapTooltipContext) => React.ReactNode;
  /** Format the displayed cell value (in tooltip/aria). */
  formatter?: (value: number) => string;
  emptyLabel?: string;
  /** Optional focus handler — invoked as keyboard focus moves across cells. */
  onCellFocus?: (cell: MetralyHeatmapCell | null) => void;
  /** Optional click / Enter / Space handler. */
  onCellActivate?: (cell: MetralyHeatmapCell) => void;
  className?: string;
  id?: string;
  /** Heading rendered above the grid (rendered only when supplied). */
  title?: string;
  description?: string;
}

// ────────────────────────────────────────────────────────────────────────────

const STATE_TO_STATUS: Record<
  MetralyHeatmapState,
  {
    status: React.ComponentProps<typeof StatusBadge>["status"];
    label: string;
  }
> = {
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

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function intensity(
  value: number,
  min: number,
  max: number,
  shouldClamp: boolean,
): number {
  if (!Number.isFinite(value)) return 0;
  if (max <= min) return 0;
  const normalized = (value - min) / (max - min);
  return shouldClamp ? clamp(normalized, 0, 1) : normalized;
}

function intensityLevel(
  value: number | null,
  normalized: number,
  status: MetralyHeatmapCellStatus,
): number {
  if (value === null) return 0;
  if (normalized <= 0) return status === "ok" ? 1 : 0;
  return clamp(Math.ceil(normalized * 5), 1, 5);
}

function semanticStatusForValue(
  normalized: number,
  explicit?: MetralyHeatmapCellStatus,
): MetralyHeatmapCellStatus {
  if (explicit && explicit !== "neutral") return explicit;
  if (normalized >= 0.82) return "danger";
  if (normalized >= 0.52) return "warning";
  if (normalized > 0) return "ok";
  return explicit ?? "neutral";
}

function focusableIndex(
  index: number,
  rowCount: number,
  colCount: number,
  key: string,
): number | null {
  if (colCount <= 0 || rowCount <= 0) return null;
  const row = Math.floor(index / colCount);
  const col = index % colCount;
  if (key === "ArrowRight")
    return row * colCount + Math.min(col + 1, colCount - 1);
  if (key === "ArrowLeft") return row * colCount + Math.max(col - 1, 0);
  if (key === "ArrowDown")
    return Math.min(row + 1, rowCount - 1) * colCount + col;
  if (key === "ArrowUp") return Math.max(row - 1, 0) * colCount + col;
  if (key === "Home") return row * colCount;
  if (key === "End") return row * colCount + colCount - 1;
  if (key === "PageDown")
    return Math.min(row + 1, rowCount - 1) * colCount + col;
  if (key === "PageUp") return Math.max(row - 1, 0) * colCount + col;
  return null;
}

function statusLabel(status: MetralyHeatmapCellStatus): string {
  if (status === "ok") return "OK";
  if (status === "warning") return "Warning";
  if (status === "danger") return "Danger";
  return "Neutral";
}

function tooltipModeEnabled(
  mode: Exclude<MetralyHeatmapTooltipMode, boolean>,
  origin: "hover" | "focus" | "touch",
): boolean {
  if (mode === "none") return false;
  if (mode === "focus") return origin !== "hover";
  return true;
}

function labelEntries(
  labels?: Record<string, string | number | boolean | null | undefined>,
): Array<[string, string]> {
  if (!labels) return [];
  return Object.entries(labels)
    .filter((entry): entry is [string, string | number | boolean] =>
      entry[1] !== null && entry[1] !== undefined,
    )
    .map(([key, value]) => [key, String(value)]);
}

interface ActiveHeatmapTooltip extends MetralyHeatmapTooltipContext {
  left: number;
  top: number;
}

export const MetralyHeatmap: React.FC<MetralyHeatmapProps> = ({
  xLabels,
  yLabels,
  cells,
  unit,
  state = "ready",
  compact = false,
  density,
  showLegend,
  legend,
  colorScale,
  showCellValues = false,
  ariaLabel,
  tooltip = true,
  renderTooltip,
  formatter,
  emptyLabel = "No activity recorded yet",
  onCellFocus,
  onCellActivate,
  className,
  id,
  title,
  description,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const summaryId = `${rootId}-sum`;
  const tooltipId = `${rootId}-tooltip`;
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const resolvedDensity: MetralyHeatmapDensity =
    density ?? (compact ? "compact" : "comfortable");

  // Build a (y,x) lookup and value range.
  const { lookup, derivedMin, derivedMax, total, finiteCount } =
    React.useMemo(() => {
      const lookup = new Map<string, MetralyHeatmapCell>();
      let mn = Infinity;
      let mx = -Infinity;
      let total = 0;
      let finiteCount = 0;

      for (const c of cells) {
        lookup.set(`${c.y}\u0000${c.x}`, c);
        if (typeof c.value === "number" && Number.isFinite(c.value)) {
          if (c.value < mn) mn = c.value;
          if (c.value > mx) mx = c.value;
          total += c.value;
          finiteCount += 1;
        }
      }

      if (!Number.isFinite(mn)) mn = 0;
      if (!Number.isFinite(mx)) mx = 0;
      return { lookup, derivedMin: mn, derivedMax: mx, total, finiteCount };
    }, [cells]);

  const minVal = colorScale?.min ?? derivedMin;
  const maxVal = colorScale?.max ?? derivedMax;
  const scaleMid = colorScale?.mid;
  const ramp = colorScale?.ramp ?? "cyan";
  const shouldClamp = colorScale?.clamp ?? true;
  const fmt = formatter ?? defaultFormatter;
  const isReady = state === "ready" || state === "partial" || state === "stale";
  const resolvedTooltipMode: Exclude<MetralyHeatmapTooltipMode, boolean> =
    tooltip === true ? "hover" : tooltip === false ? "none" : tooltip;
  const [activeTooltip, setActiveTooltip] =
    React.useState<ActiveHeatmapTooltip | null>(null);

  const showCellTooltip = React.useCallback(
    (
      context: MetralyHeatmapTooltipContext,
      element: HTMLElement,
      origin: "hover" | "focus" | "touch",
    ) => {
      if (!tooltipModeEnabled(resolvedTooltipMode, origin)) return;
      const root = rootRef.current;
      if (!root) return;
      const rootRect = root.getBoundingClientRect();
      const cellRect = element.getBoundingClientRect();
      const halfWidth = 132;
      const left = clamp(
        cellRect.left - rootRect.left + cellRect.width / 2,
        halfWidth,
        Math.max(halfWidth, rootRect.width - halfWidth),
      );
      const top = Math.max(0, cellRect.top - rootRect.top - 8);
      setActiveTooltip({ ...context, left, top });
    },
    [resolvedTooltipMode],
  );

  const hideCellTooltip = React.useCallback(() => {
    setActiveTooltip(null);
  }, []);

  // Roving focus is adapted to the existing brandbook hook API.
  // The hook is one-dimensional, so each heatmap cell becomes an item
  // with a stable value encoded as a flat index string.
  const colCount = xLabels.length;
  const rowCount = yLabels.length;
  const totalCells = rowCount * colCount;
  const rovingItems = React.useMemo(
    () =>
      Array.from({ length: totalCells }, (_, index) => ({
        value: String(index),
      })),
    [totalCells],
  );
  const cellByIndex = React.useCallback(
    (index: number) => {
      if (colCount <= 0 || index < 0 || index >= totalCells) return null;
      const r = Math.floor(index / colCount);
      const c = index % colCount;
      return lookup.get(`${yLabels[r]}\u0000${xLabels[c]}`) ?? null;
    },
    [colCount, lookup, totalCells, xLabels, yLabels],
  );

  const { selectedValue, getItemProps, selectValue, refs } = useRovingSelection(
    {
      items: rovingItems,
      defaultValue: rovingItems[0]?.value,
      mode: "focus-only",
      onValueChange: (nextValue) =>
        onCellFocus?.(cellByIndex(Number(nextValue))),
    },
  );
  const activeCellIndex = selectedValue ? Number(selectedValue) : 0;
  const moveToIndex = React.useCallback(
    (nextIndex: number) => {
      const safeIndex = clamp(nextIndex, 0, Math.max(0, totalCells - 1));
      selectValue(String(safeIndex));
      refs.current[safeIndex]?.focus();
    },
    [refs, selectValue, totalCells],
  );
  const resolvedShowCellValues =
    showCellValues === "auto"
      ? !compact && resolvedDensity === "comfortable" && colCount <= 8
      : Boolean(showCellValues);

  const stateMeta = STATE_TO_STATUS[state];

  // Non-ready states replace the grid wholesale with a StateBlock.
  if (!isReady) {
    return (
      <div
        id={rootId}
        className={`metraly-heatmap metraly-heatmap--density-${resolvedDensity} metraly-heatmap--state-${state} ${className ?? ""}`.trim()}
        aria-busy={state === "loading" || undefined}
      >
        {title ? (
          <HeatmapHeader
            title={title}
            description={description}
            badge={stateMeta}
          />
        ) : null}
        <StateBlock
          variant={
            state === "loading"
              ? "loading"
              : state === "empty"
                ? "empty"
                : state === "source_disconnected"
                  ? "disconnected"
                  : "error"
          }
          title={titleForState(state, emptyLabel)}
          description={hintForState(state)}
          density={
            resolvedDensity === "comfortable" ? "comfortable" : "compact"
          }
        />
      </div>
    );
  }

  const resolvedLegend: MetralyHeatmapLegend =
    legend ?? (showLegend === false || compact ? "none" : "horizontal");

  return (
    <div
      ref={rootRef}
      id={rootId}
      className={[
        "metraly-heatmap",
        `metraly-heatmap--density-${resolvedDensity}`,
        `metraly-heatmap--ramp-${ramp}`,
        resolvedShowCellValues ? "metraly-heatmap--show-values" : "",
        compact ? "metraly-heatmap--compact" : "",
        finiteCount === 0 ? "metraly-heatmap--empty-data" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--m-heatmap-cols": colCount } as React.CSSProperties}
    >
      {title || description ? (
        <HeatmapHeader
          title={title}
          description={description}
          badge={state !== "ready" ? stateMeta : undefined}
        />
      ) : null}

      <div className="metraly-heatmap__scroll">
        <div
          role="grid"
          aria-label={ariaLabel ?? title ?? "Heatmap"}
          aria-rowcount={rowCount}
          aria-colcount={colCount}
          aria-describedby={summaryId}
          className="metraly-heatmap__grid"
          style={{ "--m-heatmap-cols": colCount } as React.CSSProperties}
        >
          {/* header row */}
          <div role="row" className="metraly-heatmap__row metraly-heatmap__row--head">
            <div
              role="columnheader"
              className="metraly-heatmap__corner"
              aria-hidden="true"
            />
            {xLabels.map((x) => (
              <div
                key={`xh-${x}`}
                role="columnheader"
                className="metraly-heatmap__xlabel"
                title={x}
              >
                {x}
              </div>
            ))}
          </div>

          {/* body */}
          {yLabels.map((y, rIdx) => (
            <div key={`r-${y}`} role="row" className="metraly-heatmap__row">
              <div role="rowheader" className="metraly-heatmap__ylabel" title={y}>
                {y}
              </div>
              {xLabels.map((x, cIdx) => {
                const cell = lookup.get(`${y}\u0000${x}`);
                const v = cell?.value ?? null;
                const i =
                  v === null ? 0 : intensity(v, minVal, maxVal, shouldClamp);
                const divergingI =
                  scaleMid !== undefined && v !== null && maxVal !== minVal
                    ? Math.abs(v - scaleMid) /
                      Math.max(
                        Math.abs(maxVal - scaleMid),
                        Math.abs(scaleMid - minVal),
                        1,
                      )
                    : i;
                const visualIntensity =
                  ramp === "cyan-purple-diverging"
                    ? clamp(divergingI, 0, 1)
                    : clamp(i, 0, 1);
                const level = intensityLevel(
                  v,
                  visualIntensity,
                  cell?.status ?? "neutral",
                );
                const status =
                  ramp === "semantic"
                    ? semanticStatusForValue(visualIntensity, cell?.status)
                    : (cell?.status ?? "neutral");
                const labelText =
                  cell?.label ??
                  (v === null
                    ? "no data"
                    : `${fmt(v)}${unit ? ` ${unit}` : ""}`);
                const ariaCellLabel = `${y} on ${x}: ${labelText}${cell?.description ? `, ${cell.description}` : ""}`;
                const valueText =
                  v === null ? "No data" : `${fmt(v)}${unit ? ` ${unit}` : ""}`;
                const tooltipContext: MetralyHeatmapTooltipContext = {
                  cell: cell ?? null,
                  x,
                  y,
                  value: v,
                  valueText,
                  unit,
                  status,
                  statusLabel: statusLabel(status),
                  intensity: visualIntensity,
                  intensityLevel: level,
                  ramp,
                  description: cell?.description,
                  labels: cell?.labels,
                };

                const flatIdx = rIdx * colCount + cIdx;
                const props = getItemProps(flatIdx, { selectOnArrow: false });
                const isFocused = flatIdx === activeCellIndex;

                return (
                  <button
                    {...props}
                    key={`c-${y}-${x}`}
                    type="button"
                    role="gridcell"
                    aria-label={ariaCellLabel}
                    aria-describedby={isFocused && activeTooltip ? tooltipId : undefined}
                    title={`${y} · ${x}: ${valueText}`}
                    data-intensity={level}
                    data-status={status}
                    data-ramp={ramp}
                    data-value={v === null ? undefined : v}
                    className={[
                      "metraly-heatmap__cell",
                      v === null
                        ? "metraly-heatmap__cell--null"
                        : `metraly-heatmap__cell--i-${level}`,
                      `metraly-heatmap__cell--${status}`,
                      ramp === "cyan-purple-diverging" &&
                      v !== null &&
                      scaleMid !== undefined
                        ? v < scaleMid
                          ? "metraly-heatmap__cell--below-mid"
                          : v > scaleMid
                            ? "metraly-heatmap__cell--above-mid"
                            : "metraly-heatmap__cell--at-mid"
                        : "",
                      isFocused ? "metraly-heatmap__cell--focus" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={
                      {
                        "--m-cell-intensity": visualIntensity.toFixed(3),
                      } as React.CSSProperties
                    }
                    onMouseEnter={(event) => {
                      showCellTooltip(
                        tooltipContext,
                        event.currentTarget,
                        "hover",
                      );
                    }}
                    onMouseLeave={hideCellTooltip}
                    onFocus={(event) => {
                      selectValue(String(flatIdx));
                      showCellTooltip(
                        tooltipContext,
                        event.currentTarget,
                        "focus",
                      );
                    }}
                    onBlur={hideCellTooltip}
                    onKeyDown={(event) => {
                      const nextIndex = focusableIndex(
                        flatIdx,
                        rowCount,
                        colCount,
                        event.key,
                      );
                      if (nextIndex !== null) {
                        event.preventDefault();
                        moveToIndex(nextIndex);
                        return;
                      }
                      if (
                        (event.key === "Enter" || event.key === " ") &&
                        cell
                      ) {
                        event.preventDefault();
                        onCellActivate?.(cell);
                      }
                    }}
                    onClick={(event) => {
                      selectValue(String(flatIdx));
                      showCellTooltip(
                        tooltipContext,
                        event.currentTarget,
                        "touch",
                      );
                      if (cell) onCellActivate?.(cell);
                    }}
                  >
                    {resolvedShowCellValues && v !== null ? (
                      <span className="metraly-heatmap__cell-value">{fmt(v)}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {activeTooltip ? (
        <HeatmapTooltip
          id={tooltipId}
          tooltip={activeTooltip}
          renderTooltip={renderTooltip}
        />
      ) : null}

      {resolvedLegend !== "none" ? (
        <HeatmapLegend
          minVal={minVal}
          midVal={scaleMid}
          maxVal={maxVal}
          unit={unit}
          formatter={fmt}
          variant={resolvedLegend}
          ramp={ramp}
        />
      ) : null}

      <HeatmapTableFallback
        xLabels={xLabels}
        yLabels={yLabels}
        lookup={lookup}
        formatter={fmt}
        unit={unit}
      />

      <p id={summaryId} className="metraly-heatmap__sr">
        {rowCount} rows by {colCount} columns. {totalCells} cells total. Values
        range from {fmt(minVal)} to {fmt(maxVal)}
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
  badge?: {
    status: React.ComponentProps<typeof StatusBadge>["status"];
    label: string;
  };
}> = ({ title, description, badge }) => {
  return (
    <header className="metraly-heatmap__head">
      <div className="metraly-heatmap__head-text">
        {title ? <span className="metraly-heatmap__title">{title}</span> : null}
        {description ? (
          <span className="metraly-heatmap__desc">{description}</span>
        ) : null}
      </div>
      {badge ? <StatusBadge status={badge.status} label={badge.label} /> : null}
    </header>
  );
};

const HeatmapTooltip: React.FC<{
  id: string;
  tooltip: ActiveHeatmapTooltip;
  renderTooltip?: (context: MetralyHeatmapTooltipContext) => React.ReactNode;
}> = ({ id, tooltip, renderTooltip }) => {
  const labels = labelEntries(tooltip.labels);
  const custom = renderTooltip?.(tooltip);

  return (
    <div
      id={id}
      className="metraly-chart-tooltip metraly-heatmap__tooltip"
      role="status"
      style={
        {
          "--m-heatmap-tooltip-x": `${tooltip.left}px`,
          "--m-heatmap-tooltip-y": `${tooltip.top}px`,
        } as React.CSSProperties
      }
    >
      {custom ?? (
        <>
          <div className="metraly-heatmap__tooltip-head">
            <strong>{tooltip.y}</strong>
            <span>{tooltip.x}</span>
          </div>
          <div className="metraly-heatmap__tooltip-value">
            <b>{tooltip.valueText}</b>
            <span>{tooltip.statusLabel}</span>
          </div>
          {tooltip.description ? (
            <p className="metraly-heatmap__tooltip-desc">{tooltip.description}</p>
          ) : null}
          {labels.length > 0 ? (
            <dl className="metraly-heatmap__tooltip-list">
              {labels.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </>
      )}
    </div>
  );
};

const HeatmapLegend: React.FC<{
  minVal: number;
  midVal?: number;
  maxVal: number;
  unit?: string;
  formatter: (n: number) => string;
  variant: Exclude<MetralyHeatmapLegend, "none">;
  ramp: MetralyHeatmapRamp;
}> = ({ minVal, midVal, maxVal, unit, formatter, variant, ramp }) => {
  const showMid =
    ramp === "cyan-purple-diverging" && typeof midVal === "number";
  return (
    <div
      className={`metraly-heatmap__legend metraly-heatmap__legend--${variant} metraly-heatmap__legend--ramp-${ramp}`}
      aria-hidden="true"
    >
      <span className="metraly-heatmap__legend-end">{formatter(minVal)}</span>
      <span className="metraly-heatmap__legend-bar">
        {showMid ? <span className="metraly-heatmap__legend-mid" /> : null}
      </span>
      {showMid ? (
        <span className="metraly-heatmap__legend-end">{formatter(midVal!)}</span>
      ) : null}
      <span className="metraly-heatmap__legend-end">
        {formatter(maxVal)}
        {unit ? ` ${unit}` : ""}
      </span>
    </div>
  );
};

const HeatmapTableFallback: React.FC<{
  xLabels: string[];
  yLabels: string[];
  lookup: Map<string, MetralyHeatmapCell>;
  formatter: (n: number) => string;
  unit?: string;
}> = ({ xLabels, yLabels, lookup, formatter, unit }) => {
  return (
    <table className="metraly-heatmap__fallback-table">
      <caption>Heatmap values</caption>
      <thead>
        <tr>
          <th scope="col">Dimension</th>
          {xLabels.map((x) => (
            <th key={x} scope="col">
              {x}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {yLabels.map((y) => (
          <tr key={y}>
            <th scope="row">{y}</th>
            {xLabels.map((x) => {
              const cell = lookup.get(`${y}\u0000${x}`);
              const value =
                typeof cell?.value === "number"
                  ? `${formatter(cell.value)}${unit ? ` ${unit}` : ""}`
                  : "—";
              return <td key={`${y}-${x}`}>{value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function titleForState(state: MetralyHeatmapState, emptyLabel: string): string {
  switch (state) {
    case "loading":
      return "Loading";
    case "empty":
      return emptyLabel;
    case "auth_failed":
      return "Authentication failed";
    case "rate_limited":
      return "Rate limited";
    case "source_disconnected":
      return "Source disconnected";
    case "schema_mismatch":
      return "Schema mismatch";
    case "permission_denied":
      return "Permission denied";
    case "formula_invalid":
      return "Formula invalid";
    case "error":
      return "Could not load";
    case "stale":
      return "Last update is stale";
    case "partial":
      return "Partial data";
    default:
      return "";
  }
}

function hintForState(state: MetralyHeatmapState): string | undefined {
  switch (state) {
    case "loading":
      return undefined;
    case "empty":
      return "Once activity is recorded the heatmap will populate.";
    case "stale":
      return "Showing the last successful sync window. Trigger a refresh to update.";
    case "partial":
      return "Backfill is still in progress. Cells may shift as data arrives.";
    case "auth_failed":
      return "Re-authorize the connector to resume cell calculation.";
    case "rate_limited":
      return "Upstream provider returned 429. Retrying with backoff.";
    case "source_disconnected":
      return "The underlying source is unreachable. Check the connector status.";
    case "schema_mismatch":
      return "Underlying schema changed. Re-validate the metric mapping.";
    case "permission_denied":
      return "Current scopes are too narrow. Expand scopes in source settings.";
    case "formula_invalid":
      return "Cell formula did not compile.";
    case "error":
      return "An unexpected error occurred. Retry or open the error log.";
    default:
      return undefined;
  }
}

export default MetralyHeatmap;
