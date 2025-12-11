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
    <tr
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? styles.draggingRow : ''}`}
      {...attributes}
    >
      {/* Drag handle cell */}
      <td className={styles.dragHandleCell} {...listeners}>
        <GripVertical size={16} className={styles.rowDragHandle} />
      </td>
      {children}
    </tr>
  );
});

DraggableRow.displayName = 'DraggableRow';

// Sortable Row component using useSortable hook
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
    <tr
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? styles.draggingRow : ''}`}
      {...attributes}
      {...props}
    >
      {children}
    </tr>
  );
});

SortableRow.displayName = 'SortableRow';

// Row Drag Handle component - just the handle cell
const RowDragHandle = memo(({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({ id: rowId });

  return (
    <td className={styles.dragHandleCell} {...attributes} {...listeners}>
      <GripVertical size={16} className={styles.rowDragHandle} />
    </td>
  );
});

RowDragHandle.displayName = 'RowDragHandle';

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
  { id: 'pin-left', label: 'Pin to left', icon: <Pin size={14} />, disabled: isPinned === 'left' },
  { id: 'pin-right', label: 'Pin to right', icon: <Pin size={14} />, disabled: isPinned === 'right' },
  { id: 'unpin', label: 'Unpin column', icon: <PinOff size={14} />, disabled: !isPinned },
  { id: 'divider2', label: '', divider: true },
  { id: 'hide', label: 'Hide column', icon: <EyeOff size={14} /> },
];

// Select filter component for single/multi select
const SelectFilter = memo(({
  column,
  isMulti = false,
  options: customOptions,
}: {
  column: any;
  isMulti?: boolean;
  options?: FilterOption[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const columnFilterValue = column.getFilterValue();
  const facetedValues = column.getFacetedUniqueValues();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facetedValues.size, column.id, customOptions]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedValues = useMemo(() => {
    if (!columnFilterValue) return [];
    if (Array.isArray(columnFilterValue)) return columnFilterValue;
    return [columnFilterValue];
  }, [columnFilterValue]);

  const handleSelect = useCallback((value: string) => {
    if (isMulti) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      column.setFilterValue(newValues.length > 0 ? newValues : undefined);
    } else {
      column.setFilterValue(selectedValues.includes(value) ? undefined : value);
      setIsOpen(false);
    }
  }, [column, isMulti, selectedValues]);

  const clearFilter = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    column.setFilterValue(undefined);
  }, [column]);

  const displayText = useMemo(() => {
    if (selectedValues.length === 0) return isMulti ? 'Select...' : 'All';
    if (selectedValues.length === 1) {
      const opt = options.find((o) => o.value === selectedValues[0]);
      return opt?.label ?? selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  }, [selectedValues, options, isMulti]);

  return (
    <div className={styles.selectFilter} ref={dropdownRef}>
      <button
        type="button"
        className={styles.selectFilterTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selectFilterText}>{displayText}</span>
        {selectedValues.length > 0 && (
          <span className={styles.selectFilterClear} onClick={clearFilter}>
            <X size={12} />
          </span>
        )}
        <ChevronDown size={14} className={styles.selectFilterIcon} />
      </button>
      {isOpen && (
        <div className={styles.selectFilterDropdown}>
          {options.length === 0 ? (
            <div className={styles.selectFilterEmpty}>No options</div>
          ) : (
            options.map((option) => (
              <label
                key={option.value}
                className={`${styles.selectFilterOption} ${selectedValues.includes(option.value) ? styles.selected : ''}`}
              >
                <input
                  type={isMulti ? 'checkbox' : 'radio'}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleSelect(option.value)}
                  className={styles.selectFilterCheckbox}
                />
                <span>{option.label}</span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
});

SelectFilter.displayName = 'SelectFilter';

// Date filter component
const DateFilter = memo(({
  column,
  isRange = false,
}: {
  column: any;
  isRange?: boolean;
}) => {
  const columnFilterValue = column.getFilterValue();

  const handleDateChange = useCallback((value: string, position?: 'start' | 'end') => {
    if (isRange) {
      const currentValue = (columnFilterValue as [string, string]) ?? ['', ''];
      if (position === 'start') {
        column.setFilterValue([value, currentValue[1]]);
      } else {
        column.setFilterValue([currentValue[0], value]);
      }
    } else {
      column.setFilterValue(value || undefined);
    }
  }, [column, columnFilterValue, isRange]);

  if (isRange) {
    const [startDate, endDate] = (columnFilterValue as [string, string]) ?? ['', ''];
    return (
      <div className={styles.filterRange}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange(e.target.value, 'start')}
          className={styles.filterInput}
          placeholder="Start"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleDateChange(e.target.value, 'end')}
          className={styles.filterInput}
          placeholder="End"
        />
      </div>
    );
  }

  return (
    <div className={styles.filterWrapper}>
      <input
        type="date"
        value={(columnFilterValue as string) ?? ''}
        onChange={(e) => handleDateChange(e.target.value)}
        className={styles.filterInput}
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
      return <SelectFilter column={column} isMulti={false} options={filterOptions} />;
    case 'multi-select':
      return <SelectFilter column={column} isMulti={true} options={filterOptions} />;
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
const NumberRangeFilter = memo(({ column }: { column: any }) => {
  const columnFilterValue = column.getFilterValue();
  const [min, max] = column.getFacetedMinMaxValues() ?? [0, 0];

  return (
    <div className={styles.filterRange}>
      <input
        type="number"
        min={Number(min ?? '')}
        max={Number(max ?? '')}
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
        min={Number(min ?? '')}
        max={Number(max ?? '')}
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
});

NumberRangeFilter.displayName = 'NumberRangeFilter';

// Text filter component
const TextFilter = memo(({ column }: { column: any }) => {
  const columnFilterValue = column.getFilterValue();
  const facetedValues = column.getFacetedUniqueValues();
  const sortedUniqueValues = useMemo(
    () => Array.from(facetedValues.keys()).sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [facetedValues.size, column.id]
  );

  return (
    <div className={styles.filterWrapper}>
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search... (${facetedValues.size})`}
        className={styles.filterInput}
        list={column.id + 'list'}
      />
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: unknown) => (
          <option value={String(value)} key={String(value)} />
        ))}
      </datalist>
    </div>
  );
});

TextFilter.displayName = 'TextFilter';

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

    // Appearance
    height = DEFAULT_HEIGHT,
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
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

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

    // Expansion column (for both expandable rows and tree structure)
    if (enableExpanding || getSubRows) {
      cols.push({
        id: '_expand',
        size: getSubRows ? 80 : 50,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => null,
        cell: ({ row }) => {
          const depth = row.depth;
          const canExpand = row.getCanExpand();

          return (
            <div
              className={styles.expandCell}
              style={{ paddingLeft: getSubRows ? `${depth * 20}px` : 0 }}
            >
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
              ) : getSubRows ? (
                <span className={styles.expandSpacer} />
              ) : null}
            </div>
          );
        },
      });
    }

    // Data columns
    columnsProp.forEach((col) => {
      // Determine filter function based on filterType
      let filterFn: string | undefined;
      if (col.filterType === 'multi-select') {
        filterFn = 'multiSelect';
      } else if (col.filterType === 'select') {
        filterFn = 'equals';
      } else if (col.filterType === 'date-range') {
        filterFn = 'dateRange';
      } else if (col.filterType === 'date') {
        filterFn = 'dateExact';
      } else if (col.filterType === 'number') {
        filterFn = 'inNumberRange';
      }

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
        cell: enableCellEditing && col.editable
          ? (info) => (
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
          ? (info) => col.cell!(info as any)
          : (info) => {
              const value = info.getValue();
              return value != null ? String(value) : '';
            },
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
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => estimateRowHeight,
    overscan,
    enabled: enableVirtualization,
  });

  const virtualRows = enableVirtualization ? rowVirtualizer.getVirtualItems() : null;
  const totalSize = enableVirtualization ? rowVirtualizer.getTotalSize() : 0;

  // Column virtualization
  const visibleColumns = table.getVisibleLeafColumns();
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: (index) => visibleColumns[index]?.getSize() ?? estimateColumnWidth,
    horizontal: true,
    overscan,
    enabled: enableColumnVirtualization,
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
        if (context.rowData) {
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
      case 'pin-left':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.pin('left');
        }
        break;
      case 'pin-right':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.pin('right');
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
  }, [contextMenu, rows, table, onContextMenuAction]);

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
        // @ts-expect-error xlsx is an optional dependency
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
    const isPinnedRow = row.getIsPinned();

    const rowContent = (
      <>
        {/* Drag handle cell for row ordering */}
        {enableRowOrdering && (
          <RowDragHandle rowId={row.id} />
        )}
        {row.getVisibleCells().map((cell, cellIndex) => {
          const isPinned = cell.column.getIsPinned();
          const align = (cell.column.columnDef.meta as any)?.align ?? 'left';
          const isFocused = enableKeyboardNavigation &&
            focusedCell?.rowIndex === row.index &&
            focusedCell?.columnIndex === cellIndex;
          const isCellInRange = enableRangeSelection && isCellSelected(row.index, cell.column.id);

          return (
            <td
              key={cell.id}
              className={`${styles.td} ${styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${
                isPinned ? styles[`pinned${String(isPinned).charAt(0).toUpperCase() + String(isPinned).slice(1)}`] : ''
              } ${isFocused ? styles.focusedCell : ''} ${isCellInRange ? styles.selectedCell : ''}`}
              style={{
                width: cell.column.getSize(),
                left: isPinned === 'left' ? cell.column.getStart('left') : undefined,
                right: isPinned === 'right' ? cell.column.getStart('right') : undefined,
              }}
              data-row-index={row.index}
              data-column-index={cellIndex}
              onContextMenu={(e) => handleContextMenu(e, 'cell', {
                type: 'cell',
                rowData: row.original,
                rowIndex: row.index,
                columnId: cell.column.id,
                cellValue: cell.getValue(),
              })}
              onMouseDown={(e) => handleCellMouseDown(row.index, cell.column.id, e)}
              onMouseEnter={() => handleCellMouseEnter(row.index, cell.column.id)}
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
      </>
    );

    // Use SortableRow if row ordering is enabled
    if (enableRowOrdering) {
      return (
        <React.Fragment key={row.id}>
          <SortableRow
            id={row.id}
            className={`${styles.tr} ${styles.row} ${isSelected ? styles.selected : ''} ${
              isGrouped ? styles.grouped : ''
            } ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''} ${
              isPinnedRow ? styles.pinnedRow : ''
            } ${isPinnedRow === 'top' ? styles.pinnedRowTop : ''} ${isPinnedRow === 'bottom' ? styles.pinnedRowBottom : ''}`}
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
                    display: 'flex',
                  }
                : undefined
            }
          >
            {rowContent}
          </SortableRow>
          {/* Expanded content */}
          {isExpanded && renderExpandedRow && !isGrouped && (
            <tr className={styles.expandedRow}>
              <td colSpan={row.getVisibleCells().length + (enableRowOrdering ? 1 : 0)}>
                {renderExpandedRow(row.original)}
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={row.id}>
        <tr
          className={`${styles.tr} ${styles.row} ${isSelected ? styles.selected : ''} ${
            isGrouped ? styles.grouped : ''
          } ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''} ${
            isPinnedRow ? styles.pinnedRow : ''
          } ${isPinnedRow === 'top' ? styles.pinnedRowTop : ''} ${isPinnedRow === 'bottom' ? styles.pinnedRowBottom : ''}`}
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
                  display: 'flex',
                }
              : undefined
          }
        >
          {row.getVisibleCells().map((cell, cellIndex) => {
            const isPinned = cell.column.getIsPinned();
            const align = (cell.column.columnDef.meta as any)?.align ?? 'left';
            const isFocused = enableKeyboardNavigation &&
              focusedCell?.rowIndex === row.index &&
              focusedCell?.columnIndex === cellIndex;
            const isCellInRange = enableRangeSelection && isCellSelected(row.index, cell.column.id);

            return (
              <td
                key={cell.id}
                className={`${styles.td} ${styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${
                  isPinned ? styles[`pinned${String(isPinned).charAt(0).toUpperCase() + String(isPinned).slice(1)}`] : ''
                } ${isFocused ? styles.focusedCell : ''} ${isCellInRange ? styles.selectedCell : ''}`}
                style={{
                  width: cell.column.getSize(),
                  left: isPinned === 'left' ? cell.column.getStart('left') : undefined,
                  right: isPinned === 'right' ? cell.column.getStart('right') : undefined,
                }}
                data-row-index={row.index}
                data-column-index={cellIndex}
                onMouseDown={(e) => handleCellMouseDown(row.index, cell.column.id, e)}
                onMouseEnter={() => handleCellMouseEnter(row.index, cell.column.id)}
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
  }, [onRowClick, onRowDoubleClick, striped, hoverable, renderExpandedRow, enableKeyboardNavigation, focusedCell, enableRangeSelection, isCellSelected, handleCellMouseDown, handleCellMouseEnter, enableRowOrdering, handleContextMenu]);

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
            {enableColumnVisibility && <ColumnVisibilityDropdown table={table} />}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div
        ref={tableContainerRef}
        className={styles.tableContainer}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        tabIndex={enableKeyboardNavigation ? 0 : undefined}
        onKeyDown={enableKeyboardNavigation ? handleTableKeyDown : undefined}
        onClick={(e) => {
          if (!enableKeyboardNavigation) return;
          const target = e.target as HTMLElement;
          const cell = target.closest('td');
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
            <table className={styles.table}>
              {showHeader && (
                <thead className={styles.thead}>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className={styles.headerRow}>
                      {/* Drag handle column header for row ordering */}
                      {enableRowOrdering && (
                        <th className={`${styles.th} ${styles.dragHandleHeader}`} style={{ width: 40 }}>
                          <GripVertical size={16} />
                        </th>
                      )}
                      <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
                        {headerGroup.headers.map((header) => {
                          const isSpecialColumn = header.id.startsWith('_');
                          return enableColumnDrag && !isSpecialColumn ? (
                            <th
                              key={header.id}
                              className={styles.th}
                              style={{ width: header.getSize() }}
                            >
                              <DraggableHeaderCell id={header.id}>
                                {renderHeaderCell(header)}
                              </DraggableHeaderCell>
                            </th>
                          ) : (
                            renderHeaderCell(header)
                          );
                        })}
                      </SortableContext>
                    </tr>
                  ))}
                </thead>
              )}

              <tbody
                className={styles.tbody}
                style={enableVirtualization ? { height: `${totalSize}px`, position: 'relative', display: 'block', width: '100%' } : undefined}
              >
                {rows.length === 0 ? (
                  <tr className={styles.emptyRow}>
                    <td colSpan={table.getAllLeafColumns().length + (enableRowOrdering ? 1 : 0)} className={styles.emptyCell}>
                      {renderEmpty ? renderEmpty() : (
                        <div className={styles.emptyState}>
                          <Filter size={48} className={styles.emptyIcon} />
                          <p>{emptyMessage}</p>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : enableRowOrdering ? (
                  <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
                    {enableVirtualization && virtualRows ? (
                      virtualRows.map((virtualRow) => {
                        const row = rows[virtualRow.index];
                        return renderRow(row, virtualRow);
                      })
                    ) : (
                      rows.map((row) => renderRow(row))
                    )}
                  </SortableContext>
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
                      {enableRowOrdering && <th className={styles.footerCell} style={{ width: 40 }} />}
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
