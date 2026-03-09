/**
 * 날짜 유틸리티 함수
 */
import type { DayOfWeek, TimeValue, DateRange } from '../types';
/** 두 날짜가 같은 날인지 확인 */
export declare const isSameDay: (date1: Date | null, date2: Date | null) => boolean;
/** 두 날짜가 같은 월인지 확인 */
export declare const isSameMonth: (date1: Date | null, date2: Date | null) => boolean;
/** 두 날짜가 같은 년인지 확인 */
export declare const isSameYear: (date1: Date | null, date2: Date | null) => boolean;
/** 오늘인지 확인 */
export declare const isToday: (date: Date) => boolean;
/** 날짜가 범위 내에 있는지 확인 */
export declare const isDateInRange: (date: Date, startDate: Date | null, endDate: Date | null) => boolean;
/** 날짜가 이전인지 확인 */
export declare const isBefore: (date1: Date, date2: Date) => boolean;
/** 날짜가 이후인지 확인 */
export declare const isAfter: (date1: Date, date2: Date) => boolean;
/** 날짜가 최소/최대 범위 내인지 확인 */
export declare const isDateDisabled: (date: Date, minDate?: Date, maxDate?: Date, filterDate?: (date: Date) => boolean) => boolean;
/** 오늘 날짜의 시작 시간 (00:00:00) */
export declare const getStartOfDay: (date?: Date) => Date;
/** 오늘 날짜의 끝 시간 (23:59:59) */
export declare const getEndOfDay: (date?: Date) => Date;
/** 월의 첫날 */
export declare const getStartOfMonth: (date: Date) => Date;
/** 월의 마지막날 */
export declare const getEndOfMonth: (date: Date) => Date;
/** 년의 첫날 */
export declare const getStartOfYear: (date: Date) => Date;
/** 년의 마지막날 */
export declare const getEndOfYear: (date: Date) => Date;
/** 주의 첫날 */
export declare const getStartOfWeek: (date: Date, weekStartsOn?: DayOfWeek) => Date;
/** 주의 마지막날 */
export declare const getEndOfWeek: (date: Date, weekStartsOn?: DayOfWeek) => Date;
/** 날짜 더하기 */
export declare const addDays: (date: Date, days: number) => Date;
/** n일 전 */
export declare const getDaysAgo: (days: number, from?: Date) => Date;
/** 월 더하기 */
export declare const addMonths: (date: Date, months: number) => Date;
/** 년 더하기 */
export declare const addYears: (date: Date, years: number) => Date;
/** 월의 일수 */
export declare const getDaysInMonth: (date: Date) => number;
/** 분기 구하기 */
export declare const getQuarter: (date: Date) => number;
/** 분기의 첫날 */
export declare const getStartOfQuarter: (date: Date) => Date;
/** 분기의 마지막날 */
export declare const getEndOfQuarter: (date: Date) => Date;
/** ISO 주 번호 */
export declare const getWeekNumber: (date: Date) => number;
/** 월 달력 날짜 배열 생성 (6주 고정) */
export declare const getMonthDays: (date: Date, weekStartsOn?: DayOfWeek) => Date[];
/** 년도 월 배열 생성 */
export declare const getYearMonths: (year: number) => Date[];
/** 10년 년도 배열 생성 */
export declare const getDecadeYears: (startYear: number) => Date[];
/** 10년 시작 년도 */
export declare const getDecadeStart: (year: number) => number;
/** 시간 배열 생성 */
export declare const getTimeSlots: (intervals?: number, minTime?: TimeValue, maxTime?: TimeValue) => TimeValue[];
/** Date에서 TimeValue 추출 */
export declare const getTimeFromDate: (date: Date) => TimeValue;
/** Date에 TimeValue 적용 */
export declare const setTimeToDate: (date: Date, time: TimeValue) => Date;
/** 시간 비교 */
export declare const compareTime: (time1: TimeValue, time2: TimeValue) => number;
/** 두 날짜 범위가 같은지 확인 */
export declare const isSameRange: (range1: DateRange, range2: DateRange) => boolean;
/** 범위 유효성 확인 */
export declare const isValidRange: (range: DateRange) => boolean;
/** 범위 정규화 (시작일이 종료일보다 이후인 경우 스왑) */
export declare const normalizeRange: (range: DateRange) => DateRange;
/** 두 날짜 사이 일수 */
export declare const getDaysBetween: (date1: Date, date2: Date) => number;
