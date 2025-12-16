/**
 * MonthGrid - 월 그리드 (월 선택 뷰)
 */

import React, { useMemo } from 'react';
import type { MonthGridProps, MonthCellInfo } from '../types';
import { getYearMonths, isSameMonth } from '../utils/dateUtils';
import { getMonthName } from '../utils/localeUtils';
import styles from '../styles/Calendar.module.css';

export const MonthGrid: React.FC<MonthGridProps> = ({
  currentYear,
  selectedDate,
  onSelect,
  minDate,
  maxDate,
  locale,
}) => {
  const months = useMemo(() => {
    return getYearMonths(currentYear);
  }, [currentYear]);

  const currentMonth = new Date().getMonth();
  const currentFullYear = new Date().getFullYear();

  const getCellInfo = (date: Date): MonthCellInfo => {
    const month = date.getMonth();
    const isCurrentMonth = month === currentMonth && currentYear === currentFullYear;
    const isSelected = selectedDate ? isSameMonth(date, selectedDate) : false;

    // 비활성화 체크
    let isDisabled = false;
    if (minDate) {
      const minMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      isDisabled = date < minMonth;
    }
    if (maxDate && !isDisabled) {
      const maxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
      isDisabled = date > maxMonth;
    }

    return {
      date,
      month,
      monthName: getMonthName(month, locale),
      isCurrentMonth,
      isSelected,
      isDisabled,
    };
  };

  const getCellClassName = (info: MonthCellInfo): string => {
    const classes = [styles.month];

    if (info.isCurrentMonth) {
      classes.push(styles['month--current']);
    }
    if (info.isSelected) {
      classes.push(styles['month--selected']);
    }
    if (info.isDisabled) {
      classes.push(styles['month--disabled']);
    }

    return classes.join(' ');
  };

  const handleClick = (info: MonthCellInfo) => {
    if (info.isDisabled) return;
    onSelect(info.date);
  };

  return (
    <div className={styles.monthGrid} role="grid" aria-label="월 선택">
      {months.map((date, index) => {
        const info = getCellInfo(date);
        return (
          <button
            key={index}
            type="button"
            className={getCellClassName(info)}
            onClick={() => handleClick(info)}
            disabled={info.isDisabled}
            aria-label={`${currentYear}년 ${info.monthName}`}
            aria-selected={info.isSelected}
          >
            {info.monthName}
          </button>
        );
      })}
    </div>
  );
};

export default MonthGrid;
