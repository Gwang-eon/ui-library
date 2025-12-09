import React, { type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.css';

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
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      state = 'default',
      variant = 'outlined',
      labelPosition = 'top',
      label,
      helperText,
      errorMessage,
      successMessage,
      warningMessage,
      required = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      wrapperClassName = '',
      className = '',
      disabled = false,
      readOnly = false,
      id,
      ...rest
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${React.useId()}`;

    // Determine which message to show
    const message =
      state === 'error'
        ? errorMessage
        : state === 'success'
        ? successMessage
        : state === 'warning'
        ? warningMessage
        : helperText;

    const wrapperClasses = [
      styles['input-group'],
      labelPosition === 'horizontal' && styles['input-group-horizontal'],
      fullWidth && styles['input-full-width'],
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.input,
      styles[`input-${size}`],
      variant !== 'outlined' && styles[`input-${variant}`],
      state !== 'default' && styles[state],
      leftIcon && styles['input-with-left-icon'],
      rightIcon && styles['input-with-right-icon'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const messageClasses = [
      styles['input-message'],
      state === 'error' && styles['input-error'],
      state === 'success' && styles['input-success'],
      state === 'warning' && styles['input-warning'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles['input-label']}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        {labelPosition === 'horizontal' && message ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <div className={styles['input-wrapper']}>
              {leftIcon && <span className={styles['input-icon-left']}>{leftIcon}</span>}

              <input
                ref={ref}
                id={inputId}
                className={inputClasses}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={state === 'error'}
                aria-describedby={message ? `${inputId}-message` : undefined}
                {...rest}
              />

              {rightIcon && <span className={styles['input-icon-right']}>{rightIcon}</span>}
            </div>
            {message && (
              <span id={`${inputId}-message`} className={messageClasses}>
                {message}
              </span>
            )}
          </div>
        ) : (
          <>
            <div className={styles['input-wrapper']}>
              {leftIcon && <span className={styles['input-icon-left']}>{leftIcon}</span>}

              <input
                ref={ref}
                id={inputId}
                className={inputClasses}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={state === 'error'}
                aria-describedby={message ? `${inputId}-message` : undefined}
                {...rest}
              />

              {rightIcon && <span className={styles['input-icon-right']}>{rightIcon}</span>}
            </div>

            {message && labelPosition !== 'horizontal' && (
              <span id={`${inputId}-message`} className={messageClasses}>
                {message}
              </span>
            )}
          </>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
