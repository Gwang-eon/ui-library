import type { ReactNode } from 'react';
import { useState } from 'react';
import styles from './Segmented.module.css';

export interface SegmentedOption {
  /** Option value */
  value: string;
  /** Option label */
  label: ReactNode;
  /** Option icon */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface SegmentedProps {
  /** Available options */
  options: SegmentedOption[];
  /** Selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width */
  block?: boolean;
  /** Icon only mode */
  iconOnly?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** ARIA label */
  'aria-label'?: string;
  /** Custom className */
  className?: string;
}

/**
 * Segmented Component
 *
 * Compact single-select button group, visual alternative to radio buttons.
 * Ideal for view mode switching, time range selection, and status filtering.
 *
 * @example
 * ```tsx
 * <Segmented
 *   options={[
 *     { value: 'list', label: 'List', icon: <List /> },
 *     { value: 'grid', label: 'Grid', icon: <Grid /> },
 *     { value: 'table', label: 'Table', icon: <Table /> },
 *   ]}
 *   defaultValue="list"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Icon only
 * <Segmented
 *   options={[
 *     { value: 'list', icon: <List />, label: 'List view' },
 *     { value: 'grid', icon: <Grid />, label: 'Grid view' },
 *   ]}
 *   iconOnly
 *   defaultValue="list"
 * />
 * ```
 */
export const Segmented = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'md',
  block = false,
  iconOnly = false,
  disabled = false,
  'aria-label': ariaLabel,
  className,
}: SegmentedProps) => {
  // Handle controlled/uncontrolled state
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue || options[0]?.value || ''
  );

  const selectedValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const containerClasses = [
    styles.segmented,
    size === 'sm' && styles.segmentedSm,
    size === 'lg' && styles.segmentedLg,
    block && styles.segmentedBlock,
    iconOnly && styles.segmentedIconOnly,
    disabled && styles.segmentedDisabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        const isDisabled = disabled || option.disabled;
        const inputId = `segmented-${option.value}-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <div key={option.value}>
            <input
              type="radio"
              id={inputId}
              name="segmented"
              value={option.value}
              checked={isSelected}
              disabled={isDisabled}
              onChange={() => handleChange(option.value)}
              hidden
            />
            <label
              htmlFor={inputId}
              className={styles.segmentedItem}
              aria-label={iconOnly ? (typeof option.label === 'string' ? option.label : undefined) : undefined}
            >
              {option.icon && <span className={styles.segmentedItemIcon}>{option.icon}</span>}
              {!iconOnly && option.label && <span>{option.label}</span>}
            </label>
          </div>
        );
      })}
    </div>
  );
};

Segmented.displayName = 'Segmented';
