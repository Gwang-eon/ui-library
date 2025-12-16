/**
 * 캘린더 상태 관리 훅
 */

import { useState, useCallback, useMemo } from 'react';
import type { CalendarViewMode, DateRange } from '../types';
import { addMonths, addYears, getDecadeStart } from '../utils/dateUtils';

interface UseCalendarStateOptions {
  /** 초기 선택 날짜 */
  initialDate?: Date | null;
  /** 초기 뷰 모드 */
  initialViewMode?: CalendarViewMode;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 날짜 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 닫기 콜백 */
  onClose?: () => void;
}

interface UseCalendarStateReturn {
  /** 현재 표시 날짜 */
  currentDate: Date;
  /** 선택된 날짜 */
  selectedDate: Date | null;
  /** 현재 뷰 모드 */
  viewMode: CalendarViewMode;
  /** 현재 10년 시작 */
  currentDecade: number;
  /** 날짜 선택 */
  selectDate: (date: Date) => void;
  /** 날짜 클리어 */
  clearDate: () => void;
  /** 표시 날짜 변경 */
  setCurrentDate: (date: Date) => void;
  /** 뷰 모드 변경 */
  setViewMode: (mode: CalendarViewMode) => void;
  /** 이전으로 이동 */
  goToPrevious: () => void;
  /** 다음으로 이동 */
  goToNext: () => void;
  /** 오늘로 이동 */
  goToToday: () => void;
  /** 특정 월로 이동 */
  goToMonth: (month: number) => void;
  /** 특정 년으로 이동 */
  goToYear: (year: number) => void;
}

export const useCalendarState = (options: UseCalendarStateOptions = {}): UseCalendarStateReturn => {
  const {
    initialDate = null,
    initialViewMode = 'day',
    onChange,
    onClose,
  } = options;

  // 현재 표시 날짜 (달력에서 보여지는 월)
  const [currentDate, setCurrentDate] = useState<Date>(
    initialDate ?? new Date()
  );

  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  // 뷰 모드 (day, month, year)
  const [viewMode, setViewMode] = useState<CalendarViewMode>(initialViewMode);

  // 현재 10년 시작
  const currentDecade = useMemo(() => {
    return getDecadeStart(currentDate.getFullYear());
  }, [currentDate]);

  // 날짜 선택
  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
    onChange?.(date);

    // day 뷰에서 선택하면 닫기
    if (viewMode === 'day') {
      onClose?.();
    }
    // month 뷰에서 선택하면 day 뷰로
    else if (viewMode === 'month') {
      setViewMode('day');
    }
    // year 뷰에서 선택하면 month 뷰로
    else if (viewMode === 'year') {
      setViewMode('month');
    }
  }, [viewMode, onChange, onClose]);

  // 날짜 클리어
  const clearDate = useCallback(() => {
    setSelectedDate(null);
    onChange?.(null);
  }, [onChange]);

  // 이전으로 이동
  const goToPrevious = useCallback(() => {
    setCurrentDate((current) => {
      if (viewMode === 'day') {
        return addMonths(current, -1);
      } else if (viewMode === 'month') {
        return addYears(current, -1);
      } else {
        return addYears(current, -10);
      }
    });
  }, [viewMode]);

  // 다음으로 이동
  const goToNext = useCallback(() => {
    setCurrentDate((current) => {
      if (viewMode === 'day') {
        return addMonths(current, 1);
      } else if (viewMode === 'month') {
        return addYears(current, 1);
      } else {
        return addYears(current, 10);
      }
    });
  }, [viewMode]);

  // 오늘로 이동
  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setViewMode('day');
  }, []);

  // 특정 월로 이동
  const goToMonth = useCallback((month: number) => {
    setCurrentDate((current) => {
      const newDate = new Date(current);
      newDate.setMonth(month);
      return newDate;
    });
    setViewMode('day');
  }, []);

  // 특정 년으로 이동
  const goToYear = useCallback((year: number) => {
    setCurrentDate((current) => {
      const newDate = new Date(current);
      newDate.setFullYear(year);
      return newDate;
    });
    setViewMode('month');
  }, []);

  return {
    currentDate,
    selectedDate,
    viewMode,
    currentDecade,
    selectDate,
    clearDate,
    setCurrentDate,
    setViewMode,
    goToPrevious,
    goToNext,
    goToToday,
    goToMonth,
    goToYear,
  };
};

// ============================================
// 범위 선택용 훅
// ============================================

interface UseRangeStateOptions {
  /** 초기 시작 날짜 */
  initialStartDate?: Date | null;
  /** 초기 종료 날짜 */
  initialEndDate?: Date | null;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 최소 기간 (일) */
  minDays?: number;
  /** 최대 기간 (일) */
  maxDays?: number;
  /** 범위 변경 콜백 */
  onChange?: (range: DateRange) => void;
  /** 닫기 콜백 */
  onClose?: () => void;
}

interface UseRangeStateReturn {
  /** 현재 표시 날짜 */
  currentDate: Date;
  /** 시작 날짜 */
  startDate: Date | null;
  /** 종료 날짜 */
  endDate: Date | null;
  /** 호버 날짜 */
  hoverDate: Date | null;
  /** 현재 뷰 모드 */
  viewMode: CalendarViewMode;
  /** 현재 10년 시작 */
  currentDecade: number;
  /** 선택 모드 ('start' | 'end') */
  selectionMode: 'start' | 'end';
  /** 날짜 선택 */
  selectDate: (date: Date) => void;
  /** 범위 클리어 */
  clearRange: () => void;
  /** 호버 변경 */
  setHoverDate: (date: Date | null) => void;
  /** 표시 날짜 변경 */
  setCurrentDate: (date: Date) => void;
  /** 뷰 모드 변경 */
  setViewMode: (mode: CalendarViewMode) => void;
  /** 이전으로 이동 */
  goToPrevious: () => void;
  /** 다음으로 이동 */
  goToNext: () => void;
}

export const useRangeState = (options: UseRangeStateOptions = {}): UseRangeStateReturn => {
  const {
    initialStartDate = null,
    initialEndDate = null,
    onChange,
    onClose,
  } = options;

  const [currentDate, setCurrentDate] = useState<Date>(
    initialStartDate ?? new Date()
  );
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<CalendarViewMode>('day');
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');

  const currentDecade = useMemo(() => {
    return getDecadeStart(currentDate.getFullYear());
  }, [currentDate]);

  const selectDate = useCallback((date: Date) => {
    if (viewMode !== 'day') {
      // month/year 뷰에서는 네비게이션만
      setCurrentDate(date);
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
      onChange?.({ startDate: date, endDate: null });
    } else {
      // 종료일이 시작일보다 이전이면 스왑
      if (startDate && date < startDate) {
        setStartDate(date);
        setEndDate(startDate);
        onChange?.({ startDate: date, endDate: startDate });
      } else {
        setEndDate(date);
        onChange?.({ startDate, endDate: date });
      }
      setSelectionMode('start');
      onClose?.();
    }
  }, [viewMode, selectionMode, startDate, onChange, onClose]);

  const clearRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectionMode('start');
    onChange?.({ startDate: null, endDate: null });
  }, [onChange]);

  const goToPrevious = useCallback(() => {
    setCurrentDate((current) => {
      if (viewMode === 'day') {
        return addMonths(current, -1);
      } else if (viewMode === 'month') {
        return addYears(current, -1);
      } else {
        return addYears(current, -10);
      }
    });
  }, [viewMode]);

  const goToNext = useCallback(() => {
    setCurrentDate((current) => {
      if (viewMode === 'day') {
        return addMonths(current, 1);
      } else if (viewMode === 'month') {
        return addYears(current, 1);
      } else {
        return addYears(current, 10);
      }
    });
  }, [viewMode]);

  return {
    currentDate,
    startDate,
    endDate,
    hoverDate,
    viewMode,
    currentDecade,
    selectionMode,
    selectDate,
    clearRange,
    setHoverDate,
    setCurrentDate,
    setViewMode,
    goToPrevious,
    goToNext,
  };
};
