/**
 * NumberRangeFilter
 * Number range (min/max) filter for DataGrid columns
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '../../Input';
import styles from '../DataGrid.module.css';

interface NumberRangeFilterProps {
  column: any;
}

export const NumberRangeFilter: React.FC<NumberRangeFilterProps> = ({ column }) => {
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

export default NumberRangeFilter;
