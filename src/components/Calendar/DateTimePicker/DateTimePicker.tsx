/**
 * DateTimePicker - 날짜/시간 선택 컴포넌트
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Calendar, X } from 'lucide-react';
import type { DateTimePickerProps, CalendarViewMode } from '../types';
import { CalendarHeader, CalendarGrid, MonthGrid, YearGrid, TimeSelector, CalendarPopover } from '../base';
import { formatDate } from '../utils/formatUtils';
import { defaultLocale, mergeLocale } from '../utils/localeUtils';
import { getDecadeStart, addMonths, addYears, setTimeToDate, getTimeFromDate } from '../utils/dateUtils';
import styles from '../styles/Calendar.module.css';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
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
  timeIntervals = 30,
  minTime,
  maxTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 내부 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);

  // 뷰 상태
  const [viewMode, setViewMode] = useState<CalendarViewMode>('day');
  const [currentDate, setCurrentDate] = useState(value || new Date());

  // 로케일
  const locale = useMemo(() => mergeLocale(defaultLocale, localeProp), [localeProp]);
  const format = dateFormat || locale.dateTimeFormat;

  // 입력값 동기화
  React.useEffect(() => {
    if (value) {
      setInputValue(formatDate(value, format));
      setSelectedDate(value);
    } else {
      setInputValue('');
      setSelectedDate(null);
    }
  }, [value, format]);

  // 팝업 열기/닫기
  const handleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    setIsOpen(true);
    setViewMode('day');
    if (value) {
      setCurrentDate(value);
    }
    onOpen?.();
  }, [disabled, readOnly, value, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // 날짜 선택
  const handleDateSelect = useCallback((date: Date) => {
    if (viewMode === 'day') {
      // 기존 시간 유지
      let newDate = date;
      if (selectedDate) {
        const time = getTimeFromDate(selectedDate);
        newDate = setTimeToDate(date, time);
      }
      setSelectedDate(newDate);
      onChange?.(newDate);
      setInputValue(formatDate(newDate, format));
    } else if (viewMode === 'month') {
      setCurrentDate(date);
      setViewMode('day');
    } else if (viewMode === 'year') {
      setCurrentDate(date);
      setViewMode('month');
    }
  }, [viewMode, selectedDate, onChange, format]);

  // 시간 선택
  const handleTimeSelect = useCallback((date: Date) => {
    // 선택된 날짜에 시간 적용
    const time = getTimeFromDate(date);
    const baseDate = selectedDate || new Date();
    const newDate = setTimeToDate(baseDate, time);

    setSelectedDate(newDate);
    onChange?.(newDate);
    setInputValue(formatDate(newDate, format));
  }, [selectedDate, onChange, format]);

  // 클리어
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange?.(null);
    setInputValue('');
    inputRef.current?.focus();
  }, [onChange]);

  // 적용 버튼
  const handleApply = useCallback(() => {
    if (!inline) {
      handleClose();
    }
  }, [inline, handleClose]);

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
    <div className={styles.dateTimeContainer}>
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
            onSelect={handleDateSelect}
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
            onSelect={handleDateSelect}
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
            onSelect={handleDateSelect}
            minDate={minDate}
            maxDate={maxDate}
            size={size}
          />
        )}

        {/* 푸터 */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.footerButton}
            onClick={handleClose}
          >
            취소
          </button>
          <button
            type="button"
            className={`${styles.footerButton} ${styles['footerButton--primary']}`}
            onClick={handleApply}
          >
            적용
          </button>
        </div>
      </div>

      {/* 시간 선택기 */}
      <TimeSelector
        value={selectedDate}
        onSelect={handleTimeSelect}
        timeIntervals={timeIntervals}
        minTime={minTime}
        maxTime={maxTime}
        use24Hour
        size={size}
      />
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
        readOnly
        onClick={handleOpen}
        onFocus={() => {
          handleOpen();
          onFocus?.();
        }}
        onBlur={onBlur}
        placeholder={placeholder || format}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      />

      {clearable && value && !disabled && !readOnly && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="날짜/시간 지우기"
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

export default DateTimePicker;
