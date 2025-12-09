import React, { type TextareaHTMLAttributes, useState, useEffect } from 'react';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaState = 'default' | 'error' | 'success' | 'warning';
export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
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

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      successMessage,
      warningMessage,
      required = false,
      fullWidth = false,
      rows = 4,
      showCounter = false,
      resize = 'vertical',
      renderCounter,
      className = '',
      value,
      defaultValue,
      maxLength,
      onChange,
      id,
      ...rest
    },
    ref
  ) => {
    const textareaId = id || `textarea-${React.useId()}`;
    const [charCount, setCharCount] = useState(0);

    // Initialize character count
    useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      } else if (defaultValue !== undefined) {
        setCharCount(String(defaultValue).length);
      }
    }, [value, defaultValue]);

    // Handle change
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(event.target.value.length);
      onChange?.(event);
    };

    // Determine size class
    const sizeClass = {
      sm: styles['input-sm'],
      md: '',
      lg: styles['input-lg'],
    }[size];

    // Determine state class
    const stateClass = {
      default: '',
      error: styles.error,
      success: styles.success,
      warning: styles.warning,
    }[state];

    // Get message based on state
    const getMessage = () => {
      if (state === 'error' && errorMessage) return errorMessage;
      if (state === 'success' && successMessage) return successMessage;
      if (state === 'warning' && warningMessage) return warningMessage;
      return helperText;
    };

    const message = getMessage();

    // Get message class
    const messageClass = {
      error: styles['input-error'],
      success: styles['input-success'],
      warning: styles['input-warning'],
      default: '',
    }[state];

    // Resize style
    const resizeStyle = {
      none: styles['resize-none'],
      both: styles['resize-both'],
      horizontal: styles['resize-horizontal'],
      vertical: styles['resize-vertical'],
    }[resize];

    return (
      <div
        className={`${styles['input-group']} ${
          fullWidth ? styles['input-full-width'] : ''
        } ${className}`}
      >
        {label && (
          <label htmlFor={textareaId} className={styles['input-label']}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={`${styles.input} ${styles.textarea} ${sizeClass} ${stateClass} ${resizeStyle}`}
          value={value}
          defaultValue={defaultValue}
          rows={rows}
          maxLength={maxLength}
          onChange={handleChange}
          aria-invalid={state === 'error'}
          aria-describedby={message ? `${textareaId}-message` : undefined}
          {...rest}
        />

        {(message || showCounter) && (
          <div className={styles['message-counter-wrapper']}>
            {message && (
              <span
                id={`${textareaId}-message`}
                className={`${styles['input-message']} ${messageClass}`}
              >
                {message}
              </span>
            )}
            {showCounter && (
              <span className={styles['character-count']}>
                {renderCounter ? (
                  renderCounter(charCount, maxLength)
                ) : (
                  <>
                    {charCount}
                    {maxLength && ` / ${maxLength}`}
                  </>
                )}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
