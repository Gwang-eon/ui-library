import React from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps {
  /** Label text */
  label?: React.ReactNode;
  /** HTML for attribute - associates label with a form control */
  htmlFor?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Helper or error message below the control */
  message?: React.ReactNode;
  /** Message variant */
  messageType?: 'default' | 'error' | 'success' | 'warning';
  /** Size variant - controls the control area min-height */
  size?: 'sm' | 'md' | 'lg';
  /** Layout direction */
  layout?: 'vertical' | 'horizontal';
  /** Full width */
  fullWidth?: boolean;
  /** Additional className for the root element */
  className?: string;
  /** Form control(s) to render */
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  message,
  messageType = 'default',
  size = 'md',
  layout = 'vertical',
  fullWidth = false,
  className,
  children,
}: FormFieldProps) {
  const rootClasses = [
    styles.formField,
    layout === 'horizontal' && styles['formField--horizontal'],
    fullWidth && styles['formField--fullWidth'],
    className,
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    size === 'sm' && styles['label--sm'],
    size === 'lg' && styles['label--lg'],
  ].filter(Boolean).join(' ');

  const controlClasses = [
    styles.control,
    size === 'sm' && styles['control--sm'],
    size === 'lg' && styles['control--lg'],
  ].filter(Boolean).join(' ');

  const messageClasses = [
    styles.message,
    messageType === 'error' && styles['message--error'],
    messageType === 'success' && styles['message--success'],
    messageType === 'warning' && styles['message--warning'],
  ].filter(Boolean).join(' ');

  const labelElement = label ? (
    <label className={labelClasses} htmlFor={htmlFor}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
  ) : null;

  const controlElement = (
    <div className={controlClasses}>
      {children}
    </div>
  );

  const messageElement = message ? (
    <span className={messageClasses}>{message}</span>
  ) : null;

  if (layout === 'horizontal') {
    return (
      <div className={rootClasses}>
        {labelElement}
        <div className={styles.fieldBody}>
          {controlElement}
          {messageElement}
        </div>
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      {labelElement}
      {controlElement}
      {messageElement}
    </div>
  );
}
