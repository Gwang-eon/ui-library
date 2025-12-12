import React from 'react';
import type { ReactNode } from 'react';
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
export declare const Slider: React.FC<CombinedSliderProps>;
export {};
