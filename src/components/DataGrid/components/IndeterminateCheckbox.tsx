/**
 * IndeterminateCheckbox
 * Checkbox with indeterminate state support for row selection
 */

import React, { memo, useRef, useEffect } from 'react';
import { Check, Minus } from 'lucide-react';
import styles from '../DataGrid.module.css';

interface IndeterminateCheckboxProps {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const IndeterminateCheckbox = memo<IndeterminateCheckboxProps>(({
  indeterminate,
  checked,
  onChange,
  disabled,
  className,
  'aria-label': ariaLabel,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <label className={`${styles.checkbox} ${className || ''}`}>
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.checkboxInput}
        aria-label={ariaLabel || (indeterminate ? 'Select some rows' : checked ? 'Deselect row' : 'Select row')}
      />
      <span className={styles.checkboxMark}>
        {indeterminate ? <Minus size={12} /> : checked ? <Check size={12} /> : null}
      </span>
    </label>
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

/**
 * RadioButton
 * Radio button for single selection mode
 */

interface RadioButtonProps {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  'aria-label'?: string;
}

export const RadioButton = memo<RadioButtonProps>(({
  checked,
  onChange,
  disabled,
  className,
  name = 'row-selection',
  'aria-label': ariaLabel,
}) => {
  return (
    <label className={`${styles.radio} ${className || ''}`}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.radioInput}
        name={name}
        aria-label={ariaLabel || (checked ? 'Selected row' : 'Select row')}
      />
      <span className={styles.radioMark}>
        {checked && <span className={styles.radioInner} />}
      </span>
    </label>
  );
});

RadioButton.displayName = 'RadioButton';

export default IndeterminateCheckbox;
