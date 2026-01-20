/**
 * DataGrid Types
 * Type definitions for the DataGrid component
 */

import React from 'react';
import {
  Row,
  Table as TanStackTable,
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
  RowPinningState,
  ColumnResizeMode,
  Updater,
} from '@tanstack/react-table';

// ============================================
// Filter Types
// ============================================

export type FilterType = 'text' | 'number' | 'select' | 'multi-select' | 'date' | 'date-range';

export interface FilterOption {
  value: string;
  label: string;
}

// ============================================
// Editor Types
// ============================================

export type EditorType = 'text' | 'number' | 'select' | 'date';

export interface EditorOption {
  value: string;
  label: string;
}

// ============================================
// Context Menu Types
// ============================================

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
  danger?: boolean;
}

export interface ContextMenuContext<TData = unknown> {
  type: 'cell' | 'row' | 'header';
  rowData?: TData;
  rowIndex?: number;
  columnId?: string;
  cellValue?: unknown;
}

// ============================================
// Column Definition
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

// ============================================
// Main Props
// ============================================

export interface DataGridProps<TData> {
  /** Data array */
  data: TData[];
  /** Column definitions */
  columns: DataGridColumn<TData>[];
  /** Unique row ID accessor */
  getRowId?: (row: TData) => string;
  /** Accessible label for the grid */
  'aria-label'?: string;

  // Sorting
  /** Enable sorting */
  enableSorting?: boolean;
  /** Enable multi-column sorting */
  enableMultiSort?: boolean;
  /** Controlled sorting state */
  sorting?: SortingState;
  /** Sorting change handler */
  onSortingChange?: (updater: Updater<SortingState>) => void;
  /** Manual sorting mode - disable client-side sorting, handle in server */
  manualSorting?: boolean;

  // Filtering
  /** Enable column filtering */
  enableFiltering?: boolean;
  /** Show column filters in header (controlled) */
  showColumnFilters?: boolean;
  /** Callback when column filter visibility changes */
  onShowColumnFiltersChange?: (show: boolean) => void;
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
  /** Manual filtering mode - disable client-side filtering, handle in server */
  manualFiltering?: boolean;
  /** Enable fuzzy filtering for global search (uses match-sorter-utils) */
  enableFuzzyFilter?: boolean;

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

  // Row Expansion
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

  // Grouping
  /** Enable row grouping */
  enableGrouping?: boolean;
  /** Grouped column display mode: 'reorder' moves to first, 'remove' hides column, false keeps in place */
  groupedColumnMode?: 'reorder' | 'remove' | false;
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

  // Row Pinning
  /** Enable row pinning */
  enableRowPinning?: boolean;
  /** Controlled row pinning state */
  rowPinning?: RowPinningState;
  /** Row pinning change handler */
  onRowPinningChange?: (updater: Updater<RowPinningState>) => void;
  /** Keep pinned rows visible when scrolling */
  keepPinnedRows?: boolean;

  // Drag & Drop
  /** Enable row drag and drop reordering */
  enableRowOrdering?: boolean;
  /** Row order change handler - receives new data array after reorder */
  onRowOrderChange?: (fromIndex: number, toIndex: number, newData: TData[]) => void;
  /** Enable column drag and drop reordering (UI enhancement for existing enableColumnOrdering) */
  enableColumnDrag?: boolean;

  // Context Menu
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

  // Clipboard
  /** Enable clipboard operations (Ctrl+C to copy, Ctrl+V to paste) */
  enableClipboard?: boolean;
  /** Enable range selection for clipboard operations */
  enableRangeSelection?: boolean;
  /** Paste handler - receives parsed data and start position */
  onPaste?: (data: string[][], startRowIndex: number, startColumnId: string) => void;
  /** Copy handler - called when data is copied */
  onCopy?: (data: string[][], selectedCells: { rowIndex: number; columnId: string }[]) => void;

  // Virtualization
  /** Enable row virtualization for large datasets */
  enableVirtualization?: boolean;
  /** Enable column virtualization for many columns */
  enableColumnVirtualization?: boolean;
  /** Estimated row height for virtualization */
  estimateRowHeight?: number;
  /** Estimated column width for column virtualization */
  estimateColumnWidth?: number;
  /** Overscan count for virtualization */
  overscan?: number;
  /** Virtual page size - number of visible rows in virtualized view */
  virtualPageSize?: number;
  /** Virtual page size options for selector */
  virtualPageSizeOptions?: number[];
  /** Callback when virtual page size changes */
  onVirtualPageSizeChange?: (size: number) => void;

  // Auto Column Sizing
  /** Auto-size columns based on content. true for all columns, or array of column IDs */
  autoSizeColumns?: boolean | string[];
  /** How to handle remaining space after auto-sizing: 'last' fills last column, 'distribute' spreads among all, 'none' leaves empty */
  fillRemainingSpace?: 'last' | 'distribute' | 'none';
  /** Maximum characters to consider when calculating auto-size (for performance) */
  autoSizeMaxSampleRows?: number;
  /** Padding to add to auto-calculated width (in pixels) */
  autoSizePadding?: number;

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

  // Keyboard Navigation
  /** Enable keyboard navigation between cells */
  enableKeyboardNavigation?: boolean;

  // Additional
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

// ============================================
// Export Types
// ============================================

export interface ExportOptions {
  /** Export only selected rows (if any selected) or all rows */
  selectedOnly?: boolean;
  /** Include headers in export */
  includeHeaders?: boolean;
  /** Custom column headers map */
  headerMap?: Record<string, string>;
  /** Columns to exclude from export */
  excludeColumns?: string[];
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
  exportToCSV: (filename?: string, options?: ExportOptions) => void;
  /** Export to TSV (tab-separated) */
  exportToTSV: (filename?: string, options?: ExportOptions) => void;
  /** Export to JSON */
  exportToJSON: (filename?: string, options?: ExportOptions) => void;
  /** Export to Excel (requires xlsx library) */
  exportToExcel: (filename?: string, options?: ExportOptions) => Promise<void>;
  /** Get export data as 2D array */
  getExportData: (options?: ExportOptions) => { headers: string[]; data: unknown[][] };
  /** Scroll to row */
  scrollToRow: (index: number) => void;
  /** Copy selected cells/rows to clipboard */
  copyToClipboard: () => void;
  /** Get selected cell range */
  getSelectedRange: () => { rowIndex: number; columnId: string }[];
  /** Clear cell selection */
  clearCellSelection: () => void;
}

// ============================================
// Cell Position
// ============================================

export interface CellPosition {
  rowIndex: number;
  columnId: string;
}

// ============================================
// Internal Types (for sub-components)
// ============================================

export interface ContextMenuState<TData> {
  x: number;
  y: number;
  type: 'cell' | 'row' | 'header';
  context: ContextMenuContext<TData>;
}

export interface DraggableHeaderCellProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface DraggableRowProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SortableRowProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface GridCellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
  onClick?: (e: React.MouseEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
}

export interface GridRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onAction: (actionId: string) => void;
  onClose: () => void;
}

export interface EditableCellProps<TData> {
  value: unknown;
  row: Row<TData>;
  columnId: string;
  editorType?: EditorType;
  editorOptions?: EditorOption[];
  editComponent?: React.ComponentType<{
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  }>;
  validateCell?: (value: unknown, row: TData) => string | null;
  onSave: (value: unknown) => void;
  onCancel: () => void;
}
