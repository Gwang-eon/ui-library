/**
 * DateRangePicker - 날짜 범위 선택 컴포넌트
 */
import { useState, useRef, useEffect, useId } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Calendar, X } from 'lucide-react';
import { PresetRanges } from './PresetRanges';
import { createDefaultPresets, normalizeRange } from './utils';
import type { DateRangePickerProps, DateRange } from './types';
import styles from './DatePicker.module.css';

export type { DateRangePickerProps, DateRange };

export const DateRangePicker = ({
  startDate: controlledStartDate,
  endDate: controlledEndDate,
  onChange,
  onStartDateChange,
  onEndDateChange,
  presets,
  showPresets = false,
  presetsPosition = 'left',
  startPlaceholder = 'Start date',
  endPlaceholder = 'End date',
  size = 'md',
  error = false,
  disabled = false,
  className = '',
  dateFormat = 'yyyy-MM-dd',
  minDate,
  maxDate,
  showTimeSelect,
  timeFormat,
  timeIntervals,
  isClearable = false,
  showMonthDropdown,
  showYearDropdown,
  dropdownMode,
  filterDate,
  monthsShown = 2,
  ariaLabel,
  ariaDescribedBy,
  id,
  name,
  required,
}: DateRangePickerProps) => {
  // 내부 상태 (비제어 모드)
  const [internalStartDate, setInternalStartDate] = useState<Date | null>(null);
  const [internalEndDate, setInternalEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const inputId = id || `daterangepicker-${generatedId}`;

  // 제어/비제어 모드 판별
  const isControlled = controlledStartDate !== undefined || controlledEndDate !== undefined;
  const startDate = isControlled ? controlledStartDate : internalStartDate;
  const endDate = isControlled ? controlledEndDate : internalEndDate;

  // 프리셋 목록
  const presetList = presets || createDefaultPresets();

  // 날짜 변경 핸들러
  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (!isControlled) {
      setInternalStartDate(start);
      setInternalEndDate(end);
    }

    onStartDateChange?.(start);
    onEndDateChange?.(end);

    const range: DateRange = { startDate: start, endDate: end };
    onChange?.(range);

    // 종료 날짜가 선택되면 캘린더 닫기
    if (start && end) {
      setIsOpen(false);
    }
  };

  // 프리셋 선택 핸들러
  const handlePresetSelect = (range: DateRange) => {
    const normalized = normalizeRange(range);

    if (!isControlled) {
      setInternalStartDate(normalized.startDate);
      setInternalEndDate(normalized.endDate);
    }

    onStartDateChange?.(normalized.startDate);
    onEndDateChange?.(normalized.endDate);
    onChange?.(normalized);
    setIsOpen(false);
  };

  // 클리어 핸들러
  const handleClear = () => {
    if (!isControlled) {
      setInternalStartDate(null);
      setInternalEndDate(null);
    }

    onStartDateChange?.(null);
    onEndDateChange?.(null);
    onChange?.({ startDate: null, endDate: null });
  };

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 클래스 구성
  const wrapperClasses = [
    styles['date-range-picker'],
    styles['date-picker'],
    size === 'sm' && styles['date-picker-sm'],
    size === 'lg' && styles['date-picker-lg'],
    error && styles['date-picker-error'],
    disabled && styles['date-picker-disabled'],
    showPresets && styles['date-range-picker-with-presets'],
    presetsPosition === 'left' && styles['date-range-picker-presets-left'],
    presetsPosition === 'top' && styles['date-range-picker-presets-top'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 표시 값
  const displayValue = (): string => {
    if (!startDate && !endDate) return '';
    const format = (date: Date | null | undefined) => {
      if (!date) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    if (startDate && endDate) {
      return `${format(startDate)} ~ ${format(endDate)}`;
    }
    if (startDate) {
      return `${format(startDate)} ~`;
    }
    return `~ ${format(endDate)}`;
  };

  const showClearButton = isClearable && !disabled && (startDate || endDate);

  return (
    <div className={wrapperClasses} ref={containerRef}>
      {/* 트리거 영역 */}
      <div
        className={styles['date-range-picker-trigger']}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={ariaLabel || 'Select date range'}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) setIsOpen(!isOpen);
          }
          if (e.key === 'Escape' && isOpen) {
            setIsOpen(false);
          }
        }}
      >
        <input
          type="text"
          id={inputId}
          name={name}
          className={styles['date-picker-input']}
          placeholder={`${startPlaceholder} ~ ${endPlaceholder}`}
          value={displayValue()}
          readOnly
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
        />
        <div className={styles['date-range-picker-icons']}>
          {showClearButton && (
            <button
              type="button"
              className={styles['date-range-picker-clear']}
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              aria-label="Clear selection"
              disabled={disabled}
            >
              <X size={16} />
            </button>
          )}
          <Calendar
            className={styles['date-picker-icon']}
            size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
          />
        </div>
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <div className={styles['date-range-picker-dropdown']} role="dialog" aria-modal="true">
          {/* 프리셋 영역 */}
          {showPresets && (
            <PresetRanges
              presets={presetList}
              onSelect={handlePresetSelect}
              selectedRange={{ startDate: startDate ?? null, endDate: endDate ?? null }}
              position={presetsPosition}
            />
          )}

          {/* 캘린더 영역 */}
          <div className={styles['date-range-picker-calendar']}>
            <ReactDatePicker
              selected={startDate}
              onChange={handleChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              disabled={disabled}
              dateFormat={dateFormat}
              minDate={minDate}
              maxDate={maxDate}
              showTimeSelect={showTimeSelect}
              timeFormat={timeFormat}
              timeIntervals={timeIntervals}
              showMonthDropdown={showMonthDropdown}
              showYearDropdown={showYearDropdown}
              dropdownMode={dropdownMode}
              filterDate={filterDate}
              monthsShown={monthsShown}
              calendarClassName={styles['date-picker-calendar']}
            />
          </div>
        </div>
      )}
    </div>
  );
};

DateRangePicker.displayName = 'DateRangePicker';
