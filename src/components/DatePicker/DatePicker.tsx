import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import ReactDatePicker, { type DatePickerProps as ReactDatePickerProps } from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';

export type DatePickerSize = 'sm' | 'md' | 'lg';

// @ts-expect-error - Complex react-datepicker type causes circular reference error, but works at runtime
export interface DatePickerProps
  extends Omit<ReactDatePickerProps, 'onChange' | 'selected' | 'open' | 'onInputClick'> {
  size?: DatePickerSize;
  error?: boolean;
  disabled?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      size = 'md',
      error = false,
      disabled = false,
      value,
      onChange,
      placeholder = 'Select date',
      className = '',
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Forward the ref to the parent if provided
    useImperativeHandle(forwardedRef, () => internalRef.current?.input as HTMLInputElement);

    const wrapperClasses = [
      styles['date-picker'],
      size === 'sm' && styles['date-picker-sm'],
      size === 'lg' && styles['date-picker-lg'],
      error && styles['date-picker-error'],
      disabled && styles['date-picker-disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleTriggerClick = () => {
      // Open the calendar by setting state
      if (!disabled) {
        setIsOpen(true);
      }
    };

    return (
      <div className={wrapperClasses}>
        {/* @ts-expect-error - Complex react-datepicker type causes prop type mismatch, but works correctly */}
        <ReactDatePicker
          {...props}
          ref={internalRef}
          selected={value}
          onChange={(date) => onChange?.(date)}
          disabled={disabled}
          placeholderText={placeholder}
          className={styles['date-picker-input']}
          calendarClassName={styles['date-picker-calendar']}
          wrapperClassName={styles['date-picker-wrapper']}
          dateFormat="yyyy-MM-dd"
          open={isOpen}
          onInputClick={() => setIsOpen(true)}
          onClickOutside={() => setIsOpen(false)}
          onSelect={() => setIsOpen(false)}
        />
        <button
          className={styles['date-picker-trigger']}
          onClick={handleTriggerClick}
          disabled={disabled}
          type="button"
          aria-label="Open calendar"
        >
          <Calendar size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
        </button>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
