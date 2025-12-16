/**
 * DatePicker 공유 타입 정의
 */

export type DatePickerSize = 'sm' | 'md' | 'lg';

/**
 * 날짜 범위 인터페이스
 */
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * 프리셋 범위 인터페이스
 */
export interface PresetRange {
  /** 프리셋 라벨 */
  label: string;
  /** 범위 값을 반환하는 함수 */
  getValue: () => DateRange;
}

/**
 * DatePicker 기본 Props
 */
export interface DatePickerBaseProps {
  /** 크기 */
  size?: DatePickerSize;
  /** 에러 상태 */
  error?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 날짜 포맷 */
  dateFormat?: string;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 시간 선택 표시 */
  showTimeSelect?: boolean;
  /** 시간 포맷 */
  timeFormat?: string;
  /** 시간 간격 (분) */
  timeIntervals?: number;
  /** 지우기 버튼 표시 */
  isClearable?: boolean;
  /** 월 드롭다운 표시 */
  showMonthDropdown?: boolean;
  /** 년 드롭다운 표시 */
  showYearDropdown?: boolean;
  /** 드롭다운 모드 */
  dropdownMode?: 'select' | 'scroll';
  /** 날짜 필터 함수 */
  filterDate?: (date: Date) => boolean;
  /** 인라인 모드 */
  inline?: boolean;
  /** 표시할 월 수 */
  monthsShown?: number;
  /** ARIA 라벨 */
  ariaLabel?: string;
  /** ARIA 설명 ID */
  ariaDescribedBy?: string;
  /** 입력 ID */
  id?: string;
  /** 입력 name */
  name?: string;
  /** 필수 여부 */
  required?: boolean;
}

/**
 * DatePicker Props
 */
export interface DatePickerProps extends DatePickerBaseProps {
  /** 선택된 날짜 */
  value?: Date | null;
  /** 날짜 변경 콜백 */
  onChange?: (date: Date | null) => void;
}

/**
 * DateRangePicker Props
 */
export interface DateRangePickerProps extends DatePickerBaseProps {
  /** 시작 날짜 */
  startDate?: Date | null;
  /** 종료 날짜 */
  endDate?: Date | null;
  /** 범위 변경 콜백 */
  onChange?: (range: DateRange) => void;
  /** 프리셋 범위 목록 */
  presets?: PresetRange[];
  /** 프리셋 표시 여부 */
  showPresets?: boolean;
  /** 프리셋 위치 */
  presetsPosition?: 'left' | 'top';
  /** 시작 날짜 플레이스홀더 */
  startPlaceholder?: string;
  /** 종료 날짜 플레이스홀더 */
  endPlaceholder?: string;
  /** 시작 날짜 변경 콜백 */
  onStartDateChange?: (date: Date | null) => void;
  /** 종료 날짜 변경 콜백 */
  onEndDateChange?: (date: Date | null) => void;
}

/**
 * PresetRanges Props
 */
export interface PresetRangesProps {
  /** 프리셋 목록 */
  presets: PresetRange[];
  /** 프리셋 선택 콜백 */
  onSelect: (range: DateRange) => void;
  /** 현재 선택된 범위 */
  selectedRange?: DateRange;
  /** 위치 */
  position?: 'left' | 'top';
  /** 추가 CSS 클래스 */
  className?: string;
}
