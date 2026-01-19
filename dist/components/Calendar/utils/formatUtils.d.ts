/**
 * 날짜 포맷 유틸리티
 */
import type { TimeValue } from '../types';
/** 날짜를 문자열로 포맷 */
export declare const formatDate: (date: Date, format?: string) => string;
/** 시간을 문자열로 포맷 */
export declare const formatTime: (time: TimeValue, format?: string, use24Hour?: boolean) => string;
/** 문자열을 Date로 파싱 (간단한 구현) */
export declare const parseDate: (dateString: string, format?: string) => Date | null;
/** 상대적 날짜 표시 (오늘, 어제, n일 전 등) */
export declare const formatRelativeDate: (date: Date, locale?: "ko" | "en") => string;
/** 분기 포맷 */
export declare const formatQuarter: (date: Date, locale?: "ko" | "en") => string;
/** 주 포맷 */
export declare const formatWeek: (date: Date, locale?: "ko" | "en") => string;
