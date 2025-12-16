/**
 * 로케일 유틸리티
 */

import type { CalendarLocale, DayOfWeek } from '../types';

/** 기본 한국어 로케일 */
export const koKRLocale: CalendarLocale = {
  locale: 'ko-KR',
  weekdayNames: ['일', '월', '화', '수', '목', '금', '토'],
  weekdayNamesLong: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesLong: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  weekStartsOn: 0,
  dateFormat: 'yyyy.MM.dd',
  dateTimeFormat: 'yyyy.MM.dd HH:mm',
  timeFormat: 'HH:mm',
};

/** 기본 영어 로케일 */
export const enUSLocale: CalendarLocale = {
  locale: 'en-US',
  weekdayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdayNamesLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  monthNamesLong: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekStartsOn: 0,
  dateFormat: 'MM/dd/yyyy',
  dateTimeFormat: 'MM/dd/yyyy hh:mm a',
  timeFormat: 'hh:mm a',
};

/** 기본 로케일 (한국어) */
export const defaultLocale = koKRLocale;

/** 로케일 병합 */
export const mergeLocale = (
  base: CalendarLocale,
  override?: Partial<CalendarLocale>
): CalendarLocale => {
  if (!override) return base;
  return { ...base, ...override };
};

/** 로케일 코드로 로케일 가져오기 */
export const getLocaleByCode = (code: string): CalendarLocale => {
  switch (code.toLowerCase()) {
    case 'ko':
    case 'ko-kr':
      return koKRLocale;
    case 'en':
    case 'en-us':
      return enUSLocale;
    default:
      return defaultLocale;
  }
};

/** 요일 이름 배열 (주 시작일 기준으로 정렬) */
export const getOrderedWeekdays = (
  weekdayNames: string[],
  weekStartsOn: DayOfWeek
): string[] => {
  const result = [...weekdayNames];
  for (let i = 0; i < weekStartsOn; i++) {
    result.push(result.shift()!);
  }
  return result;
};

/** 월 이름 가져오기 */
export const getMonthName = (
  month: number,
  locale: CalendarLocale,
  long: boolean = false
): string => {
  const names = long ? locale.monthNamesLong : locale.monthNames;
  return names[month];
};

/** 요일 이름 가져오기 */
export const getWeekdayName = (
  day: DayOfWeek,
  locale: CalendarLocale,
  long: boolean = false
): string => {
  const names = long ? locale.weekdayNamesLong : locale.weekdayNames;
  return names[day];
};
