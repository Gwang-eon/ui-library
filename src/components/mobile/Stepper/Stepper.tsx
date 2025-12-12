import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './Stepper.module.css';

export type StepperSize = 'sm' | 'md' | 'lg';
export type StepperVariant = 'default' | 'filled' | 'outlined';

export interface StepperProps {
  /** Current value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: StepperSize;
  /** Style variant */
  variant?: StepperVariant;
  /** Show input field */
  showInput?: boolean;
  /** Allow input editing */
  editable?: boolean;
  /** Long press acceleration */
  longPress?: boolean;
  /** Format display value */
  formatValue?: (value: number) => string;
  /** Additional className */
  className?: string;
  /** ARIA label */
  'aria-label'?: string;
}

/**
 * Stepper Component
 *
 * Numeric input with increment/decrement buttons.
 * Optimized for mobile with long-press acceleration.
 *
 * @example
 * ```tsx
 * <Stepper
 *   value={quantity}
 *   min={1}
 *   max={99}
 *   onChange={setQuantity}
 * />
 *
 * // Temperature control
 * <Stepper
 *   value={temp}
 *   min={16}
 *   max={30}
 *   step={0.5}
 *   formatValue={(v) => `${v}°C`}
 *   onChange={setTemp}
 * />
 * ```
 */
export const Stepper: React.FC<StepperProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'default',
  showInput = true,
  editable = false,
  longPress = true,
  formatValue,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const speedRef = useRef(300);

  // Clamp value to min/max
  const clamp = useCallback((val: number) => {
    const rounded = Math.round(val / step) * step;
    return Math.max(min, Math.min(max, rounded));
  }, [min, max, step]);

  const updateValue = useCallback((newValue: number) => {
    const clampedValue = clamp(newValue);
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    onChange?.(clampedValue);
  }, [clamp, isControlled, onChange]);

  const increment = useCallback(() => {
    updateValue(currentValue + step);
  }, [currentValue, step, updateValue]);

  const decrement = useCallback(() => {
    updateValue(currentValue - step);
  }, [currentValue, step, updateValue]);

  // Long press handling
  const startLongPress = useCallback((action: () => void) => {
    if (!longPress || disabled) return;

    action();
    speedRef.current = 300;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        action();
        // Accelerate
        if (speedRef.current > 50) {
          speedRef.current -= 30;
          clearInterval(intervalRef.current);
          intervalRef.current = setInterval(action, speedRef.current);
        }
      }, speedRef.current);
    }, 500);
  }, [longPress, disabled]);

  const stopLongPress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLongPress();
    };
  }, [stopLongPress]);

  // Handle input editing
  const handleInputFocus = useCallback(() => {
    if (editable) {
      setIsEditing(true);
      setInputValue(String(currentValue));
    }
  }, [editable, currentValue]);

  const handleInputBlur = useCallback(() => {
    setIsEditing(false);
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      updateValue(parsed);
    }
  }, [inputValue, updateValue]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'Escape') {
      setInputValue(String(currentValue));
      (e.target as HTMLInputElement).blur();
    }
  }, [currentValue]);

  const displayValue = formatValue ? formatValue(currentValue) : String(currentValue);
  const isMinReached = currentValue <= min;
  const isMaxReached = currentValue >= max;

  const sizeClass = size !== 'md' ? styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`] : '';
  const variantClass = variant !== 'default' ? styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`] : '';

  return (
    <div
      className={`${styles.stepper} ${sizeClass} ${variantClass} ${disabled ? styles.disabled : ''} ${className}`}
      role="group"
      aria-label={ariaLabel || 'Stepper'}
    >
      <button
        type="button"
        className={`${styles.button} ${styles.decrementBtn}`}
        onClick={decrement}
        onMouseDown={() => startLongPress(decrement)}
        onMouseUp={stopLongPress}
        onMouseLeave={stopLongPress}
        onTouchStart={() => startLongPress(decrement)}
        onTouchEnd={stopLongPress}
        disabled={disabled || isMinReached}
        aria-label="Decrease"
      >
        <Minus className={styles.icon} />
      </button>

      {showInput && (
        editable && isEditing ? (
          <input
            type="number"
            className={styles.input}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            autoFocus
          />
        ) : (
          <span
            className={`${styles.value} ${editable ? styles.editable : ''}`}
            onClick={handleInputFocus}
            role={editable ? 'button' : undefined}
            tabIndex={editable ? 0 : undefined}
            onKeyDown={editable ? (e) => e.key === 'Enter' && handleInputFocus() : undefined}
          >
            {displayValue}
          </span>
        )
      )}

      <button
        type="button"
        className={`${styles.button} ${styles.incrementBtn}`}
        onClick={increment}
        onMouseDown={() => startLongPress(increment)}
        onMouseUp={stopLongPress}
        onMouseLeave={stopLongPress}
        onTouchStart={() => startLongPress(increment)}
        onTouchEnd={stopLongPress}
        disabled={disabled || isMaxReached}
        aria-label="Increase"
      >
        <Plus className={styles.icon} />
      </button>
    </div>
  );
};

Stepper.displayName = 'Stepper';
