import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Modal } from '../../src/components/Modal';
import { Tabs, TabsList, Tab, TabPanel, TabContent } from '../../src/components/Tabs';
import { Badge } from '../../src/components/Badge';

// Import markdown content as raw strings
import testRoadmapMd from '../../docs/TEST_ROADMAP.md?raw';

interface DocsModalProps {
  open: boolean;
  onClose: () => void;
}

// Version info
const VERSION = '1.2.3';

// Changelog content
const changelogMd = `# Changelog

## v1.2.3 (2025-12-22)

### Bug Fixes
- **IoT Dark Mode Fix** - 다크모드 토큰 일관성 수정
  - demo/App.css: \`--palette-gray-*\` → \`--surface-primary\`, \`--border-default\`
  - 17개 IoT 컴포넌트: \`border-color: --text-secondary\` → \`--border-default\` (99개 수정)
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
                    date="2025-12-22"
                    title="IoT Dark Mode Fix"
                    description="17개 IoT 컴포넌트 border-color 토큰 수정 (99개), demo/App.css semantic tokens 적용"
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
