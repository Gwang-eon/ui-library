import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

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
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconOnly = false,
      children,
      className = '',
      disabled = false,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const classNames = [
      styles.btn,
      styles[`btn-${variant}`],
      styles[`btn-${size}`],
      loading && styles['btn-loading'],
      iconOnly && styles['btn-icon'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {icon && <span className={styles.btnIconWrapper}>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
