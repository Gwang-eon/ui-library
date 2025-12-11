/**
 * DataGrid Component
 * Enterprise-grade data grid built on TanStack Table
 * Features: sorting, filtering, pagination, column resizing/pinning/reordering,
 *           row selection, expansion, grouping, cell editing, virtualization
 */
import React from 'react';
import { SortingState, ColumnFiltersState, VisibilityState, RowSelectionState, ExpandedState, GroupingState, ColumnOrderState, ColumnPinningState, ColumnSizingState, PaginationState, Row, Table as TanStackTable, ColumnResizeMode, Updater } from '@tanstack/react-table';
export interface DataGridColumn<TData> {
    id: string;
    header: string;
    accessorKey?: string;
    accessorFn?: (row: TData) => unknown;
    cell?: (info: {
        getValue: () => unknown;
        row: Row<TData>;
        column: unknown;
    }) => React.ReactNode;
    footer?: string | ((info: {
        column: unknown;
    }) => React.ReactNode);
    enableSorting?: boolean;
    enableFiltering?: boolean;
    enableResizing?: boolean;
    enablePinning?: boolean;
    enableGrouping?: boolean;
    enableHiding?: boolean;
    aggregationFn?: 'sum' | 'min' | 'max' | 'mean' | 'median' | 'unique' | 'count';
    aggregatedCell?: (info: {
        getValue: () => unknown;
    }) => React.ReactNode;
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
    /** Enable sorting */
    enableSorting?: boolean;
    /** Enable multi-column sorting */
    enableMultiSort?: boolean;
    /** Controlled sorting state */
    sorting?: SortingState;
    /** Sorting change handler */
    onSortingChange?: (updater: Updater<SortingState>) => void;
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
    /** Enable row expansion */
    enableExpanding?: boolean;
    /** Render expanded row content */
    renderExpandedRow?: (row: TData) => React.ReactNode;
    /** Controlled expansion state */
    expanded?: ExpandedState;
    /** Expansion change handler */
    onExpandedChange?: (updater: Updater<ExpandedState>) => void;
    /** Enable row grouping */
    enableGrouping?: boolean;
    /** Controlled grouping state */
    grouping?: GroupingState;
    /** Grouping change handler */
    onGroupingChange?: (updater: Updater<GroupingState>) => void;
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
    /** Enable cell editing */
    enableCellEditing?: boolean;
    /** Cell edit handler */
    onCellEdit?: (rowId: string, columnId: string, value: unknown) => void;
    /** Enable virtualization for large datasets */
    enableVirtualization?: boolean;
    /** Estimated row height for virtualization */
    estimateRowHeight?: number;
    /** Overscan count for virtualization */
    overscan?: number;
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
    /** Auto-fill columns to container width */
    autoFillColumns?: boolean;
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
    /** Show toolbar */
    showToolbar?: boolean;
    /** Custom toolbar content */
    toolbarContent?: React.ReactNode;
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
declare function DataGridInner<TData>({ data, columns: columnsProp, getRowId, enableSorting, enableMultiSort, sorting: sortingProp, onSortingChange, enableFiltering, enableGlobalFilter, globalFilter: globalFilterProp, onGlobalFilterChange, columnFilters: columnFiltersProp, onColumnFiltersChange, enablePagination, pageSizeOptions, pagination: paginationProp, onPaginationChange, rowCount, manualPagination, enableRowSelection, enableMultiRowSelection, rowSelection: rowSelectionProp, onRowSelectionChange, onRowClick, onRowDoubleClick, enableExpanding, renderExpandedRow, expanded: expandedProp, onExpandedChange, enableGrouping, grouping: groupingProp, onGroupingChange, enableColumnResizing, columnResizeMode, enableColumnPinning, enableColumnOrdering, enableColumnVisibility, columnVisibility: columnVisibilityProp, onColumnVisibilityChange, columnOrder: columnOrderProp, onColumnOrderChange, columnPinning: columnPinningProp, onColumnPinningChange, columnSizing: columnSizingProp, onColumnSizingChange, enableCellEditing, onCellEdit, enableVirtualization, estimateRowHeight, overscan, height, striped, hoverable, bordered, compact, autoFillColumns, showHeader, showFooter, loading, emptyMessage, renderEmpty, showToolbar, toolbarContent, className, style, }: DataGridProps<TData>, ref: React.ForwardedRef<DataGridRef<TData>>): import("react/jsx-runtime").JSX.Element;
export declare const DataGrid: <TData>(props: DataGridProps<TData> & {
    ref?: React.ForwardedRef<DataGridRef<TData>>;
}) => ReturnType<typeof DataGridInner>;
export default DataGrid;
