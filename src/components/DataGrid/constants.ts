/**
 * DataGrid Constants
 * Default values and configuration constants
 */

import type { DataGridLocale } from './types';

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export const DEFAULT_ESTIMATE_ROW_HEIGHT = 40;
export const DEFAULT_ESTIMATE_COLUMN_WIDTH = 150;
export const DEFAULT_OVERSCAN = 10;
export const DEFAULT_HEIGHT = 600;
export const DEFAULT_EMPTY_MESSAGE = 'No data available';

export const DEFAULT_LOCALE: DataGridLocale = {
  // Toolbar
  searchPlaceholder: 'Search all columns...',
  clearSearch: 'Clear search',
  showFilters: 'Show column filters',
  hideFilters: 'Hide column filters',
  expandAll: 'Expand all rows',
  collapseAll: 'Collapse all rows',
  rowsLabel: 'Rows:',
  toggleColumnVisibility: 'Toggle column visibility',

  // Column Visibility
  toggleColumns: 'Toggle Columns',
  toggleAll: 'Toggle All',

  // Pagination
  showing: 'Showing {start} to {end} of {total} entries',
  selected: '{count} selected',
  pageInfo: 'Page {page} of {pages}',
  perPage: '{size} / page',
  firstPage: 'Go to first page',
  previousPage: 'Go to previous page',
  nextPage: 'Go to next page',
  lastPage: 'Go to last page',

  // Empty state
  noData: 'No data available',

  // Filters
  filterSearch: 'Search...',
  filterSearchColumn: 'Search {column}',
  filterMin: 'Min',
  filterMax: 'Max',
  filterMinColumn: '{column} minimum',
  filterMaxColumn: '{column} maximum',
  filterSelect: 'Select...',
  filterSelectedCount: '{count} selected',
  filterNoOptions: 'No options',
  filterAll: 'All',

  // Editable cell
  editTooltip: 'Double-click to edit',

  // Context menu
  contextMenuLabel: 'Context menu',

  // Drag
  pinToTop: 'Pin to top',
  pinToBottom: 'Pin to bottom',
  unpinRow: 'Unpin row',
};
