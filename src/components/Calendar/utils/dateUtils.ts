/**
 * 날짜 유틸리티 함수
 */

import type { DayOfWeek, TimeValue, DateRange } from '../types';

// ============================================
// 날짜 비교
// ============================================

/** 두 날짜가 같은 날인지 확인 */
export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/** 두 날짜가 같은 월인지 확인 */
export const isSameMonth = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

/** 두 날짜가 같은 년인지 확인 */
export const isSameYear = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear();
};

/** 오늘인지 확인 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/** 날짜가 범위 내에 있는지 확인 */
export const isDateInRange = (
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  if (!startDate || !endDate) return false;
  const time = getStartOfDay(date).getTime();
  return time >= getStartOfDay(startDate).getTime() && time <= getStartOfDay(endDate).getTime();
};

/** 날짜가 이전인지 확인 */
export const isBefore = (date1: Date, date2: Date): boolean => {
  return getStartOfDay(date1).getTime() < getStartOfDay(date2).getTime();
};

/** 날짜가 이후인지 확인 */
export const isAfter = (date1: Date, date2: Date): boolean => {
  return getStartOfDay(date1).getTime() > getStartOfDay(date2).getTime();
};

/** 날짜가 최소/최대 범위 내인지 확인 */
export const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  filterDate?: (date: Date) => boolean
): boolean => {
  if (minDate && isBefore(date, minDate)) return true;
  if (maxDate && isAfter(date, maxDate)) return true;
  if (filterDate && !filterDate(date)) return true;
  return false;
};

// ============================================
// 날짜 조작
// ============================================

/** 오늘 날짜의 시작 시간 (00:00:00) */
export const getStartOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/** 오늘 날짜의 끝 시간 (23:59:59) */
export const getEndOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/** 월의 첫날 */
export const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
};

/** 월의 마지막날 */
export const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
};

/** 년의 첫날 */
export const getStartOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
};

/** 년의 마지막날 */
export const getEndOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
};

/** 주의 첫날 */
export const getStartOfWeek = (date: Date, weekStartsOn: DayOfWeek = 0): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

/** 주의 마지막날 */
export const getEndOfWeek = (date: Date, weekStartsOn: DayOfWeek = 0): Date => {
  const result = getStartOfWeek(date, weekStartsOn);
  result.setDate(result.getDate() + 6);
  result.setHours(23, 59, 59, 999);
  return result;
};

/** 날짜 더하기 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/** n일 전 */
export const getDaysAgo = (days: number, from: Date = new Date()): Date => {
  const result = new Date(from);
  result.setDate(result.getDate() - days);
  result.setHours(0, 0, 0, 0);
  return result;
};

/** 월 더하기 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  const day = result.getDate();
  result.setMonth(result.getMonth() + months);
  // 월 넘김 처리 (예: 1월 31일 + 1개월 = 2월 28일)
  if (result.getDate() !== day) {
    result.setDate(0);
  }
  return result;
};

/** 년 더하기 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/** 월의 일수 */
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/** 분기 구하기 */
export const getQuarter = (date: Date): number => {
  return Math.floor(date.getMonth() / 3) + 1;
};

/** 분기의 첫날 */
export const getStartOfQuarter = (date: Date): Date => {
  const quarter = getQuarter(date);
  const startMonth = (quarter - 1) * 3;
  return new Date(date.getFullYear(), startMonth, 1, 0, 0, 0, 0);
};

/** 분기의 마지막날 */
export const getEndOfQuarter = (date: Date): Date => {
  const quarter = getQuarter(date);
  const endMonth = quarter * 3;
  return new Date(date.getFullYear(), endMonth, 0, 23, 59, 59, 999);
};

/** ISO 주 번호 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

// ============================================
// 달력 그리드 생성
// ============================================

/** 월 달력 날짜 배열 생성 (6주 고정) */
export const getMonthDays = (date: Date, weekStartsOn: DayOfWeek = 0): Date[] => {
  const days: Date[] = [];
  const firstDayOfMonth = getStartOfMonth(date);
  const startDate = getStartOfWeek(firstDayOfMonth, weekStartsOn);

  // 6주 * 7일 = 42일
  for (let i = 0; i < 42; i++) {
    days.push(addDays(startDate, i));
  }

  return days;
};

/** 년도 월 배열 생성 */
export const getYearMonths = (year: number): Date[] => {
  const months: Date[] = [];
  for (let i = 0; i < 12; i++) {
    months.push(new Date(year, i, 1));
  }
  return months;
};

/** 10년 년도 배열 생성 */
export const getDecadeYears = (startYear: number): Date[] => {
  const years: Date[] = [];
  for (let i = 0; i < 12; i++) {
    years.push(new Date(startYear + i, 0, 1));
  }
  return years;
};

/** 10년 시작 년도 */
export const getDecadeStart = (year: number): number => {
  return Math.floor(year / 10) * 10 - 1;
};

// ============================================
// 시간 관련
// ============================================

/** 시간 배열 생성 */
export const getTimeSlots = (
  intervals: number = 30,
  minTime?: TimeValue,
  maxTime?: TimeValue
): TimeValue[] => {
  const slots: TimeValue[] = [];
  const totalMinutes = 24 * 60;

  const minMinutes = minTime ? minTime.hours * 60 + minTime.minutes : 0;
  const maxMinutes = maxTime ? maxTime.hours * 60 + maxTime.minutes : totalMinutes - 1;

  for (let minutes = 0; minutes < totalMinutes; minutes += intervals) {
    if (minutes >= minMinutes && minutes <= maxMinutes) {
      slots.push({
        hours: Math.floor(minutes / 60),
        minutes: minutes % 60,
      });
    }
  }

  return slots;
};

/** Date에서 TimeValue 추출 */
export const getTimeFromDate = (date: Date): TimeValue => {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

/** Date에 TimeValue 적용 */
export const setTimeToDate = (date: Date, time: TimeValue): Date => {
  const result = new Date(date);
  result.setHours(time.hours, time.minutes, time.seconds ?? 0, 0);
  return result;
};

/** 시간 비교 */
export const compareTime = (time1: TimeValue, time2: TimeValue): number => {
  const minutes1 = time1.hours * 60 + time1.minutes;
  const minutes2 = time2.hours * 60 + time2.minutes;
  return minutes1 - minutes2;
};

// ============================================
// 범위 관련
// ============================================

/** 두 날짜 범위가 같은지 확인 */
export const isSameRange = (range1: DateRange, range2: DateRange): boolean => {
  return (
    isSameDay(range1.startDate, range2.startDate) &&
    isSameDay(range1.endDate, range2.endDate)
  );
};

/** 범위 유효성 확인 */
export const isValidRange = (range: DateRange): boolean => {
  const { startDate, endDate } = range;
  if (!startDate || !endDate) return false;
  return startDate.getTime() <= endDate.getTime();
};

/** 범위 정규화 (시작일이 종료일보다 이후인 경우 스왑) */
export const normalizeRange = (range: DateRange): DateRange => {
  const { startDate, endDate } = range;
  if (!startDate || !endDate) return range;
  if (startDate.getTime() > endDate.getTime()) {
    return { startDate: endDate, endDate: startDate };
  }
  return range;
};

/** 두 날짜 사이 일수 */
export const getDaysBetween = (date1: Date, date2: Date): number => {
  const diff = Math.abs(getStartOfDay(date2).getTime() - getStartOfDay(date1).getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
