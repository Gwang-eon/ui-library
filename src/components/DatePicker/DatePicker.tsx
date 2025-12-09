import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps {
  size?: DatePickerSize;
  error?: boolean;
  disabled?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  isClearable?: boolean;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
  dropdownMode?: 'select' | 'scroll';
  filterDate?: (date: Date) => boolean;
  inline?: boolean;
  monthsShown?: number;
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
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

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
