/**
 * SingleSelectFilter
 * Single select dropdown filter for DataGrid columns
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Select } from '../../Select';
import type { FilterOption } from '../types';
import styles from '../DataGrid.module.css';

interface SingleSelectFilterProps {
  column: any;
  options?: FilterOption[];
}

export const SingleSelectFilter: React.FC<SingleSelectFilterProps> = ({
  column,
  options: customOptions,
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

export default SingleSelectFilter;
