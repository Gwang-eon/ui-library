import { forwardRef, useRef, useImperativeHandle, useState, useId } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
// Note: react-datepicker CSS should be imported in global styles
// Import from '@gractor/ui/styles' or add 'react-datepicker/dist/react-datepicker.css' in your app
import styles from './DatePicker.module.css';
import type { DatePickerProps, DatePickerSize } from './types';

export type { DatePickerProps, DatePickerSize };

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
      dateFormat = 'yyyy-MM-dd',
      minDate,
      maxDate,
      showTimeSelect,
      timeFormat,
      timeIntervals,
      isClearable,
      showMonthDropdown,
      showYearDropdown,
      dropdownMode,
      filterDate,
      inline,
      monthsShown,
      // 접근성 props
      ariaLabel,
      ariaDescribedBy,
      id,
      name,
      required,
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const generatedId = useId();
    const inputId = id || `datepicker-${generatedId}`;

    // Forward the ref to the parent if provided
    useImperativeHandle(forwardedRef, () => internalRef.current as HTMLInputElement);

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
        <ReactDatePicker
          id={inputId}
          name={name}
          selected={value}
          onChange={(date: Date | null) => onChange?.(date)}
          disabled={disabled}
          placeholderText={placeholder}
          className={styles['date-picker-input']}
          calendarClassName={styles['date-picker-calendar']}
          wrapperClassName={styles['date-picker-wrapper']}
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          showTimeSelect={showTimeSelect}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
          isClearable={isClearable}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          dropdownMode={dropdownMode}
          filterDate={filterDate}
          inline={inline}
          monthsShown={monthsShown}
          open={isOpen}
          onInputClick={() => setIsOpen(true)}
          onClickOutside={() => setIsOpen(false)}
          onSelect={() => setIsOpen(false)}
          required={required}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
        />
        <button
          className={styles['date-picker-trigger']}
          onClick={handleTriggerClick}
          disabled={disabled}
          type="button"
          aria-label="Open calendar"
          aria-controls={inputId}
          aria-expanded={isOpen}
        >
          <Calendar size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
        </button>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
