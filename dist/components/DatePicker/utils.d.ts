/**
 * DatePicker 유틸리티 함수
 */
import type { DateRange, PresetRange } from './types';
/**
 * 두 날짜가 같은 날인지 확인
 */
export declare const isSameDay: (date1: Date | null, date2: Date | null) => boolean;
/**
 * 날짜가 범위 내에 있는지 확인
 */
export declare const isDateInRange: (date: Date, startDate: Date | null, endDate: Date | null) => boolean;
/**
 * 날짜 범위를 문자열로 포맷
 */
export declare const formatDateRange: (range: DateRange, format?: string) => string;
/**
 * 날짜를 문자열로 포맷 (간단한 구현)
 */
export declare const formatDate: (date: Date, format?: string) => string;
/**
 * 오늘 날짜의 시작 시간 (00:00:00)
 */
export declare const getStartOfDay: (date?: Date) => Date;
/**
 * 오늘 날짜의 끝 시간 (23:59:59)
 */
export declare const getEndOfDay: (date?: Date) => Date;
/**
 * 월의 시작일
 */
export declare const getStartOfMonth: (date?: Date) => Date;
/**
 * 월의 마지막일
 */
export declare const getEndOfMonth: (date?: Date) => Date;
/**
 * n일 전
 */
export declare const getDaysAgo: (days: number, from?: Date) => Date;
/**
 * n개월 전
 */
export declare const getMonthsAgo: (months: number, from?: Date) => Date;
/**
 * 기본 프리셋 범위 생성
 */
export declare const createDefaultPresets: () => PresetRange[];
/**
 * 두 날짜 범위가 같은지 확인
 */
export declare const isSameRange: (range1: DateRange, range2: DateRange) => boolean;
/**
 * 범위의 시작일과 종료일이 유효한지 확인
 */
export declare const isValidRange: (range: DateRange) => boolean;
/**
 * 범위 정규화 (시작일이 종료일보다 이후인 경우 스왑)
 */
export declare const normalizeRange: (range: DateRange) => DateRange;
