# DataGrid Component Review

> Review Date: 2026-03-06
> Status: In Progress

## Architecture Overview

TanStack Table v8 based enterprise-grade data grid with 20+ sub-components organized into 4 directories.

**Features**: Sorting, Filtering, Pagination, Column Resizing/Pinning/Reordering, Row Selection/Expansion/Grouping, Cell Editing, Virtualization, Drag & Drop, Clipboard, Context Menu, Export (CSV/TSV/JSON/Excel)

**File Structure**:
```
src/components/DataGrid/
  DataGrid.tsx          # Main component (~2625 lines)
  DataGrid.module.css   # Styles with design tokens
  types.ts              # Type definitions
  constants.ts          # Default values
  utils.ts              # Helper functions
  components/           # UI sub-components
    GridCell.tsx, GridRow.tsx, EditableCell.tsx,
    ContextMenu.tsx, ColumnVisibility.tsx,
    DebouncedInput.tsx, IndeterminateCheckbox.tsx
  filters/              # Filter components
    ColumnFilter.tsx, TextFilter.tsx, NumberRangeFilter.tsx,
    DateFilter.tsx, SingleSelectFilter.tsx, MultiSelectFilter.tsx
  drag-drop/            # DnD components
    DraggableHeaderCell.tsx, DraggableRow.tsx,
    SortableRow.tsx, RowDragHandle.tsx
  pagination/           # Pagination components
    PageSizeSelect.tsx
```

## Strengths

1. Well-separated module structure (components, filters, drag-drop, pagination)
2. Controlled/Uncontrolled pattern for all major states
3. Performance optimized (memo, useCallback, useMemo, event delegation, virtualization)
4. Consistent design token usage in CSS (var(--spacing-*), var(--surface-*))
5. Server-side support (manualSorting, manualFiltering, manualPagination)
6. Multiple export formats with BOM UTF-8 encoding

---

## Issues Found

### P0 - Critical

#### 1. Accessibility: Missing ARIA Attributes
- **GridCell**: No `aria-colindex`
- **GridRow**: No `aria-rowindex`
- **ContextMenu**: No `role="menu"` / `role="menuitem"`, no arrow key navigation
- **ColumnVisibility**: Checkboxes lack `aria-label`, missing `aria-controls`/`aria-expanded`
- **MultiSelectFilter**: `onChange={() => {}}` on checkboxes - misleading controlled component
- **EditableCell**: Error messages lack `aria-describedby`, no `aria-live`
- **IndeterminateCheckbox**: Radio `name="row-selection"` is global scope - conflicts with multiple DataGrid instances
- **Drag-Drop (all)**: Not keyboard accessible, no ARIA drag attributes
- **TextFilter/NumberRangeFilter**: Inputs lack `aria-label`

#### 2. Accessibility: Keyboard Navigation Gaps
- Drag-drop components entirely inaccessible via keyboard
- ContextMenu has no arrow key navigation within menu
- ColumnVisibility dropdown has no keyboard navigation
- MultiSelectFilter dropdown has no keyboard navigation

### P1 - High

#### 3. Dead Code
- **DataGrid.tsx:181-215**: Top-level `fuzzyFilter`, `numberRangeFilter`, `dateRangeFilter`, `multiSelectFilter` functions declared but unused (redefined in table `filterFns` at lines 960-1020)
- **DataGrid.tsx.backup**: Stale backup file should be removed

#### 4. Column Drag Initialization Bug
- **DataGrid.tsx:1098-1108**: `handleColumnDragEnd` uses `columnOrder.indexOf()` but `columnOrder` defaults to `[]`. When column order is never explicitly set, `indexOf` returns -1 and drag silently fails.

#### 5. ColumnVisibility Display Name
- **ColumnVisibility.tsx**: Shows `column.id` (technical ID) instead of `column.columnDef.header` (display name)

### P2 - Medium

#### 6. Date Timezone Handling
- **utils.ts:stringToDate**: Creates Date in local timezone, can cause off-by-one date filter issues
- **EditableCell**: Date ISO string conversion lacks UTC handling
- **DateFilter**: Destructuring assumes array but `getFilterValue` type is unknown

#### 7. Filter Auto-Detection Weakness
- **DataGrid.tsx:717-730**: Only checks first row for type detection. Fails on sparse data or null first values.
- **ColumnFilter.tsx**: Same issue - `getPreFilteredRowModel().flatRows[0]` could be undefined

#### 8. StrictMode Workarounds
- **SingleSelectFilter**: `setTimeout(0)` hack to avoid StrictMode errors - fragile

#### 9. UI/UX Polish
- **EditableCell**: No visual indication that cell is editable (no cursor change, tooltip)
- **NumberRangeFilter**: No "~" or "to" separator between Min/Max inputs
- **DragOverlay**: Shows "Row {id}" / "{columnId}" text only - no content preview
- **Pagination**: Hard-coded English strings ("Showing X to Y of Z entries")
- **MultiSelectFilter**: Dropdown height unconstrained - can exceed viewport
- **ContextMenu**: Hard-coded `z-index: 9999`

### P3 - Low

#### 10. Performance Considerations
- **autoSizeColumns**: `document.createElement('canvas')` in `useMemo` - SSR incompatible
- **renderRow**: `isCellSelected` in deps causes entire row render function recreation on selection change
- **DndContext**: Column and Row contexts nested - potential event conflicts
- **Controlled state sync**: 12 individual `useEffect`s - could consolidate

#### 11. Test Coverage Gaps
- No tests for: drag-drop, context menu, column visibility, cell editing, keyboard navigation
- axe accessibility library imported but never used
- Fragile selectors: `[class*="globalSearchInput"]`

---

## Improvement Plan

### Phase 1: Code Cleanup -- DONE
- [x] Save review document
- [x] Remove dead code (unused filter functions at lines 181-215, .backup file)
- [x] Remove unused imports (dateToString, stringToDate from DataGrid.tsx)
- [x] Fix ColumnVisibility display name (column.id -> column.columnDef.header)
- [x] Fix column drag initialization (fallback to table.getVisibleLeafColumns when columnOrder is empty)

### Phase 2: Accessibility -- DONE
- [x] Add aria-colindex to GridCell
- [x] Add aria-rowindex to GridRow
- [x] Add role="menu"/role="menuitem"/role="separator" to ContextMenu with full keyboard navigation (ArrowUp/Down, Home/End, Enter/Space, Escape)
- [x] Fix IndeterminateCheckbox radio name scope (unique per DataGrid instance via useId)
- [x] Add aria-label to TextFilter and NumberRangeFilter inputs (with columnName prop)
- [x] Fix MultiSelectFilter: proper checkbox onChange handler, aria-expanded, aria-haspopup, role="listbox"/role="option", aria-selected, aria-label on checkboxes
- [x] Add aria-describedby + aria-invalid to EditableCell editor inputs, aria-live on error messages
- [x] Fix ColumnVisibility test selector (was testing /columns/i which didn't match aria-label)

### Phase 3: Bug Fixes -- DONE
- [x] Fix date timezone handling in utils.ts (added NaN guard, date range validation)
- [x] Fix MultiSelectFilter dropdown viewport overflow (flip above when near bottom)
- [x] Fix ContextMenu z-index (9999 -> 1500, aligned with --z-popover token)

### Phase 4: UX Polish -- DONE
- [x] Add editable cell visual indicator (cursor: text, title tooltip)
- [x] Add "~" separator to NumberRangeFilter

### Phase 5: Improvements -- DONE
- [x] Fix `src/components/index.ts` missing DataGrid export
- [x] Improve filter auto-detection (check up to 5 rows for non-null value)
- [x] Fix SingleSelectFilter StrictMode setTimeout(0) → useMemo with try/catch
- [x] Improve DragOverlay content preview (row: first 3 cell values, column: header name)
- [x] SingleSelectFilter "All" label uses locale (filterAll key)

### Remaining (future work)
- [ ] Add accessibility tests with axe
- [ ] Add tests for context menu, column visibility, cell editing
- [ ] Add keyboard navigation tests
