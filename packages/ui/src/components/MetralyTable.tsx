import * as React from "react";

export type MetralyTableRowMarker = "live" | "unread" | "new" | "stale" | "error";

export interface MetralyTableColumn<T extends Record<string, any>> {
  /** Unique key for the column; corresponds to a property on each data item. */
  key: keyof T;
  /** Header label or element shown at the top of the column. */
  header: React.ReactNode;
  /** CSS width value (e.g. '20%', '120px'). Optional. */
  width?: string;
  /** Text alignment for cells in this column (default 'left'). */
  align?: 'left' | 'center' | 'right';
}

export interface MetralyTableProps<T extends Record<string, any>> {
  /** Column definitions. */
  columns: MetralyTableColumn<T>[];
  /** Array of row objects. Each property corresponds to column key. */
  data: T[];
  /** Show loading skeleton rows when true. */
  loading?: boolean;
  /** Message displayed when data is empty and not loading. */
  emptyText?: string;
  /** Function returning a unique key for each row; default uses index. */
  rowKey?: (row: T, index: number) => string;
  /** Additional class names for the table. */
  className?: string;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** Row keys that should be rendered as selected without adding client handlers. */
  selectedRowKeys?: string[];
  /** Row keys that should render as unread/new without owning interaction state. */
  unreadRowKeys?: string[];
  /** Row keys that should render a live telemetry marker. */
  liveRowKeys?: string[];
  /** Optional marker resolver for custom row state wrappers. */
  rowMarker?: (row: T, index: number) => MetralyTableRowMarker | undefined;
  /** Adds a sticky-header contract class/data attribute. CSS owns the actual sticky behavior. */
  stickyHeader?: boolean;
  /** Dense dashboard container mode. */
  dense?: boolean;
}

/**
 * A simple table component consistent with Metraly’s design system. Supports
 * loading and empty states, visual row markers and basic cell alignment. For
 * sorting, filtering, pagination and row interactions, wrap this component with
 * custom logic instead of adding local behavior to the display primitive.
 */
export function MetralyTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyText = "No records",
  rowKey,
  className,
  ariaLabel = "Data table",
  selectedRowKeys = [],
  unreadRowKeys = [],
  liveRowKeys = [],
  rowMarker,
  stickyHeader = false,
  dense = false,
}: MetralyTableProps<T>) {
  const classes = [
    "metraly-table",
    stickyHeader && "has-sticky-header",
    dense && "is-dense",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const getRowKey = rowKey || ((_: T, index: number) => String(index));
  const isBusy = loading || undefined;

  function resolveMarker(row: T, rowIndex: number, key: string): MetralyTableRowMarker | undefined {
    return rowMarker?.(row, rowIndex) ?? (liveRowKeys.includes(key) ? "live" : unreadRowKeys.includes(key) ? "unread" : undefined);
  }

  const renderSkeletonRows = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <tr key={`skeleton-${i}`} className="metraly-table-row is-loading" data-state="loading">
        {columns.map((col, j) => (
          <td key={`skeleton-cell-${j}`} style={{ width: col.width, textAlign: col.align || 'left' }}>
            <div className="metraly-table-skeleton-bar" />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <table
      className={classes}
      role="table"
      aria-label={ariaLabel}
      aria-busy={isBusy}
      data-sticky-header={stickyHeader ? "on" : "off"}
      data-density={dense ? "dense" : "default"}
    >
      <thead>
        <tr role="row">
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{ width: col.width, textAlign: col.align || 'left' }}
              scope="col"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading && renderSkeletonRows()}
        {!loading && data.length === 0 && (
          <tr className="metraly-table-empty" role="row" data-state="empty">
            <td colSpan={columns.length}>{emptyText}</td>
          </tr>
        )}
        {!loading &&
          data.map((row, rowIndex) => {
            const key = getRowKey(row, rowIndex);
            const isSelected = selectedRowKeys.includes(key);
            const marker = resolveMarker(row, rowIndex, key);
            const isUnread = marker === "unread" || marker === "new";
            return (
              <tr
                key={key}
                role="row"
                aria-selected={isSelected || undefined}
                aria-label={marker ? `${key} row ${marker}` : undefined}
                className={[
                  "metraly-table-row",
                  isSelected && "is-selected",
                  isUnread && "is-unread",
                  marker && `has-marker-${marker}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-row-key={key}
                data-row-marker={marker ?? "none"}
                data-state={isSelected ? "selected" : marker ?? "default"}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={String(col.key)}
                    style={{ width: col.width, textAlign: col.align || 'left' }}
                    role="cell"
                  >
                    {colIndex === 0 && marker ? (
                      <span className="metraly-table-row-marker" data-marker={marker} aria-hidden="true" />
                    ) : null}
                    {row[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default MetralyTable;
