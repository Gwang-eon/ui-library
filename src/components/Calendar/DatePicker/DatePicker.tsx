/**
 * DatePicker - 날짜 선택 컴포넌트
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Calendar, X } from 'lucide-react';
import type { DatePickerProps, CalendarViewMode } from '../types';
import { CalendarHeader, CalendarGrid, MonthGrid, YearGrid, CalendarPopover } from '../base';
import { useCalendarState } from '../hooks';
import { formatDate, parseDate } from '../utils/formatUtils';
import { defaultLocale, mergeLocale } from '../utils/localeUtils';
import { getDecadeStart, addMonths, addYears } from '../utils/dateUtils';
import styles from '../styles/Calendar.module.css';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  size = 'md',
  disabled = false,
  readOnly = false,
  error = false,
  className,
  inline = false,
  locale: localeProp,
  minDate,
  maxDate,
  filterDate,
  clearable = true,
  onClose,
  onOpen,
  id,
  name,
  placeholder,
  required,
  ariaLabel,
  ariaDescribedBy,
  onFocus,
  onBlur,
  dateFormat,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [internalDate, setInternalDate] = useState<Date | null>(value ?? null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Controlled vs Uncontrolled
  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalDate;

  // 로케일 병합
  const locale = useMemo(() => mergeLocale(defaultLocale, localeProp), [localeProp]);

  // 포맷
  const format = dateFormat || locale.dateFormat;

  // 캘린더 상태
  const calendar = useCalendarState({
    initialDate: selectedDate,
    onChange: (date) => {
      if (!isControlled) {
        setInternalDate(date);
      }
      onChange?.(date);
      if (date) {
        setInputValue(formatDate(date, format));
      } else {
        setInputValue('');
      }
      if (!inline) {
        setIsOpen(false);
        onClose?.();
      }
    },
  });

  // 뷰 모드 상태
  const [viewMode, setViewMode] = useState<CalendarViewMode>('day');
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  // 입력값 동기화 (controlled mode에서 외부 value 변경 시)
  React.useEffect(() => {
    if (isControlled) {
      if (value) {
        setInputValue(formatDate(value, format));
        setInternalDate(value);
      } else {
        setInputValue('');
        setInternalDate(null);
      }
    }
  }, [value, format, isControlled]);

  // 팝업 열기/닫기
  const handleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    setIsOpen(true);
    setViewMode('day');
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
    onOpen?.();
  }, [disabled, readOnly, selectedDate, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // 날짜 선택
  const handleSelect = useCallback((date: Date) => {
    if (viewMode === 'day') {
      if (!isControlled) {
        setInternalDate(date);
      }
      onChange?.(date);
      setInputValue(formatDate(date, format));
      if (!inline) {
        handleClose();
      }
    } else if (viewMode === 'month') {
      setCurrentDate(date);
      setViewMode('day');
    } else if (viewMode === 'year') {
      setCurrentDate(date);
      setViewMode('month');
    }
  }, [viewMode, onChange, format, inline, handleClose, isControlled]);

  // 클리어
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) {
      setInternalDate(null);
    }
    onChange?.(null);
    setInputValue('');
    inputRef.current?.focus();
  }, [onChange, isControlled]);

  // 입력값 변경
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // 날짜 파싱 시도
    const parsed = parseDate(newValue, format);
    if (parsed) {
      if (!isControlled) {
        setInternalDate(parsed);
      }
      onChange?.(parsed);
      setCurrentDate(parsed);
    }
  }, [format, onChange, isControlled]);

  // 입력 블러
  const handleInputBlur = useCallback(() => {
    // 유효하지 않은 입력이면 원래 값으로 복원
    if (inputValue && !parseDate(inputValue, format)) {
      if (selectedDate) {
        setInputValue(formatDate(selectedDate, format));
      } else {
        setInputValue('');
      }
    }
    onBlur?.();
  }, [inputValue, format, selectedDate, onBlur]);

  // 네비게이션
  const handlePrevious = useCallback(() => {
    if (viewMode === 'day') {
      setCurrentDate((prev) => addMonths(prev, -1));
    } else if (viewMode === 'month') {
      setCurrentDate((prev) => addYears(prev, -1));
    } else {
      setCurrentDate((prev) => addYears(prev, -10));
    }
  }, [viewMode]);

  const handleNext = useCallback(() => {
    if (viewMode === 'day') {
      setCurrentDate((prev) => addMonths(prev, 1));
    } else if (viewMode === 'month') {
      setCurrentDate((prev) => addYears(prev, 1));
    } else {
      setCurrentDate((prev) => addYears(prev, 10));
    }
  }, [viewMode]);

  // 입력 클래스
  const inputClassName = [
    styles.input,
    size === 'sm' && styles['input--sm'],
    size === 'lg' && styles['input--lg'],
    error && styles['input--error'],
  ].filter(Boolean).join(' ');

  // 캘린더 클래스
  const calendarClassName = [
    styles.calendar,
    size === 'sm' && styles['calendar--sm'],
    size === 'lg' && styles['calendar--lg'],
  ].filter(Boolean).join(' ');

  // 캘린더 컨텐츠 렌더링
  const renderCalendarContent = () => (
    <div className={calendarClassName}>
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPrevious={handlePrevious}
        onNext={handleNext}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        size={size}
      />

      {viewMode === 'day' && (
        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelect={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          filterDate={filterDate}
          locale={locale}
          size={size}
        />
      )}

      {viewMode === 'month' && (
        <MonthGrid
          currentYear={currentDate.getFullYear()}
          selectedDate={selectedDate}
          onSelect={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          size={size}
        />
      )}

      {viewMode === 'year' && (
        <YearGrid
          currentDecade={getDecadeStart(currentDate.getFullYear())}
          selectedDate={selectedDate}
          onSelect={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
        />
      )}
    </div>
  );

  // 인라인 모드
  if (inline) {
    return (
      <div className={`${styles.inline} ${className || ''}`}>
        {renderCalendarContent()}
      </div>
    );
  }

  return (
    <div className={`${styles.inputWrapper} ${className || ''}`} ref={triggerRef}>
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        className={inputClassName}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          handleOpen();
          onFocus?.();
        }}
        onBlur={handleInputBlur}
        placeholder={placeholder || format}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        autoComplete="off"
      />

      {clearable && selectedDate && !disabled && !readOnly && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="날짜 지우기"
          tabIndex={-1}
        >
          <X size={10} />
        </button>
      )}

      <span className={styles.inputIcon}>
        <Calendar size={16} />
      </span>

      <CalendarPopover
        isOpen={isOpen}
        triggerRef={triggerRef as React.RefObject<HTMLElement>}
        onClose={handleClose}
      >
        {renderCalendarContent()}
      </CalendarPopover>
    </div>
  );
};

export default DatePicker;
