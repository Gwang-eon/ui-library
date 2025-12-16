/**
 * TimeSelector - 시간 선택기
 */

import React, { useMemo, useEffect, useRef } from 'react';
import type { TimeSelectorProps, TimeCellInfo } from '../types';
import { getTimeSlots, getTimeFromDate, setTimeToDate, compareTime } from '../utils/dateUtils';
import { formatTime } from '../utils/formatUtils';
import styles from '../styles/Calendar.module.css';

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  value,
  onSelect,
  timeIntervals = 30,
  minTime,
  maxTime,
  use24Hour = true,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const timeSlots = useMemo(() => {
    return getTimeSlots(timeIntervals, minTime, maxTime);
  }, [timeIntervals, minTime, maxTime]);

  const selectedTime = value ? getTimeFromDate(value) : null;

  const getCellInfo = (time: typeof timeSlots[0]): TimeCellInfo => {
    const isSelected = selectedTime
      ? time.hours === selectedTime.hours && time.minutes === selectedTime.minutes
      : false;

    let isDisabled = false;
    if (minTime && compareTime(time, minTime) < 0) {
      isDisabled = true;
    }
    if (maxTime && compareTime(time, maxTime) > 0) {
      isDisabled = true;
    }

    const format = use24Hour ? 'HH:mm' : 'A h:mm';
    const label = formatTime(time, format, use24Hour);

    return {
      time,
      label,
      isSelected,
      isDisabled,
    };
  };

  const getCellClassName = (info: TimeCellInfo): string => {
    const classes = [styles.timeItem];

    if (info.isSelected) {
      classes.push(styles['timeItem--selected']);
    }
    if (info.isDisabled) {
      classes.push(styles['timeItem--disabled']);
    }

    return classes.join(' ');
  };

  const handleClick = (info: TimeCellInfo) => {
    if (info.isDisabled) return;

    // 현재 날짜에 시간 적용
    const baseDate = value || new Date();
    const newDate = setTimeToDate(baseDate, info.time);
    onSelect(newDate);
  };

  // 선택된 시간으로 스크롤
  useEffect(() => {
    if (!listRef.current || !selectedTime) return;

    const selectedIndex = timeSlots.findIndex(
      (slot) => slot.hours === selectedTime.hours && slot.minutes === selectedTime.minutes
    );

    if (selectedIndex >= 0) {
      const buttons = listRef.current.querySelectorAll('button');
      if (buttons[selectedIndex]) {
        buttons[selectedIndex].scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }
  }, [selectedTime, timeSlots]);

  return (
    <div className={styles.timeSelector}>
      <div className={styles.timeHeader}>시간</div>
      <div className={styles.timeList} ref={listRef} role="listbox" aria-label="시간 선택">
        {timeSlots.map((slot, index) => {
          const info = getCellInfo(slot);
          return (
            <button
              key={index}
              type="button"
              className={getCellClassName(info)}
              onClick={() => handleClick(info)}
              disabled={info.isDisabled}
              role="option"
              aria-selected={info.isSelected}
              aria-label={info.label}
            >
              {info.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelector;
