import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Modal } from '../../src/components/Modal';
import { Tabs, TabsList, Tab, TabPanel, TabContent } from '../../src/components/Tabs';
import { Badge } from '../../src/components/Badge';

// Import markdown content as raw strings
import testRoadmapMd from '../../docs/TEST_ROADMAP.md?raw';
import planMd from '../../PLAN.md?raw';

interface DocsModalProps {
  open: boolean;
  onClose: () => void;
}

// Version info
const VERSION = '1.2.5';

// Changelog content
const changelogMd = `# Changelog

## v1.2.5 (2026-03-09)

### Added
- **FormField 래퍼 컴포넌트** - 폼 컴포넌트 1열 배치 시 일관된 정렬을 위한 통합 래퍼
  - label/control/helper 영역 분리, size variant (\`sm\`/\`md\`/\`lg\`) 대응
  - vertical/horizontal 레이아웃 지원

### Bug Fixes
- **DataGrid 컬럼 핀 UX 개선**
  - 내부 컬럼(\`_select\`, \`_pin\`, \`_expand\`)에 \`enablePinning: false\` 적용 — 체크박스와 핀 버튼 겹침 해소
  - 핀 해제 시 전체 컬럼 핀 초기화 (Excel 프리즈 해제 방식)
  - 헤더/바디 핀 컬럼 스크롤 동기화 수정 (\`.gridBody\` 별도 스크롤 컨텍스트 제거)
- **DataGrid 내부 스크롤 레이아웃** — 툴바/페이지네이션 고정, 데이터 행만 내부 스크롤
  - \`height\` prop을 \`.dataGrid\` 루트에 적용, \`.tableContainer\`/\`.grid\`/\`.gridBody\` flex 체인 구성
  - \`height\` 미지정 시 \`min-height: 300px\` 기본 적용
  - 브라우저 높이 축소 시에도 페이지네이션이 항상 노출
- **폼 컴포넌트 간격 표준화** — label/input/helper 간격을 4px(\`--spacing-1\`)로 통일
  - atomic \`.input-label\` \`margin-bottom\` 제거 (gap으로 대체)
  - atomic \`.input-group\` \`margin-bottom: 16px\` 제거 (레이아웃 책임 부모로 이관)
  - \`.input-base\`에 \`box-sizing: border-box\` 추가
  - Select trigger padding/height를 Input과 동일하게 통일

---

## v1.2.4 (2026-03-06)

### Added
- **DataGrid i18n 로케일 시스템** - \`locale\` prop으로 40개 이상의 문자열 커스터마이징 가능
  - \`DataGridLocale\` 타입 export, \`Partial<DataGridLocale>\`로 부분 오버라이드 지원
  - 기본값은 영어, 한국어 등 자유롭게 설정 가능

### Bug Fixes
- **드롭다운 뷰포트 플립** - 브라우저 하단에 배치된 드롭다운이 상단으로 자동 전환
  - Select, Autocomplete, CascadeSelect, TreeSelect, ColorPicker, SplitButton, Menu, DataGrid PageSizeSelect
  - 포탈/비포탈 모드 모두 지원
- **DataGrid 버그 수정**
  - 컬럼 드래그 초기화 버그 수정 (\`columnOrder\` 빈 배열 시 fallback)
  - ColumnVisibility에 컬럼 헤더명 표시 (\`column.id\` → \`columnDef.header\`)
  - MultiSelectFilter 체크박스 \`onChange\` 핸들러 연결 수정
  - \`dateToString\`/\`stringToDate\` 유효성 검사 강화
- **DataGrid 접근성 개선**
  - ContextMenu: \`role="menu"\`, 키보드 내비게이션 (Arrow, Home/End, Enter, Escape)
  - EditableCell: \`aria-invalid\`, \`aria-describedby\`, 에러 \`role="alert"\`
  - GridCell/GridRow: \`aria-colindex\`/\`aria-rowindex\` 추가
  - Filter 컴포넌트: \`aria-label\`, \`aria-expanded\`, \`role="listbox"\` 등

### Code Cleanup
- DataGrid 중복 필터 함수 4개, 미사용 import 제거

---

## v1.2.3 (2025-12-22)

### Bug Fixes
- **IoT Dark Mode Fix** - 다크모드 토큰 일관성 수정
  - demo/App.css: \`--palette-gray-*\` → \`--surface-primary\`, \`--border-default\`
  - 17개 IoT 컴포넌트: \`border-color: --text-secondary\` → \`--border-default\` (99개 수정)
  - 11개 alpha 토큰 추가 (\`--color-*-alpha-15/20\`)
  - 13개 IoT 컴포넌트: 하드코딩 rgba → alpha 토큰 (~130개 수정)
  - Border 토큰 스펙 적용: default(600), subtle(700), strong(500)
- **Size prop propagation fix** - 7개 컴포넌트의 size prop이 하위 요소에 올바르게 전파되도록 수정
  - Select: 옵션, 아이콘, 그룹 레이블에 size variant 적용
  - Autocomplete: dropdown 아이템, 카테고리 헤더에 size variant 적용
  - Menu: \`MenuSize\` 타입 추가, 전체 size 지원
  - SplitButton: 동적 chevron 아이콘, 메뉴 아이템 CSS 강화
  - CascadeSelect: \`CascadeSelectSize\` 타입 추가
  - TreeSelect: \`TreeSelectSize\` 타입 추가, 전체 size 지원
  - ColorPicker: 'lg' size 추가, 전체 size variants

### Technical
- CSS 상속 패턴 사용 (Ant Design, Material UI 스타일)
- 동적 아이콘 크기 매핑 (sm:12-14px, md:16-18px, lg:20-22px)

---

## v1.2.2 (2025-12-18)

### Bug Fixes
- Fixed **31 CSS token variable mismatches** across 39 components
  - \`--transition-normal\` → \`--duration-base\`
  - \`--spacing-xs/sm/md/lg/xl\` → \`--spacing-1/2/4/6/8\`
  - \`--font-size-base\` → \`--font-size-body\`
  - \`--border-color\` → \`--border-default\`
  - And more...
- Fixed Autocomplete test CSS module class matching
- Fixed tsconfig.json to exclude test folder from build

### Added
- vitest test environment setup (jsdom, setup.ts)

---

## v1.2.1 (2025-12-18)

### Bug Fixes
- Fixed Calendar popover z-index token (\`--z-index-popover\` → \`--z-popover\`)

---

## v1.2.0 (2025-12-18)

### Breaking Changes
- **Removed** \`LegacyDatePicker\` and \`LegacyDateRangePicker\` exports
- **Removed** \`react-datepicker\` dependency completely

### Changed
- DatePicker now uses pure Calendar component implementation
- No external date picker library required

### Migration
\`\`\`tsx
// Before
import { LegacyDatePicker } from '@gractor/ui';

// After
import { DatePicker } from '@gractor/ui';
\`\`\`

---

## v1.1.0 (2025-12-17)

### Added
- Docs button in demo app header
- Documentation modal updates

---

## v1.0.0 (2025-12-14)

### Initial Release
- **69+ UI components** with TypeScript support
- Design tokens system
- Dark mode support
- CSS Modules based styling
- IoT-specific components
- Mobile components
`;

// Quick stats
const stats = {
  components: 50,
  tests: 1720,
  coverage: '96%',
  version: VERSION,
};

export const DocsModal = ({ open, onClose }: DocsModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Documentation"
      size="lg"
      closeOnOutsideClick
    >
      <div style={{ minHeight: '500px' }}>
        <Tabs defaultValue="overview">
          <TabsList>
            <Tab value="overview">Overview</Tab>
            <Tab value="changelog">Changelog</Tab>
            <Tab value="tests">
              Tests <Badge variant="primary" size="sm" style={{ marginLeft: '6px' }}>{stats.tests}</Badge>
            </Tab>
            <Tab value="roadmap">Roadmap</Tab>
          </TabsList>

          <TabContent>
            <TabPanel value="overview">
              <div className="docs-overview">
                <h2 style={{ marginTop: '16px' }}>@gractor/ui</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  IoT Platform UI Component Library
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <StatCard label="Version" value={stats.version} />
                  <StatCard label="Components" value={stats.components} />
                  <StatCard label="Tests" value={stats.tests} />
                  <StatCard label="Coverage" value={stats.coverage} />
                </div>

                <h3>Recent Updates</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <UpdateItem
                    date="2026-03-09"
                    title="DataGrid 내부 스크롤 레이아웃"
                    description="툴바/페이지네이션 항상 고정, 데이터 행만 내부 스크롤, min-height 300px 기본 적용"
                  />
                  <UpdateItem
                    date="2026-03-09"
                    title="DataGrid 컬럼 핀 UX 개선"
                    description="체크박스/핀 버튼 겹침 해소, 핀 해제 시 전체 초기화, 헤더/바디 스크롤 동기화 수정"
                  />
                  <UpdateItem
                    date="2026-03-09"
                    title="폼 컴포넌트 정렬 표준화 + FormField"
                    description="label/input/helper 간격 4px 통일, Select padding 표준화, FormField 래퍼 컴포넌트 추가"
                  />
                  <UpdateItem
                    date="2026-03-06"
                    title="드롭다운 뷰포트 플립"
                    description="Select, Autocomplete, CascadeSelect, TreeSelect, ColorPicker, SplitButton, Menu, PageSizeSelect 하단 공간 부족 시 상단 렌더링"
                  />
                  <UpdateItem
                    date="2026-03-06"
                    title="DataGrid i18n 로케일 시스템"
                    description="locale prop으로 40+ 문자열 커스터마이징 (DataGridLocale 타입, Partial 오버라이드)"
                  />
                  <UpdateItem
                    date="2026-03-06"
                    title="DataGrid 접근성 및 버그 수정"
                    description="ContextMenu 키보드 내비게이션, ARIA 속성 강화, 컬럼 드래그/필터/유틸 버그 수정"
                  />
                  <UpdateItem
                    date="2025-12-22"
                    title="IoT Dark Mode Fix"
                    description="border-color 99개 + alpha 토큰 130개 수정, 11개 신규 토큰 추가"
                  />
                  <UpdateItem
                    date="2025-12-22"
                    title="Size Prop Propagation Fix"
                    description="Fixed size prop propagation for Select, Autocomplete, Menu, SplitButton, CascadeSelect, TreeSelect, ColorPicker"
                  />
                  <UpdateItem
                    date="2025-12-15"
                    title="DatePicker Enhancement"
                    description="Added 96 tests for DatePicker, DateRangePicker, PresetRanges components"
                  />
                  <UpdateItem
                    date="2025-12-15"
                    title="Phase 3 Advanced Tests"
                    description="Added 294 tests for ColorPicker, FileUpload, Autocomplete, CascadeSelect, DataGrid, Tree, TreeSelect"
                  />
                  <UpdateItem
                    date="2025-12-15"
                    title="Phase 2-5 Misc Tests"
                    description="Added 234 tests for Accordion, Avatar, Carousel, Divider, EmptyState, Skeleton, Spin, Result"
                  />
                </div>
              </div>
            </TabPanel>

            <TabPanel value="changelog">
              <div className="docs-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{changelogMd}</ReactMarkdown>
              </div>
            </TabPanel>

            <TabPanel value="tests">
              <div className="docs-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{testRoadmapMd}</ReactMarkdown>
              </div>
            </TabPanel>

            <TabPanel value="roadmap">
              <div className="docs-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{planMd}</ReactMarkdown>
              </div>
            </TabPanel>
          </TabContent>
        </Tabs>
      </div>

      <style>{`
        .docs-overview h3 {
          margin: 24px 0 12px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .docs-markdown {
          max-height: 450px;
          overflow-y: auto;
          padding-right: 8px;
          margin-top: 16px;
        }
        .docs-markdown h1 {
          font-size: 24px;
          margin-top: 0;
        }
        .docs-markdown h2 {
          font-size: 18px;
          margin-top: 24px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-default);
        }
        .docs-markdown h3 {
          font-size: 15px;
          margin-top: 16px;
        }
        .docs-markdown h4 {
          font-size: 14px;
          margin-top: 12px;
        }
        .docs-markdown table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 13px;
        }
        .docs-markdown th,
        .docs-markdown td {
          padding: 8px 12px;
          text-align: left;
          border: 1px solid var(--border-default);
        }
        .docs-markdown th {
          background: var(--bg-secondary);
          font-weight: 600;
        }
        .docs-markdown code {
          background: var(--bg-secondary);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
        }
        .docs-markdown pre {
          background: var(--bg-secondary);
          padding: 12px;
          border-radius: 8px;
          overflow-x: auto;
        }
        .docs-markdown pre code {
          background: none;
          padding: 0;
        }
        .docs-markdown ul, .docs-markdown ol {
          padding-left: 24px;
        }
        .docs-markdown li {
          margin: 4px 0;
        }
        .docs-markdown hr {
          border: none;
          border-top: 1px solid var(--border-default);
          margin: 24px 0;
        }
        .docs-markdown a {
          color: var(--primary);
        }
        .docs-markdown strong {
          font-weight: 600;
        }
      `}</style>
    </Modal>
  );
};

// Stat Card Component
const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div style={{
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
  }}>
    <div style={{
      fontSize: '24px',
      fontWeight: 700,
      color: 'var(--primary)',
      marginBottom: '4px'
    }}>
      {value}
    </div>
    <div style={{
      fontSize: '12px',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      {label}
    </div>
  </div>
);

// Update Item Component
const UpdateItem = ({ date, title, description }: {
  date: string;
  title: string;
  description: string;
}) => (
  <div style={{
    display: 'flex',
    gap: '12px',
    padding: '12px',
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
  }}>
    <div style={{
      fontSize: '12px',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }}>
      {date}
    </div>
    <div>
      <div style={{ fontWeight: 600, marginBottom: '2px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{description}</div>
    </div>
  </div>
);
