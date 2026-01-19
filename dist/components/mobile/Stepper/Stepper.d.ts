import { default as React } from 'react';
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
export declare const Stepper: React.FC<StepperProps>;
