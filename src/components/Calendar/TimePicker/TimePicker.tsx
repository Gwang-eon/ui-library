/**
 * TimePicker - 시간 선택 컴포넌트
 */

import React, { useState, useRef, useCallback } from 'react';
import { Clock, X } from 'lucide-react';
import type { TimePickerProps } from '../types';
import { TimeSelector, CalendarPopover } from '../base';
import { formatTime } from '../utils/formatUtils';
import { getTimeFromDate } from '../utils/dateUtils';
import styles from '../styles/Calendar.module.css';

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  size = 'md',
  disabled = false,
  readOnly = false,
  error = false,
  className,
  inline = false,
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
  timeFormat,
  timeIntervals = 30,
  minTime,
  maxTime,
  use24Hour = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 포맷
  const format = timeFormat || (use24Hour ? 'HH:mm' : 'A h:mm');

  // 입력값 동기화
  React.useEffect(() => {
    if (value) {
      const time = getTimeFromDate(value);
      setInputValue(formatTime(time, format, use24Hour));
    } else {
      setInputValue('');
    }
  }, [value, format, use24Hour]);

  // 팝업 열기/닫기
  const handleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    setIsOpen(true);
    onOpen?.();
  }, [disabled, readOnly, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // 시간 선택
  const handleSelect = useCallback((date: Date) => {
    onChange?.(date);
    const time = getTimeFromDate(date);
    setInputValue(formatTime(time, format, use24Hour));
    if (!inline) {
      handleClose();
    }
  }, [onChange, format, use24Hour, inline, handleClose]);

  // 클리어
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    setInputValue('');
    inputRef.current?.focus();
  }, [onChange]);

  // 입력 클래스
  const inputClassName = [
    styles.input,
    size === 'sm' && styles['input--sm'],
    size === 'lg' && styles['input--lg'],
    error && styles['input--error'],
  ].filter(Boolean).join(' ');

  // 시간 선택기 렌더링
  const renderTimeSelector = () => (
    <div className={styles.calendar}>
      <TimeSelector
        value={value}
        onSelect={handleSelect}
        timeIntervals={timeIntervals}
        minTime={minTime}
        maxTime={maxTime}
        use24Hour={use24Hour}
        size={size}
      />
    </div>
  );

  // 인라인 모드
  if (inline) {
    return (
      <div className={`${styles.inline} ${className || ''}`}>
        {renderTimeSelector()}
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
          aria-label="시간 지우기"
          tabIndex={-1}
        >
          <X size={10} />
        </button>
      )}

      <span className={styles.inputIcon}>
        <Clock size={16} />
      </span>

      <CalendarPopover
        isOpen={isOpen}
        triggerRef={triggerRef as React.RefObject<HTMLElement>}
        onClose={handleClose}
      >
        {renderTimeSelector()}
      </CalendarPopover>
    </div>
  );
};

export default TimePicker;
