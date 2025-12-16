/**
 * CalendarHeader - 캘린더 헤더 (네비게이션 + 월/년 표시)
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CalendarHeaderProps } from '../types';
import { getMonthName } from '../utils/localeUtils';
import styles from '../styles/Calendar.module.css';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onPrevious,
  onNext,
  minDate,
  maxDate,
  locale,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 이전/다음 버튼 비활성화 여부
  const canGoPrevious = () => {
    if (!minDate) return true;
    if (viewMode === 'day') {
      const prevMonth = new Date(year, month - 1, 1);
      return prevMonth >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    }
    if (viewMode === 'month') {
      return year - 1 >= minDate.getFullYear();
    }
    // year view: 10년 단위
    const decadeStart = Math.floor(year / 10) * 10;
    return decadeStart - 10 >= Math.floor(minDate.getFullYear() / 10) * 10;
  };

  const canGoNext = () => {
    if (!maxDate) return true;
    if (viewMode === 'day') {
      const nextMonth = new Date(year, month + 1, 1);
      return nextMonth <= new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
    }
    if (viewMode === 'month') {
      return year + 1 <= maxDate.getFullYear();
    }
    // year view
    const decadeStart = Math.floor(year / 10) * 10;
    return decadeStart + 10 <= Math.floor(maxDate.getFullYear() / 10) * 10 + 10;
  };

  // 헤더 타이틀 렌더링
  const renderTitle = () => {
    if (viewMode === 'day') {
      return (
        <>
          <button
            type="button"
            className={styles.titleButton}
            onClick={() => onViewModeChange('year')}
            aria-label="연도 선택"
          >
            {year}년
          </button>
          <button
            type="button"
            className={styles.titleButton}
            onClick={() => onViewModeChange('month')}
            aria-label="월 선택"
          >
            {getMonthName(month, locale)}
          </button>
        </>
      );
    }

    if (viewMode === 'month') {
      return (
        <button
          type="button"
          className={styles.titleButton}
          onClick={() => onViewModeChange('year')}
          aria-label="연도 선택"
        >
          {year}년
        </button>
      );
    }

    // year view
    const decadeStart = Math.floor(year / 10) * 10;
    return (
      <span className={styles.titleButtonStatic}>
        {decadeStart} - {decadeStart + 9}
      </span>
    );
  };

  return (
    <div className={styles.header}>
      {onPrevious ? (
        <button
          type="button"
          className={styles.headerButton}
          onClick={onPrevious}
          disabled={!canGoPrevious()}
          aria-label="이전"
        >
          <ChevronLeft size={16} />
        </button>
      ) : (
        <div className={styles.headerPlaceholder} />
      )}

      <div className={styles.headerTitle}>
        {renderTitle()}
      </div>

      {onNext ? (
        <button
          type="button"
          className={styles.headerButton}
          onClick={onNext}
          disabled={!canGoNext()}
          aria-label="다음"
        >
          <ChevronRight size={16} />
        </button>
      ) : (
        <div className={styles.headerPlaceholder} />
      )}
    </div>
  );
};

export default CalendarHeader;
