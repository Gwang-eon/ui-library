/**
 * Calendar 컴포넌트 공통 타입 정의
 */

// ============================================
// 기본 타입
// ============================================

/** 컴포넌트 크기 */
export type CalendarSize = 'sm' | 'md' | 'lg';

/** 캘린더 뷰 모드 */
export type CalendarViewMode = 'day' | 'month' | 'year';

/** 요일 (0 = 일요일) */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** 분기 */
export type Quarter = 1 | 2 | 3 | 4;

// ============================================
// 날짜 범위
// ============================================

/** 날짜 범위 */
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

/** 시간 값 */
export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

// ============================================
// 로케일 설정
// ============================================

/** 로케일 설정 */
export interface CalendarLocale {
  /** 로케일 코드 (예: 'ko-KR', 'en-US') */
  locale: string;
  /** 요일 이름 (짧은) */
  weekdayNames: string[];
  /** 요일 이름 (긴) */
  weekdayNamesLong: string[];
  /** 월 이름 (짧은) */
  monthNames: string[];
  /** 월 이름 (긴) */
  monthNamesLong: string[];
  /** 주 시작 요일 (0 = 일요일) */
  weekStartsOn: DayOfWeek;
  /** 날짜 포맷 */
  dateFormat: string;
  /** 날짜/시간 포맷 */
  dateTimeFormat: string;
  /** 시간 포맷 */
  timeFormat: string;
}

// ============================================
// 공통 Props
// ============================================

/** 기본 캘린더 Props */
export interface CalendarBaseProps {
  /** 크기 */
  size?: CalendarSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 모드 (팝업 없이 항상 표시) */
  inline?: boolean;
  /** 자동 포커스 */
  autoFocus?: boolean;
  /** 로케일 설정 */
  locale?: Partial<CalendarLocale>;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 날짜 필터 함수 (false 반환 시 비활성화) */
  filterDate?: (date: Date) => boolean;
  /** 지우기 버튼 표시 */
  clearable?: boolean;
  /** 닫기 콜백 */
  onClose?: () => void;
  /** 열기 콜백 */
  onOpen?: () => void;
}

/** 입력 필드 Props */
export interface CalendarInputProps {
  /** 입력 ID */
  id?: string;
  /** 입력 name */
  name?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 필수 여부 */
  required?: boolean;
  /** ARIA 라벨 */
  ariaLabel?: string;
  /** ARIA 설명 ID */
  ariaDescribedBy?: string;
  /** 포커스 콜백 */
  onFocus?: () => void;
  /** 블러 콜백 */
  onBlur?: () => void;
}

// ============================================
// DatePicker Props
// ============================================

export interface DatePickerProps extends CalendarBaseProps, CalendarInputProps {
  /** 선택된 날짜 */
  value?: Date | null;
  /** 날짜 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 날짜 포맷 */
  dateFormat?: string;
}

// ============================================
// DateTimePicker Props
// ============================================

export interface DateTimePickerProps extends CalendarBaseProps, CalendarInputProps {
  /** 선택된 날짜/시간 */
  value?: Date | null;
  /** 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 날짜/시간 포맷 */
  dateFormat?: string;
  /** 시간 간격 (분) */
  timeIntervals?: number;
  /** 최소 시간 */
  minTime?: TimeValue;
  /** 최대 시간 */
  maxTime?: TimeValue;
}

// ============================================
// TimePicker Props
// ============================================

export interface TimePickerProps extends Omit<CalendarBaseProps, 'minDate' | 'maxDate' | 'filterDate'>, CalendarInputProps {
  /** 선택된 시간 */
  value?: Date | null;
  /** 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 시간 포맷 */
  timeFormat?: string;
  /** 시간 간격 (분) */
  timeIntervals?: number;
  /** 최소 시간 */
  minTime?: TimeValue;
  /** 최대 시간 */
  maxTime?: TimeValue;
  /** 24시간 형식 */
  use24Hour?: boolean;
}

// ============================================
// DateRangePicker Props
// ============================================

/** 프리셋 범위 */
export interface PresetRange {
  /** 프리셋 라벨 */
  label: string;
  /** 범위 값을 반환하는 함수 */
  getValue: () => DateRange;
}

export interface DateRangePickerProps extends CalendarBaseProps, CalendarInputProps {
  /** 시작 날짜 */
  startDate?: Date | null;
  /** 종료 날짜 */
  endDate?: Date | null;
  /** 범위 변경 콜백 */
  onChange?: (range: DateRange) => void;
  /** 날짜 포맷 */
  dateFormat?: string;
  /** 프리셋 범위 목록 */
  presets?: PresetRange[];
  /** 프리셋 표시 여부 */
  showPresets?: boolean;
  /** 시작 날짜 플레이스홀더 */
  startPlaceholder?: string;
  /** 종료 날짜 플레이스홀더 */
  endPlaceholder?: string;
  /** 월 개수 (1 또는 2) */
  monthsShown?: 1 | 2;
  /** 최소 기간 (일) */
  minDays?: number;
  /** 최대 기간 (일) */
  maxDays?: number;
}

// ============================================
// MonthPicker Props
// ============================================

export interface MonthPickerProps extends CalendarBaseProps, CalendarInputProps {
  /** 선택된 날짜 (월) */
  value?: Date | null;
  /** 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 포맷 */
  dateFormat?: string;
}

// ============================================
// YearPicker Props
// ============================================

export interface YearPickerProps extends CalendarBaseProps, CalendarInputProps {
  /** 선택된 날짜 (년) */
  value?: Date | null;
  /** 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 포맷 */
  dateFormat?: string;
  /** 년도 범위 (현재 기준 +/-) */
  yearRange?: number;
}

// ============================================
// QuarterPicker Props
// ============================================

export interface QuarterPickerProps extends CalendarBaseProps, CalendarInputProps {
  /** 선택된 날짜 (분기) */
  value?: Date | null;
  /** 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 포맷 */
  dateFormat?: string;
}

// ============================================
// WeekPicker Props
// ============================================

export interface WeekPickerProps extends CalendarBaseProps, CalendarInputProps {
  /** 선택된 날짜 (주) */
  value?: Date | null;
  /** 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 포맷 */
  dateFormat?: string;
  /** ISO 주 번호 표시 */
  showWeekNumbers?: boolean;
}

// ============================================
// Internal Types (Base Components)
// ============================================

/** 날짜 셀 정보 */
export interface DayCellInfo {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
}

/** 월 셀 정보 */
export interface MonthCellInfo {
  date: Date;
  month: number;
  monthName: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

/** 년 셀 정보 */
export interface YearCellInfo {
  date: Date;
  year: number;
  isCurrentYear: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

/** 시간 셀 정보 */
export interface TimeCellInfo {
  time: TimeValue;
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
}

/** 캘린더 헤더 Props */
export interface CalendarHeaderProps {
  /** 현재 표시 날짜 */
  currentDate: Date;
  /** 현재 뷰 모드 */
  viewMode: CalendarViewMode;
  /** 뷰 모드 변경 */
  onViewModeChange: (mode: CalendarViewMode) => void;
  /** 이전 이동 */
  onPrevious?: () => void;
  /** 다음 이동 */
  onNext?: () => void;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 로케일 */
  locale: CalendarLocale;
  /** 크기 */
  size?: CalendarSize;
}

/** 캘린더 그리드 Props */
export interface CalendarGridProps {
  /** 현재 표시 날짜 */
  currentDate: Date;
  /** 선택된 날짜 */
  selectedDate?: Date | null;
  /** 날짜 선택 */
  onSelect: (date: Date) => void;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 날짜 필터 */
  filterDate?: (date: Date) => boolean;
  /** 로케일 */
  locale: CalendarLocale;
  /** 크기 */
  size?: CalendarSize;
  /** 범위 선택 모드 */
  rangeMode?: boolean;
  /** 범위 시작일 */
  rangeStart?: Date | null;
  /** 범위 종료일 */
  rangeEnd?: Date | null;
  /** 호버 날짜 (범위 미리보기용) */
  hoverDate?: Date | null;
  /** 호버 변경 */
  onHoverChange?: (date: Date | null) => void;
}

/** 월 그리드 Props */
export interface MonthGridProps {
  /** 현재 표시 연도 */
  currentYear: number;
  /** 선택된 날짜 */
  selectedDate?: Date | null;
  /** 월 선택 */
  onSelect: (date: Date) => void;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 로케일 */
  locale: CalendarLocale;
  /** 크기 */
  size?: CalendarSize;
}

/** 년 그리드 Props */
export interface YearGridProps {
  /** 현재 표시 10년 시작 */
  currentDecade: number;
  /** 선택된 날짜 */
  selectedDate?: Date | null;
  /** 년 선택 */
  onSelect: (date: Date) => void;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 크기 */
  size?: CalendarSize;
}

/** 시간 선택기 Props */
export interface TimeSelectorProps {
  /** 선택된 시간 */
  value?: Date | null;
  /** 시간 선택 */
  onSelect: (date: Date) => void;
  /** 시간 간격 (분) */
  timeIntervals?: number;
  /** 최소 시간 */
  minTime?: TimeValue;
  /** 최대 시간 */
  maxTime?: TimeValue;
  /** 24시간 형식 */
  use24Hour?: boolean;
  /** 크기 */
  size?: CalendarSize;
}
