/**
 * DataGrid Component
 * Enterprise-grade data grid built on TanStack Table
 * Features: sorting, filtering, pagination, column resizing/pinning/reordering,
 *           row selection, expansion, grouping, cell editing, virtualization
 */

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  memo,
} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  ExpandedState,
  GroupingState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  PaginationState,
  Row,
  Header,
  Table as TanStackTable,
  ColumnResizeMode,
  Updater,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
  Filter,
  Columns,
  Pin,
  PinOff,
  Check,
  Minus,
} from 'lucide-react';
import styles from './DataGrid.module.css';

// ============================================
// Types
// ============================================

export interface DataGridColumn<TData> {
  id: string;
  header: string;
  accessorKey?: string;
  accessorFn?: (row: TData) => unknown;
  cell?: (info: { getValue: () => unknown; row: Row<TData>; column: unknown }) => React.ReactNode;
  footer?: string | ((info: { column: unknown }) => React.ReactNode);
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableResizing?: boolean;
  enablePinning?: boolean;
  enableGrouping?: boolean;
  enableHiding?: boolean;
  aggregationFn?: 'sum' | 'min' | 'max' | 'mean' | 'median' | 'unique' | 'count';
  aggregatedCell?: (info: { getValue: () => unknown }) => React.ReactNode;
  size?: number;
  minSize?: number;
  maxSize?: number;
  align?: 'left' | 'center' | 'right';
  editable?: boolean;
  editComponent?: React.ComponentType<{
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  }>;
}

export interface DataGridProps<TData> {
  /** Data array */
  data: TData[];
  /** Column definitions */
  columns: DataGridColumn<TData>[];
  /** Unique row ID accessor */
  getRowId?: (row: TData) => string;

  // Sorting
  /** Enable sorting */
  enableSorting?: boolean;
  /** Enable multi-column sorting */
  enableMultiSort?: boolean;
  /** Controlled sorting state */
  sorting?: SortingState;
  /** Sorting change handler */
  onSortingChange?: (updater: Updater<SortingState>) => void;

  // Filtering
  /** Enable column filtering */
  enableFiltering?: boolean;
  /** Enable global filtering */
  enableGlobalFilter?: boolean;
  /** Global filter value */
  globalFilter?: string;
  /** Global filter change handler */
  onGlobalFilterChange?: (value: string) => void;
  /** Column filters state */
  columnFilters?: ColumnFiltersState;
  /** Column filters change handler */
  onColumnFiltersChange?: (updater: Updater<ColumnFiltersState>) => void;

  // Pagination
  /** Enable pagination */
  enablePagination?: boolean;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Controlled pagination state */
  pagination?: PaginationState;
  /** Pagination change handler */
  onPaginationChange?: (updater: Updater<PaginationState>) => void;
  /** Total row count for server-side pagination */
  rowCount?: number;
  /** Manual pagination mode */
  manualPagination?: boolean;

  // Row Selection
  /** Enable row selection */
  enableRowSelection?: boolean;
  /** Enable multi-row selection */
  enableMultiRowSelection?: boolean;
  /** Controlled selection state */
  rowSelection?: RowSelectionState;
  /** Selection change handler */
  onRowSelectionChange?: (updater: Updater<RowSelectionState>) => void;
  /** Row click handler */
  onRowClick?: (row: TData) => void;
  /** Row double click handler */
  onRowDoubleClick?: (row: TData) => void;

  // Row Expansion
  /** Enable row expansion */
  enableExpanding?: boolean;
  /** Render expanded row content */
  renderExpandedRow?: (row: TData) => React.ReactNode;
  /** Controlled expansion state */
  expanded?: ExpandedState;
  /** Expansion change handler */
  onExpandedChange?: (updater: Updater<ExpandedState>) => void;

  // Grouping
  /** Enable row grouping */
  enableGrouping?: boolean;
  /** Controlled grouping state */
  grouping?: GroupingState;
  /** Grouping change handler */
  onGroupingChange?: (updater: Updater<GroupingState>) => void;

  // Column Features
  /** Enable column resizing */
  enableColumnResizing?: boolean;
  /** Column resize mode */
  columnResizeMode?: ColumnResizeMode;
  /** Enable column pinning */
  enableColumnPinning?: boolean;
  /** Enable column reordering */
  enableColumnOrdering?: boolean;
  /** Enable column visibility toggle */
  enableColumnVisibility?: boolean;
  /** Controlled column visibility state */
  columnVisibility?: VisibilityState;
  /** Column visibility change handler */
  onColumnVisibilityChange?: (updater: Updater<VisibilityState>) => void;
  /** Controlled column order state */
  columnOrder?: ColumnOrderState;
  /** Column order change handler */
  onColumnOrderChange?: (updater: Updater<ColumnOrderState>) => void;
  /** Controlled column pinning state */
  columnPinning?: ColumnPinningState;
  /** Column pinning change handler */
  onColumnPinningChange?: (updater: Updater<ColumnPinningState>) => void;
  /** Controlled column sizing state */
  columnSizing?: ColumnSizingState;
  /** Column sizing change handler */
  onColumnSizingChange?: (updater: Updater<ColumnSizingState>) => void;

  // Cell Editing
  /** Enable cell editing */
  enableCellEditing?: boolean;
  /** Cell edit handler */
  onCellEdit?: (rowId: string, columnId: string, value: unknown) => void;

  // Virtualization
  /** Enable virtualization for large datasets */
  enableVirtualization?: boolean;
  /** Estimated row height for virtualization */
  estimateRowHeight?: number;
  /** Overscan count for virtualization */
  overscan?: number;

  // Appearance
  /** Grid height */
  height?: number | string;
  /** Enable striped rows */
  striped?: boolean;
  /** Enable row hover effect */
  hoverable?: boolean;
  /** Enable borders */
  bordered?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Show header */
  showHeader?: boolean;
  /** Show footer */
  showFooter?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Custom empty state renderer */
  renderEmpty?: () => React.ReactNode;

  // Toolbar
  /** Show toolbar */
  showToolbar?: boolean;
  /** Custom toolbar content */
  toolbarContent?: React.ReactNode;

  // Additional
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export interface DataGridRef<TData> {
  /** Get table instance */
  getTable: () => TanStackTable<TData>;
  /** Get selected rows */
  getSelectedRows: () => TData[];
  /** Clear selection */
  clearSelection: () => void;
  /** Reset all filters */
  resetFilters: () => void;
  /** Reset sorting */
  resetSorting: () => void;
  /** Export to CSV */
  exportToCSV: (filename?: string) => void;
  /** Scroll to row */
  scrollToRow: (index: number) => void;
}

// ============================================
// Sub-components
// ============================================

// Checkbox component
const IndeterminateCheckbox = memo(({
  indeterminate,
  checked,
  onChange,
  disabled,
  className,
}: {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <label className={`${styles.checkbox} ${className || ''}`}>
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxMark}>
        {indeterminate ? <Minus size={12} /> : checked ? <Check size={12} /> : null}
      </span>
    </label>
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

// Column filter component
const ColumnFilter = memo(({
  column,
  table,
}: {
  column: any;
  table: TanStackTable<any>;
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column, firstValue]
  );

  if (typeof firstValue === 'number') {
    return (
      <div className={styles.filterRange}>
        <input
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ])
          }
          placeholder="Min"
          className={styles.filterInput}
        />
        <input
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder="Max"
          className={styles.filterInput}
        />
      </div>
    );
  }

  return (
    <div className={styles.filterWrapper}>
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className={styles.filterInput}
        list={column.id + 'list'}
      />
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any, i: number) => (
          <option value={value} key={i} />
        ))}
      </datalist>
    </div>
  );
});

ColumnFilter.displayName = 'ColumnFilter';

// Editable cell component
const EditableCell = memo(({
  value: initialValue,
  row,
  column,
  onEdit,
  editComponent: EditComponent,
}: {
  value: unknown;
  row: Row<any>;
  column: any;
  onEdit?: (rowId: string, columnId: string, value: unknown) => void;
  editComponent?: React.ComponentType<any>;
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (value !== initialValue) {
      onEdit?.(row.id, column.id, value);
    }
  }, [value, initialValue, row.id, column.id, onEdit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  }, [handleBlur, initialValue]);

  if (!isEditing) {
    return (
      <div
        className={styles.editableCell}
        onDoubleClick={() => setIsEditing(true)}
      >
        {String(value ?? '')}
      </div>
    );
  }

  if (EditComponent) {
    return (
      <EditComponent
        value={value}
        onChange={setValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={String(value ?? '')}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={styles.editInput}
    />
  );
});

EditableCell.displayName = 'EditableCell';

// Column visibility dropdown
const ColumnVisibilityDropdown = memo(({
  table,
}: {
  table: TanStackTable<any>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.toolbarButton}
        onClick={() => setOpen(!open)}
        title="Toggle columns"
      >
        <Columns size={16} />
      </button>
      {open && (
        <>
          <div className={styles.dropdownBackdrop} onClick={() => setOpen(false)} />
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownHeader}>Toggle Columns</div>
            <label className={styles.dropdownItem}>
              <input
                type="checkbox"
                checked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
              />
              <span>Toggle All</span>
            </label>
            <div className={styles.dropdownDivider} />
            {table.getAllLeafColumns().map((column) => (
              <label key={column.id} className={styles.dropdownItem}>
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  disabled={!column.getCanHide()}
                />
                <span>{column.id}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

ColumnVisibilityDropdown.displayName = 'ColumnVisibilityDropdown';

// ============================================
// Main DataGrid Component
// ============================================

function DataGridInner<TData>(
  {
    data,
    columns: columnsProp,
    getRowId,

    // Sorting
    enableSorting = true,
    enableMultiSort = true,
    sorting: sortingProp,
    onSortingChange,

    // Filtering
    enableFiltering = true,
    enableGlobalFilter = true,
    globalFilter: globalFilterProp,
    onGlobalFilterChange,
    columnFilters: columnFiltersProp,
    onColumnFiltersChange,

    // Pagination
    enablePagination = true,
    pageSizeOptions = [10, 25, 50, 100],
    pagination: paginationProp,
    onPaginationChange,
    rowCount,
    manualPagination = false,

    // Row Selection
    enableRowSelection = false,
    enableMultiRowSelection = true,
    rowSelection: rowSelectionProp,
    onRowSelectionChange,
    onRowClick,
    onRowDoubleClick,

    // Row Expansion
    enableExpanding = false,
    renderExpandedRow,
    expanded: expandedProp,
    onExpandedChange,

    // Grouping
    enableGrouping = false,
    grouping: groupingProp,
    onGroupingChange,

    // Column Features
    enableColumnResizing = true,
    columnResizeMode = 'onChange',
    enableColumnPinning = true,
    enableColumnOrdering = false,
    enableColumnVisibility = true,
    columnVisibility: columnVisibilityProp,
    onColumnVisibilityChange,
    columnOrder: columnOrderProp,
    onColumnOrderChange,
    columnPinning: columnPinningProp,
    onColumnPinningChange,
    columnSizing: columnSizingProp,
    onColumnSizingChange,

    // Cell Editing
    enableCellEditing = false,
    onCellEdit,

    // Virtualization
    enableVirtualization = false,
    estimateRowHeight = 40,
    overscan = 10,

    // Appearance
    height = 600,
    striped = false,
    hoverable = true,
    bordered = true,
    compact = false,
    showHeader = true,
    showFooter = false,
    loading = false,
    emptyMessage = 'No data available',
    renderEmpty,

    // Toolbar
    showToolbar = true,
    toolbarContent,

    // Additional
    className,
    style,
  }: DataGridProps<TData>,
  ref: React.ForwardedRef<DataGridRef<TData>>
) {
  // State
  const [sorting, setSorting] = useState<SortingState>(sortingProp ?? []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(columnFiltersProp ?? []);
  const [globalFilter, setGlobalFilter] = useState<string>(globalFilterProp ?? '');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(rowSelectionProp ?? {});
  const [expanded, setExpanded] = useState<ExpandedState>(expandedProp ?? {});
  const [grouping, setGrouping] = useState<GroupingState>(groupingProp ?? []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(columnVisibilityProp ?? {});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(columnOrderProp ?? []);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(columnPinningProp ?? {});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(columnSizingProp ?? {});
  const [pagination, setPagination] = useState<PaginationState>(
    paginationProp ?? { pageIndex: 0, pageSize: pageSizeOptions[0] }
  );

  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Convert columns to TanStack format
  const columns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    const cols: ColumnDef<TData, unknown>[] = [];

    // Selection column
    if (enableRowSelection) {
      cols.push({
        id: '_select',
        size: 50,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            disabled={!row.getCanSelect()}
          />
        ),
      });
    }

    // Expansion column
    if (enableExpanding) {
      cols.push({
        id: '_expand',
        size: 50,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => null,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <button
              className={styles.expandButton}
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          ) : null,
      });
    }

    // Data columns
    columnsProp.forEach((col) => {
      const colDef: ColumnDef<TData, unknown> = {
        id: col.id,
        header: col.header,
        size: col.size ?? 150,
        minSize: col.minSize ?? 50,
        maxSize: col.maxSize ?? 500,
        enableSorting: col.enableSorting ?? enableSorting,
        enableColumnFilter: col.enableFiltering ?? enableFiltering,
        enableResizing: col.enableResizing ?? enableColumnResizing,
        enablePinning: col.enablePinning ?? enableColumnPinning,
        enableGrouping: col.enableGrouping ?? enableGrouping,
        enableHiding: col.enableHiding ?? true,
        aggregationFn: col.aggregationFn,
        aggregatedCell: col.aggregatedCell as any,
        cell: enableCellEditing && col.editable
          ? (info) => (
              <EditableCell
                value={info.getValue()}
                row={info.row}
                column={info.column}
                onEdit={onCellEdit}
                editComponent={col.editComponent}
              />
            )
          : col.cell
          ? (info) => col.cell!(info as any)
          : (info) => {
              const value = info.getValue();
              return value != null ? String(value) : '';
            },
        meta: {
          align: col.align,
        },
      };

      // Add accessor - either key or function
      if (col.accessorKey) {
        (colDef as any).accessorKey = col.accessorKey;
      } else if (col.accessorFn) {
        (colDef as any).accessorFn = col.accessorFn;
      }

      cols.push(colDef);
    });

    return cols;
  }, [
    columnsProp,
    enableRowSelection,
    enableExpanding,
    enableSorting,
    enableFiltering,
    enableColumnResizing,
    enableColumnPinning,
    enableGrouping,
    enableCellEditing,
    onCellEdit,
  ]);

  // Table instance
  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting: sortingProp ?? sorting,
      columnFilters: columnFiltersProp ?? columnFilters,
      globalFilter: globalFilterProp ?? globalFilter,
      rowSelection: rowSelectionProp ?? rowSelection,
      expanded: expandedProp ?? expanded,
      grouping: groupingProp ?? grouping,
      columnVisibility: columnVisibilityProp ?? columnVisibility,
      columnOrder: columnOrderProp ?? columnOrder,
      columnPinning: columnPinningProp ?? columnPinning,
      columnSizing: columnSizingProp ?? columnSizing,
      pagination: paginationProp ?? pagination,
    },
    onSortingChange: onSortingChange ?? setSorting,
    onColumnFiltersChange: onColumnFiltersChange ?? setColumnFilters,
    onGlobalFilterChange: onGlobalFilterChange ?? setGlobalFilter,
    onRowSelectionChange: onRowSelectionChange ?? setRowSelection,
    onExpandedChange: onExpandedChange ?? setExpanded,
    onGroupingChange: onGroupingChange ?? setGrouping,
    onColumnVisibilityChange: onColumnVisibilityChange ?? setColumnVisibility,
    onColumnOrderChange: onColumnOrderChange ?? setColumnOrder,
    onColumnPinningChange: onColumnPinningChange ?? setColumnPinning,
    onColumnSizingChange: onColumnSizingChange ?? setColumnSizing,
    onPaginationChange: onPaginationChange ?? setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering || enableGlobalFilter ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination && !manualPagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    getFacetedRowModel: enableFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering ? getFacetedUniqueValues() : undefined,
    getFacetedMinMaxValues: enableFiltering ? getFacetedMinMaxValues() : undefined,
    enableRowSelection,
    enableMultiRowSelection,
    enableSorting,
    enableMultiSort,
    enableColumnResizing,
    columnResizeMode,
    manualPagination,
    rowCount,
    getRowCanExpand: enableExpanding ? () => true : undefined,
  });

  // Virtualization
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => estimateRowHeight,
    overscan,
    enabled: enableVirtualization,
  });

  const virtualRows = enableVirtualization ? rowVirtualizer.getVirtualItems() : null;
  const totalSize = enableVirtualization ? rowVirtualizer.getTotalSize() : 0;

  // Ref methods
  useImperativeHandle(ref, () => ({
    getTable: () => table,
    getSelectedRows: () => table.getSelectedRowModel().rows.map((row) => row.original),
    clearSelection: () => table.resetRowSelection(),
    resetFilters: () => {
      table.resetColumnFilters();
      table.resetGlobalFilter();
    },
    resetSorting: () => table.resetSorting(),
    exportToCSV: (filename = 'export.csv') => {
      const headers = table
        .getAllLeafColumns()
        .filter((col) => col.id !== '_select' && col.id !== '_expand')
        .map((col) => col.id);

      const csvRows = [
        headers.join(','),
        ...table.getFilteredRowModel().rows.map((row) =>
          headers
            .map((header) => {
              const value = row.getValue(header);
              return typeof value === 'string' && value.includes(',')
                ? `"${value}"`
                : String(value ?? '');
            })
            .join(',')
        ),
      ];

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
    scrollToRow: (index: number) => {
      if (enableVirtualization) {
        rowVirtualizer.scrollToIndex(index);
      } else if (tableContainerRef.current) {
        const row = tableContainerRef.current.querySelector(`[data-row-index="${index}"]`);
        row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  }));

  // Render header cell
  const renderHeaderCell = useCallback((header: Header<TData, unknown>) => {
    const canSort = header.column.getCanSort();
    const sorted = header.column.getIsSorted();
    const canFilter = header.column.getCanFilter();
    const canPin = header.column.getCanPin();
    const isPinned = header.column.getIsPinned();
    const canResize = header.column.getCanResize();
    const align = (header.column.columnDef.meta as any)?.align ?? 'left';

    return (
      <th
        key={header.id}
        colSpan={header.colSpan}
        className={`${styles.th} ${styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${
          isPinned ? styles[`pinned${String(isPinned).charAt(0).toUpperCase() + String(isPinned).slice(1)}`] : ''
        }`}
        style={{
          width: header.getSize(),
          left: isPinned === 'left' ? header.getStart('left') : undefined,
          right: isPinned === 'right' ? header.getStart('right') : undefined,
        }}
      >
        {header.isPlaceholder ? null : (
          <div className={styles.thContent}>
            <div
              className={`${styles.thLabel} ${canSort ? styles.sortable : ''}`}
              onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {canSort && (
                <span className={styles.sortIcon}>
                  {sorted === 'asc' ? (
                    <ChevronUp size={14} />
                  ) : sorted === 'desc' ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronsUpDown size={14} />
                  )}
                </span>
              )}
            </div>
            {canPin && enableColumnPinning && (
              <button
                className={styles.pinButton}
                onClick={() => {
                  if (isPinned) {
                    header.column.pin(false);
                  } else {
                    header.column.pin('left');
                  }
                }}
                title={isPinned ? 'Unpin column' : 'Pin column'}
              >
                {isPinned ? <PinOff size={12} /> : <Pin size={12} />}
              </button>
            )}
            {canResize && (
              <div
                className={`${styles.resizer} ${
                  header.column.getIsResizing() ? styles.resizing : ''
                }`}
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
              />
            )}
          </div>
        )}
        {canFilter && enableFiltering && (
          <div className={styles.thFilter}>
            <ColumnFilter column={header.column} table={table} />
          </div>
        )}
      </th>
    );
  }, [table, enableColumnPinning, enableFiltering]);

  // Render row
  const renderRow = useCallback((row: Row<TData>, virtualRow?: { index: number; start: number; size: number }) => {
    const isSelected = row.getIsSelected();
    const isExpanded = row.getIsExpanded();
    const isGrouped = row.getIsGrouped();

    return (
      <React.Fragment key={row.id}>
        <tr
          className={`${styles.tr} ${isSelected ? styles.selected : ''} ${
            isGrouped ? styles.grouped : ''
          } ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''}`}
          data-row-index={row.index}
          onClick={() => onRowClick?.(row.original)}
          onDoubleClick={() => onRowDoubleClick?.(row.original)}
          style={
            virtualRow
              ? {
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                }
              : undefined
          }
        >
          {row.getVisibleCells().map((cell) => {
            const isPinned = cell.column.getIsPinned();
            const align = (cell.column.columnDef.meta as any)?.align ?? 'left';

            return (
              <td
                key={cell.id}
                className={`${styles.td} ${styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${
                  isPinned ? styles[`pinned${String(isPinned).charAt(0).toUpperCase() + String(isPinned).slice(1)}`] : ''
                }`}
                style={{
                  width: cell.column.getSize(),
                  left: isPinned === 'left' ? cell.column.getStart('left') : undefined,
                  right: isPinned === 'right' ? cell.column.getStart('right') : undefined,
                }}
              >
                {cell.getIsGrouped() ? (
                  <button
                    className={styles.groupToggle}
                    onClick={row.getToggleExpandedHandler()}
                  >
                    {row.getIsExpanded() ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
                  </button>
                ) : cell.getIsAggregated() ? (
                  flexRender(
                    cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                    cell.getContext()
                  )
                ) : cell.getIsPlaceholder() ? null : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </td>
            );
          })}
        </tr>
        {isExpanded && renderExpandedRow && (
          <tr className={styles.expandedRow}>
            <td colSpan={row.getVisibleCells().length} className={styles.expandedCell}>
              {renderExpandedRow(row.original)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }, [onRowClick, onRowDoubleClick, striped, hoverable, renderExpandedRow]);

  // Render pagination
  const renderPagination = useCallback(() => {
    const pageCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const totalRows = manualPagination ? (rowCount ?? 0) : table.getFilteredRowModel().rows.length;
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, totalRows);

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Showing {start} to {end} of {totalRows} entries
          {enableRowSelection && Object.keys(rowSelectionProp ?? rowSelection).length > 0 && (
            <span className={styles.selectionInfo}>
              ({Object.keys(rowSelectionProp ?? rowSelection).length} selected)
            </span>
          )}
        </div>
        <div className={styles.paginationControls}>
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className={styles.pageSizeSelect}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
          <div className={styles.paginationButtons}>
            <button
              className={styles.paginationButton}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </button>
            <span className={styles.pageInfo}>
              Page {pageIndex + 1} of {pageCount}
            </span>
            <button
              className={styles.paginationButton}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }, [table, manualPagination, rowCount, pageSizeOptions, enableRowSelection, rowSelectionProp, rowSelection]);

  // Class names
  const containerClass = useMemo(() => {
    return [
      styles.dataGrid,
      bordered && styles.bordered,
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [bordered, compact, className]);

  return (
    <div className={containerClass} style={style}>
      {/* Toolbar */}
      {showToolbar && (
        <div className={styles.toolbar}>
          {enableGlobalFilter && (
            <div className={styles.globalSearch}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                value={globalFilterProp ?? globalFilter}
                onChange={(e) => (onGlobalFilterChange ?? setGlobalFilter)(e.target.value)}
                placeholder="Search all columns..."
                className={styles.globalSearchInput}
              />
              {(globalFilterProp ?? globalFilter) && (
                <button
                  className={styles.clearSearch}
                  onClick={() => (onGlobalFilterChange ?? setGlobalFilter)('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}
          <div className={styles.toolbarActions}>
            {toolbarContent}
            {enableColumnVisibility && <ColumnVisibilityDropdown table={table} />}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div
        ref={tableContainerRef}
        className={styles.tableContainer}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
          </div>
        )}

        <table className={styles.table}>
          {showHeader && (
            <thead className={styles.thead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={styles.headerRow}>
                  {headerGroup.headers.map(renderHeaderCell)}
                </tr>
              ))}
            </thead>
          )}

          <tbody
            className={styles.tbody}
            style={enableVirtualization ? { height: `${totalSize}px`, position: 'relative' } : undefined}
          >
            {rows.length === 0 ? (
              <tr className={styles.emptyRow}>
                <td colSpan={table.getAllLeafColumns().length} className={styles.emptyCell}>
                  {renderEmpty ? renderEmpty() : (
                    <div className={styles.emptyState}>
                      <Filter size={48} className={styles.emptyIcon} />
                      <p>{emptyMessage}</p>
                    </div>
                  )}
                </td>
              </tr>
            ) : enableVirtualization && virtualRows ? (
              virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return renderRow(row, virtualRow);
              })
            ) : (
              rows.map((row) => renderRow(row))
            )}
          </tbody>

          {showFooter && (
            <tfoot className={styles.tfoot}>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id} className={styles.footerRow}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id} className={styles.footerCell}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && renderPagination()}
    </div>
  );
}

// Export with forwardRef
export const DataGrid = forwardRef(DataGridInner) as <TData>(
  props: DataGridProps<TData> & { ref?: React.ForwardedRef<DataGridRef<TData>> }
) => ReturnType<typeof DataGridInner>;

// Display name
(DataGrid as any).displayName = 'DataGrid';

export default DataGrid;
