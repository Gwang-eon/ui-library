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

interface ColumnFilterProps {
  column: any;
  table: TanStackTable<any>;
}

export const ColumnFilter = memo<ColumnFilterProps>(({
  column,
  table,
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

export default ColumnFilter;
