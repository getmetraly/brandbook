import * as React from "react";

export type MoveMenuDirection = "up" | "down" | "left" | "right";

export interface MoveMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  onMove: (direction: MoveMenuDirection) => void;
  onCancel: () => void;
  disabledDirections?: MoveMenuDirection[];
}

const directions: { direction: MoveMenuDirection; label: string; glyph: string }[] = [
  { direction: "up", label: "Move up", glyph: "↑" },
  { direction: "down", label: "Move down", glyph: "↓" },
  { direction: "left", label: "Move left", glyph: "←" },
  { direction: "right", label: "Move right", glyph: "→" },
];

export function MoveMenu({
  onMove,
  onCancel,
  disabledDirections = [],
  className,
  ...rest
}: MoveMenuProps) {
  const classes = ["metraly-move-menu", className].filter(Boolean).join(" ");

  return (
    <div {...rest} className={classes} role="group" aria-label="Move widget">
      <div className="metraly-move-menu__grid">
        {directions.map(({ direction, label, glyph }) => {
          const disabled = disabledDirections.includes(direction);
          return (
            <button
              key={direction}
              type="button"
              className="metraly-move-menu__button metraly-focus-ring"
              aria-label={label}
              disabled={disabled}
              onClick={() => onMove(direction)}
            >
              <span aria-hidden="true">{glyph}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="metraly-move-menu__button is-cancel metraly-focus-ring"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}

export default MoveMenu;
