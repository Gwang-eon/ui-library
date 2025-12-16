# Calendar 컴포넌트 구현 계획

## 현재 상태

- DatePicker UI 완전히 깨져있음
- 기본적인 기능만 구현된 상태
- 엔터프라이즈 수준의 캘린더 컴포넌트 필요

---

## 1차 구현 범위 (12개 컴포넌트)

### 우선순위 1: 기본 (필수)
| 컴포넌트 | 설명 | 복잡도 |
|---------|------|--------|
| **DatePicker** | 단일 날짜 선택 | 중 |
| **DateRangePicker** | 시작~종료 기간 | 중 |
| **TimePicker** | 시간 선택 | 낮음 |
| **DateTimePicker** | 날짜+시간 | 중 |

### 우선순위 2: 확장
| 컴포넌트 | 설명 | 복잡도 |
|---------|------|--------|
| **MonthPicker** | 월 선택 | 낮음 |
| **YearPicker** | 년 선택 | 낮음 |
| **WeekPicker** | 주 선택 | 중 |
| **QuarterPicker** | 분기 선택 | 낮음 |

### 우선순위 3: 고급
| 컴포넌트 | 설명 | 복잡도 |
|---------|------|--------|
| **MultipleDatePicker** | 다중 날짜 선택 | 중 |
| **PeriodPicker** | N일/N주/N개월 기간 | 중 |
| **FiscalYearPicker** | 회계연도 선택 | 낮음 |
| **ScheduleCalendar** | 일정 표시 캘린더 | 높음 |

---

## 파일 구조

```
src/components/Calendar/
├── index.ts                    # 모든 컴포넌트 export
├── types.ts                    # 공통 타입 정의
├── constants.ts                # 상수 (월 이름, 요일, 포맷 등)
├── utils/
│   ├── index.ts
│   ├── dateUtils.ts            # 날짜 계산 유틸리티
│   ├── formatUtils.ts          # 포맷팅 (YYYY.MM.DD 등)
│   ├── validationUtils.ts      # 유효성 검사
│   └── localeUtils.ts          # 다국어 지원
│
├── hooks/
│   ├── useCalendarState.ts     # 캘린더 상태 관리
│   ├── useViewMode.ts          # 뷰 모드 전환 (day/month/year)
│   ├── useDateNavigation.ts    # 날짜 네비게이션
│   └── useKeyboardNav.ts       # 키보드 네비게이션
│
├── base/
│   ├── CalendarBase.tsx        # 기본 캘린더 그리드
│   ├── CalendarHeader.tsx      # 헤더 (월/년 표시, 네비게이션)
│   ├── CalendarGrid.tsx        # 날짜 그리드
│   ├── DayCell.tsx             # 날짜 셀
│   ├── MonthGrid.tsx           # 월 선택 그리드
│   ├── YearGrid.tsx            # 년 선택 그리드
│   ├── TimeSelector.tsx        # 시간 선택기
│   └── Popover.tsx             # 팝오버 컨테이너
│
├── styles/
│   ├── calendar.module.css     # 공통 캘린더 스타일
│   ├── variables.css           # CSS 변수
│   └── animations.css          # 애니메이션
│
├── DatePicker/
│   ├── DatePicker.tsx
│   ├── DatePicker.test.tsx
│   └── index.ts
│
├── DateRangePicker/
│   ├── DateRangePicker.tsx
│   ├── PresetRanges.tsx
│   ├── DateRangePicker.test.tsx
│   └── index.ts
│
├── TimePicker/
│   ├── TimePicker.tsx
│   ├── TimePicker.test.tsx
│   └── index.ts
│
├── DateTimePicker/
│   ├── DateTimePicker.tsx
│   ├── DateTimePicker.test.tsx
│   └── index.ts
│
├── MonthPicker/
│   ├── MonthPicker.tsx
│   ├── MonthPicker.test.tsx
│   └── index.ts
│
├── YearPicker/
│   ├── YearPicker.tsx
│   ├── YearPicker.test.tsx
│   └── index.ts
│
├── WeekPicker/
│   ├── WeekPicker.tsx
│   ├── WeekPicker.test.tsx
│   └── index.ts
│
├── QuarterPicker/
│   ├── QuarterPicker.tsx
│   ├── QuarterPicker.test.tsx
│   └── index.ts
│
├── MultipleDatePicker/
│   ├── MultipleDatePicker.tsx
│   ├── MultipleDatePicker.test.tsx
│   └── index.ts
│
├── PeriodPicker/
│   ├── PeriodPicker.tsx
│   ├── PeriodPicker.test.tsx
│   └── index.ts
│
├── FiscalYearPicker/
│   ├── FiscalYearPicker.tsx
│   ├── FiscalYearPicker.test.tsx
│   └── index.ts
│
└── ScheduleCalendar/
    ├── ScheduleCalendar.tsx
    ├── ScheduleCalendar.test.tsx
    └── index.ts
```

---

## 공통 기반 설계

### 1. 공통 타입 (types.ts)

```typescript
// 기본 날짜 타입
export type DateValue = Date | null;
export type DateRange = { start: DateValue; end: DateValue };

// 뷰 모드
export type ViewMode = 'day' | 'month' | 'year' | 'decade';

// 공통 Props
export interface CalendarBaseProps {
  // 값
  value?: DateValue;
  defaultValue?: DateValue;
  onChange?: (value: DateValue) => void;

  // 제약
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);

  // 포맷
  format?: string;  // 'YYYY.MM.DD', 'YYYY-MM-DD' 등
  locale?: 'ko' | 'en' | 'ja' | 'zh';

  // UI
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  placeholder?: string;

  // 팝오버
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

  // 접근성
  id?: string;
  name?: string;
  ariaLabel?: string;
}

// 기간 선택 Props
export interface RangePickerProps extends Omit<CalendarBaseProps, 'value' | 'onChange'> {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  presets?: PresetRange[];
  showPresets?: boolean;
}

// 프리셋 범위
export interface PresetRange {
  label: string;
  getValue: () => DateRange;
}

// 시간 타입
export interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
}
```

### 2. 공통 Hook (useCalendarState.ts)

```typescript
export function useCalendarState(props: CalendarBaseProps) {
  const [internalValue, setInternalValue] = useState<DateValue>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // 제어/비제어 모드 지원
  const isControlled = props.value !== undefined;
  const value = isControlled ? props.value : internalValue;

  // 날짜 선택
  const selectDate = (date: Date) => { ... };

  // 뷰 전환
  const switchToMonthView = () => setViewMode('month');
  const switchToYearView = () => setViewMode('year');
  const switchToDayView = () => setViewMode('day');

  // 네비게이션
  const goToPrevMonth = () => { ... };
  const goToNextMonth = () => { ... };
  const goToPrevYear = () => { ... };
  const goToNextYear = () => { ... };

  return {
    value,
    viewMode,
    viewDate,
    isOpen,
    selectDate,
    switchToMonthView,
    switchToYearView,
    switchToDayView,
    goToPrevMonth,
    goToNextMonth,
    ...
  };
}
```

### 3. 기본 컴포넌트 구조

```tsx
// DatePicker 예시
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const {
    value,
    viewMode,
    viewDate,
    isOpen,
    selectDate,
    switchToMonthView,
    switchToYearView,
    ...
  } = useCalendarState(props);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <CalendarInput ref={ref} value={value} {...props} />
      </Popover.Trigger>

      <Popover.Content>
        <CalendarHeader
          viewDate={viewDate}
          viewMode={viewMode}
          onMonthClick={switchToMonthView}
          onYearClick={switchToYearView}
          onPrev={goToPrevMonth}
          onNext={goToNextMonth}
        />

        {viewMode === 'day' && (
          <CalendarGrid viewDate={viewDate} onSelect={selectDate} />
        )}
        {viewMode === 'month' && (
          <MonthGrid onSelect={handleMonthSelect} />
        )}
        {viewMode === 'year' && (
          <YearGrid onSelect={handleYearSelect} />
        )}
      </Popover.Content>
    </Popover>
  );
});
```

---

## 핵심 요구사항

### 1. 엔터프라이즈 캘린더 컴포넌트 유형

| 컴포넌트 | 용도 | 예시 |
|---------|------|------|
| **DatePicker** | 단일 날짜 선택 | 생년월일, 마감일 |
| **DateRangePicker** | 기간 선택 | 보고서 기간, 예약 기간 |
| **TimePicker** | 시간 선택 | 회의 시간, 알람 설정 |
| **DateTimePicker** | 날짜+시간 | 일정 등록, 로그 시간 |
| **WeekPicker** | 주 선택 | 주간 보고서, 급여 기간 |
| **MonthPicker** | 월 선택 | 월간 보고서, 청구 기간 |
| **YearPicker** | 년 선택 | 연간 보고서, 회계연도 |
| **QuarterPicker** | 분기 선택 | 분기 실적, 분기 보고서 |
| **MultipleDatePicker** | 다중 날짜 | 휴일 설정, 다중 예약 |
| **PeriodPicker** | 기간 설정 (N일/N주/N개월) | 구독 기간, 계약 기간 |
| **FiscalYearPicker** | 회계연도 선택 | 재무제표, 예산 편성 |
| **ScheduleCalendar** | 일정 표시 캘린더 | 예약 현황, 일정 관리 |

### 2. 날짜 형식 (한국식)
- **형식**: `YYYY.MM.DD` 또는 `YYYY-MM-DD`
- **순서**: 년 → 월 → 일 (서양식 MM/DD/YYYY와 다름)
- **예시**: 2025.12.15

### 2. 월/년 선택 UI
- **독립 팝업**으로 구현 (인라인 드롭다운 X)
- 헤더의 월 클릭 → 월 선택 뷰 팝업
- 헤더의 년 클릭 → 년 선택 뷰 팝업
- MUI X DatePicker 방식 참고

**react-datepicker 지원 기능:**
```typescript
// 커스텀 헤더 props
renderCustomHeader: (props) => {
  props.date;          // 현재 날짜
  props.changeMonth(month);  // 월 변경
  props.changeYear(year);    // 년 변경
  props.decreaseMonth();     // 이전 월
  props.increaseMonth();     // 다음 월
}

// 뷰 모드 전환 props
showMonthYearPicker: boolean;  // 월 선택 뷰
showYearPicker: boolean;       // 년 선택 뷰
showFourColumnMonthYearPicker: boolean;  // 4열 월 선택
```

**구현 전략:**
1. 상태로 뷰 모드 관리 (`day` | `month` | `year`)
2. `renderCustomHeader`로 클릭 가능한 월/년 헤더 구현
3. 월 클릭 → `showMonthYearPicker` 활성화
4. 년 클릭 → `showYearPicker` 활성화
5. 선택 완료 시 day 뷰로 복귀

### 3. react-datepicker 기본 구조
```
.react-datepicker (display: inline-block)
├── .react-datepicker__month-container (float: left)
│   ├── .react-datepicker__header
│   │   ├── .react-datepicker__current-month
│   │   ├── .react-datepicker__navigation--previous
│   │   └── .react-datepicker__navigation--next
│   ├── .react-datepicker__day-names
│   └── .react-datepicker__month
│       └── .react-datepicker__week
│           └── .react-datepicker__day (1.7em x 1.7em)
│
└── .react-datepicker__time-container (float: right, 85px)
    └── .react-datepicker__time-list
```

---

## 해결 방안

### 핵심 수정 사항

1. **CSS 완전 재작성** - react-datepicker 구조에 맞는 오버라이드
2. **데모 props 추가** - `showMonthDropdown`, `showYearDropdown` 활성화
3. **Time Picker 레이아웃** - `float` 대신 `flex` 기반 배치

---

## 수정 파일

### 1. `src/components/DatePicker/DatePicker.module.css`

**핵심 수정:**

```css
/* 메인 컨테이너 - flexbox 기반 */
.date-picker :global(.react-datepicker) {
  display: inline-flex;
  flex-direction: row;
  font-family: var(--font-family-sans);
  background: var(--surface-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Time Container - float 제거, flex로 변경 */
.date-picker :global(.react-datepicker__time-container) {
  float: none !important;  /* float: right 제거 */
  border-left: 1px solid var(--border-default);
  width: 100px;
  display: flex;
  flex-direction: column;
}

/* Month Container - float 제거 */
.date-picker :global(.react-datepicker__month-container) {
  float: none !important;
}

/* Month/Year 드롭다운 스타일 */
.date-picker :global(.react-datepicker__month-dropdown),
.date-picker :global(.react-datepicker__year-dropdown) {
  background: var(--surface-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-md);
}

.date-picker :global(.react-datepicker__month-option),
.date-picker :global(.react-datepicker__year-option) {
  padding: 8px 12px;
  cursor: pointer;
}

.date-picker :global(.react-datepicker__month-option:hover),
.date-picker :global(.react-datepicker__year-option:hover) {
  background: var(--surface-secondary);
}

.date-picker :global(.react-datepicker__month-option--selected_month),
.date-picker :global(.react-datepicker__year-option--selected_year) {
  background: var(--primary);
  color: white;
}
```

### 2. `demo/categories/FormDemos.tsx`

**데모 수정:**

```tsx
{/* DatePicker */}
<div className="demo-item">
  <h3>DatePicker</h3>
  <DatePicker
    placeholder="Select date"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
  />
  <DatePicker
    placeholder="With time"
    showTimeSelect
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    dateFormat="yyyy-MM-dd HH:mm"
  />
</div>
```

---

## 구현 순서

### Step 1: CSS 전면 재작성
- react-datepicker 클래스 구조 기반 오버라이드
- flexbox 레이아웃으로 Time Picker 배치 수정
- Month/Year 드롭다운 스타일 추가
- 다크모드 지원

### Step 2: 데모 업데이트
- `showMonthDropdown`, `showYearDropdown` props 추가
- `dropdownMode="select"` 설정

### Step 3: 빌드 및 검증
- 데모 서버 실행하여 UI 확인
- 라이트/다크 모드 테스트
- 모바일 반응형 테스트

### Step 4: 테스트 실행
- 기존 1720개 테스트 통과 확인

---

## react-datepicker CSS 핵심 구조

```
.react-datepicker (메인 컨테이너)
├── .react-datepicker__month-container (캘린더)
│   ├── .react-datepicker__header (헤더)
│   │   ├── .react-datepicker__current-month (월/년 표시)
│   │   ├── .react-datepicker__month-dropdown-container
│   │   └── .react-datepicker__year-dropdown-container
│   ├── .react-datepicker__day-names (요일 헤더)
│   └── .react-datepicker__month (날짜 그리드)
│       └── .react-datepicker__week
│           └── .react-datepicker__day
└── .react-datepicker__time-container (시간 선택)
    ├── .react-datepicker__header--time
    └── .react-datepicker__time-list
        └── .react-datepicker__time-list-item
```

**배치 핵심:**
- 기본: `float: left` (month) + `float: right` (time)
- 수정: `display: flex` + `flex-direction: row`

---

## 예상 결과

- Time Picker가 캘린더 **오른쪽**에 나란히 배치
- 월/년도 **드롭다운** 선택 가능
- 디자인 시스템 토큰 적용된 일관된 스타일
- 다크모드 완벽 지원

---

## 디자인 레퍼런스

### MUI X DatePicker (목표 UI)
- **URL**: https://mui.com/x/react-date-pickers/date-picker/
- **특징**:
  - 클린한 캘린더 그리드
  - 월/년도 헤더 클릭 시 뷰 전환 (Day → Month → Year)
  - Time picker는 캘린더 오른쪽에 세로 배치
  - 깔끔한 그림자와 border-radius
  - 선택된 날짜 파란색 원형 하이라이트
  - 오늘 날짜 테두리로 표시
  - 호버 시 연한 배경색

### 핵심 UI 요소
1. **헤더**: 월/년 표시 + 좌우 화살표 네비게이션
2. **캘린더 그리드**: 7열 (요일), 6행 (주) 형태
3. **Time Picker**: 수직 스크롤 리스트 (30분 간격)
4. **선택 상태**: 파란색 배경 + 흰색 텍스트
5. **오늘 날짜**: 테두리만 표시 (배경 없음)

---

## 참고 자료

### react-datepicker 주요 클래스

| 클래스 | 역할 |
|--------|------|
| `.react-datepicker` | 메인 컨테이너 |
| `.react-datepicker__month-container` | 캘린더 영역 |
| `.react-datepicker__time-container` | 시간 선택 영역 |
| `.react-datepicker__header` | 헤더 (월/년 표시) |
| `.react-datepicker__day` | 날짜 셀 |
| `.react-datepicker__day--selected` | 선택된 날짜 |
| `.react-datepicker__day--today` | 오늘 날짜 |
| `.react-datepicker__month-dropdown` | 월 선택 드롭다운 |
| `.react-datepicker__year-dropdown` | 년도 선택 드롭다운 |

### 베스트 프랙티스 참고

- Ant Design DatePicker
- MUI X DatePicker
- shadcn/ui DatePicker
- React DayPicker
