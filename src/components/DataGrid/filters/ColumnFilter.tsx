/**
 * ColumnFilter
 * Main filter dispatcher component that routes to appropriate filter type
 */

import React, { memo } from 'react';
import { Table as TanStackTable } from '@tanstack/react-table';
import type { FilterType, FilterOption } from '../types';
import { SingleSelectFilter } from './SingleSelectFilter';
import { MultiSelectFilter } from './MultiSelectFilter';
import { DateFilter } from './DateFilter';
import { NumberRangeFilter } from './NumberRangeFilter';
import { TextFilter } from './TextFilter';

interface ColumnFilterLocale {
  filterAll?: string;
}

interface ColumnFilterProps {
  column: any;
  table: TanStackTable<any>;
  locale?: ColumnFilterLocale;
}

export const ColumnFilter = memo<ColumnFilterProps>(({
  column,
  table,
  locale,
}) => {
  const columnDef = column.columnDef;
  const filterType: FilterType = columnDef.meta?.filterType ?? columnDef.filterType;
  const filterOptions: FilterOption[] | undefined = columnDef.meta?.filterOptions ?? columnDef.filterOptions;
  const FilterComponent = columnDef.meta?.filterComponent ?? columnDef.filterComponent;
  const columnName = typeof columnDef.header === 'string' ? columnDef.header : column.id;

  // Custom filter component takes precedence
  if (FilterComponent) {
    return <FilterComponent column={column} table={table} />;
  }

  // Route to appropriate filter based on filterType
  switch (filterType) {
    case 'select':
      return <SingleSelectFilter column={column} options={filterOptions} allLabel={locale?.filterAll} />;
    case 'multi-select':
      return <MultiSelectFilter column={column} options={filterOptions} />;
    case 'date':
      return <DateFilter column={column} isRange={false} />;
    case 'date-range':
      return <DateFilter column={column} isRange={true} />;
    case 'number':
      return <NumberRangeFilter column={column} columnName={columnName} />;
    case 'text':
    default: {
      // Auto-detect based on data type — check up to 5 rows for non-null value
      const flatRows = table.getPreFilteredRowModel().flatRows;
      let detectedNumber = false;
      for (let i = 0; i < Math.min(5, flatRows.length); i++) {
        const val = flatRows[i]?.getValue(column.id);
        if (val != null) {
          detectedNumber = typeof val === 'number';
          break;
        }
      }

      if (detectedNumber) {
        return <NumberRangeFilter column={column} columnName={columnName} />;
      }

      return <TextFilter column={column} columnName={columnName} />;
    }
  }
});

ColumnFilter.displayName = 'ColumnFilter';

export default ColumnFilter;
