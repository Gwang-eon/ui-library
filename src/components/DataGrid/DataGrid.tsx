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
  FilterX,
  Columns,
  Pin,
  PinOff,
  Check,
  Minus,
  Expand,
  Shrink,
  GripVertical,
  Copy,
  ClipboardCopy,
  Trash2,
  ArrowUpDown,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  MoreHorizontal,
  Download,
  FileSpreadsheet,
  ArrowLeftToLine,
  ArrowRightToLine,
  Maximize2,
} from 'lucide-react';
import { Select } from '../Select';
import { Input } from '../Input';
import { DatePicker } from '../Calendar/DatePicker';
import { DateRangePicker } from '../Calendar/DateRangePicker';
import styles from './DataGrid.module.css';

// Local module imports
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  DEFAULT_ESTIMATE_ROW_HEIGHT,
  DEFAULT_ESTIMATE_COLUMN_WIDTH,
  DEFAULT_OVERSCAN,
  DEFAULT_HEIGHT,
  DEFAULT_EMPTY_MESSAGE,
} from './constants';
import type {
  FilterType,
  FilterOption,
  EditorType,
  EditorOption,
  ContextMenuItem,
  ContextMenuContext,
  DataGridColumn,
  DataGridProps,
  ExportOptions,
  DataGridRef,
  CellPosition,
  ContextMenuState,
} from './types';
import { dateToString, stringToDate } from './utils';
import { ColumnFilter } from './filters';
import {
  DraggableHeaderCell,
  DraggableRow,
  SortableRow,
  RowDragHandle,
} from './drag-drop';
import {
  IndeterminateCheckbox,
  RadioButton,
  DebouncedInput,
  GridCell,
  GridRow,
  ContextMenu,
  getDefaultCellMenuItems,
  getDefaultRowMenuItems,
  getDefaultHeaderMenuItems,
  EditableCell,
  ColumnVisibilityDropdown,
} from './components';
import { PageSizeSelect } from './pagination';

// Re-export types for external use
export type {
  FilterType,
  FilterOption,
  EditorType,
  EditorOption,
  ContextMenuItem,
  ContextMenuContext,
  DataGridColumn,
  DataGridProps,
  ExportOptions,
  DataGridRef,
  CellPosition,
};

// Types are now exported from ./types.ts
// Sub-components are now in separate modules:
// - ./components/* - UI components
// - ./filters/* - Filter components
// - ./drag-drop/* - Drag-and-drop components
// - ./pagination/* - Pagination components

// Define fuzzy filter function
const fuzzyFilter = (row: any, columnId: string, value: string, addMeta: any) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

// Number range filter function
const numberRangeFilter = (row: any, columnId: string, value: [number | undefined, number | undefined]) => {
  const cellValue = row.getValue(columnId) as number;
  const [min, max] = value ?? [undefined, undefined];
  if (min !== undefined && cellValue < min) return false;
  if (max !== undefined && cellValue > max) return false;
  return true;
};

// Date range filter function
const dateRangeFilter = (row: any, columnId: string, value: [string, string]) => {
  const [startStr, endStr] = value ?? ['', ''];
  const cellValue = row.getValue(columnId);
  if (!cellValue) return false;

  const cellDate = cellValue instanceof Date ? cellValue : new Date(cellValue as string);
  const cellDateStr = dateToString(cellDate);

  if (startStr && cellDateStr < startStr) return false;
  if (endStr && cellDateStr > endStr) return false;
  return true;
};

// Multi-select filter function
const multiSelectFilter = (row: any, columnId: string, filterValue: string[]) => {
  if (!filterValue || filterValue.length === 0) return true;
  const cellValue = String(row.getValue(columnId));
  return filterValue.includes(cellValue);
};

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
    'aria-label': ariaLabel = 'Data grid',
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
    const hasSelection = Object.keys(table.getState().rowSelection || {}).length > 0;

    if (type === 'cell') {
      items = cellContextMenuItems || getDefaultCellMenuItems(hasSelection);
    } else if (type === 'row') {
      const row = rows.find(r => r.original === context.rowData);
      const isSelected = row?.getIsSelected() || false;
      items = rowContextMenuItems || getDefaultRowMenuItems(isSelected, hasSelection);
    } else {
      const column = table.getColumn(context.columnId || '');
      const isPinned = column?.getIsPinned() || false;
      const isSorted = column?.getIsSorted() || false;
      const hasFilter = column?.getFilterValue() !== undefined;
      items = headerContextMenuItems || getDefaultHeaderMenuItems(isPinned, isSorted, hasFilter);
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

  // Helper: Convert row data to CSV string
  const rowToCSV = useCallback((row: Row<TData>) => {
    const visibleColumns = table.getVisibleLeafColumns();
    return visibleColumns
      .map(col => {
        const value = row.getValue(col.id);
        const strValue = value == null ? '' : String(value);
        // Escape quotes and wrap in quotes if contains comma or newline
        if (strValue.includes(',') || strValue.includes('\n') || strValue.includes('"')) {
          return `"${strValue.replace(/"/g, '""')}"`;
        }
        return strValue;
      })
      .join(',');
  }, [table]);

  // Helper: Export data to CSV
  const exportToCSV = useCallback((rowsToExport: Row<TData>[], filename = 'export.csv') => {
    const visibleColumns = table.getVisibleLeafColumns();
    const headers = visibleColumns.map(col => {
      const header = col.columnDef.header;
      return typeof header === 'string' ? header : col.id;
    }).join(',');

    const csvContent = [
      headers,
      ...rowsToExport.map(row => rowToCSV(row))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [table, rowToCSV]);

  const handleContextMenuAction = useCallback((actionId: string) => {
    if (!contextMenu) return;

    const { context, type } = contextMenu;

    // Handle default actions
    switch (actionId) {
      // ===== Copy Actions =====
      case 'copy':
      case 'copy-cell':
        if (context.cellValue !== undefined) {
          navigator.clipboard.writeText(String(context.cellValue));
        }
        break;
      case 'copy-row':
        if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          if (row) {
            navigator.clipboard.writeText(rowToCSV(row));
          }
        }
        break;
      case 'copy-selected':
        {
          const selectedRows = rows.filter(r => r.getIsSelected());
          if (selectedRows.length > 0) {
            const csvData = selectedRows.map(row => rowToCSV(row)).join('\n');
            navigator.clipboard.writeText(csvData);
          }
        }
        break;

      // ===== Selection Actions =====
      case 'select':
        if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          row?.toggleSelected();
        }
        break;
      case 'select-all':
        table.toggleAllRowsSelected(true);
        break;
      case 'deselect-all':
        table.toggleAllRowsSelected(false);
        break;

      // ===== Row Actions =====
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

      // ===== Column Pin Actions =====
      case 'unpin':
        if (type === 'header' && context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.pin(false);
        } else if (context.rowData) {
          const row = rows.find(r => r.original === context.rowData);
          row?.pin(false);
        }
        break;
      case 'pin':
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

      // ===== Sort Actions =====
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

      // ===== Filter Actions =====
      case 'filter-value':
      case 'filter':
        if (context.columnId && context.cellValue !== undefined) {
          const column = table.getColumn(context.columnId);
          column?.setFilterValue(context.cellValue);
        }
        break;
      case 'filter-clear':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.setFilterValue(undefined);
        }
        break;

      // ===== Column Actions =====
      case 'hide':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          column?.toggleVisibility(false);
        }
        break;
      case 'autosize':
        if (context.columnId) {
          const column = table.getColumn(context.columnId);
          if (column) {
            // Reset to auto size by removing explicit size
            column.resetSize();
          }
        }
        break;

      // ===== Export Actions =====
      case 'export-csv':
        {
          const selectedRows = rows.filter(r => r.getIsSelected());
          const rowsToExport = selectedRows.length > 0 ? selectedRows : rows;
          exportToCSV(rowsToExport, 'data-export.csv');
        }
        break;
    }

    // Call custom handler
    onContextMenuAction?.(actionId, context);
  }, [contextMenu, rows, table, onContextMenuAction, rowToCSV, exportToCSV]);

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
              aria-label="Go to first page"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to previous page"
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
              aria-label="Go to next page"
            >
              <ChevronRight size={16} />
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Go to last page"
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
                  aria-label="Clear search"
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
                aria-label={showColumnFilters ? 'Hide column filters' : 'Show column filters'}
                aria-pressed={showColumnFilters}
              >
                <Filter size={16} />
              </button>
            )}
            {enableExpandAll && (enableExpanding || getSubRows) && (
              <>
                <button
                  className={styles.toolbarButton}
                  onClick={() => table.toggleAllRowsExpanded(true)}
                  aria-label="Expand all rows"
                >
                  <Expand size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => table.toggleAllRowsExpanded(false)}
                  aria-label="Collapse all rows"
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
            <div className={styles.grid} role="grid" aria-label={ariaLabel}>
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
                        const isPinned = header.column.getIsPinned();
                        const footerCellClasses = [
                          styles.gridFooterCell,
                          isPinned === 'left' && styles.pinnedLeft,
                          isPinned === 'right' && styles.pinnedRight,
                        ].filter(Boolean).join(' ');
                        return (
                          <div
                            key={header.id}
                            className={footerCellClasses}
                            style={{
                              flex: getFlexValue(header.getSize(), isLastColumn, header.id.startsWith('_')),
                              minWidth: header.getSize(),
                              left: isPinned === 'left' ? header.getStart('left') : undefined,
                              right: isPinned === 'right' ? header.getStart('right') : undefined,
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
