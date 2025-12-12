# TanStack Table v8 - 전체 기능 목록

> TanStack Table은 **Headless UI** 라이브러리로, 마크업/스타일 없이 테이블 로직만 제공합니다.
> 라이선스: **MIT** (완전 무료)
> 지원 프레임워크: React, Vue, Solid, Svelte, Qwik, Angular, Lit, Vanilla JS

---

## 1. 정렬 (Sorting)

### 기능
| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 단일 컬럼 정렬 | 한 컬럼 기준 오름차순/내림차순 정렬 | ✅ |
| 멀티 컬럼 정렬 | 여러 컬럼으로 동시 정렬 (Shift+클릭) | ✅ |
| 정렬 방향 커스텀 | `sortDescFirst`로 기본 방향 설정 | ⬜ |
| 정렬 반전 | `invertSorting` - 낮은 값이 좋은 경우 (순위 등) | ⬜ |
| undefined 값 처리 | `sortUndefined` - 'first', 'last', -1, 1, false | ⬜ |
| 정렬 제거 기능 | 3단계 토글: none → desc → asc → none | ✅ |
| 최대 정렬 컬럼 수 | `maxMultiSortColCount`로 제한 | ⬜ |
| 서버 사이드 정렬 | `manualSorting: true` | ⬜ |

### 내장 정렬 함수
| 함수 | 설명 |
|------|------|
| `alphanumeric` | 대소문자 무시, 숫자/문자 혼합 정렬 |
| `alphanumericCaseSensitive` | 대소문자 구분 |
| `text` | 텍스트 정렬 (대소문자 무시) |
| `textCaseSensitive` | 텍스트 정렬 (대소문자 구분) |
| `datetime` | 날짜/시간 정렬 |
| `basic` | 기본 비교 연산자 사용 |

### API
```typescript
// Table Options
enableSorting: boolean
enableMultiSort: boolean
sortDescFirst: boolean
invertSorting: boolean
enableSortingRemoval: boolean
maxMultiSortColCount: number
isMultiSortEvent: (e: Event) => boolean
manualSorting: boolean
sortingFns: Record<string, SortingFn>

// Column Options
enableSorting: boolean
sortingFn: SortingFn | string
sortDescFirst: boolean
invertSorting: boolean
sortUndefined: 'first' | 'last' | -1 | 1 | false

// Column APIs
column.getCanSort()
column.getIsSorted() // false | 'asc' | 'desc'
column.toggleSorting(desc?, multi?)
column.clearSorting()
column.getSortIndex()
column.getNextSortingOrder()
column.getToggleSortingHandler()
```

---

## 2. 필터링 (Filtering)

### 2.1 컬럼 필터링

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 텍스트 필터 | 문자열 포함/일치 검색 | ✅ |
| 숫자 범위 필터 | Min/Max 범위 필터 | ✅ |
| 선택형 필터 | Select/Multi-select 필터 | ⬜ |
| 날짜 범위 필터 | DatePicker 범위 필터 | ⬜ |
| 커스텀 필터 UI | 컬럼별 필터 컴포넌트 지정 | ⬜ |
| 서버 사이드 필터 | `manualFiltering: true` | ⬜ |
| 하위 행 필터링 | `filterFromLeafRows` - 자식→부모 방향 필터 | ⬜ |

### 내장 필터 함수 (10개)
| 함수 | 설명 |
|------|------|
| `includesString` | 문자열 포함 (대소문자 무시) |
| `includesStringSensitive` | 문자열 포함 (대소문자 구분) |
| `equalsString` | 문자열 일치 (대소문자 무시) |
| `equalsStringSensitive` | 문자열 일치 (대소문자 구분) |
| `arrIncludes` | 배열에 값 포함 |
| `arrIncludesAll` | 배열에 모든 값 포함 |
| `arrIncludesSome` | 배열에 일부 값 포함 |
| `equals` | `===` 동등 비교 |
| `weakEquals` | `==` 느슨한 비교 |
| `inNumberRange` | 숫자 범위 내 |

### 2.2 전역 필터링 (Global Filter)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 전체 검색 | 모든 컬럼에서 검색 | ✅ |
| 컬럼별 제외 | `enableGlobalFilter: false`로 특정 컬럼 제외 | ⬜ |
| 커스텀 검색 함수 | `globalFilterFn` 지정 | ⬜ |

### 2.3 퍼지 필터링 (Fuzzy Filter)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 유사 매칭 | 오타/부분 일치 허용 검색 | ⬜ |
| 랭킹 정렬 | 매칭 품질순 결과 정렬 | ⬜ |

> **의존성:** `@tanstack/match-sorter-utils` 필요

### API
```typescript
// Table Options
enableFilters: boolean
enableColumnFilters: boolean
enableGlobalFilter: boolean
manualFiltering: boolean
filterFromLeafRows: boolean
maxLeafRowFilterDepth: number
filterFns: Record<string, FilterFn>
globalFilterFn: FilterFn | string

// Column Options
enableColumnFilter: boolean
enableGlobalFilter: boolean
filterFn: FilterFn | string

// Column APIs
column.getCanFilter()
column.getIsFiltered()
column.getFilterValue()
column.setFilterValue(value)
column.getFilterIndex()

// Table APIs
table.setColumnFilters(filters)
table.resetColumnFilters()
table.setGlobalFilter(value)
table.resetGlobalFilter()
```

---

## 3. 페이지네이션 (Pagination)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 클라이언트 페이지네이션 | 내장 페이지 분할 | ✅ |
| 페이지 사이즈 변경 | 10, 20, 50, 100 등 선택 | ✅ |
| 페이지 점프 | 특정 페이지로 이동 | ✅ |
| 서버 사이드 페이지네이션 | `manualPagination: true` | ⬜ |
| 무한 스크롤 | 스크롤 시 데이터 추가 로드 | ⬜ |
| 자동 리셋 비활성화 | `autoResetPageIndex: false` | ⬜ |

### API
```typescript
// Table Options
enablePagination: boolean
manualPagination: boolean
pageCount: number
rowCount: number
autoResetPageIndex: boolean

// Pagination State
pageIndex: number // 0-based
pageSize: number

// Table APIs
table.setPageIndex(index)
table.setPageSize(size)
table.resetPagination()
table.firstPage()
table.lastPage()
table.previousPage()
table.nextPage()
table.getCanPreviousPage()
table.getCanNextPage()
table.getPageCount()
table.getRowCount()
```

---

## 4. 행 선택 (Row Selection)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 체크박스 선택 | 행별 체크박스 | ✅ |
| 전체 선택 | Header 체크박스로 전체 선택 | ✅ |
| 다중 선택 | 여러 행 동시 선택 | ✅ |
| 단일 선택 | Radio 스타일 단일 선택 | ⬜ |
| 하위 행 선택 | 부모 선택 시 자식도 선택 | ⬜ |
| 조건부 선택 | 특정 행만 선택 가능 | ⬜ |
| 페이지별 전체 선택 | 현재 페이지만 전체 선택 | ⬜ |

### API
```typescript
// Table Options
enableRowSelection: boolean | ((row) => boolean)
enableMultiRowSelection: boolean | ((row) => boolean)
enableSubRowSelection: boolean | ((row) => boolean)

// Row APIs
row.getIsSelected()
row.getCanSelect()
row.getCanMultiSelect()
row.toggleSelected(value?)
row.getToggleSelectedHandler()

// Table APIs
table.getSelectedRowModel()
table.getFilteredSelectedRowModel()
table.getIsAllRowsSelected()
table.getIsSomeRowsSelected()
table.toggleAllRowsSelected(value?)
table.getToggleAllRowsSelectedHandler()
table.toggleAllPageRowsSelected(value?)
table.getToggleAllPageRowsSelectedHandler()
```

---

## 5. 행 확장 (Row Expanding)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 상세 패널 | 행 클릭 시 상세 정보 표시 | ✅ |
| 계층 구조 | `getSubRows`로 자식 행 표시 | ⬜ |
| 전체 확장/축소 | 모든 행 한번에 토글 | ⬜ |
| 초기 확장 상태 | `initialState.expanded` | ⬜ |
| 확장 행 페이지네이션 | `paginateExpandedRows: false` | ⬜ |

### API
```typescript
// Table Options
enableExpanding: boolean
getRowCanExpand: (row) => boolean
getSubRows: (row) => Row[]
paginateExpandedRows: boolean
manualExpanding: boolean

// Expanded State
expanded: ExpandedState // true | Record<string, boolean>

// Row APIs
row.getCanExpand()
row.getIsExpanded()
row.toggleExpanded(value?)
row.getToggleExpandedHandler()

// Table APIs
table.getExpandedRowModel()
table.toggleAllRowsExpanded(value?)
table.getIsAllRowsExpanded()
table.getIsSomeRowsExpanded()
```

---

## 6. 그룹핑 & 집계 (Grouping & Aggregation)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 컬럼별 그룹핑 | 특정 컬럼 값으로 행 그룹화 | ✅ |
| 다중 그룹핑 | 여러 컬럼으로 중첩 그룹 | ⬜ |
| 집계 함수 | 그룹별 합계/평균/개수 등 | ✅ |
| 그룹 헤더 커스텀 | `aggregatedCell` 렌더러 | ✅ |
| 그룹 컬럼 모드 | `reorder`, `remove`, false | ⬜ |
| 서버 사이드 그룹핑 | `manualGrouping: true` | ⬜ |

### 내장 집계 함수 (9개)
| 함수 | 설명 |
|------|------|
| `sum` | 합계 |
| `count` | 개수 |
| `min` | 최소값 |
| `max` | 최대값 |
| `extent` | 범위 [min, max] |
| `mean` | 평균 |
| `median` | 중앙값 |
| `unique` | 고유값 배열 |
| `uniqueCount` | 고유값 개수 |

### API
```typescript
// Table Options
enableGrouping: boolean
manualGrouping: boolean
groupedColumnMode: 'reorder' | 'remove' | false
aggregationFns: Record<string, AggregationFn>

// Column Options
enableGrouping: boolean
aggregationFn: AggregationFn | string
aggregatedCell: (info) => ReactNode

// Column APIs
column.getCanGroup()
column.getIsGrouped()
column.getGroupedIndex()
column.toggleGrouping()
column.getToggleGroupingHandler()

// Cell APIs
cell.getIsGrouped()
cell.getIsAggregated()
cell.getIsPlaceholder()
```

---

## 7. 컬럼 기능 (Column Features)

### 7.1 컬럼 크기 조절 (Column Sizing)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 드래그 리사이즈 | 컬럼 경계 드래그로 너비 조절 | ✅ |
| 최소/최대 너비 | `minSize`, `maxSize` 제한 | ⬜ |
| 리사이즈 모드 | `onChange` (실시간) / `onEnd` (완료 시) | ⬜ |
| RTL 지원 | `columnResizeDirection: 'rtl'` | ⬜ |

**기본값:**
- `size`: 150px
- `minSize`: 20px
- `maxSize`: Number.MAX_SAFE_INTEGER

### 7.2 컬럼 고정 (Column Pinning)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 왼쪽 고정 | 컬럼을 왼쪽에 고정 | ✅ |
| 오른쪽 고정 | 컬럼을 오른쪽에 고정 | ✅ |
| Sticky CSS | CSS position: sticky 사용 | ✅ |
| 분리 테이블 | Left/Center/Right 테이블 분리 | ⬜ |

### 7.3 컬럼 순서 (Column Ordering)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 드래그 앤 드롭 | 컬럼 헤더 드래그로 순서 변경 | ⬜ |
| 프로그래밍 순서 변경 | `setColumnOrder()` API | ⬜ |

> **권장 라이브러리:** `@dnd-kit/core` (React), Native Browser Events

### 7.4 컬럼 표시/숨김 (Column Visibility)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 컬럼 토글 | 개별 컬럼 표시/숨김 | ✅ |
| 전체 토글 | 모든 컬럼 표시/숨김 | ✅ |
| 초기 숨김 상태 | `initialState.columnVisibility` | ⬜ |

### API
```typescript
// Column Sizing
enableColumnResizing: boolean
columnResizeMode: 'onChange' | 'onEnd'
columnResizeDirection: 'ltr' | 'rtl'

// Column Pinning
enableColumnPinning: boolean
column.pin(position) // 'left' | 'right' | false
column.getIsPinned()
column.getStart()
column.getAfter()

// Column Ordering
columnOrder: string[]
setColumnOrder(order)

// Column Visibility
columnVisibility: Record<string, boolean>
column.getIsVisible()
column.toggleVisibility()
table.getIsAllColumnsVisible()
table.toggleAllColumnsVisible()
```

---

## 8. 행 고정 (Row Pinning)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 상단 고정 | 특정 행을 상단에 고정 | ⬜ |
| 하단 고정 | 특정 행을 하단에 고정 | ⬜ |
| 중앙(미고정) 행 | 일반 스크롤 영역 | - |

### API
```typescript
// Row APIs
row.pin(position) // 'top' | 'bottom' | false
row.getIsPinned()

// Table APIs
table.getTopRows()
table.getCenterRows()
table.getBottomRows()
```

---

## 9. Faceting (패싯팅)

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 컬럼 패싯 | 컬럼별 고유값/개수 계산 | ⬜ |
| 글로벌 패싯 | 전체 데이터 패싯 | ⬜ |
| 필터 UI 연동 | Select 옵션 자동 생성 | ⬜ |

### API
```typescript
// Row Models
getFacetedRowModel()
getFacetedUniqueValues()
getFacetedMinMaxValues()

// Column APIs
column.getFacetedUniqueValues() // Map<any, number>
column.getFacetedMinMaxValues() // [min, max]
```

---

## 10. 가상화 (Virtualization)

> **별도 패키지:** `@tanstack/react-virtual`

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 행 가상화 | 가시 영역만 렌더링 | ✅ |
| 컬럼 가상화 | 수평 가상화 | ⬜ |
| 그리드 가상화 | 행+컬럼 동시 가상화 | ⬜ |
| 고정 높이 | 모든 행 동일 높이 | ✅ |
| 가변 높이 | 행별 다른 높이 | ⬜ |
| 무한 스크롤 | 스크롤 시 데이터 로드 | ⬜ |
| Sticky 항목 | 스크롤 중 고정 항목 | ⬜ |
| 윈도우 스크롤 | document 기준 스크롤 | ⬜ |

### API
```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

const virtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => containerRef.current,
  estimateSize: () => 40, // row height
  overscan: 10, // 버퍼 행 수
})

const virtualRows = virtualizer.getVirtualItems()
const totalSize = virtualizer.getTotalSize()
```

---

## 11. 셀 편집 (Cell Editing)

> **TanStack Table 기본 미제공** - 직접 구현 필요

| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| 더블클릭 편집 | 셀 더블클릭으로 편집 모드 | ✅ |
| Enter/Escape | 저장/취소 키 핸들링 | ✅ |
| 외부 클릭 저장 | blur 시 자동 저장 | ✅ |
| 편집 가능 컬럼 지정 | `editable: true` | ✅ |
| 유효성 검증 | 입력 값 검증 | ⬜ |
| 커스텀 에디터 | DatePicker, Select 등 | ⬜ |

---

## 12. 추가 기능 (미구현)

### 키보드 네비게이션
| 기능 | 설명 |
|------|------|
| Arrow Keys | 셀 간 이동 |
| Tab | 다음 셀로 이동 |
| Enter | 편집 모드 진입 |
| Escape | 편집 취소 |
| Ctrl+C/V | 복사/붙여넣기 |

### 드래그 앤 드롭
| 기능 | 설명 |
|------|------|
| 행 드래그 | 행 순서 변경 |
| 컬럼 드래그 | 컬럼 순서 변경 |

### Context Menu
| 기능 | 설명 |
|------|------|
| 우클릭 메뉴 | 복사, 삭제, 필터 등 |
| 셀 컨텍스트 | 셀별 다른 메뉴 |
| 행 컨텍스트 | 행별 액션 |

### 클립보드
| 기능 | 설명 |
|------|------|
| 셀 복사 | 단일 셀 복사 |
| 범위 복사 | 선택 영역 복사 |
| Excel 붙여넣기 | 스프레드시트에서 붙여넣기 |

### Export
| 기능 | 설명 | 구현 상태 |
|------|------|:---------:|
| CSV Export | CSV 파일 다운로드 | ✅ |
| Excel Export | XLSX 파일 다운로드 | ⬜ |
| PDF Export | PDF 파일 다운로드 | ⬜ |
| 클립보드 복사 | 테이블 전체 복사 | ⬜ |

---

## 구현 현황 요약

### 구현 완료 ✅
- 정렬 (단일/멀티)
- 컬럼 필터링 (텍스트, 숫자 범위)
- 전역 검색
- 페이지네이션
- 행 선택 (체크박스, 다중)
- 행 확장 (상세 패널)
- 그룹핑 & 집계
- 컬럼 크기 조절
- 컬럼 고정 (Left/Right)
- 컬럼 표시/숨김
- 행 가상화
- 셀 편집 (기본)
- CSV Export

### 미구현 ⬜
- 퍼지 필터링
- 날짜 범위 필터
- 선택형 필터 (Select)
- 단일 행 선택 (Radio)
- 하위 행 선택
- 행 고정 (Top/Bottom)
- 컬럼 드래그 순서 변경
- 컬럼/그리드 가상화
- 키보드 네비게이션
- 행 드래그 앤 드롭
- Context Menu
- 클립보드 (Copy/Paste)
- Excel/PDF Export
- 서버 사이드 (정렬/필터/페이지네이션)

---

## 참고 자료

- [TanStack Table 공식 문서](https://tanstack.com/table/v8/docs/overview)
- [Features Guide](https://tanstack.com/table/v8/docs/guide/features)
- [API Reference](https://tanstack.com/table/v8/docs/api/core/table)
- [TanStack Virtual](https://tanstack.com/virtual/latest/docs/introduction)
- [GitHub Repository](https://github.com/TanStack/table)
