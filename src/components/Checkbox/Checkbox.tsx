import React, { type InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  indeterminate?: boolean;
  size?: CheckboxSize;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      indeterminate = false,
      size = 'md',
      className = '',
      disabled = false,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${React.useId()}`;
    const messageId = `${checkboxId}-message`;
    const hasMessage = (error && errorMessage) || helperText;
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    // Handle indeterminate state
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, checkboxRef]);

    // Size class mapping
    const sizeClass = size === 'sm' ? styles['checkbox-sm'] : size === 'lg' ? styles['checkbox-lg'] : '';

    return (
      <div className={`${styles['checkbox-wrapper']} ${className}`}>
        <label
          className={`${styles.checkbox} ${sizeClass} ${error ? styles.error : ''} ${
            disabled ? styles.disabled : ''
          }`}
          htmlFor={checkboxId}
        >
          <input
            ref={checkboxRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={styles['checkbox-input']}
            aria-invalid={error || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            {...props}
          />
          {label && <span className={styles['checkbox-label']}>{label}</span>}
        </label>

        {/* Helper text or error message */}
        {error && errorMessage && (
          <span
            id={messageId}
            className={`${styles['checkbox-message']} ${styles['checkbox-error']}`}
            role="alert"
          >
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span id={messageId} className={styles['checkbox-message']}>{helperText}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
