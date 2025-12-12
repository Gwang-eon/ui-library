import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import styles from './Picker.module.css';

export interface PickerOption {
  /** Display label */
  label: string;
  /** Option value */
  value: string | number;
  /** Disabled state */
  disabled?: boolean;
}

export interface PickerColumn {
  /** Column options */
  options: PickerOption[];
  /** Selected value */
  value?: string | number;
  /** Column label */
  label?: string;
}

export interface PickerProps {
  /** Single column options or multiple columns */
  columns: PickerOption[] | PickerColumn[];
  /** Selected value(s) */
  value?: (string | number) | (string | number)[];
  /** Change handler */
  onChange?: (value: (string | number) | (string | number)[], index: number | number[]) => void;
  /** Visible item count (odd number recommended) */
  visibleItems?: 3 | 5 | 7;
  /** Item height in pixels */
  itemHeight?: number;
  /** Show selection indicator */
  showIndicator?: boolean;
  /** Additional className */
  className?: string;
  /** Title (for modal usage) */
  title?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm handler */
  onConfirm?: (value: (string | number) | (string | number)[]) => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Show toolbar with confirm/cancel */
  showToolbar?: boolean;
}

interface WheelColumnProps {
  options: PickerOption[];
  value?: string | number;
  itemHeight: number;
  visibleItems: number;
  onChange: (value: string | number, index: number) => void;
}

const WheelColumn: React.FC<WheelColumnProps> = ({
  options,
  value,
  itemHeight,
  visibleItems,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const startScrollRef = useRef(0);
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRef = useRef<number | undefined>(undefined);

  const selectedIndex = useMemo(() => {
    const idx = options.findIndex(opt => opt.value === value);
    return idx >= 0 ? idx : 0;
  }, [options, value]);

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (containerRef.current) {
      const targetScroll = index * itemHeight;
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, [itemHeight]);

  // Initial scroll
  useEffect(() => {
    scrollToIndex(selectedIndex, false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
    }
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
    startScrollRef.current = containerRef.current?.scrollTop || 0;
    lastYRef.current = e.touches[0].clientY;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const deltaY = startYRef.current - currentY;
    const now = Date.now();
    const dt = now - lastTimeRef.current;

    if (dt > 0) {
      velocityRef.current = (lastYRef.current - currentY) / dt;
    }

    lastYRef.current = currentY;
    lastTimeRef.current = now;

    if (containerRef.current) {
      containerRef.current.scrollTop = startScrollRef.current + deltaY;
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);

    if (!containerRef.current) return;

    // Apply momentum
    const velocity = velocityRef.current;
    let currentScroll = containerRef.current.scrollTop;
    const momentum = velocity * 150;

    const targetScroll = currentScroll + momentum;
    const targetIndex = Math.round(targetScroll / itemHeight);
    const clampedIndex = Math.max(0, Math.min(options.length - 1, targetIndex));

    scrollToIndex(clampedIndex);

    // Notify change after animation
    setTimeout(() => {
      const option = options[clampedIndex];
      if (option && !option.disabled && option.value !== value) {
        onChange(option.value, clampedIndex);
      }
    }, 200);
  }, [options, itemHeight, value, onChange, scrollToIndex]);

  const handleScroll = useCallback(() => {
    if (isDragging) return;

    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const option = options[index];

      if (option && !option.disabled && option.value !== value) {
        onChange(option.value, index);
      }
    }
  }, [isDragging, options, itemHeight, value, onChange]);

  const paddingHeight = ((visibleItems - 1) / 2) * itemHeight;

  return (
    <div
      ref={containerRef}
      className={styles.wheelColumn}
      style={{ height: visibleItems * itemHeight }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
    >
      <div style={{ height: paddingHeight }} />
      {options.map((option, index) => (
        <div
          key={option.value}
          className={`${styles.wheelItem} ${option.disabled ? styles.disabled : ''} ${
            option.value === value ? styles.selected : ''
          }`}
          style={{ height: itemHeight }}
          onClick={() => {
            if (!option.disabled) {
              scrollToIndex(index);
              onChange(option.value, index);
            }
          }}
        >
          {option.label}
        </div>
      ))}
      <div style={{ height: paddingHeight }} />
    </div>
  );
};

/**
 * Picker Component
 *
 * iOS/Android style wheel picker for value selection.
 * Supports single or multiple columns with momentum scrolling.
 *
 * @example
 * ```tsx
 * // Single column
 * <Picker
 *   columns={[
 *     { label: 'Low', value: 'low' },
 *     { label: 'Medium', value: 'medium' },
 *     { label: 'High', value: 'high' },
 *   ]}
 *   value="medium"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // Multiple columns (e.g., time picker)
 * <Picker
 *   columns={[
 *     { options: hours, value: selectedHour },
 *     { options: minutes, value: selectedMinute },
 *   ]}
 *   onChange={(values) => console.log(values)}
 * />
 * ```
 */
export const Picker: React.FC<PickerProps> = ({
  columns,
  value,
  onChange,
  visibleItems = 5,
  itemHeight = 44,
  showIndicator = true,
  className = '',
  title,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  showToolbar = false,
}) => {
  // Normalize columns
  const normalizedColumns: PickerColumn[] = useMemo(() => {
    if (columns.length === 0) return [];

    // Check if it's array of options (single column) or array of columns
    if ('options' in columns[0]) {
      return columns as PickerColumn[];
    }

    return [{ options: columns as PickerOption[], value: value as string | number }];
  }, [columns, value]);

  const isSingleColumn = normalizedColumns.length === 1;

  // Get current values
  const currentValues = useMemo((): (string | number)[] => {
    if (isSingleColumn) {
      return [value as string | number];
    }
    if (Array.isArray(value)) {
      return value;
    }
    return normalizedColumns.map(col => col.value ?? col.options[0]?.value ?? '');
  }, [value, normalizedColumns, isSingleColumn]);

  const [internalValues, setInternalValues] = useState<(string | number)[]>(currentValues);

  useEffect(() => {
    setInternalValues(currentValues);
  }, [currentValues]);

  const handleColumnChange = useCallback((columnIndex: number, newValue: string | number, optionIndex: number) => {
    const newValues = [...internalValues];
    newValues[columnIndex] = newValue;
    setInternalValues(newValues);

    if (!showToolbar) {
      if (isSingleColumn) {
        onChange?.(newValue, optionIndex);
      } else {
        onChange?.(newValues, newValues.map((v, i) =>
          normalizedColumns[i].options.findIndex(opt => opt.value === v)
        ));
      }
    }
  }, [internalValues, isSingleColumn, onChange, showToolbar, normalizedColumns]);

  const handleConfirm = useCallback(() => {
    const result: (string | number) | (string | number)[] = isSingleColumn ? internalValues[0] : internalValues;
    onConfirm?.(result);
  }, [internalValues, isSingleColumn, onConfirm]);

  const indicatorTop = ((visibleItems - 1) / 2) * itemHeight;

  return (
    <div className={`${styles.picker} ${className}`}>
      {showToolbar && (
        <div className={styles.toolbar}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>
          {title && <span className={styles.title}>{title}</span>}
          <button type="button" className={styles.confirmBtn} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      )}

      <div className={styles.columns}>
        {showIndicator && (
          <div
            className={styles.indicator}
            style={{ top: indicatorTop, height: itemHeight }}
          />
        )}

        {normalizedColumns.map((column, index) => (
          <WheelColumn
            key={index}
            options={column.options}
            value={internalValues[index]}
            itemHeight={itemHeight}
            visibleItems={visibleItems}
            onChange={(newValue, optIndex) => handleColumnChange(index, newValue, optIndex)}
          />
        ))}

        <div className={styles.mask} style={{ backgroundSize: `100% ${indicatorTop}px` }} />
      </div>
    </div>
  );
};

Picker.displayName = 'Picker';
