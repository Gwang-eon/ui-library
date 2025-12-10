import type { ReactNode } from 'react';
export interface ColorPickerProps {
    /** Selected color value (controlled) */
    value?: string;
    /** Default color value (uncontrolled) */
    defaultValue?: string;
    /** Change handler */
    onChange?: (color: string) => void;
    /** Label for the color picker */
    label?: string;
    /** Preset colors */
    presets?: string[];
    /** Show recent colors */
    showRecent?: boolean;
    /** Compact mode (swatch buttons only) */
    compact?: boolean;
    /** Small size for compact mode */
    size?: 'sm' | 'md';
    /** Allow custom color input */
    allowCustom?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS class */
    className?: string;
    /** Custom trigger element */
    children?: ReactNode;
}
/**
 * Color Picker Component
 *
 * Select and customize colors with hex, RGB input and preset swatches.
 * Supports both full panel mode and compact swatch mode.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   label="Theme Color"
 *   defaultValue="#3B82F6"
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Compact mode
 * <ColorPicker
 *   compact
 *   presets={['#EF4444', '#10B981', '#3B82F6']}
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 */
export declare const ColorPicker: {
    ({ value: controlledValue, defaultValue, onChange, label, presets, showRecent, compact, size, allowCustom, disabled, className, children, }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
