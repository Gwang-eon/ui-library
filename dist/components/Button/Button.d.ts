import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'error';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button variant
     * @default 'primary'
     */
    variant?: ButtonVariant;
    /**
     * Button size
     * @default 'md'
     */
    size?: ButtonSize;
    /**
     * Loading state - shows spinner and disables interaction
     * @default false
     */
    loading?: boolean;
    /**
     * Icon to display before children
     */
    icon?: ReactNode;
    /**
     * Icon-only button (square aspect ratio)
     * @default false
     */
    iconOnly?: boolean;
    /**
     * Button content
     */
    children?: ReactNode;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Disabled state
     * @default false
     */
    disabled?: boolean;
}
/**
 * Button component for triggering actions and events
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary">Save</Button>
 *
 * // Secondary button
 * <Button variant="secondary">Cancel</Button>
 *
 * // Loading state
 * <Button loading>Saving...</Button>
 *
 * // With icon
 * <Button>
 *   <PlusIcon />
 *   Add Item
 * </Button>
 *
 * // Icon only
 * <Button iconOnly aria-label="Settings">
 *   <SettingsIcon />
 * </Button>
 * ```
 */
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
