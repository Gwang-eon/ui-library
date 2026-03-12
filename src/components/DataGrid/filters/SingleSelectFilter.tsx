/**
 * SingleSelectFilter
 * Single select dropdown filter for DataGrid columns
 */

import React, { useMemo, useCallback } from 'react';
import { Select } from '../../Select';
import type { FilterOption } from '../types';
import styles from '../DataGrid.module.css';

interface SingleSelectFilterProps {
  column: any;
  options?: FilterOption[];
  allLabel?: string;
}

export const SingleSelectFilter: React.FC<SingleSelectFilterProps> = ({
  column,
  options: customOptions,
  allLabel = 'All',
}) => {
  const columnFilterValue = column.getFilterValue() as string | undefined;

  // Get faceted values directly — safe in render since TanStack Table
  // provides memoized results via getFacetedUniqueValues()
  const facetedValues = useMemo<Map<any, number>>(() => {
    try {
      return column.getFacetedUniqueValues() ?? new Map();
    } catch {
      return new Map();
    }
  }, [column]);

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
    { value: '', label: allLabel },
    ...options,
  ], [options, allLabel]);

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
        placeholder={allLabel}
        fullWidth
      />
    </div>
  );
};

export default SingleSelectFilter;
