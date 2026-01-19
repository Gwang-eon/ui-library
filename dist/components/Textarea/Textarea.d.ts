import { default as React, TextareaHTMLAttributes } from 'react';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaState = 'default' | 'error' | 'success' | 'warning';
export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /**
     * Textarea size
     * @default 'md'
     */
    size?: TextareaSize;
    /**
     * Textarea state (affects border color)
     * @default 'default'
     */
    state?: TextareaState;
    /**
     * Label text
     */
    label?: string;
    /**
     * Helper text (shown below textarea)
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
     * Number of visible text rows
     * @default 4
     */
    rows?: number;
    /**
     * Show character counter
     * @default false
     */
    showCounter?: boolean;
    /**
     * Resize behavior
     * @default 'vertical'
     */
    resize?: TextareaResize;
    /**
     * Custom counter render function
     */
    renderCounter?: (current: number, max?: number) => React.ReactNode;
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
