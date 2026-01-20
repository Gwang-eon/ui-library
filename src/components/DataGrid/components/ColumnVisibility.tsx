/**
 * ColumnVisibilityDropdown
 * Dropdown for toggling column visibility
 */

import React, { memo, useState } from 'react';
import { Table as TanStackTable } from '@tanstack/react-table';
import { Columns } from 'lucide-react';
import styles from '../DataGrid.module.css';

interface ColumnVisibilityDropdownProps {
  table: TanStackTable<any>;
}

export const ColumnVisibilityDropdown = memo<ColumnVisibilityDropdownProps>(({
  table,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.toolbarButton}
        onClick={() => setOpen(!open)}
        aria-label="Toggle column visibility"
        aria-expanded={open}
        aria-haspopup="menu"
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

export default ColumnVisibilityDropdown;
