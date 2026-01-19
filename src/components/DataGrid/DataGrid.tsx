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
import { createPortal } from 'react-dom';
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
  RowPinningState,
  Row,
  Header,
  Table as TanStackTable,
  ColumnResizeMode,
  Updater,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  Expand,
  Shrink,
  GripVertical,
  Copy,
  Trash2,
  ArrowUpDown,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  MoreHorizontal,
} from 'lucide-react';
import { Select } from '../Select';
import { Input } from '../Input';
import { DatePicker } from '../Calendar/DatePicker';
import { DateRangePicker } from '../Calendar/DateRangePicker';
import styles from './DataGrid.module.css';

// ============================================
// Constants - Default Props
// ============================================

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
const DEFAULT_ESTIMATE_ROW_HEIGHT = 40;
const DEFAULT_ESTIMATE_COLUMN_WIDTH = 150;
const DEFAULT_OVERSCAN = 10;
const DEFAULT_HEIGHT = 600;
const DEFAULT_EMPTY_MESSAGE = 'No data available';

// ============================================
// DebouncedInput Component
// Official TanStack Table pattern for filter inputs
// Uses local state to avoid re-render issues
// ============================================

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  // Sync with external value
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounced onChange
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// Page size select component with portal for overflow handling
const PageSizeSelect = ({
  value,
  options,
  onChange,
}: {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScroll = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = useCallback((size: number) => {
    onChange(size);
    setIsOpen(false);
  }, [onChange]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.pageSizeSelectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value} / page</span>
        <ChevronDown size={14} />
      </button>
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className={styles.pageSizeSelectDropdown}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            minWidth: position.width,
            zIndex: 9999,
          }}
        >
          {options.map((size) => (
            <div
              key={size}
              className={`${styles.pageSizeSelectOption} ${size === value ? styles.selected : ''}`}
              onClick={() => handleSelect(size)}
            >
              {size} / page
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

// ============================================
// Types
// ============================================

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

// Context Menu Types
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

// Cell position for range selection
export interface CellPosition {
  rowIndex: number;
  columnId: string;
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

// Radio button component for single selection
const RadioButton = memo(({
  checked,
  onChange,
  disabled,
  className,
}: {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <label className={`${styles.radio} ${className || ''}`}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.radioInput}
      />
      <span className={styles.radioMark}>
        {checked && <span className={styles.radioInner} />}
      </span>
    </label>
  );
});

RadioButton.displayName = 'RadioButton';

// Draggable Header Cell for column reordering
interface DraggableHeaderCellProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const DraggableHeaderCell = memo(({ id, children, disabled = false }: DraggableHeaderCellProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled ? 'default' : 'grab',
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.draggableHeader} ${isDragging ? styles.dragging : ''}`}
      {...attributes}
      {...listeners}
    >
      {!disabled && (
        <span className={styles.dragHandle}>
          <GripVertical size={14} />
        </span>
      )}
      {children}
    </div>
  );
});

DraggableHeaderCell.displayName = 'DraggableHeaderCell';

// Draggable Row for row reordering
interface DraggableRowProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DraggableRow = memo(({ id, children, disabled = false, className = '', style: rowStyle = {} }: DraggableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style: React.CSSProperties = {
    ...rowStyle,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? styles.draggingRow : ''}`}
      {...attributes}
      role="row"
    >
      {/* Drag handle cell */}
      <div className={styles.gridDragHandleCell} {...listeners} role="gridcell">
        <GripVertical size={16} className={styles.rowDragHandle} />
      </div>
      {children}
    </div>
  );
});

DraggableRow.displayName = 'DraggableRow';

// Sortable Row component using useSortable hook (div-based)
interface SortableRowProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-row-index'?: number;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const SortableRow = memo(({ id, children, className = '', style: rowStyle = {}, ...props }: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    ...rowStyle,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? 'var(--color-background-subtle)' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? styles.draggingRow : ''}`}
      {...attributes}
      {...props}
      role="row"
    >
      {children}
    </div>
  );
});

SortableRow.displayName = 'SortableRow';

// Row Drag Handle component - just the handle cell (div-based)
const RowDragHandle = memo(({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({ id: rowId });

  return (
    <div className={styles.gridDragHandleCell} {...attributes} {...listeners} role="gridcell">
      <GripVertical size={16} className={styles.rowDragHandle} />
    </div>
  );
});

RowDragHandle.displayName = 'RowDragHandle';

// ============================================
// Memoized Grid Cell Component (Performance)
// Event handlers are delegated to grid body level
// ============================================
interface GridCellProps {
  cellId: string;
  className: string;
  style: React.CSSProperties;
  rowIndex: number;
  columnIndex: number;
  children: React.ReactNode;
}

const GridCell = memo(({
  cellId,
  className,
  style,
  rowIndex,
  columnIndex,
  children,
}: GridCellProps) => {
  return (
    <div
      className={className}
      style={style}
      role="gridcell"
      data-row-index={rowIndex}
      data-column-index={columnIndex}
    >
      {children}
    </div>
  );
});

GridCell.displayName = 'GridCell';

// ============================================
// Memoized Grid Row Component (Performance)
// ============================================
interface GridRowProps {
  rowId: string;
  className: string;
  style?: React.CSSProperties;
  isSelected: boolean;
  rowIndex: number;
  children: React.ReactNode;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const GridRow = memo(({
  rowId,
  className,
  style,
  isSelected,
  rowIndex,
  children,
  onClick,
  onDoubleClick,
}: GridRowProps) => {
  return (
    <div
      className={className}
      role="row"
      aria-selected={isSelected}
      data-row-index={rowIndex}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={style}
    >
      {children}
    </div>
  );
});

GridRow.displayName = 'GridRow';

// Context Menu Component
interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onAction: (actionId: string) => void;
  onClose: () => void;
}

const ContextMenu = memo(({ x, y, items, onAction, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position to stay within viewport
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = x;
      let newY = y;

      if (x + rect.width > viewportWidth) {
        newX = viewportWidth - rect.width - 10;
      }
      if (y + rect.height > viewportHeight) {
        newY = viewportHeight - rect.height - 10;
      }

      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  return (
    <div
      ref={menuRef}
      className={styles.contextMenu}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    >
      {items.map((item, index) => (
        item.divider ? (
          <div key={`divider-${index}`} className={styles.contextMenuDivider} />
        ) : (
          <button
            key={item.id}
            className={`${styles.contextMenuItem} ${item.disabled ? styles.contextMenuItemDisabled : ''}`}
            onClick={() => {
              if (!item.disabled) {
                onAction(item.id);
                onClose();
              }
            }}
            disabled={item.disabled}
          >
            {item.icon && <span className={styles.contextMenuIcon}>{item.icon}</span>}
            <span className={styles.contextMenuLabel}>{item.label}</span>
            {item.shortcut && <span className={styles.contextMenuShortcut}>{item.shortcut}</span>}
          </button>
        )
      ))}
    </div>
  );
});

ContextMenu.displayName = 'ContextMenu';

// Default context menu items
const getDefaultCellMenuItems = (): ContextMenuItem[] => [
  { id: 'copy', label: 'Copy', icon: <Copy size={14} />, shortcut: 'Ctrl+C' },
  { id: 'divider1', label: '', divider: true },
  { id: 'filter', label: 'Filter by value', icon: <Filter size={14} /> },
  { id: 'sort-asc', label: 'Sort A to Z', icon: <ArrowUpDown size={14} /> },
  { id: 'sort-desc', label: 'Sort Z to A', icon: <ArrowUpDown size={14} /> },
];

const getDefaultRowMenuItems = (isSelected: boolean): ContextMenuItem[] => [
  { id: 'select', label: isSelected ? 'Deselect row' : 'Select row', icon: isSelected ? <Square size={14} /> : <CheckSquare size={14} /> },
  { id: 'divider1', label: '', divider: true },
  { id: 'expand', label: 'Expand row', icon: <Expand size={14} /> },
  { id: 'pin-top', label: 'Pin to top', icon: <Pin size={14} /> },
  { id: 'pin-bottom', label: 'Pin to bottom', icon: <Pin size={14} /> },
  { id: 'unpin', label: 'Unpin row', icon: <PinOff size={14} /> },
  { id: 'divider2', label: '', divider: true },
  { id: 'delete', label: 'Delete row', icon: <Trash2 size={14} /> },
];

const getDefaultHeaderMenuItems = (isPinned: string | false): ContextMenuItem[] => [
  { id: 'sort-asc', label: 'Sort ascending', icon: <ChevronUp size={14} /> },
  { id: 'sort-desc', label: 'Sort descending', icon: <ChevronDown size={14} /> },
  { id: 'sort-clear', label: 'Clear sort', icon: <X size={14} /> },
  { id: 'divider1', label: '', divider: true },
  { id: 'pin', label: 'Pin column', icon: <Pin size={14} />, disabled: !!isPinned },
  { id: 'unpin', label: 'Unpin column', icon: <PinOff size={14} />, disabled: !isPinned },
  { id: 'divider2', label: '', divider: true },
  { id: 'hide', label: 'Hide column', icon: <EyeOff size={14} /> },
];

// Single select filter using Select component
const SingleSelectFilter = ({
  column,
  options: customOptions,
}: {
  column: any;
  options?: FilterOption[];
}) => {
  const columnFilterValue = column.getFilterValue() as string | undefined;
  const [facetedValues, setFacetedValues] = useState<Map<any, number>>(new Map());
  const columnRef = useRef(column);
  columnRef.current = column;

  // Safely get faceted values after mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const values = columnRef.current.getFacetedUniqueValues();
        if (values) setFacetedValues(values);
      } catch {
        // Ignore StrictMode errors
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Get options from faceted values or custom options
  const options = useMemo(() => {
    if (customOptions && customOptions.length > 0) {
      return customOptions;
    }
    const uniqueValues = Array.from(facetedValues.keys());
    return uniqueValues
      .filter((v): v is string | number => v != null)
      .map((value) => ({
        value: String(value),
        label: String(value),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [facetedValues, customOptions]);

  // Add "All" option at the beginning
  const selectOptions = useMemo(() => [
    { value: '', label: 'All' },
    ...options,
  ], [options]);

  const handleChange = useCallback((value: string, _option: { value: string; label: string } | null) => {
    column.setFilterValue(value || undefined);
  }, [column]);

  return (
    <div className={styles.filterWrapper}>
      <Select
        value={columnFilterValue ?? ''}
        options={selectOptions}
        onChange={handleChange}
        size="sm"
        placeholder="All"
        fullWidth
      />
    </div>
  );
};

// Multi select filter component (checkbox list)
const MultiSelectFilter = ({
  column,
  options: customOptions,
}: {
  column: any;
  options?: FilterOption[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const columnFilterValue = column.getFilterValue();
  const [facetedValues, setFacetedValues] = useState<Map<any, number>>(new Map());
  const columnRef = useRef(column);
  columnRef.current = column;

  // Safely get faceted values after mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const values = columnRef.current.getFacetedUniqueValues();
        if (values) setFacetedValues(values);
      } catch {
        // Ignore StrictMode errors
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Get options from faceted values or custom options
  const options = useMemo(() => {
    if (customOptions && customOptions.length > 0) {
      return customOptions;
    }
    const uniqueValues = Array.from(facetedValues.keys());
    return uniqueValues
      .filter((v): v is string | number => v != null)
      .map((value) => ({
        value: String(value),
        label: String(value),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [facetedValues.size, column.id, customOptions]);

  // Update dropdown position when opening
  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on window resize
  useEffect(() => {
    if (isOpen) {
      const handleResize = () => setIsOpen(false);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isOpen]);

  const selectedValues = useMemo(() => {
    if (!columnFilterValue) return [];
    if (Array.isArray(columnFilterValue)) return columnFilterValue;
    return [columnFilterValue];
  }, [columnFilterValue]);

  const handleSelect = useCallback((value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    column.setFilterValue(newValues.length > 0 ? newValues : undefined);
  }, [column, selectedValues]);

  const clearFilter = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    column.setFilterValue(undefined);
  }, [column]);

  const displayText = useMemo(() => {
    if (selectedValues.length === 0) return 'Select...';
    if (selectedValues.length === 1) {
      const opt = options.find((o) => o.value === selectedValues[0]);
      return opt?.label ?? selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  }, [selectedValues, options]);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  }, [isOpen, updatePosition]);

  return (
    <div className={styles.selectFilter}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.selectFilterTrigger}
        onClick={handleToggle}
      >
        <span className={styles.selectFilterText}>{displayText}</span>
        {selectedValues.length > 0 && (
          <span className={styles.selectFilterClear} onClick={clearFilter}>
            <X size={12} />
          </span>
        )}
        <ChevronDown size={14} className={styles.selectFilterIcon} />
      </button>
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className={styles.selectFilterDropdownPortal}
          style={{
            position: 'fixed',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            minWidth: 150,
          }}
        >
          {options.length === 0 ? (
            <div className={styles.selectFilterEmpty}>No options</div>
          ) : (
            options.map((option) => {
              const isChecked = selectedValues.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={`${styles.selectFilterOption} ${isChecked ? styles.selected : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxMark}>
                      {isChecked && <Check size={12} />}
                    </span>
                  </label>
                  <span>{option.label}</span>
                </div>
              );
            })
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

// Helper functions for date conversion
const dateToString = (date: Date | null): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const stringToDate = (str: string): Date | null => {
  if (!str) return null;
  const [year, month, day] = str.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month - 1, day);
};

// Date filter component
const DateFilter = memo(({
  column,
  isRange = false,
}: {
  column: any;
  isRange?: boolean;
}) => {
  const columnFilterValue = column.getFilterValue();

  const handleSingleDateChange = useCallback((date: Date | null) => {
    column.setFilterValue(date ? dateToString(date) : undefined);
  }, [column]);

  const handleRangeDateChange = useCallback((range: { startDate: Date | null; endDate: Date | null }) => {
    const startStr = range.startDate ? dateToString(range.startDate) : '';
    const endStr = range.endDate ? dateToString(range.endDate) : '';
    if (!startStr && !endStr) {
      column.setFilterValue(undefined);
    } else {
      column.setFilterValue([startStr, endStr]);
    }
  }, [column]);

  if (isRange) {
    const [startDateStr, endDateStr] = (columnFilterValue as [string, string]) ?? ['', ''];
    return (
      <div className={styles.filterWrapper}>
        <DateRangePicker
          startDate={stringToDate(startDateStr)}
          endDate={stringToDate(endDateStr)}
          onChange={handleRangeDateChange}
          size="sm"
          clearable
          showPresets={false}
          startPlaceholder="Start"
          endPlaceholder="End"
        />
      </div>
    );
  }

  return (
    <div className={styles.filterWrapper}>
      <DatePicker
        value={stringToDate((columnFilterValue as string) ?? '')}
        onChange={handleSingleDateChange}
        size="sm"
        clearable
        placeholder="Select date"
      />
    </div>
  );
});

DateFilter.displayName = 'DateFilter';

// Column filter component - main dispatcher
const ColumnFilter = memo(({
  column,
  table,
}: {
  column: any;
  table: TanStackTable<any>;
}) => {
  const columnDef = column.columnDef;
  const filterType: FilterType = columnDef.meta?.filterType ?? columnDef.filterType;
  const filterOptions: FilterOption[] | undefined = columnDef.meta?.filterOptions ?? columnDef.filterOptions;
  const FilterComponent = columnDef.meta?.filterComponent ?? columnDef.filterComponent;

  // Custom filter component takes precedence
  if (FilterComponent) {
    return <FilterComponent column={column} table={table} />;
  }

  // Route to appropriate filter based on filterType
  switch (filterType) {
    case 'select':
      return <SingleSelectFilter column={column} options={filterOptions} />;
    case 'multi-select':
      return <MultiSelectFilter column={column} options={filterOptions} />;
    case 'date':
      return <DateFilter column={column} isRange={false} />;
    case 'date-range':
      return <DateFilter column={column} isRange={true} />;
    case 'number':
      return <NumberRangeFilter column={column} />;
    case 'text':
    default:
      // Auto-detect based on data type
      const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

      if (typeof firstValue === 'number') {
        return <NumberRangeFilter column={column} />;
      }

      return <TextFilter column={column} />;
  }
});

ColumnFilter.displayName = 'ColumnFilter';

// Number range filter component
const NumberRangeFilter = ({ column }: { column: any }) => {
  const columnFilterValue = column.getFilterValue() as [number, number] | undefined;
  const [minValue, setMinValue] = useState<string>(columnFilterValue?.[0]?.toString() ?? '');
  const [maxValue, setMaxValue] = useState<string>(columnFilterValue?.[1]?.toString() ?? '');
  const prevFilterValue = useRef(columnFilterValue);

  // Convert string to number, return undefined for empty/invalid
  const toNumber = useCallback((val: string): number | undefined => {
    if (val === '' || val === undefined || val === null) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, []);

  // Sync only when filter is externally cleared (e.g., "Clear all filters" button)
  useEffect(() => {
    // Only react when columnFilterValue actually changes to undefined from a non-undefined value
    if (prevFilterValue.current !== undefined && columnFilterValue === undefined) {
      setMinValue('');
      setMaxValue('');
    }
    prevFilterValue.current = columnFilterValue;
  }, [columnFilterValue]);

  // Debounced update
  useEffect(() => {
    const timeout = setTimeout(() => {
      const numMin = toNumber(minValue);
      const numMax = toNumber(maxValue);
      if (numMin === undefined && numMax === undefined) {
        column.setFilterValue(undefined);
      } else {
        column.setFilterValue([numMin, numMax]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [minValue, maxValue, column, toNumber]);

  return (
    <div className={styles.filterRange}>
      <Input
        type="text"
        inputMode="decimal"
        size="sm"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
        placeholder="Min"
      />
      <Input
        type="text"
        inputMode="decimal"
        size="sm"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
        placeholder="Max"
      />
    </div>
  );
};

// Text filter component
const TextFilter = ({ column }: { column: any }) => {
  const columnFilterValue = (column.getFilterValue() ?? '') as string;
  const [value, setValue] = useState(columnFilterValue);

  // Sync with external value
  useEffect(() => {
    setValue(columnFilterValue);
  }, [columnFilterValue]);

  // Debounced update
  useEffect(() => {
    const timeout = setTimeout(() => {
      column.setFilterValue(value || undefined);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, column]);

  return (
    <div className={styles.filterWrapper}>
      <Input
        type="text"
        size="sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        fullWidth
      />
    </div>
  );
};

// Editable cell component with validation and multiple editor types
const EditableCell = memo(({
  value: initialValue,
  row,
  column,
  onEdit,
  editComponent: EditComponent,
  editorType = 'text',
  editorOptions,
  validateCell,
}: {
  value: unknown;
  row: Row<any>;
  column: any;
  onEdit?: (rowId: string, columnId: string, value: unknown) => void;
  editComponent?: React.ComponentType<any>;
  editorType?: EditorType;
  editorOptions?: EditorOption[];
  validateCell?: (value: unknown, row: any) => string | null;
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus();
        if (editorType === 'text' || editorType === 'number') {
          inputRef.current.select();
        }
      } else if (selectRef.current) {
        selectRef.current.focus();
      }
    }
  }, [isEditing, editorType]);

  const validate = useCallback((val: unknown): string | null => {
    if (!validateCell) return null;
    return validateCell(val, row.original);
  }, [validateCell, row.original]);

  const handleSave = useCallback(() => {
    const validationError = validate(value);
    if (validationError) {
      setError(validationError);
      return false;
    }
    setIsEditing(false);
    setError(null);
    if (value !== initialValue) {
      onEdit?.(row.id, column.id, value);
    }
    return true;
  }, [value, initialValue, row.id, column.id, onEdit, validate]);

  const handleBlur = useCallback(() => {
    handleSave();
  }, [handleSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setError(null);
      setIsEditing(false);
    }
  }, [handleSave, initialValue]);

  const handleChange = useCallback((newValue: unknown) => {
    setValue(newValue);
    // Clear error on change
    if (error) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  }, [error, validate]);

  // Format display value based on editor type
  const formatDisplayValue = (val: unknown): string => {
    if (val == null) return '';
    if (editorType === 'select' && editorOptions) {
      const option = editorOptions.find(opt => opt.value === val);
      return option?.label ?? String(val);
    }
    if (editorType === 'date' && val instanceof Date) {
      return val.toLocaleDateString();
    }
    return String(val);
  };

  if (!isEditing) {
    return (
      <div
        className={styles.editableCell}
        onDoubleClick={() => setIsEditing(true)}
      >
        {formatDisplayValue(value)}
      </div>
    );
  }

  // Custom edit component takes precedence
  if (EditComponent) {
    return (
      <div className={styles.editorWrapper}>
        <EditComponent
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {error && <div className={styles.editorError}>{error}</div>}
      </div>
    );
  }

  // Built-in editor types
  const renderEditor = () => {
    switch (editorType) {
      case 'number':
        return (
          <input
            ref={inputRef}
            type="number"
            value={value != null ? String(value) : ''}
            onChange={(e) => handleChange(e.target.value === '' ? null : Number(e.target.value))}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editInput} ${error ? styles.editInputError : ''}`}
          />
        );

      case 'select':
        return (
          <select
            ref={selectRef}
            value={String(value ?? '')}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editSelect} ${error ? styles.editInputError : ''}`}
          >
            {editorOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            ref={inputRef}
            type="date"
            value={value instanceof Date ? value.toISOString().split('T')[0] : String(value ?? '')}
            onChange={(e) => handleChange(e.target.value ? new Date(e.target.value) : null)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editInput} ${error ? styles.editInputError : ''}`}
          />
        );

      case 'text':
      default:
        return (
          <input
            ref={inputRef}
            type="text"
            value={String(value ?? '')}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.editInput} ${error ? styles.editInputError : ''}`}
          />
        );
    }
  };

  return (
    <div className={styles.editorWrapper}>
      {renderEditor()}
      {error && <div className={styles.editorError}>{error}</div>}
    </div>
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
    manualSorting = false,

    // Filtering
    enableFiltering = true,
    showColumnFilters: showColumnFiltersProp,
    onShowColumnFiltersChange,
    enableGlobalFilter = true,
    globalFilter: globalFilterProp,
    onGlobalFilterChange,
    columnFilters: columnFiltersProp,
    onColumnFiltersChange,
    manualFiltering = false,
    enableFuzzyFilter = false,

    // Pagination
    enablePagination = true,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS as unknown as number[],
    pagination: paginationProp,
    onPaginationChange,
    rowCount,
    manualPagination = false,

    // Row Selection
    enableRowSelection = false,
    enableMultiRowSelection = true,
    selectionMode = 'multiple',
    getRowCanSelect,
    enableSubRowSelection = true,
    selectAllMode = 'all',
    rowSelection: rowSelectionProp,
    onRowSelectionChange,
    onRowClick,
    onRowDoubleClick,

    // Row Expansion
    enableExpanding = false,
    renderExpandedRow,
    getSubRows,
    defaultExpanded,
    enableExpandAll = false,
    expanded: expandedProp,
    onExpandedChange,

    // Grouping
    enableGrouping = false,
    groupedColumnMode = 'reorder',
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

    // Row Pinning
    enableRowPinning = false,
    rowPinning: rowPinningProp,
    onRowPinningChange,
    keepPinnedRows = true,

    // Drag & Drop
    enableRowOrdering = false,
    onRowOrderChange,
    enableColumnDrag = false,

    // Context Menu
    enableContextMenu = false,
    cellContextMenuItems,
    rowContextMenuItems,
    headerContextMenuItems,
    onContextMenuAction,

    // Clipboard
    enableClipboard = false,
    enableRangeSelection = false,
    onPaste,
    onCopy,

    // Virtualization
    enableVirtualization = false,
    enableColumnVirtualization = false,
    estimateRowHeight = DEFAULT_ESTIMATE_ROW_HEIGHT,
    estimateColumnWidth = DEFAULT_ESTIMATE_COLUMN_WIDTH,
    overscan = DEFAULT_OVERSCAN,
    virtualPageSize,
    virtualPageSizeOptions = [20, 50, 100],
    onVirtualPageSizeChange,

    // Auto Column Sizing
    autoSizeColumns = false,
    fillRemainingSpace = 'last',
    autoSizeMaxSampleRows = 100,
    autoSizePadding = 16,

    // Appearance
    height: heightProp = DEFAULT_HEIGHT,
    striped = false,
    hoverable = true,
    bordered = true,
    compact = false,
    showHeader = true,
    showFooter = false,
    loading = false,
    emptyMessage = DEFAULT_EMPTY_MESSAGE,
    renderEmpty,

    // Toolbar
    showToolbar = true,
    toolbarContent,

    // Keyboard Navigation
    enableKeyboardNavigation = false,

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
  const [showColumnFiltersState, setShowColumnFiltersState] = useState<boolean>(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(rowSelectionProp ?? {});
  const [expanded, setExpanded] = useState<ExpandedState>(
    expandedProp ?? (defaultExpanded === true ? true : defaultExpanded ?? {})
  );
  const [grouping, setGrouping] = useState<GroupingState>(groupingProp ?? []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(columnVisibilityProp ?? {});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(columnOrderProp ?? []);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(columnPinningProp ?? {});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(columnSizingProp ?? {});
  const [rowPinning, setRowPinning] = useState<RowPinningState>(rowPinningProp ?? { top: [], bottom: [] });
  const [pagination, setPagination] = useState<PaginationState>(
    paginationProp ?? { pageIndex: 0, pageSize: pageSizeOptions[0] }
  );
  const [focusedCell, setFocusedCell] = useState<{
    rowIndex: number;
    columnIndex: number;
  } | null>(null);
  const focusedCellRef = useRef<{ rowIndex: number; columnIndex: number } | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  // Sync controlled props with internal state
  useEffect(() => {
    if (sortingProp !== undefined) {
      setSorting(sortingProp);
    }
  }, [sortingProp]);

  useEffect(() => {
    if (columnFiltersProp !== undefined) {
      setColumnFilters(columnFiltersProp);
    }
  }, [columnFiltersProp]);

  useEffect(() => {
    if (globalFilterProp !== undefined) {
      setGlobalFilter(globalFilterProp);
    }
  }, [globalFilterProp]);

  useEffect(() => {
    if (rowSelectionProp !== undefined) {
      setRowSelection(rowSelectionProp);
    }
  }, [rowSelectionProp]);

  useEffect(() => {
    if (expandedProp !== undefined) {
      setExpanded(expandedProp);
    }
  }, [expandedProp]);

  useEffect(() => {
    if (groupingProp !== undefined) {
      setGrouping(groupingProp);
    }
  }, [groupingProp]);

  useEffect(() => {
    if (columnVisibilityProp !== undefined) {
      setColumnVisibility(columnVisibilityProp);
    }
  }, [columnVisibilityProp]);

  useEffect(() => {
    if (columnOrderProp !== undefined) {
      setColumnOrder(columnOrderProp);
    }
  }, [columnOrderProp]);

  useEffect(() => {
    if (columnPinningProp !== undefined) {
      setColumnPinning(columnPinningProp);
    }
  }, [columnPinningProp]);

  useEffect(() => {
    if (columnSizingProp !== undefined) {
      setColumnSizing(columnSizingProp);
    }
  }, [columnSizingProp]);

  useEffect(() => {
    if (rowPinningProp !== undefined) {
      setRowPinning(rowPinningProp);
    }
  }, [rowPinningProp]);

  useEffect(() => {
    if (paginationProp !== undefined) {
      setPagination(paginationProp);
    }
  }, [paginationProp]);

  // Safe page index reset when data changes (replaces autoResetPageIndex)
  // This runs in useEffect to avoid StrictMode state update issues
  const dataLength = data.length;
  const currentPageSize = paginationProp?.pageSize ?? pagination.pageSize;
  const currentPageIndex = paginationProp?.pageIndex ?? pagination.pageIndex;

  useEffect(() => {
    if (!enablePagination) return;

    const maxPageIndex = Math.max(0, Math.ceil(dataLength / currentPageSize) - 1);
    if (currentPageIndex > maxPageIndex) {
      const newPagination = { pageIndex: maxPageIndex, pageSize: currentPageSize };
      if (onPaginationChange) {
        onPaginationChange(newPagination);
      } else {
        setPagination(newPagination);
      }
    }
  }, [dataLength, currentPageSize, currentPageIndex, enablePagination, onPaginationChange]);

  // Filter visibility (controlled or uncontrolled)
  const showColumnFilters = showColumnFiltersProp ?? showColumnFiltersState;

  useEffect(() => {
    if (showColumnFiltersProp !== undefined) {
      setShowColumnFiltersState(showColumnFiltersProp);
    }
  }, [showColumnFiltersProp]);

  const toggleColumnFilters = useCallback(() => {
    const newValue = !showColumnFilters;
    if (onShowColumnFiltersChange) {
      onShowColumnFiltersChange(newValue);
    }
    if (showColumnFiltersProp === undefined) {
      setShowColumnFiltersState(newValue);
    }
  }, [showColumnFilters, onShowColumnFiltersChange, showColumnFiltersProp]);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    type: 'cell' | 'row' | 'header';
    context: ContextMenuContext<TData>;
    items: ContextMenuItem[];
  } | null>(null);

  // Range selection state for clipboard
  const [rangeSelectionStart, setRangeSelectionStart] = useState<CellPosition | null>(null);
  const [rangeSelectionEnd, setRangeSelectionEnd] = useState<CellPosition | null>(null);
  const [selectedCells, setSelectedCells] = useState<CellPosition[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  // State-based ref for virtualization (triggers re-render when scroll element is available)
  const [virtualScrollElement, setVirtualScrollElement] = useState<HTMLDivElement | null>(null);

  // Internal state for virtual page size (controllable or uncontrolled)
  const [internalVirtualPageSize, setInternalVirtualPageSize] = useState(virtualPageSize ?? virtualPageSizeOptions[0] ?? 20);
  const effectiveVirtualPageSize = virtualPageSize ?? internalVirtualPageSize;

  // Calculate height based on virtualPageSize when virtualization is enabled
  const HEADER_HEIGHT = 48;
  const TOOLBAR_HEIGHT = showToolbar ? 56 : 0;
  const height = enableVirtualization && effectiveVirtualPageSize
    ? effectiveVirtualPageSize * estimateRowHeight + HEADER_HEIGHT + TOOLBAR_HEIGHT
    : heightProp;

  // Handle virtual page size change
  const handleVirtualPageSizeChange = useCallback((newSize: number) => {
    setInternalVirtualPageSize(newSize);
    onVirtualPageSizeChange?.(newSize);
  }, [onVirtualPageSizeChange]);

  // Ref callback for virtualization scroll element
  const handleVirtualScrollRef = useCallback((element: HTMLDivElement | null) => {
    setVirtualScrollElement(element);
  }, []);

  // Drag & Drop sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  // Ref for data to use in column auto-detection without causing re-renders
  const dataRef = useRef(data);
  dataRef.current = data;

  // Convert columns to TanStack format
  const columns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    const cols: ColumnDef<TData, unknown>[] = [];

    // Selection column
    if (enableRowSelection) {
      const isSingleSelection = selectionMode === 'single';
      cols.push({
        id: '_select',
        size: 50,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: ({ table }) => {
          // Single selection mode - no header checkbox/radio
          if (isSingleSelection) {
            return null;
          }
          // Multiple selection mode
          const isAllSelected = selectAllMode === 'page'
            ? table.getIsAllPageRowsSelected()
            : table.getIsAllRowsSelected();
          const isSomeSelected = selectAllMode === 'page'
            ? table.getIsSomePageRowsSelected()
            : table.getIsSomeRowsSelected();
          const toggleHandler = selectAllMode === 'page'
            ? table.getToggleAllPageRowsSelectedHandler()
            : table.getToggleAllRowsSelectedHandler();

          return (
            <IndeterminateCheckbox
              checked={isAllSelected}
              indeterminate={isSomeSelected}
              onChange={toggleHandler}
            />
          );
        },
        cell: ({ row, table }) => {
          if (isSingleSelection) {
            return (
              <RadioButton
                checked={row.getIsSelected()}
                onChange={() => {
                  // Clear all selections first, then select this row
                  table.resetRowSelection();
                  row.toggleSelected(true);
                }}
                disabled={!row.getCanSelect()}
              />
            );
          }
          return (
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
              disabled={!row.getCanSelect()}
            />
          );
        },
      });
    }

    // Row pinning column
    if (enableRowPinning) {
      cols.push({
        id: '_pin',
        size: 50,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => <Pin size={14} className={styles.pinHeaderIcon} />,
        cell: ({ row }) => {
          const isPinned = row.getIsPinned();
          return (
            <div className={styles.pinCell}>
              {isPinned ? (
                <button
                  className={`${styles.pinButton} ${styles.pinButtonActive}`}
                  onClick={() => row.pin(false)}
                  title="Unpin row"
                >
                  <PinOff size={14} />
                </button>
              ) : (
                <div className={styles.pinActions}>
                  <button
                    className={styles.pinButton}
                    onClick={() => row.pin('top')}
                    title="Pin to top"
                  >
                    <Pin size={14} style={{ transform: 'rotate(0deg)' }} />
                  </button>
                  <button
                    className={styles.pinButton}
                    onClick={() => row.pin('bottom')}
                    title="Pin to bottom"
                  >
                    <Pin size={14} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                </div>
              )}
            </div>
          );
        },
      });
    }

    // Expansion column (only for row expansion without tree structure)
    // For tree structure (getSubRows), expand button is integrated into first data column
    if (enableExpanding && !getSubRows) {
      cols.push({
        id: '_expand',
        size: 50,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => null,
        cell: ({ row }) => {
          const canExpand = row.getCanExpand();

          return (
            <div className={styles.expandCell}>
              {canExpand ? (
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
              ) : (
                <span className={styles.expandSpacer} />
              )}
            </div>
          );
        },
      });
    }

    // Data columns
    columnsProp.forEach((col, colIndex) => {
      // Determine filter function based on filterType or auto-detect from data
      let filterFn: string = 'includesString'; // Default filter function for text
      if (col.filterType === 'multi-select') {
        filterFn = 'multiSelect';
      } else if (col.filterType === 'select') {
        filterFn = 'equals';
      } else if (col.filterType === 'date-range') {
        filterFn = 'dateRange';
      } else if (col.filterType === 'date') {
        filterFn = 'dateExact';
      } else if (col.filterType === 'number') {
        filterFn = 'numberRange';
      } else if (!col.filterType) {
        // Auto-detect: check first row's value type (use dataRef to avoid dependency)
        const firstRow = dataRef.current[0];
        if (firstRow) {
          const value = col.accessorKey
            ? (firstRow as any)[col.accessorKey]
            : col.accessorFn
              ? col.accessorFn(firstRow)
              : undefined;
          if (typeof value === 'number') {
            filterFn = 'numberRange';
          }
        }
      }

      // Check if this is the first data column and tree structure is enabled
      const isFirstColumnWithTree = colIndex === 0 && getSubRows;

      // Create cell renderer - wrap with tree expand for first column in tree mode
      const createCellRenderer = () => {
        const baseRenderer = enableCellEditing && col.editable
          ? (info: any) => (
              <EditableCell
                value={info.getValue()}
                row={info.row}
                column={info.column}
                onEdit={onCellEdit}
                editComponent={col.editComponent}
                editorType={col.editorType}
                editorOptions={col.editorOptions}
                validateCell={col.validateCell as any}
              />
            )
          : col.cell
          ? (info: any) => col.cell!(info as any)
          : (info: any) => {
              const value = info.getValue();
              return value != null ? String(value) : '';
            };

        // Wrap first column with tree expand functionality
        if (isFirstColumnWithTree) {
          return (info: any) => {
            const row = info.row;
            const depth = row.depth;
            const canExpand = row.getCanExpand();
            const isExpanded = row.getIsExpanded();

            return (
              <div className={styles.treeCell} style={{ paddingLeft: `${depth * 20}px` }}>
                {canExpand ? (
                  <button
                    className={styles.expandButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      row.getToggleExpandedHandler()();
                    }}
                  >
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                ) : (
                  <span className={styles.expandSpacer} />
                )}
                <span className={styles.treeCellContent}>
                  {baseRenderer(info)}
                </span>
              </div>
            );
          };
        }

        return baseRenderer;
      };

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
        filterFn: filterFn as any,
        cell: createCellRenderer(),
        meta: {
          align: col.align,
          filterType: col.filterType,
          filterOptions: col.filterOptions,
          filterComponent: col.filterComponent,
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
    selectionMode,
    selectAllMode,
    enableRowPinning,
    enableExpanding,
    getSubRows,
    enableSorting,
    enableFiltering,
    enableColumnResizing,
    enableColumnPinning,
    enableGrouping,
    enableCellEditing,
    onCellEdit,
  ]);

  // Auto-size columns calculation
  const calculatedColumnSizing = useMemo<ColumnSizingState>(() => {
    if (!autoSizeColumns) return {};

    // Create a canvas context for measuring text width
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return {};

    // Set font to match the grid's font
    ctx.font = compact ? '12px system-ui, sans-serif' : '14px system-ui, sans-serif';

    const measureText = (text: string): number => {
      return ctx.measureText(text).width;
    };

    const sizing: ColumnSizingState = {};
    const columnsToAutoSize = autoSizeColumns === true
      ? columnsProp.map(c => c.id)
      : autoSizeColumns;

    // Sample rows for measurement (limit for performance)
    const sampleRows = data.slice(0, autoSizeMaxSampleRows);

    columnsProp.forEach((col) => {
      if (!columnsToAutoSize.includes(col.id)) return;

      // Measure header width
      const headerText = typeof col.header === 'string' ? col.header : col.id;
      let maxWidth = measureText(headerText);

      // Measure data width
      sampleRows.forEach((row) => {
        let cellValue: unknown;
        if (col.accessorKey) {
          cellValue = (row as any)[col.accessorKey];
        } else if (col.accessorFn) {
          cellValue = col.accessorFn(row);
        }

        if (cellValue != null) {
          const textWidth = measureText(String(cellValue));
          maxWidth = Math.max(maxWidth, textWidth);
        }
      });

      // Add padding and respect min/max constraints
      const calculatedSize = Math.ceil(maxWidth + autoSizePadding + (getSubRows && columnsProp[0]?.id === col.id ? 40 : 0));
      const minSize = col.minSize ?? 50;
      const maxSize = col.maxSize ?? 500;

      sizing[col.id] = Math.min(Math.max(calculatedSize, minSize), maxSize);
    });

    return sizing;
  }, [autoSizeColumns, columnsProp, data, autoSizeMaxSampleRows, autoSizePadding, compact, getSubRows]);

  // Merge auto-calculated sizes with controlled/state sizes
  const effectiveColumnSizing = useMemo<ColumnSizingState>(() => {
    const baseSizing = columnSizingProp ?? columnSizing;

    // If autoSizeColumns is enabled, use calculated sizes as defaults
    if (autoSizeColumns) {
      return { ...calculatedColumnSizing, ...baseSizing };
    }

    return baseSizing;
  }, [autoSizeColumns, calculatedColumnSizing, columnSizingProp, columnSizing]);

  // Table instance
  const table = useReactTable({
    data,
    columns,
    getRowId,
    // Disable auto-reset to prevent state updates during StrictMode double-render
    // See: https://github.com/TanStack/table/issues/5026
    autoResetPageIndex: false,
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
      columnSizing: effectiveColumnSizing,
      rowPinning: rowPinningProp ?? rowPinning,
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
    onRowPinningChange: onRowPinningChange ?? setRowPinning,
    onPaginationChange: onPaginationChange ?? setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting && !manualSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: (enableFiltering || enableGlobalFilter) && !manualFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination && !manualPagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel: enableExpanding || enableGrouping || getSubRows ? getExpandedRowModel() : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    groupedColumnMode: enableGrouping ? groupedColumnMode : undefined,
    getFacetedRowModel: enableFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering ? getFacetedUniqueValues() : undefined,
    getFacetedMinMaxValues: enableFiltering ? getFacetedMinMaxValues() : undefined,
    filterFns: {
      // Fuzzy filter function using match-sorter-utils
      fuzzy: (row, columnId, filterValue, addMeta) => {
        const itemRank = rankItem(String(row.getValue(columnId)), String(filterValue));
        addMeta({ itemRank });
        return itemRank.passed;
      },
      // Custom number range filter - handles both pure numbers and strings containing numbers
      numberRange: (row, columnId, filterValue: [number | undefined, number | undefined]) => {
        if (!filterValue || (filterValue[0] === undefined && filterValue[1] === undefined)) {
          return true;
        }
        const rawValue = row.getValue(columnId);
        // Parse number from value (handles "23.5°C", "$100", "50%", etc.)
        let numValue: number;
        if (typeof rawValue === 'number') {
          numValue = rawValue;
        } else if (typeof rawValue === 'string') {
          const parsed = parseFloat(rawValue.replace(/[^\d.-]/g, ''));
          if (isNaN(parsed)) return true; // Can't parse, include row
          numValue = parsed;
        } else {
          return true; // Unknown type, include row
        }
        const [min, max] = filterValue;
        if (min !== undefined && numValue < min) return false;
        if (max !== undefined && numValue > max) return false;
        return true;
      },
      // Custom filter function for multi-select
      multiSelect: (row, columnId, filterValue: string[]) => {
        if (!filterValue || filterValue.length === 0) return true;
        const value = String(row.getValue(columnId));
        return filterValue.includes(value);
      },
      // Custom filter function for date range
      dateRange: (row, columnId, filterValue: [string, string]) => {
        if (!filterValue || (!filterValue[0] && !filterValue[1])) return true;
        const value = row.getValue(columnId);
        if (!value) return false;
        const dateValue = new Date(value as string | number | Date);
        const [startStr, endStr] = filterValue;
        if (startStr) {
          const startDate = new Date(startStr);
          if (dateValue < startDate) return false;
        }
        if (endStr) {
          const endDate = new Date(endStr);
          endDate.setHours(23, 59, 59, 999);
          if (dateValue > endDate) return false;
        }
        return true;
      },
      // Custom filter function for exact date match
      dateExact: (row, columnId, filterValue: string) => {
        if (!filterValue) return true;
        const value = row.getValue(columnId);
        if (!value) return false;
        const dateValue = new Date(value as string | number | Date).toISOString().split('T')[0];
        return dateValue === filterValue;
      },
    },
    globalFilterFn: enableFuzzyFilter
      ? (row, columnId, filterValue, addMeta) => {
          const itemRank = rankItem(String(row.getValue(columnId)), String(filterValue));
          addMeta({ itemRank });
          return itemRank.passed;
        }
      : 'includesString',
    enableRowSelection: getRowCanSelect
      ? (row: Row<TData>) => getRowCanSelect(row.original)
      : enableRowSelection,
    enableMultiRowSelection: selectionMode === 'single' ? false : enableMultiRowSelection,
    enableSubRowSelection,
    enableSorting,
    enableMultiSort,
    enableColumnResizing,
    columnResizeMode,
    enableRowPinning,
    keepPinnedRows,
    manualSorting,
    manualFiltering,
    manualPagination,
    rowCount,
    getSubRows: getSubRows as any,
    getRowCanExpand: (enableExpanding || getSubRows)
      ? (row: Row<TData>) => (getSubRows ? (getSubRows(row.original)?.length ?? 0) > 0 : true)
      : undefined,
  });

  // Virtualization
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => virtualScrollElement,
    estimateSize: () => estimateRowHeight,
    overscan,
    enabled: enableVirtualization && virtualScrollElement !== null,
  });

  const virtualRows = enableVirtualization ? rowVirtualizer.getVirtualItems() : null;
  const totalSize = enableVirtualization ? rowVirtualizer.getTotalSize() : 0;

  // Force virtualizer to re-measure when scroll element becomes available
  useEffect(() => {
    if (enableVirtualization && virtualScrollElement) {
      // Small delay to ensure DOM has been laid out
      const timer = setTimeout(() => {
        rowVirtualizer.measure();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [enableVirtualization, virtualScrollElement, rowVirtualizer]);

  // Column virtualization
  const visibleColumns = table.getVisibleLeafColumns();
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    getScrollElement: () => virtualScrollElement,
    estimateSize: (index) => visibleColumns[index]?.getSize() ?? estimateColumnWidth,
    horizontal: true,
    overscan,
    enabled: enableColumnVirtualization && virtualScrollElement !== null,
  });

  // Note: Column virtualization is prepared but rendering integration is deferred
  // Use columnVirtualizer.getVirtualItems() and columnVirtualizer.getTotalSize() when implementing column virtualized rendering

  // Drag & Drop handlers for columns
  const handleColumnDragStart = useCallback((event: DragStartEvent) => {
    setActiveColumnId(event.active.id as string);
  }, []);

  const handleColumnDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveColumnId(null);

    if (over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
        setColumnOrder(newOrder);
        onColumnOrderChange?.(newOrder);
      }
    }
  }, [columnOrder, onColumnOrderChange]);

  // Drag & Drop handlers for rows
  const handleRowDragStart = useCallback((event: DragStartEvent) => {
    setActiveRowId(event.active.id as string);
  }, []);

  const handleRowDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveRowId(null);

    if (over && active.id !== over.id) {
      const oldIndex = rows.findIndex(row => row.id === active.id);
      const newIndex = rows.findIndex(row => row.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && onRowOrderChange) {
        const newData = arrayMove([...data], oldIndex, newIndex);
        onRowOrderChange(oldIndex, newIndex, newData);
      }
    }
  }, [rows, data, onRowOrderChange]);

  // Get column IDs for sortable context
  const columnIds = useMemo(() => {
    if (!enableColumnDrag) return [];
    return table.getVisibleLeafColumns()
      .filter(col => !col.id.startsWith('_')) // Exclude special columns
      .map(col => col.id);
  }, [enableColumnDrag, table]);

  // Get row IDs for sortable context
  const rowIds = useMemo(() => {
    if (!enableRowOrdering) return [];
    return rows.map(row => row.id);
  }, [enableRowOrdering, rows]);

  // Get visible column IDs for clipboard operations
  const visibleColumnIds = useMemo(() => {
    return table.getVisibleLeafColumns()
      .filter(col => !col.id.startsWith('_'))
      .map(col => col.id);
  }, [table]);

  // Calculate selected cells from range
  const calculateSelectedCells = useCallback((start: CellPosition | null, end: CellPosition | null): CellPosition[] => {
    if (!start || !end) return [];

    const minRowIndex = Math.min(start.rowIndex, end.rowIndex);
    const maxRowIndex = Math.max(start.rowIndex, end.rowIndex);
    const startColIndex = visibleColumnIds.indexOf(start.columnId);
    const endColIndex = visibleColumnIds.indexOf(end.columnId);
    const minColIndex = Math.min(startColIndex, endColIndex);
    const maxColIndex = Math.max(startColIndex, endColIndex);

    const cells: CellPosition[] = [];
    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
      for (let colIndex = minColIndex; colIndex <= maxColIndex; colIndex++) {
        cells.push({
          rowIndex,
          columnId: visibleColumnIds[colIndex],
        });
      }
    }
    return cells;
  }, [visibleColumnIds]);

  // Check if a cell is selected
  const isCellSelected = useCallback((rowIndex: number, columnId: string): boolean => {
    return selectedCells.some(cell => cell.rowIndex === rowIndex && cell.columnId === columnId);
  }, [selectedCells]);

  // Handle cell mouse down for range selection
  const handleCellMouseDown = useCallback((rowIndex: number, columnId: string, e: React.MouseEvent) => {
    if (!enableRangeSelection || columnId.startsWith('_')) return;

    // Only left click
    if (e.button !== 0) return;

    // Prevent text selection
    e.preventDefault();

    const position: CellPosition = { rowIndex, columnId };

    if (e.shiftKey && rangeSelectionStart) {
      // Extend selection with shift+click
      setRangeSelectionEnd(position);
      const cells = calculateSelectedCells(rangeSelectionStart, position);
      setSelectedCells(cells);
    } else {
      // Start new selection
      setRangeSelectionStart(position);
      setRangeSelectionEnd(position);
      setSelectedCells([position]);
      setIsSelecting(true);
    }
  }, [enableRangeSelection, rangeSelectionStart, calculateSelectedCells]);

  // Handle cell mouse enter for drag selection
  const handleCellMouseEnter = useCallback((rowIndex: number, columnId: string) => {
    if (!isSelecting || !rangeSelectionStart || columnId.startsWith('_')) return;

    const position: CellPosition = { rowIndex, columnId };
    setRangeSelectionEnd(position);
    const cells = calculateSelectedCells(rangeSelectionStart, position);
    setSelectedCells(cells);
  }, [isSelecting, rangeSelectionStart, calculateSelectedCells]);

  // Handle mouse up to end selection
  useEffect(() => {
    const handleMouseUp = () => {
      setIsSelecting(false);
    };

    if (isSelecting) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isSelecting]);

  // ============================================
  // Event Delegation Handlers (Performance)
  // ============================================

  // Helper to extract cell info from event target
  const getCellInfoFromEvent = useCallback((e: React.MouseEvent): { rowIndex: number; columnIndex: number; columnId: string } | null => {
    const target = e.target as HTMLElement;
    const cell = target.closest('[role="gridcell"]') as HTMLElement;
    if (!cell) return null;

    const rowIndex = parseInt(cell.dataset.rowIndex || '', 10);
    const columnIndex = parseInt(cell.dataset.columnIndex || '', 10);
    if (isNaN(rowIndex) || isNaN(columnIndex)) return null;

    const columnId = visibleColumnIds[columnIndex];
    if (!columnId) return null;

    return { rowIndex, columnIndex, columnId };
  }, [visibleColumnIds]);

  // Get cell value as string
  const getCellValueAsString = useCallback((rowIndex: number, columnId: string): string => {
    const row = rows[rowIndex];
    if (!row) return '';
    const value = row.getValue(columnId);
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }, [rows]);

  // Copy selected cells to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    if (!enableClipboard) return;

    let cellsToCopy: CellPosition[];

    // If we have range-selected cells, use those
    if (selectedCells.length > 0) {
      cellsToCopy = selectedCells;
    } else if (focusedCell !== null) {
      // Otherwise use the focused cell
      const columnId = visibleColumnIds[focusedCell.columnIndex];
      if (columnId) {
        cellsToCopy = [{ rowIndex: focusedCell.rowIndex, columnId }];
      } else {
        return;
      }
    } else {
      return;
    }

    // Group cells by row
    const rowMap = new Map<number, CellPosition[]>();
    cellsToCopy.forEach(cell => {
      const existing = rowMap.get(cell.rowIndex) || [];
      existing.push(cell);
      rowMap.set(cell.rowIndex, existing);
    });

    // Sort rows and columns
    const sortedRowIndices = [...rowMap.keys()].sort((a, b) => a - b);

    const dataRows: string[][] = [];
    sortedRowIndices.forEach(rowIndex => {
      const rowCells = rowMap.get(rowIndex) || [];
      // Sort by column order
      rowCells.sort((a, b) => visibleColumnIds.indexOf(a.columnId) - visibleColumnIds.indexOf(b.columnId));
      dataRows.push(rowCells.map(cell => getCellValueAsString(cell.rowIndex, cell.columnId)));
    });

    // Create tab-separated text (Excel-compatible)
    const text = dataRows.map(row => row.join('\t')).join('\n');

    try {
      await navigator.clipboard.writeText(text);
      onCopy?.(dataRows, cellsToCopy);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [enableClipboard, selectedCells, focusedCell, visibleColumnIds, getCellValueAsString, onCopy]);

  // Parse clipboard data
  const parseClipboardData = useCallback((text: string): string[][] => {
    const lines = text.split(/\r?\n/);
    // Remove empty last line if exists (common in Excel copy)
    if (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }
    return lines.map(line => line.split('\t'));
  }, []);

  // Handle paste from clipboard
  const handlePasteFromClipboard = useCallback(async () => {
    if (!enableClipboard || !onPaste) return;

    let startPosition: CellPosition | null = null;

    // Determine start position
    if (selectedCells.length > 0) {
      // Use top-left of selection
      const minRow = Math.min(...selectedCells.map(c => c.rowIndex));
      const cellsInMinRow = selectedCells.filter(c => c.rowIndex === minRow);
      const minColIndex = Math.min(...cellsInMinRow.map(c => visibleColumnIds.indexOf(c.columnId)));
      startPosition = { rowIndex: minRow, columnId: visibleColumnIds[minColIndex] };
    } else if (focusedCell !== null) {
      const columnId = visibleColumnIds[focusedCell.columnIndex];
      if (columnId) {
        startPosition = { rowIndex: focusedCell.rowIndex, columnId };
      }
    }

    if (!startPosition) return;

    try {
      const text = await navigator.clipboard.readText();
      const data = parseClipboardData(text);
      if (data.length > 0 && data[0].length > 0) {
        onPaste(data, startPosition.rowIndex, startPosition.columnId);
      }
    } catch (err) {
      console.error('Failed to read from clipboard:', err);
    }
  }, [enableClipboard, onPaste, selectedCells, focusedCell, visibleColumnIds, parseClipboardData]);

  // Keyboard handler for clipboard
  useEffect(() => {
    if (!enableClipboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're inside the grid
      if (!tableContainerRef.current?.contains(document.activeElement)) return;
      // Don't intercept if editing
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 'c') {
        e.preventDefault();
        handleCopyToClipboard();
      } else if (modifier && e.key === 'v') {
        if (onPaste) {
          e.preventDefault();
          handlePasteFromClipboard();
        }
      } else if (e.key === 'Escape') {
        // Clear selection on Escape
        setSelectedCells([]);
        setRangeSelectionStart(null);
        setRangeSelectionEnd(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableClipboard, handleCopyToClipboard, handlePasteFromClipboard, onPaste]);

  // Column pinning helpers - pins/unpins all columns up to the target column (like Excel freeze panes)
  const pinColumnsUpTo = useCallback((columnId: string) => {
    const allColumns = table.getAllLeafColumns();
    const targetIndex = allColumns.findIndex(col => col.id === columnId);
    if (targetIndex === -1) return;

    const newPinning: ColumnPinningState = { left: [], right: [] };
    for (let i = 0; i <= targetIndex; i++) {
      const col = allColumns[i];
      if (col.getCanPin()) {
        newPinning.left!.push(col.id);
      }
    }
    table.setColumnPinning(newPinning);
  }, [table]);

  const unpinColumnsFrom = useCallback((columnId: string) => {
    const allColumns = table.getAllLeafColumns();
    const targetIndex = allColumns.findIndex(col => col.id === columnId);
    if (targetIndex === -1) return;

    const currentPinning = table.getState().columnPinning;
    const newLeft = (currentPinning.left || []).filter(id => {
      const colIndex = allColumns.findIndex(col => col.id === id);
      return colIndex < targetIndex;
    });
    table.setColumnPinning({ left: newLeft, right: [] });
  }, [table]);

  // Context menu handlers
  const handleContextMenu = useCallback((
    e: React.MouseEvent,
    type: 'cell' | 'row' | 'header',
    context: ContextMenuContext<TData>
  ) => {
    if (!enableContextMenu) return;

    e.preventDefault();
    e.stopPropagation();

    let items: ContextMenuItem[];

    if (type === 'cell') {
      items = cellContextMenuItems || getDefaultCellMenuItems();
    } else if (type === 'row') {
      const row = rows.find(r => r.original === context.rowData);
      const isSelected = row?.getIsSelected() || false;
      items = rowContextMenuItems || getDefaultRowMenuItems(isSelected);
    } else {
      const column = table.getColumn(context.columnId || '');
      const isPinned = column?.getIsPinned() || false;
      items = headerContextMenuItems || getDefaultHeaderMenuItems(isPinned);
    }

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type,
      context,
      items,
    });
  }, [enableContextMenu, cellContextMenuItems, rowContextMenuItems, headerContextMenuItems, rows, table]);

  // ============================================
  // Event Delegation Handlers (Performance)
  // These must be after handleContextMenu/handleCellMouseDown/handleCellMouseEnter
  // ============================================

  // Event delegation: Context menu on grid body
  const handleBodyContextMenu = useCallback((e: React.MouseEvent) => {
    const cellInfo = getCellInfoFromEvent(e);
    if (!cellInfo) return;

    const row = rows[cellInfo.rowIndex];
    if (!row) return;

    handleContextMenu(e, 'cell', {
      type: 'cell',
      rowData: row.original,
      rowIndex: cellInfo.rowIndex,
      columnId: cellInfo.columnId,
      cellValue: row.getValue(cellInfo.columnId),
    });
  }, [getCellInfoFromEvent, rows, handleContextMenu]);

  // Event delegation: Mouse down on grid body
  const handleBodyMouseDown = useCallback((e: React.MouseEvent) => {
    const cellInfo = getCellInfoFromEvent(e);
    if (!cellInfo) return;

    handleCellMouseDown(cellInfo.rowIndex, cellInfo.columnId, e);
  }, [getCellInfoFromEvent, handleCellMouseDown]);

  // Event delegation: Mouse move for range selection
  const handleBodyMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting) return;

    const cellInfo = getCellInfoFromEvent(e);
    if (!cellInfo) return;

    handleCellMouseEnter(cellInfo.rowIndex, cellInfo.columnId);
  }, [getCellInfoFromEvent, isSelecting, handleCellMouseEnter]);

  const handleContextMenuAction = useCallback((actionId: string) => {
    if (!contextMenu) return;

    const { context, type } = contextMenu;

    // Handle default actions
    switch (actionId) {
      case 'copy':
        if (context.cellValue !== undefined) {
          navigator.clipboard.writeText(String(context.cellValue));
        }
        break;
      case 'select':
        if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          row?.toggleSelected();
        }
        break;
      case 'expand':
        if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          row?.toggleExpanded();
        }
        break;
      case 'pin-top':
        if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          row?.pin('top');
        }
        break;
      case 'pin-bottom':
        if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          row?.pin('bottom');
        }
        break;
      case 'unpin':
        if (type === 'header' && context.columnId) {
          unpinColumnsFrom(context.columnId);
        } else if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          row?.pin(false);
        }
        break;
      case 'sort-asc':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.toggleSorting(false);
        }
        break;
      case 'sort-desc':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.toggleSorting(true);
        }
        break;
      case 'sort-clear':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.clearSorting();
        }
        break;
      case 'pin':
        if (context.columnId) {
          pinColumnsUpTo(context.columnId);
        }
        break;
      case 'hide':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.toggleVisibility(false);
        }
        break;
    }

    // Call custom handler
    onContextMenuAction?.(actionId, context);
  }, [contextMenu, rows, table, onContextMenuAction, pinColumnsUpTo, unpinColumnsFrom]);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Keyboard navigation handler
  const handleTableKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!enableKeyboardNavigation || !focusedCell) return;

    const visibleColumns = table.getVisibleLeafColumns();
    const totalColumns = visibleColumns.length;
    const totalRows = rows.length;

    let { rowIndex, columnIndex } = focusedCell;
    let handled = false;

    switch (e.key) {
      case 'ArrowUp':
        if (rowIndex > 0) {
          rowIndex--;
          handled = true;
        }
        break;
      case 'ArrowDown':
        if (rowIndex < totalRows - 1) {
          rowIndex++;
          handled = true;
        }
        break;
      case 'ArrowLeft':
        if (columnIndex > 0) {
          columnIndex--;
          handled = true;
        }
        break;
      case 'ArrowRight':
        if (columnIndex < totalColumns - 1) {
          columnIndex++;
          handled = true;
        }
        break;
      case 'Tab':
        if (e.shiftKey) {
          if (columnIndex > 0) {
            columnIndex--;
          } else if (rowIndex > 0) {
            rowIndex--;
            columnIndex = totalColumns - 1;
          }
        } else {
          if (columnIndex < totalColumns - 1) {
            columnIndex++;
          } else if (rowIndex < totalRows - 1) {
            rowIndex++;
            columnIndex = 0;
          }
        }
        handled = true;
        break;
      case 'Home':
        if (e.ctrlKey) {
          rowIndex = 0;
          columnIndex = 0;
        } else {
          columnIndex = 0;
        }
        handled = true;
        break;
      case 'End':
        if (e.ctrlKey) {
          rowIndex = totalRows - 1;
          columnIndex = totalColumns - 1;
        } else {
          columnIndex = totalColumns - 1;
        }
        handled = true;
        break;
      case 'Enter':
        if (enableCellEditing) {
          // Focus the editable cell
          const cell = tableContainerRef.current?.querySelector(
            `[data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`
          );
          if (cell) {
            const editable = cell.querySelector('.editableCell') as HTMLElement;
            if (editable) {
              editable.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
              handled = true;
            }
          }
        }
        break;
      case ' ':
        if (enableRowSelection) {
          const row = rows[rowIndex];
          if (row && row.getCanSelect()) {
            row.toggleSelected();
            handled = true;
          }
        }
        break;
    }

    if (handled) {
      e.preventDefault();
      setFocusedCell({ rowIndex, columnIndex });
    }
  }, [enableKeyboardNavigation, focusedCell, table, rows, enableCellEditing, enableRowSelection]);

  // Update focus styling via DOM manipulation (avoids re-rendering all rows)
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    // Remove focus from previous cell
    const prevFocused = focusedCellRef.current;
    if (prevFocused) {
      const prevCell = container.querySelector(
        `td[data-row-index="${prevFocused.rowIndex}"][data-column-index="${prevFocused.columnIndex}"]`
      );
      if (prevCell) {
        prevCell.classList.remove(styles.focusedCell);
      }
    }

    // Add focus to new cell
    if (focusedCell) {
      const newCell = container.querySelector(
        `td[data-row-index="${focusedCell.rowIndex}"][data-column-index="${focusedCell.columnIndex}"]`
      );
      if (newCell) {
        newCell.classList.add(styles.focusedCell);
      }
    }

    // Update ref
    focusedCellRef.current = focusedCell;
  }, [focusedCell]);

  // Helper function to get export data
  const getExportDataFn = useCallback((options: ExportOptions = {}) => {
    const {
      selectedOnly = false,
      includeHeaders = true,
      headerMap = {},
      excludeColumns = [],
    } = options;

    // Get columns (exclude internal columns and specified exclusions)
    const exportColumns = table
      .getAllLeafColumns()
      .filter((col) =>
        col.id !== '_select' &&
        col.id !== '_expand' &&
        col.id !== '_dragHandle' &&
        !excludeColumns.includes(col.id)
      );

    // Get headers
    const headers = exportColumns.map((col) => headerMap[col.id] || col.id);

    // Get rows
    const rowsToExport = selectedOnly && Object.keys(table.getState().rowSelection).length > 0
      ? table.getSelectedRowModel().rows
      : table.getFilteredRowModel().rows;

    // Get data
    const data = rowsToExport.map((row) =>
      exportColumns.map((col) => {
        const value = row.getValue(col.id);
        return value;
      })
    );

    return { headers, data };
  }, [table]);

  // Helper function to download file
  const downloadFile = useCallback((content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  // Escape CSV value
  const escapeCSV = useCallback((value: unknown): string => {
    const str = value === null || value === undefined ? '' : String(value);
    // Escape if contains comma, quote, or newline
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }, []);

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

    // Get export data
    getExportData: (options?: ExportOptions) => getExportDataFn(options || {}),

    // Export to CSV
    exportToCSV: (filename = 'export.csv', options?: ExportOptions) => {
      const { headers, data } = getExportDataFn(options || {});
      const includeHeaders = options?.includeHeaders !== false;

      const csvRows: string[] = [];
      if (includeHeaders) {
        csvRows.push(headers.map(h => escapeCSV(h)).join(','));
      }
      data.forEach(row => {
        csvRows.push(row.map(cell => escapeCSV(cell)).join(','));
      });

      downloadFile(csvRows.join('\n'), filename, 'text/csv;charset=utf-8');
    },

    // Export to TSV
    exportToTSV: (filename = 'export.tsv', options?: ExportOptions) => {
      const { headers, data } = getExportDataFn(options || {});
      const includeHeaders = options?.includeHeaders !== false;

      const tsvRows: string[] = [];
      if (includeHeaders) {
        tsvRows.push(headers.join('\t'));
      }
      data.forEach(row => {
        tsvRows.push(row.map(cell =>
          cell === null || cell === undefined ? '' : String(cell).replace(/\t/g, ' ')
        ).join('\t'));
      });

      downloadFile(tsvRows.join('\n'), filename, 'text/tab-separated-values;charset=utf-8');
    },

    // Export to JSON
    exportToJSON: (filename = 'export.json', options?: ExportOptions) => {
      const { headers, data } = getExportDataFn(options || {});

      // Convert to array of objects
      const jsonData = data.map(row => {
        const obj: Record<string, unknown> = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      downloadFile(JSON.stringify(jsonData, null, 2), filename, 'application/json;charset=utf-8');
    },

    // Export to Excel (requires xlsx library to be installed)
    exportToExcel: async (filename = 'export.xlsx', options?: ExportOptions) => {
      const { headers, data } = getExportDataFn(options || {});
      const includeHeaders = options?.includeHeaders !== false;

      try {
        // Dynamic import of xlsx - eslint-disable to allow dynamic require
        const XLSX = await import(/* @vite-ignore */ 'xlsx') as {
          utils: {
            aoa_to_sheet: (data: unknown[][]) => unknown;
            book_new: () => unknown;
            book_append_sheet: (wb: unknown, ws: unknown, name: string) => void;
          };
          writeFile: (wb: unknown, filename: string) => void;
        };

        // Create worksheet data
        const wsData: unknown[][] = [];
        if (includeHeaders) {
          wsData.push(headers);
        }
        wsData.push(...data);

        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');

        // Write file
        XLSX.writeFile(wb, filename);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        const isModuleNotFound = errorMessage.includes('Cannot find module') ||
                                  errorMessage.includes('Failed to resolve') ||
                                  errorMessage.includes('is not defined');

        if (isModuleNotFound) {
          console.error('Excel export failed: xlsx package is not installed');
          throw new Error('Excel export requires xlsx package. Install it with: npm install xlsx');
        }

        console.error('Excel export failed:', err);
        throw new Error(`Excel export failed: ${errorMessage}`);
      }
    },

    scrollToRow: (index: number) => {
      if (enableVirtualization) {
        rowVirtualizer.scrollToIndex(index);
      } else if (tableContainerRef.current) {
        const row = tableContainerRef.current.querySelector(`[data-row-index="${index}"]`);
        row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    copyToClipboard: () => {
      handleCopyToClipboard();
    },
    getSelectedRange: () => selectedCells,
    clearCellSelection: () => {
      setSelectedCells([]);
      setRangeSelectionStart(null);
      setRangeSelectionEnd(null);
    },
  }), [
    table,
    enableVirtualization,
    rowVirtualizer,
    getExportDataFn,
    downloadFile,
    escapeCSV,
    handleCopyToClipboard,
    selectedCells,
  ]);

  // Helper to calculate flex value based on fillRemainingSpace
  const getFlexValue = useCallback((size: number, isLastColumn: boolean, isSpecialColumn: boolean = false): string => {
    // Special columns (select, expand, etc.) never flex
    if (isSpecialColumn) return `0 0 ${size}px`;

    switch (fillRemainingSpace) {
      case 'none':
        return `0 0 ${size}px`;
      case 'distribute':
        return `1 1 ${size}px`; // All columns can grow/shrink proportionally
      case 'last':
      default:
        return isLastColumn ? '1 0 auto' : `0 0 ${size}px`;
    }
  }, [fillRemainingSpace]);

  // Render header cell (div-based)
  const renderHeaderCell = useCallback((header: Header<TData, unknown>, isLastColumn: boolean = false) => {
    const canSort = header.column.getCanSort();
    const sorted = header.column.getIsSorted();
    const canFilter = header.column.getCanFilter();
    const canPin = header.column.getCanPin();
    const isPinned = header.column.getIsPinned();
    const canResize = header.column.getCanResize();
    const align = (header.column.columnDef.meta as any)?.align ?? 'left';

    // Check if this is the last pinned column (for shadow)
    const pinnedLeftCols = table.getState().columnPinning.left || [];
    const pinnedRightCols = table.getState().columnPinning.right || [];
    const isLastPinnedLeft = isPinned === 'left' && pinnedLeftCols[pinnedLeftCols.length - 1] === header.column.id;
    const isFirstPinnedRight = isPinned === 'right' && pinnedRightCols[0] === header.column.id;

    const cellClasses = [
      styles.gridHeaderCell,
      isPinned === 'left' && styles.pinnedLeft,
      isPinned === 'right' && styles.pinnedRight,
      isLastPinnedLeft && styles.pinnedLeftLast,
      isFirstPinnedRight && styles.pinnedRightFirst,
      (!showColumnFilters || !enableFiltering) && styles.filtersHidden,
    ].filter(Boolean).join(' ');

    return (
      <div
        key={header.id}
        className={cellClasses}
        style={{
          flex: getFlexValue(header.getSize(), isLastColumn, header.id.startsWith('_')),
          minWidth: header.getSize(),
          left: isPinned === 'left' ? header.getStart('left') : undefined,
          right: isPinned === 'right' ? header.getStart('right') : undefined,
        }}
        role="columnheader"
        aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
        onContextMenu={(e) => handleContextMenu(e, 'header', { type: 'header', columnId: header.id })}
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
                    unpinColumnsFrom(header.column.id);
                  } else {
                    pinColumnsUpTo(header.column.id);
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
        {canFilter && enableFiltering && showColumnFilters && (
          <div className={styles.thFilter}>
            <ColumnFilter column={header.column} table={table} />
          </div>
        )}
      </div>
    );
  }, [table, enableColumnPinning, enableFiltering, showColumnFilters, pinColumnsUpTo, unpinColumnsFrom]);

  // Render row (div-based)
  const renderRow = useCallback((row: Row<TData>, virtualRow?: { index: number; start: number; size: number }) => {
    const isSelected = row.getIsSelected();
    const isExpanded = row.getIsExpanded();
    const isGrouped = row.getIsGrouped();
    const isPinnedRow = row.getIsPinned();
    const visibleCells = row.getVisibleCells();

    // Row classes
    const rowClasses = [
      styles.gridRow,
      virtualRow && styles.virtual,
      isSelected && styles.selected,
      isGrouped && styles.grouped,
      striped && styles.striped,
      hoverable && styles.hoverable,
      isPinnedRow && styles.pinnedRow,
      isPinnedRow === 'top' && styles.pinnedRowTop,
      isPinnedRow === 'bottom' && styles.pinnedRowBottom,
    ].filter(Boolean).join(' ');

    // Row style for virtual positioning
    const rowStyle: React.CSSProperties | undefined = virtualRow
      ? {
          height: `${virtualRow.size}px`,
          transform: `translateY(${virtualRow.start}px)`,
        }
      : undefined;

    // Render cell content
    const renderCellContent = (cell: typeof visibleCells[0], cellIndex: number) => {
      const isPinned = cell.column.getIsPinned();
      const align = (cell.column.columnDef.meta as any)?.align ?? 'left';
      const isCellInRange = enableRangeSelection && isCellSelected(row.index, cell.column.id);
      const isLastColumn = cellIndex === visibleCells.length - 1;

      // Check if this is the last pinned column (for shadow)
      const pinnedLeftCols = table.getState().columnPinning.left || [];
      const pinnedRightCols = table.getState().columnPinning.right || [];
      const isLastPinnedLeft = isPinned === 'left' && pinnedLeftCols[pinnedLeftCols.length - 1] === cell.column.id;
      const isFirstPinnedRight = isPinned === 'right' && pinnedRightCols[0] === cell.column.id;

      const cellClasses = [
        styles.gridCell,
        align === 'center' && styles.alignCenter,
        align === 'right' && styles.alignRight,
        isPinned === 'left' && styles.pinnedLeft,
        isPinned === 'right' && styles.pinnedRight,
        isCellInRange && styles.selectedCell,
        isLastPinnedLeft && styles.pinnedLeftLast,
        isFirstPinnedRight && styles.pinnedRightFirst,
      ].filter(Boolean).join(' ');

      // Cell content - grouped, aggregated, placeholder, or normal
      const cellContent = cell.getIsGrouped() ? (
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
      );

      // Use memoized GridCell component (event handlers are delegated to grid body)
      return (
        <GridCell
          key={cell.id}
          cellId={cell.id}
          className={cellClasses}
          style={{
            flex: getFlexValue(cell.column.getSize(), isLastColumn, cell.column.id.startsWith('_')),
            minWidth: cell.column.getSize(),
            left: isPinned === 'left' ? cell.column.getStart('left') : undefined,
            right: isPinned === 'right' ? cell.column.getStart('right') : undefined,
          }}
          rowIndex={row.index}
          columnIndex={cellIndex}
        >
          {cellContent}
        </GridCell>
      );
    };

    // Render expanded row
    const expandedRow = isExpanded && renderExpandedRow && !isGrouped && (
      <div className={styles.gridExpandedRow} role="row">
        <div className={styles.gridExpandedCell} role="gridcell">
          {renderExpandedRow(row.original)}
        </div>
      </div>
    );

    // Use SortableRow if row ordering is enabled
    if (enableRowOrdering) {
      return (
        <React.Fragment key={row.id}>
          <SortableRow
            id={row.id}
            className={rowClasses}
            data-row-index={row.index}
            onClick={() => onRowClick?.(row.original)}
            onDoubleClick={() => onRowDoubleClick?.(row.original)}
            style={rowStyle}
          >
            <RowDragHandle rowId={row.id} />
            {visibleCells.map((cell, cellIndex) => renderCellContent(cell, cellIndex))}
          </SortableRow>
          {expandedRow}
        </React.Fragment>
      );
    }

    // Row click handlers - memoized per row would be ideal but keeping simple for now
    const handleRowClick = onRowClick ? () => onRowClick(row.original) : undefined;
    const handleRowDoubleClick = onRowDoubleClick ? () => onRowDoubleClick(row.original) : undefined;

    return (
      <React.Fragment key={row.id}>
        <GridRow
          rowId={row.id}
          className={rowClasses}
          style={rowStyle}
          isSelected={isSelected}
          rowIndex={row.index}
          onClick={handleRowClick}
          onDoubleClick={handleRowDoubleClick}
        >
          {visibleCells.map((cell, cellIndex) => renderCellContent(cell, cellIndex))}
        </GridRow>
        {expandedRow}
      </React.Fragment>
    );
  }, [table, onRowClick, onRowDoubleClick, striped, hoverable, renderExpandedRow, enableRangeSelection, isCellSelected, enableRowOrdering]);

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
          <PageSizeSelect
            value={pageSize}
            options={pageSizeOptions}
            onChange={(size) => table.setPageSize(size)}
          />
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
            {enableFiltering && (
              <button
                className={`${styles.toolbarButton} ${showColumnFilters ? styles.active : ''}`}
                onClick={toggleColumnFilters}
                title={showColumnFilters ? 'Hide column filters' : 'Show column filters'}
              >
                <Filter size={16} />
              </button>
            )}
            {enableExpandAll && (enableExpanding || getSubRows) && (
              <>
                <button
                  className={styles.toolbarButton}
                  onClick={() => table.toggleAllRowsExpanded(true)}
                  title="Expand all rows"
                >
                  <Expand size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => table.toggleAllRowsExpanded(false)}
                  title="Collapse all rows"
                >
                  <Shrink size={16} />
                </button>
              </>
            )}
            {enableVirtualization && virtualPageSizeOptions.length > 0 && (
              <div className={styles.virtualPageSizeSelector}>
                <span className={styles.virtualPageSizeLabel}>Rows:</span>
                <select
                  value={effectiveVirtualPageSize}
                  onChange={(e) => handleVirtualPageSizeChange(Number(e.target.value))}
                  className={styles.virtualPageSizeSelect}
                >
                  {virtualPageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {enableColumnVisibility && <ColumnVisibilityDropdown table={table} />}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div
        ref={enableVirtualization ? undefined : tableContainerRef}
        className={styles.tableContainer}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        tabIndex={enableKeyboardNavigation ? 0 : undefined}
        onKeyDown={enableKeyboardNavigation ? handleTableKeyDown : undefined}
        onClick={(e) => {
          if (!enableKeyboardNavigation) return;
          const target = e.target as HTMLElement;
          const cell = target.closest('td, [role="gridcell"]');
          if (cell) {
            const rowIndex = parseInt(cell.getAttribute('data-row-index') || '0', 10);
            const columnIndex = parseInt(cell.getAttribute('data-column-index') || '0', 10);
            setFocusedCell({ rowIndex, columnIndex });
          }
        }}
      >
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
          </div>
        )}

        {/* Column Drag Context */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={enableColumnDrag ? handleColumnDragStart : undefined}
          onDragEnd={enableColumnDrag ? handleColumnDragEnd : undefined}
        >
          {/* Row Drag Context - nested inside Column context */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={enableRowOrdering ? handleRowDragStart : undefined}
            onDragEnd={enableRowOrdering ? handleRowDragEnd : undefined}
          >
            {/* Unified Grid - div-based rendering */}
            <div className={styles.grid} role="grid">
              {/* Header */}
              {showHeader && (
                <div className={styles.gridHeader} role="rowgroup">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <div key={headerGroup.id} className={`${styles.gridHeaderRow} ${(!showColumnFilters || !enableFiltering) ? styles.filtersHidden : ''}`} role="row">
                      {/* Drag handle column header for row ordering */}
                      {enableRowOrdering && (
                        <div className={styles.gridDragHandleHeader} role="columnheader">
                          <GripVertical size={16} />
                        </div>
                      )}
                      <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
                        {headerGroup.headers.map((header, headerIndex, headers) => {
                          const isSpecialColumn = header.id.startsWith('_');
                          const isLastColumn = headerIndex === headers.length - 1;
                          return enableColumnDrag && !isSpecialColumn ? (
                            <DraggableHeaderCell key={header.id} id={header.id}>
                              {renderHeaderCell(header, isLastColumn)}
                            </DraggableHeaderCell>
                          ) : (
                            renderHeaderCell(header, isLastColumn)
                          );
                        })}
                      </SortableContext>
                    </div>
                  ))}
                </div>
              )}

              {/* Body - with optional virtualization */}
              <div
                ref={enableVirtualization ? handleVirtualScrollRef : undefined}
                className={styles.gridBody}
                style={enableVirtualization ? {
                  height: typeof height === 'number' ? `${height - 48}px` : `calc(${height} - 48px)`,
                  overflow: 'auto'
                } : undefined}
                role="rowgroup"
                onContextMenu={handleBodyContextMenu}
                onMouseDown={handleBodyMouseDown}
                onMouseMove={handleBodyMouseMove}
              >
                <div style={enableVirtualization ? { height: `${totalSize}px`, position: 'relative' } : undefined}>
                  {rows.length === 0 ? (
                    <div className={styles.gridEmptyRow} role="row">
                      <div className={styles.gridEmptyCell} role="gridcell">
                        {renderEmpty ? renderEmpty() : (
                          <div className={styles.emptyState}>
                            <Filter size={48} className={styles.emptyIcon} />
                            <p>{emptyMessage}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : enableRowOrdering ? (
                    <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
                      {enableVirtualization
                        ? virtualRows?.map((virtualRow) => renderRow(rows[virtualRow.index], virtualRow))
                        : rows.map((row) => renderRow(row))
                      }
                    </SortableContext>
                  ) : (
                    enableVirtualization
                      ? virtualRows?.map((virtualRow) => renderRow(rows[virtualRow.index], virtualRow))
                      : rows.map((row) => renderRow(row))
                  )}
                </div>
              </div>

              {/* Footer */}
              {showFooter && (
                <div className={styles.gridFooter} role="rowgroup">
                  {table.getFooterGroups().map((footerGroup) => (
                    <div key={footerGroup.id} className={styles.gridFooterRow} role="row">
                      {enableRowOrdering && <div className={styles.gridDragHandleHeader} role="gridcell" />}
                      {footerGroup.headers.map((header, headerIndex, headers) => {
                        const isLastColumn = headerIndex === headers.length - 1;
                        return (
                          <div
                            key={header.id}
                            className={styles.gridFooterCell}
                            style={{
                              flex: getFlexValue(header.getSize(), isLastColumn, header.id.startsWith('_')),
                              minWidth: header.getSize(),
                            }}
                            role="gridcell"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.footer, header.getContext())}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row Drag Overlay */}
            {enableRowOrdering && (
              <DragOverlay>
                {activeRowId && (
                  <div className={styles.dragOverlay}>
                    Row {activeRowId}
                  </div>
                )}
              </DragOverlay>
            )}
          </DndContext>

          {/* Column Drag Overlay */}
          {enableColumnDrag && (
            <DragOverlay>
              {activeColumnId && (
                <div className={styles.dragOverlay}>
                  {activeColumnId}
                </div>
              )}
            </DragOverlay>
          )}
        </DndContext>
      </div>

      {/* Pagination */}
      {enablePagination && renderPagination()}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onAction={handleContextMenuAction}
          onClose={closeContextMenu}
        />
      )}
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
