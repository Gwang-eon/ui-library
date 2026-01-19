/**
 * 로케일 유틸리티
 */
import type { CalendarLocale, DayOfWeek } from '../types';
/** 기본 한국어 로케일 */
export declare const koKRLocale: CalendarLocale;
/** 기본 영어 로케일 */
export declare const enUSLocale: CalendarLocale;
/** 기본 로케일 (한국어) */
export declare const defaultLocale: CalendarLocale;
/** 로케일 병합 */
export declare const mergeLocale: (base: CalendarLocale, override?: Partial<CalendarLocale>) => CalendarLocale;
/** 로케일 코드로 로케일 가져오기 */
export declare const getLocaleByCode: (code: string) => CalendarLocale;
/** 요일 이름 배열 (주 시작일 기준으로 정렬) */
export declare const getOrderedWeekdays: (weekdayNames: string[], weekStartsOn: DayOfWeek) => string[];
/** 월 이름 가져오기 */
export declare const getMonthName: (month: number, locale: CalendarLocale, long?: boolean) => string;
/** 요일 이름 가져오기 */
export declare const getWeekdayName: (day: DayOfWeek, locale: CalendarLocale, long?: boolean) => string;
