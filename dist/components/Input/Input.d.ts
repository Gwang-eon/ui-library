import { default as React, InputHTMLAttributes, ReactNode } from 'react';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success' | 'warning';
export type InputVariant = 'outlined' | 'filled' | 'underline' | 'flush';
export type LabelPosition = 'top' | 'horizontal';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Input size
     * @default 'md'
     */
    size?: InputSize;
    /**
     * Input state (affects border color)
     * @default 'default'
     */
    state?: InputState;
    /**
     * Input visual variant
     * @default 'outlined'
     */
    variant?: InputVariant;
    /**
     * Label position style
     * @default 'top'
     */
    labelPosition?: LabelPosition;
    /**
     * Label text
     */
    label?: string;
    /**
     * Helper text (shown below input)
     */
    helperText?: string;
    /**
     * Error message (shown when state is 'error')
     */
    errorMessage?: string;
    /**
     * Success message (shown when state is 'success')
     */
    successMessage?: string;
    /**
     * Warning message (shown when state is 'warning')
     */
    warningMessage?: string;
    /**
     * Show required indicator (*)
     * @default false
     */
    required?: boolean;
    /**
     * Full width
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Icon to show on the left
     */
    leftIcon?: ReactNode;
    /**
     * Icon to show on the right
     */
    rightIcon?: ReactNode;
    /**
     * Additional CSS class for the wrapper
     */
    wrapperClassName?: string;
}
/**
 * Input component for text input fields
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input label="Email" placeholder="Enter email" />
 *
 * // With error
 * <Input
 *   label="Email"
 *   state="error"
 *   errorMessage="Invalid email address"
 * />
 *
 * // With icon
 * <Input
 *   label="Search"
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
