export type KnobSize = 'sm' | 'md' | 'lg';
export type KnobVariant = 'primary' | 'success' | 'warning' | 'error';
export interface KnobProps {
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
    /** Value label (e.g., "°C", "%") */
    label?: string;
    /** Show min/max labels */
    showLabels?: boolean;
    /** Show position indicator/marker */
    showIndicator?: boolean;
    /** Size variant */
    size?: KnobSize;
    /** Color variant */
    variant?: KnobVariant;
    /** Disabled state */
    disabled?: boolean;
    /** Read only state */
    readOnly?: boolean;
    /** Callback when value changes */
    onChange?: (value: number) => void;
    /** Additional CSS classes */
    className?: string;
}
/**
 * Knob - Circular dial input for adjusting values
 *
 * Features:
 * - Drag to adjust value
 * - Multiple sizes and colors
 * - Min/max range
 * - Step increments
 * - Label support
 *
 * @example
 * ```tsx
 * <Knob
 *   value={temperature}
 *   onChange={setTemperature}
 *   min={15}
 *   max={30}
 *   label="°C"
 * />
 * ```
 */
export declare const Knob: ({ value: controlledValue, defaultValue, min, max, step, label, showLabels, showIndicator, size, variant, disabled, readOnly, onChange, className, }: KnobProps) => import("react/jsx-runtime").JSX.Element;
