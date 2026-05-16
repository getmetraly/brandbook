/**
 * MoveMenuA11yExample — proves the keyboard fallback for the
 *                       dashboard editor (P0 from the approved plan).
 *
 * Demonstrates:
 *   - Selecting a widget by keyboard
 *   - Moving it up/down/left/right via MoveMenu without drag
 *   - Focus management between widgets and the menu
 *   - HandlePrimitive used for grip — neutral, no pulse glyph
 *
 * This is a *recipe* / story scaffold, not a replacement for the real
 * DashboardEditor. The MoveMenu primitive itself already exists in
 * brandbook; this example shows how to wire it up.
 */
import * as React from "react";
import { DashboardWidget } from "../dashboard/DashboardWidget";
import { HandlePrimitive } from "../dashboard/HandlePrimitive";
import { MoveMenu } from "../dashboard/MoveMenu";
import "../styles/metraly-dashboard-wizard.css";

export type GridCell = { row: number; col: number };

export interface MoveMenuA11yWidget {
  id: string;
  title: string;
  subtitle?: string;
  position: GridCell;
}

export interface MoveMenuA11yExampleProps {
  /** 12-col grid; default 4×3. */
  rows?: number;
  cols?: number;
  initial?: MoveMenuA11yWidget[];
  className?: string;
  id?: string;
}

const DEFAULT_WIDGETS: MoveMenuA11yWidget[] = [
  { id: "lead-time",      title: "Lead time",       subtitle: "p50 last 14d", position: { row: 0, col: 0 } },
  { id: "deploy-freq",    title: "Deploy frequency", subtitle: "per day",      position: { row: 0, col: 1 } },
  { id: "change-fail",    title: "Change failure",   subtitle: "rolling 14d",  position: { row: 0, col: 2 } },
  { id: "mttr",           title: "MTTR",             subtitle: "rolling 14d",  position: { row: 1, col: 0 } },
  { id: "sla-saturation", title: "SLA saturation",   subtitle: "core APIs",    position: { row: 1, col: 1 } },
];

export const MoveMenuA11yExample: React.FC<MoveMenuA11yExampleProps> = ({
  rows = 3,
  cols = 3,
  initial = DEFAULT_WIDGETS,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const [widgets, setWidgets] = React.useState(initial);
  const [selectedId, setSelectedId] = React.useState<string | null>(widgets[0]?.id ?? null);
  const widgetRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  const selected = widgets.find((w) => w.id === selectedId) ?? null;

  // Free cell map for collision-aware move.
  const isFree = React.useCallback(
    (target: GridCell, excludeId: string): boolean => {
      if (target.row < 0 || target.col < 0 || target.row >= rows || target.col >= cols) return false;
      return !widgets.some(
        (w) => w.id !== excludeId && w.position.row === target.row && w.position.col === target.col,
      );
    },
    [widgets, rows, cols],
  );

  const move = (dir: "up" | "down" | "left" | "right") => {
    if (!selected) return;
    const delta =
      dir === "up" ? { row: -1, col: 0 } :
      dir === "down" ? { row: 1, col: 0 } :
      dir === "left" ? { row: 0, col: -1 } :
      { row: 0, col: 1 };
    const target: GridCell = {
      row: selected.position.row + delta.row,
      col: selected.position.col + delta.col,
    };
    if (!isFree(target, selected.id)) return;
    setWidgets((prev) =>
      prev.map((w) => (w.id === selected.id ? { ...w, position: target } : w)),
    );
  };

  // Keyboard handler scoped to the editor — arrow keys move; Tab leaves.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selected) return;
    if (e.key === "ArrowUp")    { e.preventDefault(); move("up"); }
    else if (e.key === "ArrowDown")  { e.preventDefault(); move("down"); }
    else if (e.key === "ArrowLeft")  { e.preventDefault(); move("left"); }
    else if (e.key === "ArrowRight") { e.preventDefault(); move("right"); }
  };

  // Place each widget in absolute grid cell
  const cellStyle = (w: MoveMenuA11yWidget): React.CSSProperties => ({
    gridColumn: `${w.position.col + 1} / span 1`,
    gridRow: `${w.position.row + 1} / span 1`,
  });

  return (
    <div
      id={rootId}
      className={["m-a11y-editor", className ?? ""].filter(Boolean).join(" ")}
      role="application"
      aria-label="Dashboard editor — keyboard movement example"
      onKeyDown={onKeyDown}
    >
      <header className="m-a11y-editor__head">
        <span className="m-a11y-editor__title">Dashboard editor — keyboard movement</span>
        <span className="m-a11y-editor__hint">
          Tab to select. Arrow keys to move. Move menu also exposes per-step actions.
        </span>
      </header>

      <div
        className="m-a11y-editor__grid"
        style={{
          "--m-a11y-cols": cols,
          "--m-a11y-rows": rows,
        } as React.CSSProperties}
      >
        {widgets.map((w) => {
          const selectedHere = w.id === selectedId;
          return (
            <div
              key={w.id}
              ref={(el) => { widgetRefs.current[w.id] = el; }}
              className={[
                "m-a11y-editor__cell",
                selectedHere ? "m-a11y-editor__cell--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={cellStyle(w)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedHere}
              aria-label={`${w.title}, row ${w.position.row + 1}, column ${w.position.col + 1}${selectedHere ? ", selected" : ""}`}
              onFocus={() => setSelectedId(w.id)}
              onClick={() => setSelectedId(w.id)}
            >
              <DashboardWidget
                title={w.title}
                subtitle={w.subtitle}
                state="live"
                footer={
                  <div className="m-a11y-editor__chrome">
                    <HandlePrimitive
                      kind="drag"
                      label={`Drag handle for ${w.title}`}
                      focusable={false}
                      /* Pulse glyph is NEVER used here — HandlePrimitive renders the neutral grip dots. */
                    />
                    <MoveMenu
                      aria-label={`Move ${w.title}`}
                      disabledDirections={[
                        !isFree({ row: w.position.row - 1, col: w.position.col }, w.id) ? "up" : null,
                        !isFree({ row: w.position.row + 1, col: w.position.col }, w.id) ? "down" : null,
                        !isFree({ row: w.position.row, col: w.position.col - 1 }, w.id) ? "left" : null,
                        !isFree({ row: w.position.row, col: w.position.col + 1 }, w.id) ? "right" : null,
                      ].filter(Boolean) as Array<"up" | "down" | "left" | "right">}
                      onMove={(direction) => { setSelectedId(w.id); move(direction); }}
                      onCancel={() => setSelectedId(null)}
                    />
                  </div>
                }
              >
                <div className="m-a11y-editor__placeholder">
                  <span className="m-a11y-editor__placeholder-label">{w.title}</span>
                  <span className="m-a11y-editor__placeholder-meta">
                    r{w.position.row + 1}/c{w.position.col + 1}
                  </span>
                </div>
              </DashboardWidget>
            </div>
          );
        })}
      </div>

      <footer className="m-a11y-editor__foot" aria-live="polite">
        {selected ? (
          <span>
            Selected: <strong>{selected.title}</strong> at row {selected.position.row + 1}, column {selected.position.col + 1}.
            Use the Move menu or arrow keys to reposition.
          </span>
        ) : (
          <span>No widget selected. Tab into the grid to begin.</span>
        )}
      </footer>
    </div>
  );
};

MoveMenuA11yExample.displayName = "MoveMenuA11yExample";

export default MoveMenuA11yExample;
