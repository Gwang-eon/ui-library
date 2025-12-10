import React, { type InputHTMLAttributes } from 'react';
import styles from './Radio.module.css';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  size?: RadioSize;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      size = 'md',
      className = '',
      disabled = false,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${React.useId()}`;
    const messageId = `${radioId}-message`;
    const hasMessage = (error && errorMessage) || helperText;

    // Size class mapping
    const sizeClass = size === 'sm' ? styles['radio-sm'] : size === 'lg' ? styles['radio-lg'] : '';

    return (
      <div className={`${styles['radio-wrapper']} ${className}`}>
        <label
          className={`${styles.radio} ${sizeClass} ${error ? styles.error : ''} ${
            disabled ? styles.disabled : ''
          }`}
          htmlFor={radioId}
        >
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            className={styles['radio-input']}
            aria-invalid={error || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            {...props}
          />
          {label && <span className={styles['radio-label']}>{label}</span>}
        </label>

        {/* Helper text or error message */}
        {error && errorMessage && (
          <span
            id={messageId}
            className={`${styles['radio-message']} ${styles['radio-error']}`}
            role="alert"
          >
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span id={messageId} className={styles['radio-message']}>{helperText}</span>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
