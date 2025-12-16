/**
 * DateRangePicker - 날짜 범위 선택 컴포넌트
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Calendar, X } from 'lucide-react';
import type { DateRangePickerProps, CalendarViewMode, DateRange, PresetRange } from '../types';
import { CalendarHeader, CalendarGrid, MonthGrid, YearGrid, CalendarPopover } from '../base';
import { formatDate, parseDate } from '../utils/formatUtils';
import { defaultLocale, mergeLocale } from '../utils/localeUtils';
import {
  getDecadeStart,
  addMonths,
  addYears,
  getStartOfDay,
  getEndOfDay,
  getDaysAgo,
  getStartOfMonth,
  getEndOfMonth,
} from '../utils/dateUtils';
import styles from '../styles/Calendar.module.css';

// 기본 프리셋
const defaultPresets: PresetRange[] = [
  {
    label: '오늘',
    getValue: () => ({ startDate: getStartOfDay(), endDate: getEndOfDay() }),
  },
  {
    label: '어제',
    getValue: () => {
      const yesterday = getDaysAgo(1);
      return { startDate: yesterday, endDate: getEndOfDay(yesterday) };
    },
  },
  {
    label: '최근 7일',
    getValue: () => ({ startDate: getDaysAgo(6), endDate: getEndOfDay() }),
  },
  {
    label: '최근 30일',
    getValue: () => ({ startDate: getDaysAgo(29), endDate: getEndOfDay() }),
  },
  {
    label: '이번 달',
    getValue: () => ({ startDate: getStartOfMonth(new Date()), endDate: getEndOfMonth(new Date()) }),
  },
];

// n개월 전
const getMonthsAgo = (months: number): Date => {
  const result = new Date();
  result.setMonth(result.getMonth() - months);
  return result;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate: startDateProp,
  endDate: endDateProp,
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
  required,
  ariaLabel,
  ariaDescribedBy,
  onFocus,
  onBlur,
  dateFormat,
  presets,
  showPresets = true,
  startPlaceholder = '시작일',
  endPlaceholder = '종료일',
  monthsShown = 2,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startInputValue, setStartInputValue] = useState('');
  const [endInputValue, setEndInputValue] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);

  // 내부 상태
  const [startDate, setStartDate] = useState<Date | null>(startDateProp ?? null);
  const [endDate, setEndDate] = useState<Date | null>(endDateProp ?? null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');

  // 뷰 상태
  const [viewMode, setViewMode] = useState<CalendarViewMode>('day');
  const [currentDate, setCurrentDate] = useState(startDateProp || new Date());
  const [currentDate2, setCurrentDate2] = useState(addMonths(startDateProp || new Date(), 1));

  // 로케일
  const locale = useMemo(() => mergeLocale(defaultLocale, localeProp), [localeProp]);
  const format = dateFormat || locale.dateFormat;

  // 프리셋 목록
  const presetList = presets || defaultPresets;

  // Props 동기화
  React.useEffect(() => {
    setStartDate(startDateProp ?? null);
    setEndDate(endDateProp ?? null);
    if (startDateProp) {
      setStartInputValue(formatDate(startDateProp, format));
    } else {
      setStartInputValue('');
    }
    if (endDateProp) {
      setEndInputValue(formatDate(endDateProp, format));
    } else {
      setEndInputValue('');
    }
  }, [startDateProp, endDateProp, format]);

  // 팝업 열기/닫기
  const handleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    setIsOpen(true);
    setViewMode('day');
    setSelectionMode('start');
    if (startDate) {
      setCurrentDate(startDate);
      setCurrentDate2(addMonths(startDate, 1));
    }
    onOpen?.();
  }, [disabled, readOnly, startDate, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setHoverDate(null);
    onClose?.();
  }, [onClose]);

  // 날짜 선택
  const handleSelect = useCallback((date: Date, isSecondCalendar = false) => {
    if (viewMode !== 'day') {
      // month/year 뷰에서는 네비게이션
      if (isSecondCalendar) {
        setCurrentDate2(date);
      } else {
        setCurrentDate(date);
      }
      if (viewMode === 'year') {
        setViewMode('month');
      } else {
        setViewMode('day');
      }
      return;
    }

    if (selectionMode === 'start') {
      setStartDate(date);
      setEndDate(null);
      setSelectionMode('end');
      setStartInputValue(formatDate(date, format));
      setEndInputValue('');
      onChange?.({ startDate: date, endDate: null });
    } else {
      let newStart = startDate;
      let newEnd = date;

      // 종료일이 시작일보다 이전이면 스왑
      if (startDate && date < startDate) {
        newStart = date;
        newEnd = startDate;
      }

      setStartDate(newStart);
      setEndDate(newEnd);
      setSelectionMode('start');
      if (newStart) setStartInputValue(formatDate(newStart, format));
      if (newEnd) setEndInputValue(formatDate(newEnd, format));
      onChange?.({ startDate: newStart, endDate: newEnd });

      if (!inline) {
        handleClose();
      }
    }
  }, [viewMode, selectionMode, startDate, format, onChange, inline, handleClose]);

  // 프리셋 선택
  const handlePresetSelect = useCallback((preset: PresetRange) => {
    const range = preset.getValue();
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    if (range.startDate) setStartInputValue(formatDate(range.startDate, format));
    if (range.endDate) setEndInputValue(formatDate(range.endDate, format));
    onChange?.(range);
    if (!inline) {
      handleClose();
    }
  }, [format, onChange, inline, handleClose]);

  // 클리어
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setStartInputValue('');
    setEndInputValue('');
    setSelectionMode('start');
    onChange?.({ startDate: null, endDate: null });
  }, [onChange]);

  // 네비게이션
  const handlePrevious = useCallback(() => {
    if (viewMode === 'day') {
      setCurrentDate((prev) => addMonths(prev, -1));
      setCurrentDate2((prev) => addMonths(prev, -1));
    } else if (viewMode === 'month') {
      setCurrentDate((prev) => addYears(prev, -1));
    } else {
      setCurrentDate((prev) => addYears(prev, -10));
    }
  }, [viewMode]);

  const handleNext = useCallback(() => {
    if (viewMode === 'day') {
      setCurrentDate((prev) => addMonths(prev, 1));
      setCurrentDate2((prev) => addMonths(prev, 1));
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

  // 프리셋 렌더링
  const renderPresets = () => {
    if (!showPresets) return null;

    return (
      <div className={styles.presets}>
        {presetList.map((preset, index) => (
          <button
            key={index}
            type="button"
            className={styles.presetButton}
            onClick={() => handlePresetSelect(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>
    );
  };

  // 캘린더 컨텐츠 렌더링
  const renderCalendarContent = () => (
    <div className={styles.rangeContainer}>
      {renderPresets()}

      <div className={monthsShown === 2 ? styles.dualCalendar : undefined}>
        {/* 첫 번째 캘린더 */}
        <div className={calendarClassName}>
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onPrevious={handlePrevious}
            onNext={monthsShown === 1 ? handleNext : undefined}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            size={size}
          />

          {viewMode === 'day' && (
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={null}
              onSelect={(date) => handleSelect(date, false)}
              minDate={minDate}
              maxDate={maxDate}
              filterDate={filterDate}
              locale={locale}
              size={size}
              rangeMode
              rangeStart={startDate}
              rangeEnd={endDate}
              hoverDate={hoverDate}
              onHoverChange={setHoverDate}
            />
          )}

          {viewMode === 'month' && (
            <MonthGrid
              currentYear={currentDate.getFullYear()}
              selectedDate={startDate}
              onSelect={(date) => handleSelect(date, false)}
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              size={size}
            />
          )}

          {viewMode === 'year' && (
            <YearGrid
              currentDecade={getDecadeStart(currentDate.getFullYear())}
              selectedDate={startDate}
              onSelect={(date) => handleSelect(date, false)}
              minDate={minDate}
              maxDate={maxDate}
              size={size}
            />
          )}
        </div>

        {/* 두 번째 캘린더 (monthsShown === 2일 때) */}
        {monthsShown === 2 && viewMode === 'day' && (
          <div className={calendarClassName}>
            <CalendarHeader
              currentDate={currentDate2}
              viewMode="day"
              onViewModeChange={() => {}}
              onPrevious={() => {}}
              onNext={handleNext}
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              size={size}
            />

            <CalendarGrid
              currentDate={currentDate2}
              selectedDate={null}
              onSelect={(date) => handleSelect(date, true)}
              minDate={minDate}
              maxDate={maxDate}
              filterDate={filterDate}
              locale={locale}
              size={size}
              rangeMode
              rangeStart={startDate}
              rangeEnd={endDate}
              hoverDate={hoverDate}
              onHoverChange={setHoverDate}
            />
          </div>
        )}
      </div>
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
    <div className={`${styles.rangeInputWrapper} ${className || ''}`} ref={triggerRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id={id}
          name={name ? `${name}_start` : undefined}
          className={inputClassName}
          value={startInputValue}
          readOnly
          onClick={handleOpen}
          onFocus={() => {
            handleOpen();
            onFocus?.();
          }}
          placeholder={startPlaceholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel ? `${ariaLabel} 시작일` : '시작일'}
          aria-describedby={ariaDescribedBy}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        />
        <span className={styles.inputIcon}>
          <Calendar size={16} />
        </span>
      </div>

      <span className={styles.rangeSeparator}>~</span>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          name={name ? `${name}_end` : undefined}
          className={inputClassName}
          value={endInputValue}
          readOnly
          onClick={handleOpen}
          placeholder={endPlaceholder}
          disabled={disabled}
          aria-label={ariaLabel ? `${ariaLabel} 종료일` : '종료일'}
        />
        {clearable && (startDate || endDate) && !disabled && !readOnly && (
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
      </div>

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

export default DateRangePicker;
