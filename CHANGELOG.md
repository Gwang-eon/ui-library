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
- **다크 모드 일관성 개선 (89개 컴포넌트)**:
  - `@media (prefers-color-scheme: dark)` → `:global([data-theme="dark"])` 및 `:global(.dark)` 선택자로 마이그레이션
  - 수동 테마 토글 지원을 위한 CSS Module 호환 선택자 적용
  - 직접 색상 토큰을 시맨틱 토큰으로 교체:
    - 포커스 상태: `--focus-ring-color`, `--focus-border-color`
    - 활성 상태: `--active-bg`, `--active-border`, `--selected-bg`, `--accent-color`
    - 상태 색상: `--error-bg/text`, `--success-bg/text`, `--warning-bg/text`, `--info-bg/text`
  - 영향받은 컴포넌트 카테고리:
    - 기본: Button, Checkbox, Radio, Toggle, Input, Select
    - 피드백: Modal, Alert, Progress, Toast, Tooltip, Spin
    - 데이터: Card, Accordion, Tabs, Badge, Table, DataGrid
    - 네비게이션: Drawer, Menu, Pagination, Sidemenu, Navbar, Breadcrumb
    - 폼: Slider, Autocomplete, Textarea, Steps, DatePicker, ColorPicker
    - 디스플레이: Tag, Avatar, Divider, List, EmptyState, Skeleton
    - 고급: TreeSelect, Tree, Transfer, OrderList, CascadeSelect
    - 모바일: Picker, Stepper, VirtualList, SearchBar, MobileNavBar, InfiniteScroll
    - IoT: StatusCard, ActivityCard, DeviceControlPanel, SensorPanel, MetricCard, KpiCard, DeviceListItem, DeviceAnalytics, RealTimeMonitor, MapView, EventDataTable, AutomationRules, EventTimeline, ActivityLog, ConnectionIndicator, StatusBadge, AlarmPanel, DashboardWidget, DeviceList
    - 기타: NotificationCenter, DeviceCard, FileUpload, ImageViewer, Carousel, Tour 등

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
