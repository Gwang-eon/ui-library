/**
 * DataGrid Component
 * Enterprise-grade data grid built on TanStack Table
 * Features: sorting, filtering, pagination, column resizing/pinning/reordering,
 *           row selection, expansion, grouping, cell editing, virtualization
 */
import React from 'react';
import { SortingState, ColumnFiltersState, VisibilityState, RowSelectionState, ExpandedState, GroupingState, ColumnOrderState, ColumnPinningState, ColumnSizingState, PaginationState, RowPinningState, Row, Table as TanStackTable, ColumnResizeMode, Updater } from '@tanstack/react-table';
export type FilterType = 'text' | 'number' | 'select' | 'multi-select' | 'date' | 'date-range';
export interface FilterOption {
    value: string;
    label: string;
}
export type EditorType = 'text' | 'number' | 'select' | 'date';
export interface EditorOption {
    value: string;
    label: string;
}
export interface ContextMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    divider?: boolean;
    shortcut?: string;
}
export interface ContextMenuContext<TData = unknown> {
    type: 'cell' | 'row' | 'header';
    rowData?: TData;
    rowIndex?: number;
    columnId?: string;
    cellValue?: unknown;
}
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
    /** Custom edit component - takes precedence over editorType */
    editComponent?: React.ComponentType<{
        value: unknown;
        onChange: (value: unknown) => void;
        onBlur: () => void;
        onKeyDown: (e: React.KeyboardEvent) => void;
    }>;
    /** Editor type for built-in editors */
    editorType?: EditorType;
    /** Options for select editor */
    editorOptions?: EditorOption[];
    /** Validation function - returns error message or null if valid */
    validateCell?: (value: unknown, row: TData) => string | null;
    /** Filter type for this column */
    filterType?: FilterType;
    /** Custom filter options for select/multi-select filters */
    filterOptions?: FilterOption[];
    /** Custom filter component */
    filterComponent?: React.ComponentType<{
        column: any;
        table: TanStackTable<any>;
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
    /** Selection mode: 'single' uses radio buttons, 'multiple' uses checkboxes */
    selectionMode?: 'single' | 'multiple';
    /** Function to determine if a row can be selected */
    getRowCanSelect?: (row: TData) => boolean;
    /** Enable sub-row selection (when parent is selected, children are also selected) */
    enableSubRowSelection?: boolean;
    /** Select all mode: 'all' selects all rows, 'page' selects current page only */
    selectAllMode?: 'all' | 'page';
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
    /** Get sub-rows for hierarchical data (tree structure) */
    getSubRows?: (row: TData) => TData[] | undefined;
    /** Initial expanded state - true expands all, object for specific rows */
    defaultExpanded?: ExpandedState | true;
    /** Show expand/collapse all button in toolbar */
    enableExpandAll?: boolean;
    /** Controlled expansion state */
    expanded?: ExpandedState;
    /** Expansion change handler */
    onExpandedChange?: (updater: Updater<ExpandedState>) => void;
    /** Enable row grouping */
    enableGrouping?: boolean;
    /** Grouped column display mode: 'reorder' moves to first, 'remove' hides column, false keeps in place */
    groupedColumnMode?: 'reorder' | 'remove' | false;
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
    /** Enable row pinning */
    enableRowPinning?: boolean;
    /** Controlled row pinning state */
    rowPinning?: RowPinningState;
    /** Row pinning change handler */
    onRowPinningChange?: (updater: Updater<RowPinningState>) => void;
    /** Keep pinned rows visible when scrolling */
    keepPinnedRows?: boolean;
    /** Enable row drag and drop reordering */
    enableRowOrdering?: boolean;
    /** Row order change handler - receives new data array after reorder */
    onRowOrderChange?: (fromIndex: number, toIndex: number, newData: TData[]) => void;
    /** Enable column drag and drop reordering (UI enhancement for existing enableColumnOrdering) */
    enableColumnDrag?: boolean;
    /** Enable context menu on right-click */
    enableContextMenu?: boolean;
    /** Custom cell context menu items (overrides default) */
    cellContextMenuItems?: ContextMenuItem[];
    /** Custom row context menu items (overrides default) */
    rowContextMenuItems?: ContextMenuItem[];
    /** Custom header context menu items (overrides default) */
    headerContextMenuItems?: ContextMenuItem[];
    /** Context menu action handler */
    onContextMenuAction?: (actionId: string, context: ContextMenuContext<TData>) => void;
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
    /** Enable keyboard navigation between cells */
    enableKeyboardNavigation?: boolean;
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
declare function DataGridInner<TData>({ data, columns: columnsProp, getRowId, enableSorting, enableMultiSort, sorting: sortingProp, onSortingChange, enableFiltering, enableGlobalFilter, globalFilter: globalFilterProp, onGlobalFilterChange, columnFilters: columnFiltersProp, onColumnFiltersChange, enablePagination, pageSizeOptions, pagination: paginationProp, onPaginationChange, rowCount, manualPagination, enableRowSelection, enableMultiRowSelection, selectionMode, getRowCanSelect, enableSubRowSelection, selectAllMode, rowSelection: rowSelectionProp, onRowSelectionChange, onRowClick, onRowDoubleClick, enableExpanding, renderExpandedRow, getSubRows, defaultExpanded, enableExpandAll, expanded: expandedProp, onExpandedChange, enableGrouping, groupedColumnMode, grouping: groupingProp, onGroupingChange, enableColumnResizing, columnResizeMode, enableColumnPinning, enableColumnOrdering, enableColumnVisibility, columnVisibility: columnVisibilityProp, onColumnVisibilityChange, columnOrder: columnOrderProp, onColumnOrderChange, columnPinning: columnPinningProp, onColumnPinningChange, columnSizing: columnSizingProp, onColumnSizingChange, enableCellEditing, onCellEdit, enableRowPinning, rowPinning: rowPinningProp, onRowPinningChange, keepPinnedRows, enableRowOrdering, onRowOrderChange, enableColumnDrag, enableContextMenu, cellContextMenuItems, rowContextMenuItems, headerContextMenuItems, onContextMenuAction, enableVirtualization, estimateRowHeight, overscan, height, striped, hoverable, bordered, compact, showHeader, showFooter, loading, emptyMessage, renderEmpty, showToolbar, toolbarContent, enableKeyboardNavigation, className, style, }: DataGridProps<TData>, ref: React.ForwardedRef<DataGridRef<TData>>): import("react/jsx-runtime").JSX.Element;
export declare const DataGrid: <TData>(props: DataGridProps<TData> & {
    ref?: React.ForwardedRef<DataGridRef<TData>>;
}) => ReturnType<typeof DataGridInner>;
export default DataGrid;
