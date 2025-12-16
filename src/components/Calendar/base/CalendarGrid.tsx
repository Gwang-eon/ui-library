/**
 * CalendarGrid - 날짜 그리드 (일 선택 뷰)
 */

import React, { useMemo } from 'react';
import type { CalendarGridProps, DayCellInfo } from '../types';
import {
  getMonthDays,
  isSameDay,
  isSameMonth,
  isToday,
  isDateDisabled,
  isDateInRange,
  isBefore,
} from '../utils/dateUtils';
import { getOrderedWeekdays } from '../utils/localeUtils';
import styles from '../styles/Calendar.module.css';

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  onSelect,
  minDate,
  maxDate,
  filterDate,
  locale,
  rangeMode = false,
  rangeStart,
  rangeEnd,
  hoverDate,
  onHoverChange,
}) => {
  // 요일 헤더
  const weekdays = useMemo(() => {
    return getOrderedWeekdays(locale.weekdayNames, locale.weekStartsOn);
  }, [locale]);

  // 달력 날짜 배열
  const days = useMemo(() => {
    return getMonthDays(currentDate, locale.weekStartsOn);
  }, [currentDate, locale.weekStartsOn]);

  // 날짜 셀 정보 생성
  const getCellInfo = (date: Date): DayCellInfo => {
    const isCurrentMonth = isSameMonth(date, currentDate);
    const disabled = isDateDisabled(date, minDate, maxDate, filterDate);

    let isInRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;

    if (rangeMode) {
      const effectiveEnd = rangeEnd || (hoverDate && rangeStart && !isBefore(hoverDate, rangeStart) ? hoverDate : null);

      if (rangeStart && effectiveEnd) {
        isInRange = isDateInRange(date, rangeStart, effectiveEnd);
        isRangeStart = isSameDay(date, rangeStart);
        isRangeEnd = isSameDay(date, effectiveEnd);
      } else if (rangeStart) {
        isRangeStart = isSameDay(date, rangeStart);
      }
    }

    return {
      date,
      dayOfMonth: date.getDate(),
      isCurrentMonth,
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: disabled,
      isInRange,
      isRangeStart,
      isRangeEnd,
    };
  };

  // 주말 여부
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // 셀 클래스 생성
  const getCellClassName = (info: DayCellInfo): string => {
    const classes = [styles.day];

    if (!info.isCurrentMonth) {
      classes.push(styles['day--otherMonth']);
    }
    if (info.isToday) {
      classes.push(styles['day--today']);
    }
    if (info.isSelected && !rangeMode) {
      classes.push(styles['day--selected']);
    }
    if (info.isDisabled) {
      classes.push(styles['day--disabled']);
    }
    if (isWeekend(info.date) && info.isCurrentMonth) {
      classes.push(styles['day--weekend']);
    }

    // 범위 선택 스타일
    if (rangeMode) {
      if (info.isRangeStart) {
        classes.push(styles['day--rangeStart']);
      }
      if (info.isRangeEnd) {
        classes.push(styles['day--rangeEnd']);
      }
      if (info.isInRange && !info.isRangeStart && !info.isRangeEnd) {
        classes.push(styles['day--inRange']);
      }
    }

    return classes.join(' ');
  };

  const handleClick = (info: DayCellInfo) => {
    if (info.isDisabled) return;
    onSelect(info.date);
  };

  const handleMouseEnter = (date: Date) => {
    if (rangeMode && onHoverChange) {
      onHoverChange(date);
    }
  };

  const handleMouseLeave = () => {
    if (rangeMode && onHoverChange) {
      onHoverChange(null);
    }
  };

  return (
    <div>
      {/* 요일 헤더 */}
      <div className={styles.weekdays}>
        {weekdays.map((day, index) => {
          const dayIndex = (locale.weekStartsOn + index) % 7;
          const isWeekendDay = dayIndex === 0 || dayIndex === 6;
          return (
            <div
              key={day}
              className={`${styles.weekday} ${isWeekendDay ? styles['weekday--weekend'] : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* 날짜 그리드 */}
      <div className={styles.grid} role="grid" aria-label="달력">
        {days.map((date, index) => {
          const info = getCellInfo(date);
          return (
            <button
              key={index}
              type="button"
              className={getCellClassName(info)}
              onClick={() => handleClick(info)}
              onMouseEnter={() => handleMouseEnter(date)}
              onMouseLeave={handleMouseLeave}
              disabled={info.isDisabled}
              tabIndex={info.isCurrentMonth ? 0 : -1}
              aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
              aria-selected={info.isSelected}
              aria-disabled={info.isDisabled}
            >
              {info.dayOfMonth}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
