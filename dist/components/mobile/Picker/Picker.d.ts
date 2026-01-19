import React from 'react';
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
export declare const Picker: React.FC<PickerProps>;
