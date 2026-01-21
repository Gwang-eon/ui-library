/**
 * ColumnVisibilityDropdown
 * Dropdown for toggling column visibility
 * Uses Portal for proper rendering outside DataGrid container
 */

import React, { memo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate dropdown position based on button location
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 200; // Approximate menu width
      const menuHeight = 300; // Approximate max menu height

      let top = rect.bottom + 4;
      let left = rect.right - menuWidth;

      // Adjust if menu would go off-screen
      if (left < 10) {
        left = rect.left;
      }
      if (top + menuHeight > window.innerHeight) {
        top = rect.top - menuHeight - 4;
      }

      setPosition({ top, left });
    }
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div className={styles.dropdown}>
      <button
        ref={buttonRef}
        className={styles.toolbarButton}
        onClick={() => setOpen(!open)}
        aria-label="Toggle column visibility"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Columns size={16} />
      </button>
      {open && createPortal(
        <>
          <div className={styles.dropdownBackdrop} onClick={() => setOpen(false)} />
          <div
            ref={menuRef}
            className={styles.dropdownMenu}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              right: 'auto',
              bottom: 'auto',
            }}
          >
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
        </>,
        document.body
      )}
    </div>
  );
});

ColumnVisibilityDropdown.displayName = 'ColumnVisibilityDropdown';

export default ColumnVisibilityDropdown;
