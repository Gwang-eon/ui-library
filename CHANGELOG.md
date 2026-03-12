# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

## [1.2.8] - 2026-03-12

### Fixed
- **DataGrid 컬럼 핀(틀고정) 전면 재구현** (TanStack Table 공식 패턴 적용):
  - `position: sticky` + `column.getStart('left')` / `column.getAfter('right')` 오프셋 계산
  - 핀된 컬럼은 `flex: 0 0 Xpx` 고정 — `fillRemainingSpace` 모드 무관하게 너비 유지
  - 핀 변경 시 DOM에서 실제 렌더링 너비를 캡처하여 `columnSizing` 동기화 (너비 축소 방지)
  - `contain: layout/paint` → `contain: style`로 변경 (sticky 호환)
  - `.gridBody` overflow 제거 — `.tableContainer`가 유일한 스크롤 컨테이너
  - 특수 컬럼(`_select`, `_pin`, `_expand`) 자동 핀 처리
- **ColumnVisibility 체크박스 미반영 버그**: `memo`가 `table` 참조 동일로 re-render 차단 → `columnVisibility` 상태를 별도 prop으로 전달하여 해결
- **Filter 자동감지 개선**: 첫 행만 체크 → 최대 5행까지 non-null 값 탐색 (sparse 데이터 대응)
- **SingleSelectFilter `setTimeout(0)` 제거**: StrictMode 해킹을 `useMemo` + `try/catch`로 교체
- **SingleSelectFilter "All" 하드코딩**: locale `filterAll` 키 사용으로 i18n 대응
- **DragOverlay 콘텐츠 프리뷰**: Row 드래그 시 첫 3개 셀 값 표시, Column 드래그 시 헤더명 표시
- **`src/components/index.ts` DataGrid export 누락** 수정
- **right 핀 컬럼 오프셋**: `getStart('right')` → `getAfter('right')` 올바른 API 사용

## [1.2.5] - 2026-03-09

### Added
- **FormField 래퍼 컴포넌트**: 폼 컴포넌트 1열 배치 시 일관된 정렬을 위한 통합 래퍼
  - label/control/helper 영역 분리, size variant (`sm`/`md`/`lg`) 대응
  - vertical/horizontal 레이아웃 지원

### Fixed
- **DataGrid 컬럼 핀 UX 개선**:
  - 내부 컬럼(`_select`, `_pin`, `_expand`)에 `enablePinning: false` 적용 — 체크박스와 핀 버튼 겹침 해소
  - 핀 해제 시 전체 컬럼 핀 초기화 (Excel 프리즈 해제 방식)
  - 헤더/바디 핀 컬럼 스크롤 동기화 수정 (`.gridBody` 별도 스크롤 컨텍스트 제거)
- **DataGrid 내부 스크롤 레이아웃**: 툴바/페이지네이션 고정, 데이터 행만 내부 스크롤
  - `height` prop을 `.dataGrid` 루트에 적용, flex 체인으로 `.gridBody`만 스크롤
  - `height` 미지정 시 `min-height: 480px` 기본 적용
  - 브라우저 높이 축소 시에도 페이지네이션이 항상 노출
- **폼 컴포넌트 간격 표준화**: label/input/helper 간격을 4px(`--spacing-1`)로 통일
  - atomic `.input-label` `margin-bottom` 제거 (gap으로 대체)
  - atomic `.input-group` `margin-bottom: 16px` 제거 (레이아웃 책임 부모로 이관)
  - `.input-base`에 `box-sizing: border-box` 추가
  - Select trigger padding/height를 Input과 동일하게 통일

## [Unreleased]

### Added
- InfiniteScroll: 무한 스크롤 컴포넌트
- VirtualList: 가상화 리스트 컴포넌트
- SearchBar: 모바일 검색바 컴포넌트
- Picker: iOS/Android 스타일 휠 선택기
- Stepper: 숫자 증감 입력 컴포넌트
- **DataGrid**: i18n 로케일 시스템 추가 (`locale` prop, `DataGridLocale` 타입)
  - 40개 이상의 문자열을 `Partial<DataGridLocale>`로 커스터마이징 가능
  - 기본값은 영어, 부분 오버라이드 지원
- **DataGrid**: `DataGridLocale` 타입 export 추가

### Changed
- Toggle: size prop 네이밍 통일 (`sm`/`md`/`lg`)
- Select: size prop 추가

### Fixed
- Popconfirm: Button 컴포넌트 사용으로 일관성 개선
- Transfer: Button 컴포넌트 사용으로 일관성 개선
- SplitButton: Button 컴포넌트 사용으로 일관성 개선
- Tour: Button import 경로 수정
- Radio: 접근성 속성 추가 (aria-describedby)
- Checkbox: 접근성 속성 추가 (aria-describedby)
- **드롭다운 뷰포트 플립**: 브라우저 하단에 배치된 드롭다운이 상단으로 자동 전환 (포탈/비포탈 모드 모두 지원)
  - Select, Autocomplete, CascadeSelect, TreeSelect, ColorPicker, SplitButton, Menu, DataGrid PageSizeSelect
- **DataGrid**: 불필요한 코드 정리 (중복 필터 함수 4개, 미사용 import 제거)
- **DataGrid**: 컬럼 드래그 초기화 버그 수정 (`columnOrder` 빈 배열 시 fallback 처리)
- **DataGrid**: ColumnVisibility에 컬럼 헤더명 표시 (`column.id` → `columnDef.header`)
- **DataGrid**: MultiSelectFilter 체크박스 `onChange` 핸들러 연결 수정
- **DataGrid**: MultiSelectFilter 드롭다운 뷰포트 플립 로직 추가
- **DataGrid**: utils `dateToString`/`stringToDate` 유효성 검사 강화
- **DataGrid 접근성 개선**:
  - ContextMenu: `role="menu"`, `role="menuitem"`, 키보드 내비게이션 (Arrow, Home, End, Enter, Escape)
  - EditableCell: `aria-invalid`, `aria-describedby`, `role="alert"` 에러 메시지
  - GridCell: `aria-colindex` 추가
  - GridRow: `aria-rowindex` 추가
  - TextFilter/NumberRangeFilter: `aria-label` 컬럼명 연동
  - MultiSelectFilter: `aria-expanded`, `role="listbox"`, `role="option"`, `aria-selected`

## [1.2.2] - 2025-12-18

### Fixed
- 31개 CSS 토큰 변수 불일치 수정 (39개 컴포넌트)
  - `--transition-normal` → `--duration-base`
  - `--transition-fast` → `--duration-fast`
  - `--spacing-xs/sm/md/lg/xl` → `--spacing-1/2/4/6/8`
  - `--font-size-base` → `--font-size-body`
  - `--border-color` → `--border-default`
  - `--error-400/500` → `--color-error-400/500`
  - `--color-black` → `--palette-black`
  - 기타 다수 토큰 변수
- Autocomplete 테스트 CSS 모듈 클래스명 매칭 수정
- tsconfig.json에서 test 폴더 빌드 제외

### Added
- vitest 테스트 환경 설정 (jsdom, setup.ts)

## [1.2.1] - 2025-12-18

### Fixed
- Calendar popover z-index 토큰 변수 수정 (`--z-index-popover` → `--z-popover`)

## [1.2.0] - 2025-12-18

### Removed
- **BREAKING**: `LegacyDatePicker`, `LegacyDateRangePicker` export 제거
- **BREAKING**: `react-datepicker` 의존성 완전 제거 (peerDependencies, devDependencies)

### Changed
- DatePicker는 이제 순수 구현된 Calendar 컴포넌트만 사용
- vite.config.ts에서 react-datepicker external 설정 제거

### Migration
기존 `LegacyDatePicker` 사용자는 새로운 `DatePicker`로 마이그레이션 필요:
```tsx
// 이전
import { LegacyDatePicker } from '@gractor/ui';

// 이후
import { DatePicker } from '@gractor/ui';
```

## [1.1.0] - 2025-12-XX

### Added
- Docs 버튼 추가 (데모 앱 헤더)
- 문서화 모달 업데이트

## [1.0.0] - 2025-01-XX

### Added
- 초기 릴리스
- 69개 이상의 UI 컴포넌트
- 디자인 토큰 시스템
- 다크 모드 지원
- TypeScript 완벽 지원
- CSS Modules 기반 스타일링

---

변경 사항 형식:
- `Added`: 새로운 기능
- `Changed`: 기존 기능의 변경
- `Deprecated`: 곧 제거될 기능
- `Removed`: 제거된 기능
- `Fixed`: 버그 수정
- `Security`: 보안 관련 수정
