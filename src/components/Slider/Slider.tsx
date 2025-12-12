import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: ReactNode;
  /** Show current value */
  showValue?: boolean;
  /** Value formatter function */
  formatValue?: (value: number) => string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Min label text */
  minLabel?: string;
  /** Max label text */
  maxLabel?: string;
  /** Icon before slider */
  iconBefore?: ReactNode;
  /** Icon after slider */
  iconAfter?: ReactNode;
  /** Helper text */
  helperText?: ReactNode;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Additional CSS class */
  className?: string;
  /** Accessible label */
  ariaLabel?: string;
}

export interface RangeSliderProps {
  /** Current min value (controlled) */
  value?: [number, number];
  /** Default value (uncontrolled) */
  defaultValue?: [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: ReactNode;
  /** Show current values */
  showValue?: boolean;
  /** Value formatter function */
  formatValue?: (minValue: number, maxValue: number) => string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Min label text */
  minLabel?: string;
  /** Max label text */
  maxLabel?: string;
  /** Helper text */
  helperText?: ReactNode;
  /** Callback when values change */
  onChange?: (value: [number, number]) => void;
  /** Additional CSS class */
  className?: string;
  /** Range mode */
  range: true;
}

type CombinedSliderProps = SliderProps | RangeSliderProps;

const isRangeSlider = (props: CombinedSliderProps): props is RangeSliderProps => {
  return 'range' in props && props.range === true;
};

/**
 * Slider Component
 *
 * Allows users to select a value or range from a continuous or discrete set of values.
 * Supports both single value and range (min-max) modes.
 *
 * @example
 * ```tsx
 * // Single value slider
 * <Slider min={0} max={100} defaultValue={50} label="Volume" showValue />
 *
 * // Range slider
 * <Slider range min={0} max={50} defaultValue={[20, 30]} label="Temperature Range" />
 * ```
 */
export const Slider: React.FC<CombinedSliderProps> = (props) => {
  if (isRangeSlider(props)) {
    return <RangeSliderComponent {...props} />;
  }
  return <SingleSliderComponent {...props} />;
};

// Single Slider Component
const SingleSliderComponent: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
  formatValue = (v) => String(v),
  showMinMax = false,
  minLabel,
  maxLabel,
  iconBefore,
  iconAfter,
  helperText,
  onChange,
  className,
  ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');
  const hasIcons = iconBefore || iconAfter;

  return (
    <div className={containerClasses}>
      {label && showValue && (
        <div className={styles.header}>
          <label className={styles.label}>{label}</label>
          <span className={styles.valueDisplay}>{formatValue(currentValue)}</span>
        </div>
      )}
      {label && !showValue && <label className={styles.label}>{label}</label>}

      <div className={hasIcons ? styles.sliderWithIcons : undefined}>
        {iconBefore && <span className={styles.iconBefore}>{iconBefore}</span>}

        <input
          type="range"
          className={styles.slider}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={handleChange}
          aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
        />

        {iconAfter && <span className={styles.iconAfter}>{iconAfter}</span>}
        {showValue && hasIcons && (
          <span className={styles.valueInline}>{formatValue(currentValue)}</span>
        )}
      </div>

      {showMinMax && (
        <div className={styles.minMaxLabels}>
          <span>{minLabel || min}</span>
          <span>{maxLabel || max}</span>
        </div>
      )}

      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

// Range Slider Component
const RangeSliderComponent: React.FC<RangeSliderProps> = ({
  value: controlledValue,
  defaultValue = [0, 100],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
  formatValue = (minVal, maxVal) => `${minVal} - ${maxVal}`,
  showMinMax = false,
  minLabel,
  maxLabel,
  helperText,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const [minValue, maxValue] = currentValue;

  const updateValue = useCallback(
    (newMin: number, newMax: number) => {
      const updatedValue: [number, number] = [newMin, newMax];
      if (!isControlled) {
        setInternalValue(updatedValue);
      }
      onChange?.(updatedValue);
    },
    [isControlled, onChange]
  );

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Number(e.target.value);
      // Ensure min doesn't exceed max
      if (newMin <= maxValue) {
        updateValue(newMin, maxValue);
      }
    },
    [maxValue, updateValue]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Number(e.target.value);
      // Ensure max doesn't go below min
      if (newMax >= minValue) {
        updateValue(minValue, newMax);
      }
    },
    [minValue, updateValue]
  );

  // Calculate fill position and width
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && showValue && (
        <div className={styles.header}>
          <label className={styles.label}>{label}</label>
          <span className={styles.valueDisplay}>{formatValue(minValue, maxValue)}</span>
        </div>
      )}
      {label && !showValue && <label className={styles.label}>{label}</label>}

      <div className={styles.rangeWrapper}>
        <div className={styles.rangeTrack} />
        <div
          className={styles.rangeFill}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          className={styles.rangeInput}
          min={min}
          max={max}
          step={step}
          value={minValue}
          disabled={disabled}
          onChange={handleMinChange}
          aria-label="Minimum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minValue}
        />
        <input
          type="range"
          className={styles.rangeInput}
          min={min}
          max={max}
          step={step}
          value={maxValue}
          disabled={disabled}
          onChange={handleMaxChange}
          aria-label="Maximum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
        />
      </div>

      {showMinMax && (
        <div className={styles.minMaxLabels}>
          <span>{minLabel || min}</span>
          <span>{maxLabel || max}</span>
        </div>
      )}

      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

Slider.displayName = 'Slider';
