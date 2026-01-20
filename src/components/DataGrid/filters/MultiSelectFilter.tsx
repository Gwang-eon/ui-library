/**
 * MultiSelectFilter
 * Multi-select checkbox filter for DataGrid columns
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X, Check } from 'lucide-react';
import type { FilterOption } from '../types';
import styles from '../DataGrid.module.css';

interface MultiSelectFilterProps {
  column: any;
  options?: FilterOption[];
}

export const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  column,
  options: customOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const columnFilterValue = column.getFilterValue();
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
  }, [facetedValues.size, column.id, customOptions]);

  // Update dropdown position when opening
  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on window resize
  useEffect(() => {
    if (isOpen) {
      const handleResize = () => setIsOpen(false);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isOpen]);

  const selectedValues = useMemo(() => {
    if (!columnFilterValue) return [];
    if (Array.isArray(columnFilterValue)) return columnFilterValue;
    return [columnFilterValue];
  }, [columnFilterValue]);

  const handleSelect = useCallback((value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    column.setFilterValue(newValues.length > 0 ? newValues : undefined);
  }, [column, selectedValues]);

  const clearFilter = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    column.setFilterValue(undefined);
  }, [column]);

  const displayText = useMemo(() => {
    if (selectedValues.length === 0) return 'Select...';
    if (selectedValues.length === 1) {
      const opt = options.find((o) => o.value === selectedValues[0]);
      return opt?.label ?? selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  }, [selectedValues, options]);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  }, [isOpen, updatePosition]);

  return (
    <div className={styles.selectFilter}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.selectFilterTrigger}
        onClick={handleToggle}
      >
        <span className={styles.selectFilterText}>{displayText}</span>
        {selectedValues.length > 0 && (
          <span className={styles.selectFilterClear} onClick={clearFilter}>
            <X size={12} />
          </span>
        )}
        <ChevronDown size={14} className={styles.selectFilterIcon} />
      </button>
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className={styles.selectFilterDropdownPortal}
          style={{
            position: 'fixed',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            minWidth: 150,
          }}
        >
          {options.length === 0 ? (
            <div className={styles.selectFilterEmpty}>No options</div>
          ) : (
            options.map((option) => {
              const isChecked = selectedValues.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={`${styles.selectFilterOption} ${isChecked ? styles.selected : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxMark}>
                      {isChecked && <Check size={12} />}
                    </span>
                  </label>
                  <span>{option.label}</span>
                </div>
              );
            })
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default MultiSelectFilter;
