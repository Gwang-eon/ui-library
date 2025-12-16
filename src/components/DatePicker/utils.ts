/**
 * DatePicker 유틸리티 함수
 */
import type { DateRange, PresetRange } from './types';

/**
 * 두 날짜가 같은 날인지 확인
 */
export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * 날짜가 범위 내에 있는지 확인
 */
export const isDateInRange = (
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  if (!startDate || !endDate) return false;
  const time = date.getTime();
  return time >= startDate.getTime() && time <= endDate.getTime();
};

/**
 * 날짜 범위를 문자열로 포맷
 */
export const formatDateRange = (
  range: DateRange,
  format: string = 'yyyy-MM-dd'
): string => {
  const { startDate, endDate } = range;
  if (!startDate && !endDate) return '';
  if (!startDate) return `~ ${formatDate(endDate!, format)}`;
  if (!endDate) return `${formatDate(startDate, format)} ~`;
  return `${formatDate(startDate, format)} ~ ${formatDate(endDate, format)}`;
};

/**
 * 날짜를 문자열로 포맷 (간단한 구현)
 */
export const formatDate = (date: Date, format: string = 'yyyy-MM-dd'): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return format
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes);
};

/**
 * 오늘 날짜의 시작 시간 (00:00:00)
 */
export const getStartOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * 오늘 날짜의 끝 시간 (23:59:59)
 */
export const getEndOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * 월의 시작일
 */
export const getStartOfMonth = (date: Date = new Date()): Date => {
  const result = new Date(date.getFullYear(), date.getMonth(), 1);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * 월의 마지막일
 */
export const getEndOfMonth = (date: Date = new Date()): Date => {
  const result = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * n일 전
 */
export const getDaysAgo = (days: number, from: Date = new Date()): Date => {
  const result = new Date(from);
  result.setDate(result.getDate() - days);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * n개월 전
 */
export const getMonthsAgo = (months: number, from: Date = new Date()): Date => {
  const result = new Date(from);
  result.setMonth(result.getMonth() - months);
  return result;
};

/**
 * 기본 프리셋 범위 생성
 */
export const createDefaultPresets = (): PresetRange[] => [
  {
    label: 'Today',
    getValue: () => {
      const today = getStartOfDay();
      return { startDate: today, endDate: getEndOfDay() };
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = getDaysAgo(1);
      return { startDate: yesterday, endDate: getEndOfDay(yesterday) };
    },
  },
  {
    label: 'Last 7 days',
    getValue: () => ({
      startDate: getDaysAgo(6),
      endDate: getEndOfDay(),
    }),
  },
  {
    label: 'Last 30 days',
    getValue: () => ({
      startDate: getDaysAgo(29),
      endDate: getEndOfDay(),
    }),
  },
  {
    label: 'This month',
    getValue: () => ({
      startDate: getStartOfMonth(),
      endDate: getEndOfMonth(),
    }),
  },
  {
    label: 'Last month',
    getValue: () => {
      const lastMonth = getMonthsAgo(1);
      return {
        startDate: getStartOfMonth(lastMonth),
        endDate: getEndOfMonth(lastMonth),
      };
    },
  },
];

/**
 * 두 날짜 범위가 같은지 확인
 */
export const isSameRange = (range1: DateRange, range2: DateRange): boolean => {
  return (
    isSameDay(range1.startDate, range2.startDate) &&
    isSameDay(range1.endDate, range2.endDate)
  );
};

/**
 * 범위의 시작일과 종료일이 유효한지 확인
 */
export const isValidRange = (range: DateRange): boolean => {
  const { startDate, endDate } = range;
  if (!startDate || !endDate) return false;
  return startDate.getTime() <= endDate.getTime();
};

/**
 * 범위 정규화 (시작일이 종료일보다 이후인 경우 스왑)
 */
export const normalizeRange = (range: DateRange): DateRange => {
  const { startDate, endDate } = range;
  if (!startDate || !endDate) return range;
  if (startDate.getTime() > endDate.getTime()) {
    return { startDate: endDate, endDate: startDate };
  }
  return range;
};
