/**
 * Calendar 컴포넌트 모듈
 *
 * 자체 구현 캘린더 컴포넌트 시스템
 * - DatePicker: 날짜 선택
 * - DateRangePicker: 날짜 범위 선택
 * - TimePicker: 시간 선택
 * - DateTimePicker: 날짜/시간 선택
 */

// 컴포넌트 내보내기
export { DatePicker } from './DatePicker';
export { DateRangePicker } from './DateRangePicker';
export { TimePicker } from './TimePicker';
export { DateTimePicker } from './DateTimePicker';

// 타입 내보내기
export type {
  // 기본 타입
  CalendarSize,
  CalendarViewMode,
  DayOfWeek,
  Quarter,
  DateRange,
  TimeValue,
  CalendarLocale,
  // Props 타입
  CalendarBaseProps,
  CalendarInputProps,
  DatePickerProps,
  DateTimePickerProps,
  TimePickerProps,
  DateRangePickerProps,
  PresetRange,
  // 추가 Picker 타입 (추후 구현)
  MonthPickerProps,
  YearPickerProps,
  QuarterPickerProps,
  WeekPickerProps,
} from './types';

// 유틸리티 내보내기
export {
  // 날짜 유틸
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isDateInRange,
  isBefore,
  isAfter,
  getStartOfDay,
  getEndOfDay,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfWeek,
  getEndOfWeek,
  addDays,
  addMonths,
  addYears,
  getDaysInMonth,
  getQuarter,
  getStartOfQuarter,
  getEndOfQuarter,
  getWeekNumber,
  // 포맷 유틸
  formatDate,
  formatTime,
  parseDate,
  formatRelativeDate,
  formatQuarter,
  formatWeek,
  // 로케일 유틸
  koKRLocale,
  enUSLocale,
  defaultLocale,
  mergeLocale,
  getLocaleByCode,
} from './utils';

// 훅 내보내기
export { useCalendarState, useRangeState } from './hooks';
