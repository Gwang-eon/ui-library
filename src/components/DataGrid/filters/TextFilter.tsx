/**
 * TextFilter
 * Text search filter for DataGrid columns
 */

import React, { useState, useEffect } from 'react';
import { Input } from '../../Input';
import styles from '../DataGrid.module.css';

interface TextFilterProps {
  column: any;
}

export const TextFilter: React.FC<TextFilterProps> = ({ column }) => {
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

export default TextFilter;
