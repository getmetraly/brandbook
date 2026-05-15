import * as React from "react";

export interface RovingSelectionItem {
  value: string;
  disabled?: boolean;
}

export type RovingSelectionMode = "select-on-focus" | "focus-only";

export interface UseRovingSelectionOptions<TItem extends RovingSelectionItem> {
  items: TItem[];
  value?: string;
  defaultValue?: string;
  mode?: RovingSelectionMode;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
}

function firstEnabled<TItem extends RovingSelectionItem>(items: TItem[]) {
  return items.find((item) => !item.disabled)?.value;
}

function findEnabledIndex<TItem extends RovingSelectionItem>(items: TItem[], startIndex: number, direction: 1 | -1) {
  if (items.length === 0) return -1;
  let next = startIndex;
  for (let attempts = 0; attempts < items.length; attempts += 1) {
    next = (next + direction + items.length) % items.length;
    if (!items[next]?.disabled) return next;
  }
  return startIndex;
}

export function useRovingSelection<TItem extends RovingSelectionItem>({
  items,
  value,
  defaultValue,
  mode = "select-on-focus",
  onValueChange,
  onChange,
}: UseRovingSelectionOptions<TItem>) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() => defaultValue ?? firstEnabled(items));
  const selectedValue = isControlled ? value : uncontrolledValue;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (isControlled) return;
    if (uncontrolledValue !== undefined) return;
    const next = firstEnabled(items);
    if (next !== undefined) setUncontrolledValue(next);
  }, [isControlled, items, uncontrolledValue]);

  function selectValue(nextValue: string) {
    if (!isControlled) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }

  function focusIndex(index: number, shouldSelect = mode === "select-on-focus") {
    if (index < 0 || items[index]?.disabled) return;
    refs.current[index]?.focus();
    if (shouldSelect) selectValue(items[index].value);
  }

  function moveFocus(index: number, direction: 1 | -1, shouldSelect = mode === "select-on-focus") {
    const next = findEnabledIndex(items, index, direction);
    focusIndex(next, shouldSelect);
  }

  function getItemProps(index: number, options?: { selectOnArrow?: boolean }) {
    const item = items[index];
    const selected = item?.value === selectedValue;
    const selectOnArrow = options?.selectOnArrow ?? mode === "select-on-focus";
    return {
      ref: (node: HTMLButtonElement | null) => {
        refs.current[index] = node;
      },
      tabIndex: selected || (!selectedValue && index === 0) ? 0 : -1,
      onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          moveFocus(index, 1, selectOnArrow);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          moveFocus(index, -1, selectOnArrow);
        } else if (event.key === "Home") {
          event.preventDefault();
          focusIndex(items.findIndex((entry) => !entry.disabled), selectOnArrow);
        } else if (event.key === "End") {
          event.preventDefault();
          for (let next = items.length - 1; next >= 0; next -= 1) {
            if (!items[next].disabled) {
              focusIndex(next, selectOnArrow);
              break;
            }
          }
        } else if ((event.key === "Enter" || event.key === " ") && item && !item.disabled) {
          event.preventDefault();
          selectValue(item.value);
        }
      },
    };
  }

  return {
    selectedValue,
    refs,
    selectValue,
    focusIndex,
    moveFocus,
    getItemProps,
  };
}
