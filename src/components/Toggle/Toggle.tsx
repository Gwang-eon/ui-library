import React from 'react';
import styles from './Toggle.module.css';

export type ToggleSize = 'small' | 'medium' | 'large';

export interface ToggleProps {
  /**
   * Label text displayed next to the toggle
   */
  label?: string;
  /**
   * Size variant of the toggle
   */
  size?: ToggleSize;
  /**
   * Whether the toggle is checked
   */
  checked?: boolean;
  /**
   * Default checked state (for uncontrolled component)
   */
  defaultChecked?: boolean;
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  /**
   * Name attribute for form submission
   */
  name?: string;
  /**
   * ID attribute
   */
  id?: string;
  /**
   * Callback when toggle state changes
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Accessible label (overrides label prop for screen readers)
   */
  'aria-label'?: string;
  /**
   * ID of element that labels this toggle
   */
  'aria-labelledby'?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      size = 'medium',
      checked,
      defaultChecked,
      disabled = false,
      name,
      id,
      onChange,
      className = '',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    },
    ref
  ) => {
    const toggleId = id || `toggle-${React.useId()}`;

    // Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onChange) {
        onChange(event.target.checked, event);
      }
    };

    // Determine size class
    const sizeClass = {
      small: styles['switch-sm'],
      medium: '',
      large: styles['switch-lg'],
    }[size];

    return (
      <label
        className={`${styles.switch} ${sizeClass} ${className}`}
        htmlFor={toggleId}
      >
        <input
          ref={ref}
          id={toggleId}
          type="checkbox"
          name={name}
          className={styles['switch-input']}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        />
        <span className={styles['switch-slider']} />
        {label && <span className={styles['switch-label']}>{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
