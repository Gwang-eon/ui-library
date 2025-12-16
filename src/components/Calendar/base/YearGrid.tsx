/**
 * YearGrid - 년 그리드 (년 선택 뷰)
 */

import React, { useMemo } from 'react';
import type { YearGridProps, YearCellInfo } from '../types';
import { getDecadeYears, isSameYear } from '../utils/dateUtils';
import styles from '../styles/Calendar.module.css';

export const YearGrid: React.FC<YearGridProps> = ({
  currentDecade,
  selectedDate,
  onSelect,
  minDate,
  maxDate,
}) => {
  const years = useMemo(() => {
    return getDecadeYears(currentDecade);
  }, [currentDecade]);

  const currentFullYear = new Date().getFullYear();

  const getCellInfo = (date: Date, index: number): YearCellInfo => {
    const year = date.getFullYear();
    const isCurrentYear = year === currentFullYear;
    const isSelected = selectedDate ? isSameYear(date, selectedDate) : false;
    const isOutside = index === 0 || index === 11; // 첫 번째와 마지막은 10년 범위 밖

    // 비활성화 체크
    let isDisabled = false;
    if (minDate && year < minDate.getFullYear()) {
      isDisabled = true;
    }
    if (maxDate && year > maxDate.getFullYear()) {
      isDisabled = true;
    }

    return {
      date,
      year,
      isCurrentYear,
      isSelected,
      isDisabled,
    };
  };

  const getCellClassName = (info: YearCellInfo, index: number): string => {
    const classes = [styles.year];
    const isOutside = index === 0 || index === 11;

    if (info.isCurrentYear) {
      classes.push(styles['year--current']);
    }
    if (info.isSelected) {
      classes.push(styles['year--selected']);
    }
    if (info.isDisabled) {
      classes.push(styles['year--disabled']);
    }
    if (isOutside) {
      classes.push(styles['year--outside']);
    }

    return classes.join(' ');
  };

  const handleClick = (info: YearCellInfo) => {
    if (info.isDisabled) return;
    onSelect(info.date);
  };

  return (
    <div className={styles.yearGrid} role="grid" aria-label="년도 선택">
      {years.map((date, index) => {
        const info = getCellInfo(date, index);
        return (
          <button
            key={index}
            type="button"
            className={getCellClassName(info, index)}
            onClick={() => handleClick(info)}
            disabled={info.isDisabled}
            aria-label={`${info.year}년`}
            aria-selected={info.isSelected}
          >
            {info.year}
          </button>
        );
      })}
    </div>
  );
};

export default YearGrid;
