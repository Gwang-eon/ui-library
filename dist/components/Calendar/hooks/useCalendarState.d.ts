import { CalendarViewMode, DateRange } from '../types';
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
export declare const useCalendarState: (options?: UseCalendarStateOptions) => UseCalendarStateReturn;
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
export declare const useRangeState: (options?: UseRangeStateOptions) => UseRangeStateReturn;
export {};
