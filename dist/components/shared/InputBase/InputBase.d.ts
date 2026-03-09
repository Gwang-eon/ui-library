import React from 'react';
import type { InputHTMLAttributes } from 'react';
export interface InputBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
    /** Input variant */
    variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
    /** Input size */
    inputSize?: 'sm' | 'md' | 'lg';
    /** Whether the input is full width */
    fullWidth?: boolean;
    /** Icon position */
    iconPosition?: 'left' | 'right' | 'both' | 'none';
    /** Whether the input is borderless */
    borderless?: boolean;
    /** Whether to render as textarea */
    multiline?: boolean;
    /** Additional class name */
    className?: string;
}
/**
 * InputBase Component
 *
 * A base input component that uses atomic CSS patterns.
 * This component provides consistent styling across all input-based components.
 *
 * @example
 * ```tsx
 * <InputBase placeholder="Enter text" />
 * <InputBase variant="error" inputSize="lg" />
 * <InputBase multiline rows={4} />
 * ```
 */
export declare const InputBase: React.ForwardRefExoticComponent<InputBaseProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
