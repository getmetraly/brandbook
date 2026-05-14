"use client";

import * as React from "react";

export type MetralyNavigationTreeTone =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  /** @deprecated Use "primary". */
  | "cyan"
  /** @deprecated Use "secondary". */
  | "purple"
  /** @deprecated Use "success". */
  | "ok"
  /** @deprecated Use "warning". */
  | "warn"
  /** @deprecated Use "error". */
  | "err";

export interface MetralyNavigationTreeItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  marker?: React.ReactNode;
  tone?: MetralyNavigationTreeTone;
  disabled?: boolean;
  children?: MetralyNavigationTreeItem[];
}

export interface MetralyNavigationTreeProps {
  items: MetralyNavigationTreeItem[];
  value?: string;
  defaultValue?: string;
  expandedValues?: string[];
  defaultExpandedValues?: string[];
  ariaLabel?: string;
  className?: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  onExpandedValuesChange?: (expandedValues: string[]) => void;
}

type VisibleTreeNode = {
  item: MetralyNavigationTreeItem;
  level: number;
  parentValue?: string;
  posInSet: number;
  setSize: number;
};

function flattenVisibleItems(
  items: MetralyNavigationTreeItem[],
  expandedValues: string[],
  level = 1,
  parentValue?: string,
): VisibleTreeNode[] {
  const result: VisibleTreeNode[] = [];

  for (const [index, item] of items.entries()) {
    result.push({ item, level, parentValue, posInSet: index + 1, setSize: items.length });
    if (item.children?.length && expandedValues.includes(item.value)) {
      result.push(...flattenVisibleItems(item.children, expandedValues, level + 1, item.value));
    }
  }

  return result;
}

function findSiblings(
  items: MetralyNavigationTreeItem[],
  parentValue?: string,
): MetralyNavigationTreeItem[] {
  if (!parentValue) return items;

  const stack = [...items];
  while (stack.length > 0) {
    const current = stack.shift();
    if (!current) continue;
    if (current.value === parentValue) return current.children ?? [];
    if (current.children?.length) stack.push(...current.children);
  }

  return items;
}

function labelToText(label: React.ReactNode): string {
  if (typeof label === "string") return label;
  if (typeof label === "number") return String(label);
  if (Array.isArray(label)) return label.map(labelToText).join(" ");
  return "";
}

function normalizeSearchKey(value: string) {
  return value.trim().toLocaleLowerCase();
}

function normalizeTone(tone: MetralyNavigationTreeTone | undefined) {
  switch (tone) {
    case "cyan":
      return "primary";
    case "purple":
      return "secondary";
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "err":
      return "error";
    default:
      return tone ?? "default";
  }
}

export function MetralyNavigationTree({
  items,
  value,
  defaultValue,
  expandedValues,
  defaultExpandedValues,
  ariaLabel = "Navigation tree",
  className,
  onValueChange,
  onChange,
  onExpandedValuesChange,
}: MetralyNavigationTreeProps) {
  const isValueControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    () => defaultValue ?? items[0]?.children?.[0]?.value ?? items[0]?.value,
  );
  const selectedValue = isValueControlled ? value : uncontrolledValue;

  const isExpandedControlled = expandedValues !== undefined;
  const [uncontrolledExpandedValues, setUncontrolledExpandedValues] =
    React.useState<string[]>(() => defaultExpandedValues ?? []);
  const currentExpandedValues = isExpandedControlled
    ? expandedValues
    : uncontrolledExpandedValues;

  const visibleItems = React.useMemo(
    () => flattenVisibleItems(items, currentExpandedValues),
    [items, currentExpandedValues],
  );
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const typeaheadRef = React.useRef("");
  const typeaheadTimerRef = React.useRef<number | null>(null);

  function setExpanded(nextExpanded: string[]) {
    if (!isExpandedControlled) setUncontrolledExpandedValues(nextExpanded);
    onExpandedValuesChange?.(nextExpanded);
  }

  function toggleExpanded(itemValue: string) {
    if (currentExpandedValues.includes(itemValue)) {
      setExpanded(currentExpandedValues.filter((valueItem) => valueItem !== itemValue));
    } else {
      setExpanded([...currentExpandedValues, itemValue]);
    }
  }

  function selectValue(nextValue: string) {
    if (!isValueControlled) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }

  function focusVisible(index: number) {
    refs.current[index]?.focus();
  }

  function focusByTypeahead(character: string, currentIndex: number) {
    if (typeaheadTimerRef.current) {
      window.clearTimeout(typeaheadTimerRef.current);
    }

    typeaheadRef.current = normalizeSearchKey(`${typeaheadRef.current}${character}`);
    typeaheadTimerRef.current = window.setTimeout(() => {
      typeaheadRef.current = "";
      typeaheadTimerRef.current = null;
    }, 650);

    const search = typeaheadRef.current;
    const candidates = [...visibleItems.slice(currentIndex + 1), ...visibleItems.slice(0, currentIndex + 1)];
    const match = candidates.find((entry) => {
      if (entry.item.disabled) return false;
      return normalizeSearchKey(labelToText(entry.item.label)).startsWith(search);
    });

    if (!match) return;
    const nextIndex = visibleItems.findIndex((entry) => entry.item.value === match.item.value);
    if (nextIndex >= 0) focusVisible(nextIndex);
  }

  const classes = ["metraly-navigation-tree", className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="tree" aria-label={ariaLabel}>
      {visibleItems.map(({ item, level, parentValue, posInSet, setSize }, index) => {
        const isGroup = Boolean(item.children?.length);
        const expanded = isGroup ? currentExpandedValues.includes(item.value) : undefined;
        const selected = item.value === selectedValue;
        const siblings = findSiblings(items, parentValue);
        const siblingIndex = siblings.findIndex((entry) => entry.value === item.value);
        const normalizedTone = normalizeTone(item.tone);

        return (
          <button
            key={item.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="treeitem"
            className={[
              "metraly-navigation-tree__item",
              selected && "is-selected",
              item.disabled && "is-disabled",
              isGroup && "is-group",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-level={level}
            aria-expanded={isGroup ? expanded : undefined}
            aria-selected={selected}
            aria-disabled={item.disabled || undefined}
            aria-posinset={posInSet}
            aria-setsize={setSize}
            data-tone={normalizedTone}
            data-state={item.disabled ? "disabled" : selected ? "selected" : "default"}
            tabIndex={selected || (!selectedValue && index === 0) ? 0 : -1}
            disabled={item.disabled}
            style={{ ["--m-tree-level" as const]: String(level) } as React.CSSProperties}
            onClick={() => {
              if (item.disabled) return;
              if (isGroup) {
                toggleExpanded(item.value);
              } else {
                selectValue(item.value);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusVisible(Math.min(index + 1, visibleItems.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusVisible(Math.max(index - 1, 0));
              } else if (event.key === "ArrowRight" && isGroup) {
                event.preventDefault();
                if (!expanded) {
                  toggleExpanded(item.value);
                } else if (visibleItems[index + 1]) {
                  focusVisible(index + 1);
                }
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                if (isGroup && expanded) {
                  toggleExpanded(item.value);
                } else if (parentValue) {
                  const parentIndex = visibleItems.findIndex((entry) => entry.item.value === parentValue);
                  if (parentIndex >= 0) focusVisible(parentIndex);
                }
              } else if (event.key === "Home") {
                event.preventDefault();
                focusVisible(0);
              } else if (event.key === "End") {
                event.preventDefault();
                focusVisible(visibleItems.length - 1);
              } else if ((event.key === "Enter" || event.key === " ") && !item.disabled) {
                event.preventDefault();
                if (isGroup) {
                  toggleExpanded(item.value);
                } else {
                  selectValue(item.value);
                }
              } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey && event.key !== "*" && event.key !== " ") {
                focusByTypeahead(event.key, index);
              } else if (event.key === "*" && parentValue === undefined && siblingIndex >= 0) {
                event.preventDefault();
                const nextExpanded = [...currentExpandedValues];
                for (const sibling of siblings) {
                  if (sibling.children?.length && !nextExpanded.includes(sibling.value)) {
                    nextExpanded.push(sibling.value);
                  }
                }
                setExpanded(nextExpanded);
              }
            }}
          >
            <span className="metraly-navigation-tree__indent" aria-hidden="true" />
            {isGroup ? (
              <span className="metraly-navigation-tree__chevron" aria-hidden="true">
                {expanded ? "▾" : "▸"}
              </span>
            ) : (
              <span className="metraly-navigation-tree__marker" aria-hidden="true">
                {item.marker ?? <span className="metraly-navigation-tree__dot" />}
              </span>
            )}
            {item.icon ? (
              <span className="metraly-navigation-tree__icon" aria-hidden="true">
                {item.icon}
              </span>
            ) : null}
            <span className="metraly-navigation-tree__label">{item.label}</span>
            {item.meta !== undefined ? (
              <span className="metraly-navigation-tree__meta">{item.meta}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default MetralyNavigationTree;
