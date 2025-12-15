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
const VERSION = '1.1.0';

// Changelog content
const changelogMd = `# Changelog

## v1.1.0 (2025-12-15)

### Test Suite Expansion
- Added **351 new tests** for Phase 2 components
- Total test count: **773 tests** across **23 components**
- Coverage maintained at **96%+ statements**

### New Test Coverage
- **Form Components**: Textarea (50), Slider (54), Rating (57)
- **Navigation Components**: Menu (36), Breadcrumb (30), Steps (38), Navbar (41), Sidemenu (45)

### Improvements
- Updated TEST_ROADMAP.md with current progress
- Improved component documentation

---

## v1.0.0 (2025-12-14)

### Initial Release
- **15 core components** with full test coverage
- **422 tests** with 96% statement coverage
- Design tokens system
- Dark mode support
- IoT-specific components
- Mobile components
`;

// Quick stats
const stats = {
  components: 23,
  tests: 773,
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
                    date="2025-12-15"
                    title="Phase 2 Test Suite"
                    description="Added 351 tests for form and navigation components"
                  />
                  <UpdateItem
                    date="2025-12-14"
                    title="Initial Release"
                    description="15 core components with 422 tests"
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
