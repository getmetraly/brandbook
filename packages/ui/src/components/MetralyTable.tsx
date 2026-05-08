import * as React from "react";

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
}

/**
 * A simple table component consistent with Metraly’s design system.  Supports
 * loading and empty states and basic cell alignment.  For
 * sorting, filtering and pagination, wrap this component with custom logic.
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
}: MetralyTableProps<T>) {
  const classes = ["metraly-table", className].filter(Boolean).join(" ");
  const getRowKey = rowKey || ((_: T, index: number) => String(index));

  // Render skeleton rows when loading
  const renderSkeletonRows = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <tr key={`skeleton-${i}`} className="metraly-table-row is-loading">
        {columns.map((col, j) => (
          <td key={`skeleton-cell-${j}`} style={{ width: col.width, textAlign: col.align || 'left' }}>
            <div className="metraly-table-skeleton-bar" />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <table className={classes} role="table" aria-label={ariaLabel}>
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
          <tr className="metraly-table-empty" role="row">
            <td colSpan={columns.length}>{emptyText}</td>
          </tr>
        )}
        {!loading &&
          data.map((row, rowIndex) => {
            const key = getRowKey(row, rowIndex);
            const isSelected = selectedRowKeys.includes(key);
            return (
              <tr
                key={key}
                role="row"
                aria-selected={isSelected || undefined}
                className={isSelected ? "metraly-table-row is-selected" : "metraly-table-row"}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    style={{ width: col.width, textAlign: col.align || 'left' }}
                    role="cell"
                  >
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