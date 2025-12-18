# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

## [Unreleased]

### Added
- InfiniteScroll: 무한 스크롤 컴포넌트
- VirtualList: 가상화 리스트 컴포넌트
- SearchBar: 모바일 검색바 컴포넌트
- Picker: iOS/Android 스타일 휠 선택기
- Stepper: 숫자 증감 입력 컴포넌트

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
